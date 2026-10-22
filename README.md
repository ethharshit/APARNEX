# APARNEX PHARMA LLP

The public website and staff enquiry portal share this Next.js project. Netlify builds pages and backend API routes together; no separate Express server is needed.

Read **[PRODUCTION_READINESS.md](PRODUCTION_READINESS.md)** for migration, first staff account, environment variables, deployment and acceptance testing. That document is the current handover; earlier client-review and QA notes are historical.

## Run locally

Use Node.js 22 LTS with the current lockfile.

```sh
npm ci
```

Copy `.env.example` to `.env.local` and fill it privately. For local development, set `APP_ORIGIN` and `NEXT_PUBLIC_SITE_URL` to `http://localhost:3000`.

```sh
npm run db:migrate
npm run dev
```

`db:migrate` applies numbered migrations in order, records applied versions and runs them inside a transaction. Back up and test the database upgrade before applying it to an existing production database. Do not reset the existing database.

## Checks

```sh
npm run typecheck
npm run lint
npm test
npm run build
```

Tests use an isolated embedded PostgreSQL engine and mocked authentication/email boundaries. They do not use production credentials or records. DOM interaction tests are not browser layout or physical-device tests.

## Routes

Public pages: `/`, `/about`, `/our-people`, `/contact`, `/enquiry`, `/privacy`.

Staff: `/admin`, `/admin/login`, `/admin/forgot-password`, `/admin/reset-password`.

Medicines stay within About Us. Each product links to `/enquiry?product=...` and has a product-specific WhatsApp link.

## Netlify

Connect the existing GitHub repository. Keep `package.json`, `package-lock.json` and `netlify.toml` at its root. Build with `npm run build`, publish `.next`, use Node.js 22 and preserve existing runtime secrets. Do not use static drag-and-drop deployment, `output: 'export'` or an SPA catch-all redirect for this full-stack project.

Apply migration `002_staff_product_fields.sql` before releasing the new application to an existing database. Keep `001_initial.sql` unchanged. No customer-record export or credential is included in this source package.

Set `SITE_INDEXABLE=true` only after acceptance testing and approval. Staff routes remain noindex and server-protected independently of robots rules.

## Secrets

Only `NEXT_PUBLIC_SITE_URL` is intended for browser exposure. Keep database credentials, authentication configuration and mail credentials in Netlify runtime variables, not Git. This app requires the Supabase anon key on its server, not a service-role secret. Keep TLS verification enabled for PostgreSQL; use the provider's trusted certificate guidance if required.
