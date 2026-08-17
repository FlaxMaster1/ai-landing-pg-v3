# Current framework repository structure

Generated build/cache/dependency folders (`dist`, `.astro`, `node_modules`, test reports) are omitted. This document describes the maintained structure and responsibilities rather than attempting to mirror every generated or fixture file.

```text
.
├── .github/
│   └── workflows/pages.yml            # validate/build/deploy GitHub Pages
├── .openai/                           # ChatGPT Sites compatibility metadata
├── AGENTS.md                          # shared Codex + Claude Code instructions
├── README.md
├── WHARTON_WEB_PROTOTYPE_FRAMEWORK_CANONICAL_SPEC.md
├── WHARTON_DESIGN_DECISION_FRAMEWORK.md
├── astro.config.ts
├── package.json
├── playwright*.config.ts
├── tsconfig.json
├── vitest.config.ts
├── docs/
│   ├── README.md                      # documentation map
│   ├── adding-a-site.md
│   ├── agent-collaboration.md
│   ├── architecture.md
│   ├── component-handbook.md
│   ├── component-model.md
│   ├── page-recipes.md
│   ├── deployment.md
│   ├── testing.md
│   ├── implementation-status.md
│   ├── framework-charter.md
│   ├── themes.md
│   ├── current-cms-visual-fidelity.md
│   ├── cms-mapping.md
│   ├── cms-audit/
│   ├── handoffs/
│   │   ├── TEMPLATE.md
│   │   └── current.md
│   └── decisions/
│       ├── 001-astro.md
│       ├── 002-static-rendering.md
│       ├── 003-design-tokens.md
│       ├── 004-content-separation.md
│       ├── 005-multisite.md
│       ├── 006-native-css.md
│       ├── 007-provider-adapters.md
│       ├── 008-generic-renderer.md
│       ├── 009-theme-boundary.md
│       └── 010-github-pages-hosting.md
├── public/shared/                     # shared framework assets
├── scripts/                           # validation/build/token/Sites helpers
├── sites/
│   ├── reference/                     # neutral framework demonstration site
│   └── undergraduate/                 # first real-site validation target
├── src/
│   ├── components/                    # semantic reusable UI units
│   ├── entities/                      # provider-independent entity contracts
│   ├── global/                        # shared shell/navigation/footer systems
│   ├── integrations/                  # typed provider interfaces/adapters
│   ├── layouts/
│   ├── pages/                         # generic routes + validated site assets
│   ├── patterns/                      # reusable purposeful compositions
│   ├── registry/
│   │   └── framework-elements.ts      # machine-readable framework inventory
│   ├── rendering/                     # selected-site loader and registries
│   ├── schemas/                       # Zod site/page/entity validation
│   ├── styles/                        # shared CSS layers
│   ├── templates/                     # page-level structures
│   ├── themes/                        # visual implementation boundary
│   ├── tokens/                        # DTCG token sources/generated CSS
│   └── utilities/                     # meaning-neutral helpers
└── tests/
    ├── accessibility/
    ├── development/
    ├── e2e/
    ├── unit/
    └── visual/
```

## Documentation relationships

The most important non-code paths form a deliberate decision stack:

```text
WHARTON_WEB_PROTOTYPE_FRAMEWORK_CANONICAL_SPEC.md
                        ↓
WHARTON_DESIGN_DECISION_FRAMEWORK.md
                        ↓
src/registry/framework-elements.ts
                        ↓
docs/component-handbook.md
                        ↓
docs/page-recipes.md
                        ↓
sites/{site}/ implementation
```

`docs/README.md` is the maintained documentation index and should be updated whenever a new governing or operational document is added.

## Site boundary

A concrete site belongs under `sites/{site-id}` and should own configuration, routes/page composition, navigation/footer data, content, entities, asset metadata/files, and fixtures. It should not copy shared framework code.

## Shared framework boundary

Reusable behavior belongs under `src/` only when it passes the framework admission rules. New reusable elements must be registered in `src/registry/framework-elements.ts` and documented through the Design Decision Framework/Component Handbook/Page Recipes as appropriate.

## Production boundary

GitHub is the source of truth. Production deployment for the reference site is driven by merges to `main` through `.github/workflows/pages.yml`. `.openai/` and Sites-specific build helpers remain compatibility-only.