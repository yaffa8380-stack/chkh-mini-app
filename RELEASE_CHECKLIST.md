# Release Checklist

This is a verification record, not a claim that production release has been approved.

## Completed Controls

- The production frontend build succeeds and emits the HTML, artwork, favicon fallback, robots file and static sitemap fallback.
- URL variables and empty-link handling were inspected in source. No placeholder URL is rendered.
- The supplied raw contract URL was fetched on Tonviewer and resolves to the existing CHEIKH$ Jetton Master.
- The official channel invite, community group invite and bot page respond publicly, with their respective CHEIKH$ identities.
- Tokenomics percentages sum to 100. Their quantities sum to the provided supply of 5,000,000,000.
- Five complete dictionaries share a typed translation schema, including FAQ, allocation descriptions, roadmap, buttons and disclaimer.
- Source inspection found no fabricated audience/activity statistics, client API credentials, price feed or simulated real-time data.
- Vercel configuration and Node endpoint structure follow Vercel's published Vite/Node/configuration documentation.

## Fifteen Release Checks

1. Links: supplied public Telegram and Tonviewer pages respond; optional URLs are hidden. After deployment, click every rendered link in the browser.
2. TON contract: raw URL resolves to the existing Jetton Master. The project name is CHEIKH$ and the token symbol is CHKH, matching the observed explorer metadata. The actual distribution is not certified.
3. Telegram buttons: real channel/group/bot destinations are wired. Check opening each destination in Telegram on iOS and Android; bot features have not been tested in an authenticated session.
4. X account: the provided URL responds with a sign-in page. Verify the profile, content and ownership while authenticated.
5. Mobile responsiveness: breakpoints and RTL styles implemented; physical-device and browser viewport tests remain required at 320, 375, 390, 768, 1024 and 1440 CSS pixels.
6. Mobile menu: source includes toggle, close, Escape, focus controls and scrolling. Validate touch and keyboard behavior on the deployed preview.
7. Language selector: five options, URL selection and saved preference implemented. Verify switching and reloading for every language.
8. Translations: complete typed dictionaries supplied. Obtain native-speaker review, especially for Arabic and Russian, before final approval.
9. Clipboard: copy logic, fallback, error handling and temporary translated success message implemented. Verify the exact raw address from the clipboard on HTTPS.
10. Animations: one-time reveals, chart animation, hover/press states and reduced-motion styles implemented. Check actual rendering and reduced-motion behavior in the browser.
11. No fictional data: source reviewed; only supplied project data and calculated allocation quantities are shown. Maintain this policy for future additions.
12. JavaScript errors: build succeeds and editor type diagnostics are clean. A deployed-browser console check is still required; the build alone does not prove absence of runtime errors.
13. Performance: production output is approximately 101 KB gzip for HTML/CSS/JS, plus existing artwork and font/logo requests. No Lighthouse or mid-range-phone measurements have been performed.
14. SEO: requested metadata, favicon, language alternates, structured FAQ, robots and sitemap implementations exist. Verify deployed absolute URLs, function responses, indexing behavior and social previews after the real domain is available.
15. Vercel: source configuration is supplied; no preview/production deployment has been performed. Deploy and validate the domain, HTTPS, function routing and security headers before marking this check passed.

## Values Still Needed

- Real official domain or Vercel production origin for final canonical/sitemap checks.
- BUY_TOKEN_URL if acquisition should be offered. Until then, the button is hidden and FAQ explains that no link has been provided.
- Optional whitepaper, Mini App and additional social URLs, only if those destinations really exist.
- Confirmed roadmap statuses and evidence of the actual token distribution if those facts are to be asserted.

The final deployment-ready statement must not be issued until every release check has actually passed.