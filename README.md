# APARNEX PHARMA LLP — Netlify edition

**Frontend and backend are in this one folder.** This is a standard Next.js App Router project adapted for Netlify. You do not need to deploy an Express server separately.

- `app/` — frontend pages, layouts and the staff dashboard
- `app/api/` — backend routes for enquiries, staff authentication, lead management and CMS
- `components/` — reusable UI and the 3D sculpture
- `lib/` — PostgreSQL, authentication, validation and company configuration
- `database/migrations/` — PostgreSQL schema
- `public/` — original logo
- `netlify.toml` — build settings
- `.env.example` — settings to configure, without credentials

This archive replaces the earlier Sites-only package for Netlify deployment. It does not change the existing hosted Site. It uses PostgreSQL and Supabase authentication, replacing Cloudflare D1 and ChatGPT sign-in.

## What you need

1. A Netlify account and a GitHub/GitLab/Bitbucket repository.
2. A Supabase project for PostgreSQL and staff authentication.
3. Optional: a Resend account and verified sender domain for outgoing email.

## 1. Set up the database

Create a Supabase project. Open its SQL Editor and run `database/migrations/001_initial.sql`. Alternatively, copy `.env.example` to `.env.local`, set `DATABASE_URL`, install dependencies, and run `npm run db:migrate`.

From Supabase's **Connect** panel, copy the **Transaction pooler** PostgreSQL connection URI. Replace its password placeholder with your database password (URL-encode special characters). Use this as `DATABASE_URL`. This is a server-only secret. Use TLS certificate validation (`sslmode=verify-full`) and the provider's recommended trusted certificate configuration if required; do not disable TLS verification.

The migration enables row-level security without browser-access policies. Only the backend's privileged database connection can read/write the lead tables. Do not create public policies for these tables. Use the Supabase `postgres` role for the provided setup or a separately configured backend role with explicit privileges; ordinary anonymous/authenticated REST clients should not have access.

## 2. Set up staff sign-in

- Enable email/password authentication in Supabase Auth.
- Create confirmed staff users in the Supabase dashboard. Set strong passwords and share them privately.
- Disable public new-user signup if it is not needed. There is no public registration form in this app.
- Copy the Supabase project URL into `SUPABASE_URL` and the project **anon API key** into `SUPABASE_ANON_KEY`. Do not substitute a service-role secret.
- Set `ADMIN_EMAILS` to the exact authorised staff email addresses, separated by commas.
- Visit `/admin` after deployment. It redirects to `/admin/login`.

Both a valid Supabase user session and an email in `ADMIN_EMAILS` are required. Login is rate limited. Session tokens are kept in HttpOnly, Secure production cookies, never localStorage. Sessions last at most one hour; staff sign in again when expired. Password recovery/account administration is handled through the company administrator and Supabase dashboard; no self-service reset screen is supplied.

## 3. Deploy the one folder to Netlify

1. Extract the ZIP.
2. Upload the **contents of `APARNEX-PHARMA-Netlify/`** to the root of a new Git repository. Keep `package.json`, `package-lock.json` and `netlify.toml` at the repository root.
3. In Netlify, import that repository as a new project.
4. Set build command to `npm run build` and publish directory to `.next`. These are already in `netlify.toml`. Leave the base directory empty if the files are at the repository root.
5. Set Node.js to 22 (already configured).
6. Add the environment variables below in Netlify. Make server variables available to Functions/runtime as well as builds where the UI offers scopes. Redeploy after changing them.
7. Deploy. Netlify's Next.js adapter packages the pages and API routes together.

**Do not use simple drag-and-drop static deployment for this project.** The backend requires Netlify's Next.js build pipeline. Do not set `output: 'export'` or add an SPA catch-all redirect.

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Your actual URL, e.g. `https://your-name.netlify.app`, no trailing slash |
| `APP_ORIGIN` | Same public URL, used by backend request validation |
| `DATABASE_URL` | Supabase transaction-pooler PostgreSQL URI |
| `SUPABASE_URL` | `https://YOUR_PROJECT.supabase.co` |
| `SUPABASE_ANON_KEY` | Supabase project anon key |
| `ADMIN_EMAILS` | Comma-separated authorised staff emails |
| `RESEND_API_KEY` | Optional, required for outgoing mail |
| `ENQUIRY_FROM_EMAIL` | Sender using a domain verified with Resend |
| `ENQUIRY_TO_EMAIL` | `Aparnexpharma@gmail.com` |
| `SEND_CUSTOMER_CONFIRMATION` | `true` to enable customer acknowledgement, otherwise `false` |

Netlify can assign your site name/URL before the final deployment. Set `NEXT_PUBLIC_SITE_URL` to that URL and rebuild. Only `NEXT_PUBLIC_SITE_URL` is intended for browser exposure. Never prefix database or authentication secrets with `NEXT_PUBLIC_`.

## 4. Optional outgoing email

The company's Gmail address can receive notifications. It is not automatically a valid sender through Resend: configure a verified sending domain and use it for `ENQUIRY_FROM_EMAIL`.

Without mail configuration, enquiries are still stored if PostgreSQL is configured. Notification status is `unconfigured`; admin provides manual retry after configuration. A real successful mail delivery has not been tested with your account. No automated retry queue is included.

## Run locally

Install Node.js 22.13 or later (22 LTS recommended).

```sh
npm ci
```

Copy `.env.example` to `.env.local` and fill in your values, then:

```sh
npm run db:migrate
npm run dev
```

Open `http://localhost:3000`. Set both `NEXT_PUBLIC_SITE_URL` and `APP_ORIGIN` to `http://localhost:3000` locally.

Production checks:

```sh
npm run typecheck
npm run build
npm start
```

If Windows hides dotfiles, make sure `.env.example` and `netlify.toml` are still copied. Never upload `.env.local` or passwords to Git.

## Content and launch

The supplied office address, phone and email are included. Business positioning, leadership details and other unconfirmed information remain clearly labelled. The homepage business-focus CMS is under `/admin`; other content is source-editable.

Indexing is disabled while the company content is draft. After approval, enable indexing in `app/layout.tsx` and update `app/robots.ts` to allow public pages while disallowing `/admin` and `/api`. Keep staff pages noindex. Set the final domain in `NEXT_PUBLIC_SITE_URL` and rebuild.

Enquiry data from the existing ChatGPT-hosted Site is not included or automatically migrated. This deployment starts with its own PostgreSQL database. No credentials or customer records are in this archive.

## Verification boundaries

See `QA.md`. Deployment to your Netlify account, live PostgreSQL/Supabase authentication and real email delivery require your credentials and remain unverified until configured. This package is source prepared for Netlify, not a claim of an already deployed Netlify website.

## Official deployment references

- https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/
- https://supabase.com/docs/guides/database/connecting-to-postgres
- https://supabase.com/docs/guides/auth
