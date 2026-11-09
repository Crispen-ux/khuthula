<?php
declare(strict_types=1);

/**
 * Lead submission endpoint.
 *
 * Deploy to: <document_root>/api/lead.php
 * Server-side configuration is loaded from config.php (same directory) if present.
 */

// ---------- Configuration loading ----------
if (!defined('LEAD_RECIPIENT_EMAIL')) {
    $configFile = __DIR__ . '/config.php';
    if (is_file($configFile)) {
        require $configFile;
    }
}

if (!defined('LEAD_RECIPIENT_EMAIL')) {
    define('LEAD_RECIPIENT_EMAIL', 'REPLACE_WITH_BUSINESS_EMAIL');
}
if (!defined('LEAD_RECIPIENT_NAME')) {
    define('LEAD_RECIPIENT_NAME', 'Kuthula Consulting & Projects');
}
if (!defined('LEAD_ALLOWED_ORIGINS')) {
    define('LEAD_ALLOWED_ORIGINS', []);
}
if (!defined('LEAD_RATE_LIMIT_MAX')) {
    define('LEAD_RATE_LIMIT_MAX', 5);
}
if (!defined('LEAD_RATE_LIMIT_WINDOW')) {
    define('LEAD_RATE_LIMIT_WINDOW', 600);
}
if (!defined('LEAD_RATE_LIMIT_DIR')) {
    define('LEAD_RATE_LIMIT_DIR', '');
}

// ---------- Helpers ----------
function json_response(array $payload, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function sanitize_header_value(string $value): string
{
    // Prevent header injection.
    return str_replace(["\r", "\n", "%0a", "%0d"], '', $value);
}

function client_ip(): string
{
    $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    if (!filter_var($ip, FILTER_VALIDATE_IP)) {
        $ip = '0.0.0.0';
    }
    return $ip;
}

function allowed_origin(): ?string
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin === '') {
        return null;
    }
    $allowed = LEAD_ALLOWED_ORIGINS;
    if (in_array($origin, $allowed, true)) {
        return $origin;
    }
    return null;
}

// ---------- CORS / origin handling ----------
$origin = allowed_origin();
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    if ($origin !== null) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Access-Control-Allow-Methods: POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
        header('Vary: Origin');
    }
    http_response_code(204);
    exit;
}

if ($origin !== null) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
}

// ---------- Method check ----------
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['success' => false, 'message' => 'Method not allowed.'], 405);
}

// ---------- Origin / referer restriction ----------
$requestOrigin = $_SERVER['HTTP_ORIGIN'] ?? '';
$referer = $_SERVER['HTTP_REFERER'] ?? '';
if ($requestOrigin !== '' && allowed_origin() === null) {
    json_response(['success' => false, 'message' => 'Origin not allowed.'], 403);
}
if ($requestOrigin === '' && $referer !== '') {
    $refererHost = parse_url($referer, PHP_URL_HOST);
    $allowedHosts = [];
    foreach (LEAD_ALLOWED_ORIGINS as $o) {
        $h = parse_url($o, PHP_URL_HOST);
        if ($h) {
            $allowedHosts[] = $h;
        }
    }
    if ($refererHost && $allowedHosts && !in_array($refererHost, $allowedHosts, true)) {
        json_response(['success' => false, 'message' => 'Origin not allowed.'], 403);
    }
}

// ---------- Parse input ----------
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
$input = $_POST;
if (stripos($contentType, 'application/json') !== false) {
    $raw = file_get_contents('php://input');
    $decoded = json_decode($raw, true);
    if (is_array($decoded)) {
        $input = $decoded;
    }
}

// ---------- Honeypot ----------
$honeypot = trim((string)($input['website'] ?? ''));
if ($honeypot !== '') {
    // Pretend success to bots.
    json_response(['success' => true, 'message' => 'Thank you. Your enquiry has been received.']);
}

// ---------- Rate limiting ----------
$rateDir = LEAD_RATE_LIMIT_DIR !== '' ? LEAD_RATE_LIMIT_DIR : (sys_get_temp_dir() . '/kuthula_rate_limit');
if (!is_dir($rateDir)) {
    @mkdir($rateDir, 0750, true);
}
$ip = client_ip();
$rateFile = $rateDir . '/' . hash('sha256', $ip) . '.json';
$now = time();
$window = LEAD_RATE_LIMIT_WINDOW;
$max = LEAD_RATE_LIMIT_MAX;

$fp = @fopen($rateFile, 'c+');
if ($fp) {
    flock($fp, LOCK_EX);
    $raw = stream_get_contents($fp);
    $data = json_decode($raw, true);
    if (!is_array($data)) {
        $data = ['timestamps' => []];
    }
    $timestamps = array_values(array_filter(
        $data['timestamps'] ?? [],
        static function ($t) use ($now, $window) {
            return is_int($t) && ($now - $t) < $window;
        }
    ));
    if (count($timestamps) >= $max) {
        flock($fp, LOCK_UN);
        fclose($fp);
        json_response(
            ['success' => false, 'message' => 'Too many requests. Please try again later.'],
            429
        );
    }
    $timestamps[] = $now;
    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, json_encode(['timestamps' => $timestamps]));
    fflush($fp);
    flock($fp, LOCK_UN);
    fclose($fp);
}

// ---------- Field extraction & validation ----------
$fullName = trim(strip_tags((string)($input['fullName'] ?? '')));
$company = trim(strip_tags((string)($input['company'] ?? '')));
$email = trim((string)($input['email'] ?? ''));
$telephone = trim(strip_tags((string)($input['telephone'] ?? '')));
$service = trim(strip_tags((string)($input['service'] ?? '')));
$location = trim(strip_tags((string)($input['location'] ?? '')));
$description = trim(strip_tags((string)($input['description'] ?? '')));

$errors = [];
if ($fullName === '') {
    $errors[] = 'Full name is required.';
}
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'A valid email address is required.';
}
if ($telephone === '') {
    $errors[] = 'Telephone number is required.';
}
if ($service === '') {
    $errors[] = 'Service required is required.';
}
if ($location === '') {
    $errors[] = 'Project location is required.';
}
if ($description === '') {
    $errors[] = 'Project description is required.';
}

if (!empty($errors)) {
    json_response(['success' => false, 'message' => implode(' ', $errors)], 422);
}

// ---------- Build email ----------
$safeEmail = sanitize_header_value($email);
$safeName = sanitize_header_value($fullName);

$subject = 'New enquiry: ' . sanitize_header_value($service);
$subject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

$body = "New enquiry received via website.\n\n";
$body .= "Full name: {$fullName}\n";
$body .= "Company: " . ($company !== '' ? $company : 'N/A') . "\n";
$body .= "Email: {$email}\n";
$body .= "Telephone: {$telephone}\n";
$body .= "Service required: {$service}\n";
$body .= "Project location: {$location}\n\n";
$body .= "Project description:\n{$description}\n\n";
$body .= "IP: {$ip}\n";
$body .= "Submitted: " . date('c') . "\n";

$recipient = LEAD_RECIPIENT_EMAIL;
$recipientHeader = sanitize_header_value(LEAD_RECIPIENT_NAME) . ' <' . sanitize_header_value($recipient) . '>';

$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'From: ' . sanitize_header_value(LEAD_RECIPIENT_NAME) . ' <' . sanitize_header_value($recipient) . '>';
$headers[] = 'Reply-To: ' . $safeName . ' <' . $safeEmail . '>';
$headers[] = 'X-Mailer: PHP/' . phpversion();

$sent = false;
try {
    $sent = @mail($recipient, $subject, $body, implode("\r\n", $headers));
} catch (Throwable $e) {
    $sent = false;
}

if (!$sent) {
    json_response(
        ['success' => false, 'message' => 'Unable to send enquiry at this time. Please try again later.'],
        500
    );
}

json_response(['success' => true, 'message' => 'Thank you. Your enquiry has been received and we will respond shortly.']);