# APARNEX PHARMA LLP — Production readiness and handover

Updated 22 October 2026.

**Status: implementation and local checks completed; not yet verified or released in the live Netlify/Supabase environment.** Browser acceptance, real authentication, database upgrade and email checks remain launch gates. No production records were accessed or changed during this work. No deployment or new public preview URL was created.

## 1. Changes delivered

### Public website

- Replaced unfinished company wording with the supplied Who We Are, vision, mission, values and journey copy. The journey is a foundation section, without fabricated historical milestones.
- Removed placeholder portraits and invented-profile slots from Our People. The page describes the company's approach to communication and collaboration without naming unknown staff.
- Replaced unfinished homepage/footer/privacy copy. Unapproved CMS business content is preserved privately; only approved entries are shown publicly, otherwise finished default copy is used.
- Kept medicines in About Us. Seven verified product listings retain supplied photographs, original packaging, grouped Moly-IV photographs, branded card surrounds and accessible expandable View Details sections.
- Product Enquire Now links prefill the selected product, subject and Product Information enquiry category. The product is stored in a dedicated field, separate from the editable subject. Product-specific WhatsApp actions remain available.
- Existing logo, company contact details, approved colours, pages and 3D capsule retained. The lossless display-logo copy removes only blank margins; the original logo is untouched.
- The company concept appears with the caption “Illustrative image”. It is not represented as real premises.
- Header has active-page indicators, SVG navigation controls, Enquire Now, keyboard focus and mobile closing behaviours. Footer contact/social actions share a consistent layout.
- Added explicit viewport metadata, page descriptions, favicon/sharing metadata, safe indexing controls and revised privacy content. No fixed retention period or compliance claim was invented.

### WhatsApp help widget

- One initially closed public-only widget, with the green WhatsApp SVG, “How can we help you?” label, approved logo and requested panel copy.
- General chat and number links use the exact supplied destination with the final period in the prefilled message.
- Toggle, close, Escape and outside-click behaviours implemented. Close/Escape restore toggle focus. Conditional rendering keeps hidden panel controls out of tab order.
- Fixed lower-right offsets include mobile safe areas. Panel width is constrained to the viewport and internal scrolling handles short screens. It does not appear in staff routes.
- Temporarily hidden during conflicting navigation/dialog/text-entry states or when the corner would cover important form/footer actions. The widget otherwise stays fixed while scrolling. Visual collision handling still needs real-browser review.
- No fake chat, online status, response-time promise or website message input.

### Real enquiry flow and staff portal

- Kept PostgreSQL storage, Supabase authentication, server-side allowlist, same-origin checks, HttpOnly staff cookie, honeypot, rate limiting and configured email integration.
- Success is returned only after confirmed storage or a confirmed existing idempotency record. Repeated UUIDs do not create duplicate records or notifications. Notification problems do not turn confirmed storage into a false storage failure.
- Client failure leaves entered values intact; a backend storage reference is required before showing success. Added accessible error/busy states and a short privacy-use notice.
- Dashboard uses actual database records with newest-first ordering, name/email/phone/product/subject/company search, status filters, pagination, labelled global summary counts and full details.
- New follow-up statuses are New, Contacted, In Progress and Closed. Historical Responded remains readable/filterable and is not converted or deleted.
- Notes and status updates persist with timestamp and authorised staff email. Optimistic concurrency rejects stale edits instead of silently replacing another staff member's changes.
- Email/call actions and valid explicit international WhatsApp follow-up links are supplied. Local-format ambiguous phone numbers do not get guessed country codes.
- Staff CSV exports use server-side authorisation, current filters and spreadsheet formula-injection protection. Search/export/update/delete/content APIs remain protected.
- Added recovery request and password-update screens backed by Supabase. Recovery requests are generic to avoid account enumeration. Recovery tokens remain in memory, are removed from the address bar, and are not stored in localStorage. Server verifies the allowlisted user before password updates. Provider responses must confirm a password update before success is displayed.
- Sensitive routes/responses use no-store/noindex headers. Robots rules are not used as access control.

## 2. Database inspection and migration

Inspected the source connection adapter, complete supplied schema and migration runner. Enquiry contact details and messages are text columns. No application-level ciphertext format, encryption routine or decryption key is present in this project. This is a statement about the supplied implementation, not an inspection of the live database: no live database credential was available.

No existing record has been decrypted, rewritten or removed. If the live deployment has custom encrypted records or differs from this schema, obtain its format/key and verify a staging read before releasing. This update does not recover unknown ciphertext or invent a replacement key.

### New migration

`database/migrations/002_staff_product_fields.sql`:

- Adds `product text NOT NULL DEFAULT ''`.
- Adds `updated_by text NOT NULL DEFAULT ''`.
- Extends the existing status constraint to include Contacted while retaining Responded.
- Adds a product index.
- Preserves existing messages, notes, statuses and row-level security. It neither seeds records nor deletes tables.

The migration is rerunnable. The existing runner applies numbered versions transactionally with an advisory lock. It was tested against an isolated PostgreSQL engine, including an existing Responded record and a repeated migration run.

### Safe upgrade sequence

1. Back up the existing database using the provider's available backup/export facilities.
2. Restore/test the upgrade in a non-production database that matches production.
3. With the correct backend `DATABASE_URL`, run:

   ```sh
   npm ci
   npm run db:migrate
   ```

4. Alternatively, for an already-initialised database, run the full `002_staff_product_fields.sql` in its SQL editor. For a brand-new database, run 001 followed by 002.
5. Confirm existing records still exist and the new columns are present before deploying the updated application.
6. Do not reset the database or remove the legacy Responded status. An application rollback can leave the additive columns in place.

## 3. Required environment variables

Keep existing working values. `.env.example` contains names and non-secret examples only.

| Variable | Purpose / value |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Exact public HTTPS origin, without trailing slash; used in browser metadata |
| `APP_ORIGIN` | Same canonical origin; required for request-origin validation |
| `DATABASE_URL` | Existing Supabase transaction-pooler PostgreSQL URI; server-only; keep TLS verification enabled |
| `SUPABASE_URL` | Existing Supabase project HTTPS URL; server-side configuration |
| `SUPABASE_ANON_KEY` | Existing project's anon key, used by the backend; do not substitute a service-role key |
| `ADMIN_EMAILS` | Comma-separated exact email addresses of explicitly authorised staff |
| `RESEND_API_KEY` | Optional outgoing-mail credential |
| `ENQUIRY_FROM_EMAIL` | Sender on a domain verified with Resend |
| `ENQUIRY_TO_EMAIL` | Company recipient; supplied email is Aparnexpharma@gmail.com |
| `SEND_CUSTOMER_CONFIRMATION` | `true` only when customer acknowledgements are intended; otherwise `false` |
| `SITE_INDEXABLE` | `false` during acceptance; `true` only when approved for public indexing |

Make server variables available to Netlify Functions/runtime and the relevant builds. Rebuild after changing public metadata/indexing values. Only `NEXT_PUBLIC_SITE_URL` uses the public prefix. Never paste filled `.env.local`, passwords or keys into Git, tickets or PR descriptions.

Changing the canonical domain requires updating both origin variables and Supabase recovery redirect settings. Additional deployment-preview origins are not automatically trusted by the production backend; use a separately configured review environment.

## 4. Create the first authorised staff account

Use the existing Supabase project; do not create a replacement project for an already-working deployment.

1. In Supabase Authentication settings, keep email/password sign-in enabled and **disable public new-user signups**. The application has no public registration route. Provider-side signup configuration has not been verified from this workspace.
2. In Authentication → Users, create the owner's staff account with the correct email and a strong private password. Confirm the email through the provider's supported verified-user process. Do not put passwords in source code.
3. Add that exact address to Netlify `ADMIN_EMAILS`. Add each subsequent approved staff address explicitly; there is no wildcard/domain-wide access.
4. Set `SUPABASE_URL` and `SUPABASE_ANON_KEY`, and redeploy.
5. Open `/admin`, sign in, and confirm unauthorised accounts are refused.

Both provider authentication and membership in `ADMIN_EMAILS` are checked server-side. Having a Supabase account alone does not grant access.

### Password recovery

1. In Supabase Auth URL configuration, set the correct Site URL and allow the exact HTTPS redirect `YOUR_ORIGIN/admin/reset-password`.
2. Verify the provider's recovery email/SMTP settings and its standard recovery-link template. This implementation expects the standard implicit recovery redirect with `access_token` and `type=recovery` in the URL fragment; a custom PKCE-only/code-only template needs corresponding integration before use.
3. Staff open `/admin/forgot-password`. The response is conditional and generic; it does not claim mail delivery.
4. The recovery link opens `/admin/reset-password`; choose and confirm a password of at least 12 characters. The server verifies the token and staff allowlist before asking Supabase to update the password.
5. Sign in normally afterwards. If provider policy requires extra reauthentication not supported by this screen, the update reports failure; use the company administrator/provider recovery process rather than disabling security controls.

No actual recovery email or password change was performed. Do not rely on this flow until it passes the staging test with your provider settings.

## 5. View and manage enquiries

1. Open `/admin` and sign in using an authorised staff account.
2. Global summary cards show counts of **all recorded** enquiries. The table's matching total is specific to the current search/status filter.
3. Search by customer name, email, phone, product, subject or company. Filter by follow-up status. Records are newest first; pagination uses 50 records per page.
4. Open View details to read the full message/contact details and use Email, Call or an unambiguous international WhatsApp follow-up link.
5. Update status/notes and choose Save changes. The record includes the update time and staff email. Refresh to verify persistence. A stale-write error requires reloading the record and reconciling edits.
6. Export CSV downloads the current filtered result for authorised staff, capped at 10,000 records per export.
7. Email notification status is shown per record. Retry is available only when mail configuration exists and the notification is not already sent.
8. Existing deletion/retention controls remain staff-only and require an explicit confirmation in the interface. Deletion is permanent; use it only according to the company's record-management decisions.
9. Sessions last at most one hour. Expired API sessions return to sign-in with a clear message. Sign out when finished.

## 6. Verification actually completed

| Check | Result / boundary |
| --- | --- |
| `npm run typecheck` | Passed |
| `npm run lint` | Passed, ESLint configuration included |
| `npm test` | 18 passed across route/database and DOM interaction tests |
| `npm run build` | Passed, Next.js production build with public/staff/API routes |
| PostgreSQL route/data checks | Isolated PGlite PostgreSQL engine; provider auth and network-mail boundaries mocked; no production credentials |
| Product submission | Identified LOCAL TEST record saved locally with product and read through the authorised route; retry stored once |
| Access restrictions | Missing/expired/non-allowlisted sessions rejected by direct list/export/update/content/delete/retry route calls |
| Persistence/search/export | Local notes/status/staff timestamp, stale edits, product/phone searches, pagination/counts and CSV protection tested |
| Migration | Existing Responded message/notes preserved and RLS still enabled after repeated upgrade |
| Widget | DOM tests for collapsed/open state, toggle/close/outside/Escape, focus return, public/staff exclusion and exact WhatsApp link |
| Form failures | DOM tests confirm entered values remain and missing backend storage reference cannot produce success |
| Generated production HTML | Checked About Us, Our People, Contact, Enquiry and Privacy for completed copy, image paths/dimensions, secure external links, viewport and a single widget control |
| Catalogue/staff output | Seven product-form links and named WhatsApp messages checked; recovery pages noindex and omit the widget; no Products route |

### Browser/device checks not completed

The managed preview launcher previously failed before serving this Next.js project because it injects unsupported `--host` and `--strictPort` flags. No application runtime was replaced to compensate for this environment problem. No user-facing preview URL is available.

DOM tests use jsdom. They are not browser rendering, viewport emulation or physical-device tests.

| Width | Responsive source/layout rules reviewed | Painted browser/overflow inspection |
| --- | --- | --- |
| 360px | Yes | Not verified |
| 390px | Yes | Not verified |
| 768px | Yes | Not verified |
| 1024px | Yes | Not verified |
| 1366px | Yes | Not verified |
| 1920px | Yes | Not verified |

Chrome, Edge, Firefox and Safari visual/interaction checks remain unverified. Console/network errors, real scrolling/collision behaviour, reduced-motion appearance, nested-route HTTP refresh on Netlify and mobile keyboard/landscape layouts need staging acceptance. The dynamic homepage and authorised dashboard were source/build-tested; no claim is made that all live UI flows have been visually checked.

### Live integration checks not completed

- No live enquiry was submitted or emailed.
- No real staff account, login, password recovery or logout was verified against your Supabase project.
- No live database schema, encrypted-record format, row count or preserved-data comparison was available.
- No migration was applied to the live database.
- No Netlify deployment, preview or production nested-route refresh was tested.

## 7. Remaining assets and production blockers

- Actual company photo named “aparnex” and additional real premises/company photos are absent from attachments and project assets. The labelled concept is used; no unrelated photo is presented as company premises.
- Official LinkedIn company URL is pending. Configure it in `lib/social.ts`; the icon remains hidden until a valid company URL is supplied.
- Higher-resolution Moly-IV and separate Moxilem/RANIFLOX-IV/Flunole-IV photographs would improve small packaging text. Existing group photographs are preserved. Unclear ingredient splits and pack counts are not invented. The Google Images screenshot remains excluded.
- Confirm migration and production schema, existing Netlify variables, staff allowlist/provider signup restrictions, recovery email settings and optional Resend configuration.
- Complete the browser matrix and live acceptance before classifying the site as production-ready. Content is finished; a successful build is not a substitute for these gates.

## 8. Netlify deployment checklist

- [ ] Back up the existing database and validate the upgrade in staging.
- [ ] Apply migration 002 before deploying the new application; verify existing records remain intact.
- [ ] Create/confirm the first staff account, disable provider public signup and set explicit `ADMIN_EMAILS`.
- [ ] Configure Supabase recovery Site URL, exact redirect URL and mail settings.
- [ ] Commit the updated project to the existing GitHub repository, keeping `package.json`, lockfile and `netlify.toml` at the repository root. Include `.env.example`; exclude all filled environment files.
- [ ] In Netlify, keep branch/base-directory settings appropriate to the current repository, build command `npm run build`, publish directory `.next`, and Node.js 22.
- [ ] Retain working production variables. Give server variables Functions/runtime scope. Do not convert this project to a static export or use a catch-all SPA redirect.
- [ ] Configure a review deployment's exact origin and staging database/auth separately; keep `SITE_INDEXABLE=false`.
- [ ] Run typecheck, lint, tests and production build in the review pipeline.
- [ ] Check six representative widths in available real browsers, portrait/landscape and keyboard navigation. Verify SVGs, images, sticky header, product detail sections and widget behaviour.
- [ ] Submit an explicitly labelled TEST enquiry through the review site. Confirm its product/contact details in `/admin`; change notes/status, refresh, search and export. Test missing/unauthorised/expired access through direct API calls as well as pages.
- [ ] Check failure behaviour without data loss, actual notification delivery if enabled, and recovery/logout with real approved staff accounts.
- [ ] Open and refresh all public and staff nested routes directly on Netlify. Inspect console/network failures and caching headers.
- [ ] Compare staging/production row counts and representative existing records before/after migration using authorised access. Do not expose those records in public reports.
- [ ] Obtain content/privacy/visual approval, promote the verified deployment, and set `SITE_INDEXABLE=true` only when intended. Keep staff routes noindex and access-controlled.

## 9. Files and structure

Public content/layout: `app/page.tsx`, `app/about/page.tsx`, `app/our-people/page.tsx`, `app/contact/page.tsx`, `app/enquiry/page.tsx`, `app/privacy/page.tsx`, `app/layout.tsx`, `app/globals.css`, `app/robots.ts`, `app/sitemap.ts`.

Shared UI: `components/shell.tsx`, `components/ui.tsx`, `components/brand-logo.tsx`, `components/icons.tsx`, `components/sculpture.tsx`, `components/product-showcase.tsx`, `components/social-links.tsx`, `components/whatsapp-help.tsx`, `components/enquiry-form.tsx`.

Staff: `components/admin-dashboard.tsx`, `components/staff-login.tsx`, `components/staff-logout.tsx`, `components/staff-recovery.tsx`, `components/content-editor.tsx`, `app/admin/login/page.tsx`, new `app/admin/forgot-password/page.tsx`, new `app/admin/reset-password/page.tsx`; existing `/admin` remains server-protected.

Backend: `app/api/enquiries/route.ts`, `app/api/admin/enquiries/route.ts`, `app/api/admin/export/route.ts`, `app/api/admin/content/route.ts`, `app/api/auth/logout/route.ts`, new `app/api/auth/recovery/route.ts`, new `app/api/auth/reset-password/route.ts`.

Shared data/security: `lib/auth.ts`, `lib/validation.ts`, `lib/content.ts`, `lib/cms.ts`, `lib/business-content.ts`, `lib/products.ts`, `lib/social.ts`, `lib/enquiry-query.ts`, `lib/rate-limit.ts`. Existing `lib/database.ts`, Supabase login mechanism and initial migration are retained.

Configuration/checks: new migration 002, `.env.example`, `next.config.ts`, `package.json`, lockfile, `eslint.config.mjs`, `vitest.config.ts`, `tests/enquiries.test.ts`, `tests/widget-form.test.tsx`, compatible legacy `scripts/smoke.mjs` expectations. Netlify build settings are unchanged.

Assets from prior update: approved-logo display WebP, labelled concept WebP and original/optimized supplied product photographs. Original logo and original product images remain intact. See `ASSET-NOTES.md` for concept-generation provenance.

## 10. Primary setup references

- [Supabase password authentication and recovery](https://supabase.com/docs/guides/auth/passwords)
- [Supabase recovery request flow](https://supabase.com/docs/reference/javascript/auth-resetpasswordforemail)
- [Supabase authentication endpoint reference](https://supabase.github.io/auth/)
- [Supabase redirect configuration](https://supabase.com/docs/guides/auth/redirect-urls)
- [Netlify Next.js deployment](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/)
