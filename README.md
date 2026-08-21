# The Wharton AI Advantage — V3

A high-fidelity, single-page prototype showing how Wharton prepares learners and leaders to use AI with knowledge, judgment, and accountability across every career stage.

This repository is built on the private `FlaxMaster1/wharton-prototype-framework` and preserves its static-first Astro architecture, structured content model, Wharton CMS theme, accessibility conventions, and GitHub Pages workflow.

## Prototype

GitHub Pages will publish the reviewed `main` branch at:

`https://flaxmaster1.github.io/ai-landing-pg-v3/`

## Run locally

Requirements: Node.js 22.12+ and npm 9.6.5+.

```sh
npm ci
npm run dev:site
```

Open `http://localhost:4321/`.

Build the campaign site:

```sh
npm run build:site
npm run audit:site
```

Build the GitHub Pages artifact:

```sh
npm run build:pages
npm run audit:site
```

## Content and implementation

- Site configuration and approved copy: `sites/ai-landing-pg-v3/`
- Site-scoped presentation refinements: `src/styles/site.css`
- Shared framework architecture and patterns: `src/`
- Durable project decisions and known approvals: `sites/ai-landing-pg-v3/PLAN.md`

The prototype uses one homepage route and four anchor-navigation destinations: Our Approach, Faculty Expertise, Student Experience, and Research and Insights.

## Review workflow

Implementation work happens on `codex/*` branches and reaches `main` through reviewed pull requests. A reviewed merge to `main` triggers validation and GitHub Pages deployment.
