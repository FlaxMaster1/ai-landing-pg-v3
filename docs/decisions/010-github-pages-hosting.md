# ADR 010: GitHub Pages production hosting

## Status
Accepted

## Context

The framework is developed by both Codex and Claude Code. ChatGPT Sites required a separate proprietary preview/deploy step that could not be triggered directly from either developer's Git workflow, creating friction and ambiguity between source control and the live site.

The reference implementation is static-first by architecture and Astro renders statically by default outside the optional ChatGPT Sites build mode.

The first Pages deployment attempt also showed that the full local Playwright/visual QA gate is not an appropriate production blocker when CI and local screenshot platforms differ. Production still needs a strong, deterministic validation gate, but platform-specific visual baselines should remain deliberate QA rather than an automatic Linux hosting prerequisite.

## Decision

Use GitHub Pages as the primary production host for the reference implementation.

- GitHub remains the authoritative source of code, review, handoffs, and deployment history.
- `main` is the production source branch.
- Pull requests are reviewed before merge.
- A merge to `main` is a production deployment approval.
- A successful push to `main` runs `.github/workflows/pages.yml`.
- The production gate validates content, tokens/types, unit tests, static reference build, and generated output; then builds with `npm run build:pages`, uploads `dist/`, and deploys through the official GitHub Pages actions.
- Full Playwright E2E, accessibility, responsive, and visual-regression suites remain part of development QA but do not block Pages solely because CI screenshot baselines differ by platform.
- The Pages build uses the repository subpath `/wharton-prototype-framework` and production site origin `https://flaxmaster1.github.io`.
- Existing ChatGPT Sites support remains available for compatibility but is not part of the required production path.

Production URL:

`https://flaxmaster1.github.io/wharton-prototype-framework/`

## Consequences

Codex and Claude Code use the same branch/PR workflow and do not need separate hosting credentials. GitHub Actions is the authoritative record of whether a production deployment succeeded. A merged commit must not be described as live until the Pages workflow succeeds.

If a deployment fails, production remains on the last successful Pages artifact. The failure is fixed on a branch and merged through the normal review path rather than bypassed with a separate manual host.

GitHub Pages is static hosting. If future requirements introduce server-side rendering, authenticated runtime services, server actions, or runtime APIs that cannot be handled statically, hosting must be reconsidered in a new ADR rather than silently extending this deployment model.
