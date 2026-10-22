# Complete APARNEX public content and secure staff enquiry workflows

This PR replaces unfinished public copy and completes the product-enquiry and staff-management flows within the existing Netlify Next.js project.

## Changes

- Apply the supplied company copy, remove placeholder team profiles/milestones and update privacy information.
- Retain the branded About Us catalogue and add verified product-name prefill/storage alongside product-specific WhatsApp actions.
- Add one accessible, expandable WhatsApp help widget on public pages; exclude staff routes.
- Improve shared logos, SVG icons, header/footer layout and responsive staff controls.
- Extend staff search, pagination, real summary counts, follow-up actions, persistent notes/statuses and staff update identity.
- Protect stale updates, private responses and filtered CSV exports; add allowlist-checked Supabase recovery screens.
- Add a backward-compatible migration for product, updated_by and Contacted status, preserving legacy Responded records.

## Verification

- TypeScript, ESLint and production build passed.
- 18 tests passed: isolated PostgreSQL route/storage checks and jsdom interaction checks, with external authentication/mail boundaries mocked.
- Generated production HTML checked for completed content, assets, product links, widget count, viewport metadata and staff exclusion/noindex.

## Deployment requirements and limits

Apply migration 002 before deploying to an existing database. Retain existing credentials and configure the staff allowlist, provider signup restrictions and recovery redirects/mail.

Live Supabase/Netlify flows, real mail and the six-width cross-browser acceptance matrix remain unverified. Preview startup is blocked by incompatible environment-injected Next.js flags. No production deployment or data change was performed.

See `PRODUCTION_READINESS.md` for the full rollout checklist, first staff account instructions, management guide and verification boundaries.
