# ChatGPT Sites validation

## Result

The neutral Step 6 reference implementation was successfully deployed on August 16, 2026 as the owner-only Site [Wharton Framework Reference Test](https://wharton-framework-reference-test.flaxmaster1.chatgpt.site).

The deployed Site is a snapshot of the validated Git source, not a live connection to the local workspace or GitHub. No Undergraduate content or new framework capability was added.

## Compatibility implementation

The ordinary framework path remains `output: "static"`. `SITES_BUILD=true` activates only the deployment adapter:

- the official Astro Cloudflare adapter produces a Cloudflare-compatible worker;
- every configured page and asset route explicitly remains prerendered;
- the Sites Vite plugin copies `.openai/hosting.json` into the deployment artifact;
- `scripts/prepare-sites-build.mjs` exposes the adapter worker through the `dist/server/index.js` filename expected by Sites packaging;
- `wrangler` is build tooling only and is not used by shared UI or site content.

This is a hosting boundary around the approved architecture, not a renderer, content-model, component, or template change.

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
- Global program, primary, mobile, and footer navigation links resolved to the expected routes and fragments.
- Shared logo/search SVGs, generated CSS, and all four site assets returned successfully at their emitted URLs.
- Tabs supported arrow, Home, and End keyboard selection.
- Native disclosures opened and exposed their content.
- Search and mobile-navigation dialogs opened, handled Escape, managed drill-down/back state, and returned focus to their triggers.
- Search preserved meaningful `?q=` URL state.
- The prototype form enforced native validity and reported its local no-data success state.
- Token values and computed Arial/Georgia typography matched the local build.
- Axe reported no WCAG A/AA violations across all eight routes at desktop and mobile widths.
- All sixteen hosted full-page screenshots matched the checked-in local baselines after the test waited for lazy images to load.

## Differences and observations

No persistent rendering, layout, typography, interaction, or declared-asset difference was found between the local Astro build and the Sites-hosted result.

Initial remote screenshot comparisons differed by 1–3% because full-page capture occurred before below-the-fold lazy SVGs loaded over the network. The product output was correct; the visual test was made deterministic by waiting for all images before capture. The local and hosted screenshots then matched exactly.

Sites requires a Cloudflare worker entry even for this fully prerendered project, which is why the deployment-only adapter is necessary. Private browser visits also require ChatGPT sign-in; automated hosted checks used an existing identity-less Sites test credential supplied only through the process environment.

Two non-blocking observations are shared with the local reference fixture rather than caused by Sites:

- “Framework home” is statically marked current on every demonstration route.
- `/favicon.ico` is not configured and returns 404; all declared framework and site assets load correctly.

## Validation decision

The Step 6 framework is validated for private ChatGPT Sites deployment. Step 7 can proceed without a Sites architecture change, while retaining manual assistive-technology, zoom/reflow, real-content review, route-aware navigation state, favicon selection, and broader cross-browser behavior as follow-up quality work.
