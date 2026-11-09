# Kuthula Consulting & Projects Website

Professional construction and project consulting website built with Next.js 16 (App Router) and exported as a static site for DirectAdmin shared hosting.

## Tech stack

- Next.js 16 (App Router, static export)
- TypeScript
- React
- Tailwind CSS v4
- Lucide React icons
- PHP lead endpoint

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build (static export)

```bash
npm run build
```

Output is generated in `out/`.

## Type check and lint

```bash
npx tsc --noEmit
npm run lint
```

## Configuration

Edit `src/lib/site-config.ts` to update company details, contact information, service area and website URL. All business details are placeholders until verified by the client.

Logo assets are in `public/` (copied from the supplied logo pack).

## PHP lead endpoint

Source: `php/lead.php` with `php/config.example.php`.

Deployment target on server: `<document_root>/api/lead.php`.

On the server:

1. Copy `php/lead.php` to `<document_root>/api/lead.php`.
2. Create `<document_root>/api/config.php` based on `config.example.php` with verified business email and allowed origins.
3. Ensure `config.php` is not publicly accessible (root `.htaccess` denies access).

The endpoint uses PHP's `mail()` transport. For authenticated SMTP later, replace the `mail()` call in `lead.php` with an SMTP library while keeping the same request/response contract.

## Deployment (DirectAdmin)

GitHub Actions workflow: `.github/workflows/deploy.yml`.

Configure these repository secrets:

- `SSH_HOST`
- `SSH_PORT`
- `SSH_USERNAME`
- `SSH_PRIVATE_KEY`
- `REMOTE_PATH` (website directory, e.g. `/home/user/public_html`)
- `SITE_URL` (e.g. `https://www.example.com`)

The workflow builds the static export, deploys `out/` via rsync over SSH, deploys `php/lead.php` separately, and verifies an HTTP 200 response.

Server-side `config.php` and secrets are preserved (excluded from rsync deletion).

## Outstanding configuration requirements

- Verified company contact details (email, telephone, WhatsApp, address, service area, website URL).
- Social media links.
- Verified business email for lead delivery.
- Optional: production imagery to replace placeholder graphics.
- Optional: staging environment and rollback directories.