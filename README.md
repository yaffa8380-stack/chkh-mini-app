# CHEIKH$ Website

A responsive React, TypeScript and Tailwind CSS reference website for CHEIKH$ on TON. The original black-metal and electric-blue identity, hero artwork and core sections are preserved.

## Project Configuration

`src/config/site.ts` is the single source of editable project data.

- The named URL variables at the top contain the supplied X, official Telegram and community Telegram links.
- The mining URL is derived from `TELEGRAM_BOT_USERNAME`. `TELEGRAM_BOT_URL` can override it. Clear both values to hide mining links.
- `BUY_TOKEN_URL`, `WHITEPAPER_URL`, `MINI_APP_URL` and other optional social links are empty by default. Their buttons are hidden, not simulated or disabled links.
- `SITE_CONFIG` contains identity, symbol, network, supply, slogan and copyright year.
- `SOCIAL_LINKS` and `TOKEN_CONFIG` group the social URLs and contract references.
- `TOKENOMICS_CONFIG` contains the seven allocations. Quantities and the total are calculated from the supplied percentages and supply, not fetched or presented as live market data.
- `distributionConfirmed` stays `false`. Only change it after checking the actual final distribution.
- `ROADMAP_CONFIG.phases` uses `COMPLETED`, `IN_PROGRESS` and `UPCOMING`. All phases default to `UPCOMING` because full-phase completion has not been verified.
- Set `WEBSITE_URL` to the real official HTTPS origin when it is available. No domain is invented.

## Translations

`src/i18n/translations.ts` registers complete French, English, Spanish, Arabic and Russian dictionaries. Each dictionary is in `src/i18n/locales/`, checked against `src/i18n/types.ts`.

- French is the default. A supported `?lang=` query takes precedence over the saved local-storage language.
- The header exposes all five languages using a native, keyboard-accessible selector.
- Arabic sets the document to RTL. Contracts, token names and usernames retain their original direction and spelling.
- The Arabic font is loaded only when Arabic is selected.
- Add another language to `LANGUAGE_CONFIG.supportedLanguages`, provide its full dictionary, and register it in `translations.ts`.
- Dynamic FAQ values use project variables, so changes to supply, symbol, network or bot username do not require edits to FAQ components.

## Visual Assets

`public/images/cheikh-hero.jpg` is the existing website artwork inspired by the supplied token. The logo and favicon use the token metadata image linked by Tonviewer. `public/images/cheikh-logo.svg` is a vector fallback. This is not an explorer endorsement or a wallet verification.

For fully independent hosting, download the original logo and self-host it, then update `PROJECT.logo`, `PROJECT.originalLogo` and the initial favicon/image references in `index.html`.

## Vercel Deployment

1. Import the Git repository into Vercel and select the Vite framework preset.
2. Use the existing standard build task and `dist` output directory. `vercel.json` sets the framework and output without changing `package.json` or `vite.config.ts`.
3. Add the real custom domain in Vercel Project Settings, under Domains, and apply the DNS records Vercel provides.
4. Set the same official origin in the `WEBSITE_URL` source variable. Alternatively, the SEO endpoints accept a `WEBSITE_URL` Vercel environment variable.
5. Deploy a preview, complete `docs/RELEASE_CHECKLIST.md`, and verify `/sitemap.xml` and `/robots.txt` on Vercel before production.

The Node handlers in `api/` generate the sitemap and robots file. They use the configured origin, then Vercel's real `VERCEL_PROJECT_PRODUCTION_URL` if available. Enable access to Vercel system environment variables if using that fallback. No made-up domain or fake modification date is emitted. Preview deployments disallow crawling.

Without any configured or Vercel-supplied origin, the sitemap handler returns an empty XML response with status 503. `public/sitemap.xml` is an intentionally empty static-host fallback until a real origin is known. Vite's local preview does not execute Vercel functions; test those on Vercel or with its local development environment.

SEO includes title/description, Open Graph, X card, favicon, browser-generated canonical and language alternates, and FAQ structured data. The initial HTML has the requested English metadata and a real absolute token-image URL for social crawlers that do not execute JavaScript. For fully static hosting, populate canonical, `og:url`, the sitemap and robots sitemap reference with the actual domain before release.

`vercel.json` also configures HTTPS-related security headers and image caching. No secret API key or credential is present in the client. `.gitignore` excludes local environments and deployment state.

## Accessibility And Motion

The site includes a mobile menu, keyboard focus handling, native dialogs, a native FAQ accordion, visible focus indicators, contract-copy feedback and reduced-motion support. Reveals and chart animation run once on visibility. No fabricated activity counter or live-statistics simulation is used.

## Information Policy

The raw contract address resolves to the same Jetton Master as the earlier friendly address. The project name remains CHEIKH$, and the token symbol is `CHKH` throughout the website, translations and SEO, matching the supplied explorer metadata. The supply is 5,000,000,000 CHKH.

No wallet certification, audit, listing, available liquidity, completed phase, existing partnership, user count, follower count, holder count, price, market capitalization or volume is claimed. A public bot link is not presented as proof that every mining feature is available.

If live data is added later, isolate its integration in a data/service module or a server-only `api/` handler. Require a source URL, validated response and explicit unavailable state; never use a random value, default zero or last-known value disguised as current data. Hide unavailable statistics or show a translated unavailable message. Keep secret keys out of `VITE_` variables and out of client modules.

## Verification Status

The production build succeeds. Telegram public pages and the contract reference were fetched successfully. X responds with an authentication page, so account ownership/content is not independently verified. No browser automation, physical iPhone/Android check, authenticated bot session, Lighthouse run or Vercel deployment was available in this environment. Do not claim final deployment readiness until the remaining release checks pass.