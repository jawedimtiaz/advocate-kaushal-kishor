# Preview QA checklist — Advocate Kaushal Kishor

This file is operational documentation for the isolated Cloudflare Pages preview branch. It does not change site content or runtime behavior.

## Build and deployment
- Confirm the preview deployment is for branch `preview/kaushal-approved`.
- Confirm the deployment commit includes the approved accessibility and bilingual metadata changes.
- Confirm the site loads over HTTPS and assets return successfully.

## Functional checks
- [ ] English and Telugu language switching updates visible content.
- [ ] Switching language updates the browser document title and description metadata.
- [ ] Regulatory notice opens, traps keyboard focus, closes with Escape, and restores focus to its trigger.
- [ ] Background page scrolling is locked while the regulatory notice is open.
- [ ] Contact copy action works and announces success to assistive technology.
- [ ] Navigation, mobile menu, contact links, and print layout remain functional.

## Responsive and accessibility checks
- [ ] Check narrow mobile, tablet, and desktop widths.
- [ ] Keyboard-only navigation has visible focus and no keyboard trap outside the dialog.
- [ ] Dialog focus order and close behavior are correct.
- [ ] Check page zoom and text wrapping.

## Release gates
- Record browser, viewport, and results for each check.
- Do not merge the pull request or enable production deployment as part of preview QA.
- Verify advocate credentials, bar council particulars, court/jurisdiction claims, and applicable professional-conduct approval separately before publication.
