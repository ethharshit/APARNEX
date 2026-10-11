# Netlify edition QA

This is a separate deployment package. The earlier Sites/D1 test results do not certify the new PostgreSQL/Supabase integrations.

## Verified locally

- Standard Next.js production build: passed.
- TypeScript validation during build: passed.
- 15 HTTP smoke checks against the production build: passed (all primary pages, staff login, sitemap/robots, denied anonymous admin APIs, invalid enquiry rejection, missing-auth configuration handling, and cross-origin rejection).
- NPM lockfile matches package.json; no Cloudflare or ChatGPT authentication imports remain.
- Smoke test: run `node scripts/smoke.mjs` after `npm run build`. The script isolates credentials in its child process and does not contact a configured database or send emails.

## Implemented

- Standard Next.js pages and API routes in one project.
- PostgreSQL adapter with bound SQL parameters, migration script and schema.
- Supabase password sign-in, server-side user verification and staff email allowlist.
- HttpOnly/Secure production session cookie; same-origin mutation checks; database login rate limits.
- Existing enquiry validation, duplicate prevention, CSV export, lead management and business CMS retained.
- Original logo, supplied contact details and 3D visual retained.
- Server configuration from environment variables; no credentials in this ZIP.

## Acceptance after configuration

1. Run schema migration against your PostgreSQL database.
2. Submit one test enquiry and verify it persists; retry and verify it is not duplicated.
3. Sign in as an approved staff account, view the enquiry, save notes/status, export it and delete the test record.
4. Verify anonymous and non-allowlisted users cannot access admin APIs or the CMS.
5. Verify rate limits, sign-out, expired sessions and incorrect-password errors.
6. Verify notification and customer acknowledgement delivery with a verified sender.
7. Check all pages on mobile/desktop, reduced motion, keyboard use and failed WebGL fallback.
8. Measure deployed performance/accessibility and approve legal/company content before public indexing.

Actual Netlify deployment, live Supabase/PostgreSQL credentials, email delivery and browser/device QA are not available in this environment. They are not reported as passed.
