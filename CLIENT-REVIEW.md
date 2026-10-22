# APARNEX client review update — 22 October 2026

Prepared from GitHub ethharshit/APARNEX commit e6661be9393d662b4aaaa4a59db13ea16353853e. This package has not been pushed or deployed.

## Changes
- About Us now includes Medicines We Deal In, the requested introductory text and seven product cards with accessible native expandable packaging details.
- Products: Moly-IV, Lemfer-FCM, PERONUM-SB, Moxilem, RANIFLOX-IV, Flunole-IV and LEMNOXA-40. Moly-IV's two photos are grouped in one listing. Three products use the intact shared group photo, labelled accordingly; no replacement packaging was generated.
- Original logo appears faintly beside the photographs; APARNEX PHARMA labels appear on cards. Original packaging is untouched. Original files are retained in public/products/originals; separate WebP copies are used for display.
- Product Enquire Now buttons open WhatsApp with the exact selected name. No secondary form link was added, so the working form needs no prefill or backend change.
- Floating WhatsApp, Contact and footer WhatsApp links, and Instagram added. The floating control hides while fields have focus and while mobile navigation is expanded. Mobile spacing requires visual acceptance testing.
- LinkedIn configuration is in lib/social.ts; absent or invalid company URL remains hidden.

## Pending client inputs
- No supplied company/premises photograph named aparnex exists among the six attachments or repository assets. The existing introduction artwork remains; no company gallery or substitute photo was added. Supply the company photo to complete this requirement.
- Official LinkedIn company URL.
- Separate full-resolution photos of Moxilem, RANIFLOX-IV and Flunole-IV would improve individual cards. The group photograph remains intact to preserve package edges and labels.
- Higher-resolution Moly-IV bottle photograph would improve small-print legibility. Both supplied Moly-IV photos remain grouped despite their different packaging colours; confirm current packaging with the client.
- October 12 attachment is a Google Images search screenshot, not an approved individual product photograph; excluded. No products were inferred from it.
- PERONUM-SB individual ingredient split, vial count and LEMNOXA-40 box quantity are not clearly confirmed and were omitted.

## Verification performed
- npm ci --ignore-scripts succeeded with existing lockfile.
- npm run typecheck passed.
- npm run build passed (Next.js production build).
- Parsed generated HTML: seven distinct cards; exact URL-decoded product WhatsApp messages; image files present with dimensions and lazy loading; social links present on About, Contact and Enquiry; LinkedIn hidden.
- Git comparison confirms enquiry form, all API routes, authentication/database/validation code, logo, navigation data, dependency files and Netlify configuration unchanged.
- No Products page or navigation item added.

## Not verified
- Browser/mobile/tablet layout, keyboard interaction and external app opening: preview supervisor passes unsupported --host/--strictPort flags to Next.js. No application configuration was changed to work around the environment.
- Live Supabase submission, email delivery, admin authentication and Netlify deployment were not exercised. No credentials or customer data were accessed.

## Changed files
app/about/page.tsx; app/contact/page.tsx; app/layout.tsx; app/globals.css; components/shell.tsx; new components/product-showcase.tsx; new components/social-links.tsx; new lib/social.ts; new public/products/*; this handover.

## Deploy for review
Upload/commit the extracted project contents to the existing GitHub repository, keeping package.json at its root. Keep existing Netlify environment variables. Netlify can rebuild the connected repository. Review the deploy preview before promoting to production; test mobile navigation, form fields, WhatsApp messages, packaging details and a test enquiry in the configured environment.
