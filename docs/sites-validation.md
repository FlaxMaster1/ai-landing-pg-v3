# ChatGPT Sites validation

## Result

The current-CMS reference theme was successfully deployed on August 16, 2026 as the owner-only Site [Wharton Framework Reference Test](https://wharton-framework-reference-test.flaxmaster1.chatgpt.site).

The deployed Site is a versioned snapshot of validated Git source. It is not a live connection to the local workspace or GitHub. No Undergraduate content, Figma work, or new framework capability was added.

## Compatibility implementation

The ordinary framework path remains `output: "static"`. `SITES_BUILD=true` activates only the deployment adapter:

- the official Astro Cloudflare adapter produces a Cloudflare-compatible worker;
- every configured page and asset route remains prerendered;
- the Sites Vite plugin copies `.openai/hosting.json` into the deployment artifact;
- `scripts/prepare-sites-build.mjs` exposes the adapter worker through the `dist/server/index.js` filename expected by Sites packaging;
- `wrangler` remains build tooling and is not used by shared UI or site content.

This remains a hosting boundary around the approved architecture, not a renderer, content-model, component, or template change.

The hosted-test fixture now removes the private `OAI-Sites-Authorization` header from cross-origin asset requests. The header is needed only for the private Site origin. Sending it to Martech's font server caused browser preflights that the production server correctly did not authorize, producing an artificial fallback-font visual diff in automation. This change affects tests only; a normal signed-in browser does not forward the Sites credential to third-party origins.

## Routes validated

- `/` — Homepage
- `/catalog/` — Standard
- `/academics/` — Landing
- `/insights/structured-content/` — Article
- `/events/` — Topic
- `/people/` — Directory
- `/search/` — Search
- `/resources/` — Sidebar

Each route returned hosted HTML with exactly one H1, one main landmark, the expected template marker, and the shared header and footer.

## Hosted checks

- Desktop 1440 × 900 and mobile 390 × 844 layouts had no horizontal overflow.
- Global program, primary, mobile, and footer navigation links resolved to the expected destinations and fragments.
- Configured Wharton and Penn marks, generated CSS, and all four neutral reference assets loaded at their emitted URLs.
- Production Acumin Pro, Acumin Pro Condensed, and Minion Pro faces loaded successfully from the documented current-CMS source; the theme test now fails if a required face falls back.
- Tabs supported arrow, Home, and End keyboard selection.
- Native disclosures opened and exposed their content.
- Search and mobile-navigation dialogs opened, handled Escape, managed drill-down/back state, and returned focus to their triggers.
- Search preserved meaningful `?q=` URL state.
- The prototype form enforced native validity and reported its local no-data success state.
- Axe reported no WCAG A/AA violations across all eight routes at desktop and mobile widths.
- All sixteen hosted full-page screenshots matched the approved local current-CMS baselines.

## Differences and observations

No persistent framework rendering, layout, typography, interaction, or declared-asset difference was found between the local Astro build and the Sites-hosted result.

Two transient validation effects were isolated before final approval:

1. Immediately after deployment, several edge requests briefly returned the prior Site version. Uncached route checks confirmed propagation before the final hosted suite was run.
2. The first automated visual run sent the private Site header to cross-origin fonts. That triggered CORS preflights and fallback typography in the test browser; restricting the credential to the Site origin restored exact local/hosted parity.

Sites also injects its normal Cloudflare challenge script into served HTML. It did not change measured layout, semantics, interaction, or final visual output once the intended fonts loaded.

The remaining limitations belong to the reference fixture or current-CMS evidence, not to Sites:

- reference artwork is neutral illustrative SVG, not production Wharton photography;
- exact font redistribution and long-term asset-hosting rights remain an operational/licensing question because the test uses production-hosted fonts;
- complete legacy tile variants, breadcrumb ancestry, social/footer support fields, and modal animation details remain unresolved where the audit lacks authoritative values;
- `/favicon.ico` is not configured; all declared framework and site assets load correctly.

## Validation decision

The current-CMS theme is validated for private ChatGPT Sites deployment. The neutral reference now represents the observed current Wharton CMS visual system at the framework level, subject to the explicitly unresolved evidence and asset-licensing items above. Step 7 does not require a Sites architecture change, but should retain manual assistive-technology, zoom/reflow, real-content, photography, route-aware navigation, favicon, and broader cross-browser review.
