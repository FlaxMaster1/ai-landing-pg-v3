# Testing and validation

The repository has two related but distinct validation paths: the full local framework QA gate and the GitHub Pages production deployment gate.

## Full local framework QA

Run:

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

## GitHub Pages production gate

`.github/workflows/pages.yml` intentionally uses a narrower, platform-stable deployment gate. It requires:

1. `npm run content:validate`;
2. `npm run check`;
3. `npm run test:unit`;
4. `npm run build:reference`;
5. `npm run audit:build`;
6. `npm run build:pages`;
7. successful artifact upload and GitHub Pages deployment.

The Pages workflow does not require the full Playwright visual/E2E suite because screenshot baselines are platform-specific and should not block production solely because GitHub Actions runs on Linux. Full Playwright QA remains required when the scope warrants it, particularly for visual, responsive, accessibility, or framework releases.

Useful focused commands:

```sh
npm run content:validate
npm run check
npm run test:unit
npm run test:a11y
npm run test:visual
npm run test:visual:update
npm run build:pages
npm run build:sites
```

Visual baselines cover all eight templates at 1440 × 900 and 390 × 844 in Chromium. Updating snapshots is an explicit review action.

`tests/e2e/current-cms-theme.spec.ts` protects measured `old-theme` shell and layout behavior. `npm run test:theme-preview` starts the development server and proves the reference selector can swap between registered stylesheets without changing page composition.

`build:sites` remains an additional compatibility gate only. It must prerender the same eight routes and four site assets, include Sites metadata, and emit a Cloudflare-compatible worker without changing the ordinary static reference build. ChatGPT Sites is not the primary production host.

Hosted validation may still use the Playwright configuration with `SITES_BASE_URL` and an uncommitted `SITES_BEARER_TOKEN` for compatibility testing. The token must never be written to source, logs, screenshots, or documentation.

Automated axe testing is evidence, not complete WCAG conformance. Step 7 should add manual keyboard, screen-reader, zoom/reflow, alternative-text, and content-quality review against real site content.
