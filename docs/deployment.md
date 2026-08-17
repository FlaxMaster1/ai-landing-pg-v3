# Production deployment

GitHub Pages is the primary production host for the reference implementation.

## Production URL

`https://flaxmaster1.github.io/wharton-prototype-framework/`

## Source of truth

- GitHub is authoritative for code, review, handoffs, and deployment history.
- `main` is the production source branch.
- Codex works on `codex/<task>` branches.
- Claude Code works on `claude/<task>` branches.
- Implementation changes should reach `main` through a reviewed pull request.
- A merge to `main` is a production deployment approval.

## What deploys automatically

A push to `main` triggers `.github/workflows/pages.yml`.

The production gate runs:

1. content validation;
2. token and Astro/TypeScript checks;
3. unit tests;
4. a static reference build;
5. generated-build audit;
6. a GitHub Pages build with the repository base path;
7. Pages artifact upload;
8. GitHub Pages deployment.

The full Playwright E2E, accessibility, responsive, and visual-regression suites remain required development/QA tools, but platform-specific visual baselines do not block the GitHub Pages production workflow. Run the full suite deliberately before major visual or framework releases.

## Deployment status

Do not treat a merge as live until the `Validate and deploy GitHub Pages` workflow succeeds. If the workflow fails, production remains on the last successful deployment.

When diagnosing a failed deployment, inspect the workflow run first. Fix failures on a branch and merge the correction through the normal PR path. Do not bypass the workflow by publishing a separate production copy.

## ChatGPT Sites

The existing ChatGPT Sites build path remains only for compatibility or optional experimentation. It is not the primary preview or production mechanism and should not be used as the source of truth.
