# Testing and validation

Run the complete local gate:

```sh
npm run validate:complete
```

It performs:

1. schema/content validation with negative cases;
2. generated-token freshness validation;
3. strict Astro/TypeScript checking;
4. Vitest unit, registry, integration-adapter, and architecture-boundary tests;
5. a selected-site static build;
6. a generated-output audit for all routes, one H1, shared landmarks, template markers, and assets;
7. Playwright desktop/mobile behavior, responsive overflow, axe WCAG A/AA scans, and visual baselines;
8. `npm run audit:dependencies`, which fails for high or critical npm advisories.

`npm run validate` runs the framework gate without the final npm advisory query. `npm run validate:complete` adds that dependency audit.

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

`tests/e2e/current-cms-theme.spec.ts` protects the measured `old-theme` shell heights, 1,225px content boundary, 992px navigation transition, square/flat card treatment, 42px form controls, and selected-tab styling in both desktop and mobile projects. `npm run test:theme-preview` starts the development server and proves the reference selector can swap between registered stylesheets without changing page composition.

`build:sites` is an additional compatibility gate. It must prerender the same eight routes and four site assets, include Sites metadata, and emit a Cloudflare-compatible worker without changing the ordinary static reference build.

Hosted validation reuses the same Playwright configuration by setting `SITES_BASE_URL` and an uncommitted `SITES_BEARER_TOKEN`. The token supplies identity-less access to an owner-only test deployment and must never be written to source, logs, screenshots, or documentation. Visual tests explicitly wait for document fonts and all images before capture so remote latency does not create false screenshot differences.

Automated axe testing is evidence, not complete WCAG conformance. Step 7 should add manual keyboard, screen-reader, zoom/reflow, alternative-text, and content-quality review against real site content.
