<?php
/**
 * Server-side configuration for the lead endpoint.
 *
 * Copy this file to config.php (in the same directory) on the server and
 * replace the placeholder values. config.php must NOT be committed with real
 * secrets and is preserved during deployments.
 */

// Business email that receives enquiries.
define('LEAD_RECIPIENT_EMAIL', 'REPLACE_WITH_BUSINESS_EMAIL');

// Display name used in the From header.
define('LEAD_RECIPIENT_NAME', 'Kuthula Consulting & Projects');

// Allowed website origins for CORS / origin checks.
define('LEAD_ALLOWED_ORIGINS', [
    'https://www.example.com',
    'https://example.com',
]);

// Rate limiting.
define('LEAD_RATE_LIMIT_MAX', 5);        // max submissions
define('LEAD_RATE_LIMIT_WINDOW', 600);   // seconds (10 minutes)

// Optional: directory for rate-limit storage (must be writable, ideally outside web root).
// define('LEAD_RATE_LIMIT_DIR', '/home/username/tmp/kuthula_rate_limit');