# Testing and validation

Run the complete local gate:

```sh
npm run validate
```

It performs:

1. schema/content validation with negative cases;
2. generated-token freshness validation;
3. strict Astro/TypeScript checking;
4. Vitest unit, registry, integration-adapter, and architecture-boundary tests;
5. a selected-site static build;
6. a generated-output audit for all routes, one H1, shared landmarks, template markers, and assets;
7. Playwright desktop/mobile behavior, responsive overflow, axe WCAG A/AA scans, and visual baselines.

Useful focused commands:

```sh
npm run content:validate
npm run check
npm run test:unit
npm run test:a11y
npm run test:visual
npm run test:visual:update
npm run build:sites
```

Visual baselines cover all eight templates at 1440 × 900 and 390 × 844 in Chromium. Updating snapshots is an explicit review action.

`build:sites` is an additional compatibility gate. It must prerender the same eight routes and four site assets, include Sites metadata, and emit a Cloudflare-compatible worker without changing the ordinary static reference build.

Automated axe testing is evidence, not complete WCAG conformance. Step 7 should add manual keyboard, screen-reader, zoom/reflow, alternative-text, and content-quality review against real site content.
