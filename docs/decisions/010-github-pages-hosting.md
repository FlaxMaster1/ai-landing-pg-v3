# ADR 010: GitHub Pages production hosting

## Status
Accepted

## Context

The framework is developed by both Codex and Claude Code. ChatGPT Sites required a separate proprietary preview/deploy step that could not be triggered directly from either developer's Git workflow, creating friction and ambiguity between source control and the live site.

The reference implementation is static-first by architecture and Astro already renders statically by default outside the optional ChatGPT Sites build mode.

## Decision

Use GitHub Pages as the primary production host for the reference implementation.

- GitHub remains the authoritative source of code and project state.
- `main` is the production source branch.
- Pull requests are validated before merge.
- A successful push to `main` runs `.github/workflows/pages.yml`.
- The workflow runs framework validation, builds with `npm run build:pages`, uploads `dist/`, and deploys through the official GitHub Pages actions.
- The Pages build uses the repository subpath `/wharton-prototype-framework` and production site origin `https://flaxmaster1.github.io`.
- Existing ChatGPT Sites support remains available for compatibility but is not part of the required production path.

## Consequences

Codex and Claude Code can use the same branch/PR workflow and do not need separate hosting credentials. Merging to `main` becomes a production-affecting action and therefore requires deliberate review. GitHub Actions becomes the authoritative record of whether a production deployment succeeded.

GitHub Pages is static hosting. If future requirements introduce server-side rendering, authenticated runtime services, server actions, or runtime APIs that cannot be handled statically, hosting must be reconsidered in a new ADR rather than silently extending this deployment model.
