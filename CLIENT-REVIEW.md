# APARNEX PHARMA — UI repair handover

22 October 2026. Updated the existing Netlify Next.js project, including the previous About Us product showcase. Not pushed to GitHub or deployed to Netlify.

## Fixes implemented

- One green, circular WhatsApp control in the shared layout, fixed 22px from the lower-right edges plus mobile safe-area insets. Uses the exact requested general-enquiry URL without a trailing period in the message. White recognizable WhatsApp icon, 56px touch target, accessible name, secure external-link attributes and keyboard focus outline. Lower stacking level than navigation and the logo entrance. It hides during text entry, expanded navigation and open modal/dialog states so it cannot obstruct those interactions; otherwise remains fixed during scrolling. Visual collision behaviour needs browser acceptance testing.
- Contact and footer share one Grid/Flex contact block. WhatsApp title and number are one clickable area; Instagram and Connect with us use consistent 24px icons, 44px minimum link heights and spacing. Connect with us points to /enquiry. No duplicate standalone footer action. LinkedIn remains hidden until configured in lib/social.ts.
- Added company-concept.webp inside .about-overview with the exact caption “Illustrative company image” and alt text stating this is not APARNEX premises. The fictional architecture has no fabricated logo, certifications or company claims. The entire image is displayed without cropping; desktop pairing and mobile stacking use the existing brand palette. No actual company photograph was supplied, so none has been represented as real premises.
- Added a lossless logo display copy by trimming only blank margins from the approved JPEG. Pixel comparison confirms the retained logo pixels are identical; the original JPEG is untouched. Shared BrandLogo component supplies dimensions and correct absolute asset paths in header, footer, entrance and catalogue. Removed negative positioning and clipping. Header/footer logos link home.
- Existing logo entrance remains brief, ignores reduced-motion users, cannot capture pointer interaction, and dismisses on interaction or a two-second timer. It is decorative to assistive technology. No additional loading screen was introduced.
- Mobile/tablet navigation now activates through 1000px, preventing crowded tablet navigation. Closes on selection, Escape, outside click, focus leaving the header and return to desktop width. Escape restores focus to the menu control. Dropdown height is limited to the viewport.
- Product cards stretch equally, use consistently sized contain-fit image areas, align enquiry actions and retain seven verified products and grouped Moly-IV photos. Products remain within About Us; no Products page/navigation item.
- Narrow-screen footer stacks into one column. Heading sizing, flexible grid tracks, footer wrapping, button touch areas, text contrast and scroll margins were adjusted.
- Form accessibility now includes busy state, valid error-description references, consent error state and enquiry-type error markup. Existing request, validation, success/error and reset handling are preserved. No simulated submission was added.

## Files changed

- app/about/page.tsx, app/contact/page.tsx, app/globals.css, app/layout.tsx
- components/shell.tsx, components/enquiry-form.tsx
- New components/brand-logo.tsx, components/social-links.tsx, components/product-showcase.tsx
- New lib/social.ts
- public/aparnex-logo-display.webp, public/company-concept.webp; public/products/* from the previous update
- CLIENT-REVIEW.md, ASSET-NOTES.md, appended QA.md section

## Verification completed

- npm run typecheck: PASS.
- npm run build: PASS (Next.js production compilation, type analysis and static generation).
- Parsed production HTML for About Us, Contact, Enquiry, Our People and Privacy: one exact floating WhatsApp URL per page, expected social links, valid local asset paths with image dimensions, safe external-link attributes, valid internal URLs and valid aria-describedby targets.
- About Us rendered output: labelled concept image, seven product cards, exact URL-decoded product-specific WhatsApp messages, no Products route and hidden LinkedIn.
- Pixel comparison: logo display copy matches the cropped original exactly; source JPEG unchanged.
- Source comparison: API routes, PostgreSQL/authentication/validation code, dependency lockfile, Netlify/Next.js configuration and form request/reset handlers unchanged.
- Existing enquiry schema: one valid example accepted; invalid name, email, phone, subject, message and consent examples rejected. No request or customer record was submitted.

## Browser and live checks NOT completed

The managed preview launcher invokes next dev with unsupported --host and --strictPort arguments. Startup fails before a page is served. This is a preview-environment incompatibility; application/deployment scripts were not changed to work around it.

| Width | Responsive source review | Browser layout/overflow inspection |
| --- | --- | --- |
| 360px | Completed | Not verified |
| 390px | Completed | Not verified |
| 768px | Completed | Not verified |
| 1440px | Completed | Not verified |

Console errors, failed runtime requests, menu/focus/keyboard flows, reduced motion, logo timing, actual scrolling overlaps, external WhatsApp/Instagram opening and client-side form feedback remain unverified in a browser. Homepage/admin are dynamic routes: their source and build were checked, not their live rendered output. Staff-only dashboard needs authorised credentials for a full UI audit.

Direct nested-route refresh behaviour on Netlify, live Supabase form submission, staff login and real email delivery were not tested. The original Next.js adapter configuration remains intact and the required routes are included in the build. A successful build does not establish an error-free application.

## Remaining inputs / client review

- Official LinkedIn company URL.
- Actual company/premises photos, if wanted alongside the explicitly illustrative concept.
- Higher-resolution Moly-IV bottle photo and separate Moxilem, RANIFLOX-IV and Flunole-IV photos would improve small packaging text; the supplied group photo remains intact.
- Google Images screenshot remains excluded from the catalogue. Unconfirmed ingredient splits, vial counts and pack quantities remain omitted.

## Review deployment

Commit the extracted project contents to the existing APARNEX GitHub repository, with package.json at the root. Retain Netlify environment variables. Deploy through the Git-connected Next.js build pipeline. No database migration or credential changes are required for these UI updates. Complete the browser matrix and a test enquiry in the configured review deployment before production approval. No new preview URL is available from this environment.
