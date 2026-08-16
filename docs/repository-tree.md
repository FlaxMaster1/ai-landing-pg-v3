# Current framework repository tree

Generated build/cache/dependency folders (`dist`, `.astro`, `node_modules`, test reports) are omitted.

```text
.
├── .gitignore
├── .openai/hosting.json
├── AGENTS.md
├── README.md
├── WHARTON_WEB_PROTOTYPE_FRAMEWORK_CANONICAL_SPEC.md
├── astro.config.ts
├── package.json
├── package-lock.json
├── playwright.config.ts
├── playwright.theme.config.ts
├── tsconfig.json
├── vitest.config.ts
├── docs
│   ├── adding-a-site.md
│   ├── architecture.md
│   ├── cms-audit/README.md
│   ├── cms-mapping.md
│   ├── component-model.md
│   ├── current-cms-visual-fidelity.md
│   ├── dependencies.md
│   ├── framework-charter.md
│   ├── implementation-status.md
│   ├── repository-tree.md
│   ├── sites-validation.md
│   ├── testing.md
│   ├── themes.md
│   └── decisions
│       ├── 001-astro.md
│       ├── 002-static-rendering.md
│       ├── 003-design-tokens.md
│       ├── 004-content-separation.md
│       ├── 005-multisite.md
│       ├── 006-native-css.md
│       ├── 007-provider-adapters.md
│       ├── 008-generic-renderer.md
│       └── 009-theme-boundary.md
├── public/shared
│   ├── icons/search.svg
│   ├── institutional/README.md
│   └── logos
│       ├── framework-mark.svg
│       └── kw-logo.svg
├── scripts
│   ├── audit-build.mjs
│   ├── generate-tokens.mjs
│   ├── prepare-sites-build.mjs
│   └── serve-dist.mjs
├── sites/reference
│   ├── site.config.json
│   ├── navigation.json
│   ├── footer.json
│   ├── assets.json
│   ├── assets/images
│   │   ├── abstract-campus.svg
│   │   ├── abstract-collaboration.svg
│   │   ├── portrait-a.svg
│   │   └── portrait-b.svg
│   ├── content/structured-content.md
│   ├── entities
│   │   ├── courses/courses.json
│   │   ├── events/events.json
│   │   ├── people/people.json
│   │   └── stories/stories.json
│   ├── fixtures/README.md
│   └── pages
│       ├── academics.json
│       ├── article.json
│       ├── catalog.json
│       ├── events.json
│       ├── home.json
│       ├── people.json
│       ├── resources.json
│       └── search.json
├── sites/undergraduate/.gitkeep
├── src
│   ├── components
│   │   ├── BackControl.astro
│   │   ├── BackToTop.astro
│   │   ├── Button.astro
│   │   ├── Card.astro
│   │   ├── CloseControl.astro
│   │   ├── Disclosure.astro
│   │   ├── Divider.astro
│   │   ├── EventCard.astro
│   │   ├── FormControl.astro
│   │   ├── Heading.astro
│   │   ├── Image.astro
│   │   ├── Link.astro
│   │   ├── MenuToggle.astro
│   │   ├── Message.astro
│   │   ├── PersonCard.astro
│   │   ├── SearchInput.astro
│   │   ├── Stat.astro
│   │   ├── StoryCard.astro
│   │   └── Text.astro
│   ├── entities/index.ts
│   ├── global
│   │   ├── GlobalFooter.astro
│   │   ├── GlobalHeader.astro
│   │   ├── GlobalSearch.astro
│   │   ├── MobileNavigation.astro
│   │   ├── PrimaryNavigation.astro
│   │   ├── ProgramNavigation.astro
│   │   ├── SiteHeader.astro
│   │   └── SiteIdentity.astro
│   ├── integrations
│   │   ├── contracts.ts
│   │   ├── fixtures.ts
│   │   └── index.ts
│   ├── layouts/SiteLayout.astro
│   ├── pages
│   │   ├── index.astro
│   │   ├── [...slug].astro
│   │   └── site-assets/[...path].ts
│   ├── patterns
│   │   ├── Breadcrumbs.astro
│   │   ├── Callout.astro
│   │   ├── CardGrid.astro
│   │   ├── EventList.astro
│   │   ├── FAQ.astro
│   │   ├── FeatureRow.astro
│   │   ├── Form.astro
│   │   ├── Hero.astro
│   │   ├── PageIntro.astro
│   │   ├── PersonList.astro
│   │   ├── SearchForm.astro
│   │   ├── SectionNavigation.astro
│   │   ├── StatsGroup.astro
│   │   ├── StoryCollection.astro
│   │   └── Tabs.astro
│   ├── registry/framework-elements.ts
│   ├── rendering
│   │   ├── PageRenderer.astro
│   │   ├── SectionRenderer.astro
│   │   ├── pattern-registry.ts
│   │   ├── site-loader.ts
│   │   └── template-registry.ts
│   ├── schemas
│   │   ├── entities.ts
│   │   ├── index.ts
│   │   ├── page.ts
│   │   └── site.ts
│   ├── styles
│   │   ├── base.css
│   │   ├── components.css
│   │   ├── globals.css
│   │   ├── index.css
│   │   ├── patterns.css
│   │   ├── reset.css
│   │   ├── site.css
│   │   ├── theme-preview.css
│   │   └── utilities.css
│   ├── themes
│   │   ├── contracts.ts
│   │   ├── index.ts
│   │   ├── ThemeSelector.astro
│   │   ├── old-theme/index.css
│   │   └── new-theme/index.css
│   ├── templates
│   │   ├── Article.astro
│   │   ├── BaseTemplate.astro
│   │   ├── Directory.astro
│   │   ├── Homepage.astro
│   │   ├── Landing.astro
│   │   ├── Search.astro
│   │   ├── Sidebar.astro
│   │   ├── Standard.astro
│   │   └── Topic.astro
│   ├── tokens
│   │   ├── component/button.tokens.json
│   │   ├── generated/tokens.css
│   │   ├── primitive/color.tokens.json
│   │   ├── primitive/foundation.tokens.json
│   │   └── semantic/core.tokens.json
│   ├── utilities
│   │   ├── AnchorTarget.astro
│   │   ├── Container.astro
│   │   ├── ResponsiveMedia.astro
│   │   ├── ScreenReaderText.astro
│   │   ├── Surface.astro
│   │   ├── focus-management.ts
│   │   ├── format-date.ts
│   │   └── route.ts
│   ├── content.config.ts
│   └── env.d.ts
└── tests
    ├── accessibility/axe.spec.ts
    ├── development/theme-preview.spec.ts
    ├── e2e
    │   ├── current-cms-theme.spec.ts
    │   ├── foundation.spec.ts
    │   ├── interactions.spec.ts
    │   ├── responsive.spec.ts
    │   └── templates.spec.ts
    ├── unit
    │   ├── architecture-boundaries.test.ts
    │   ├── content-validation.test.ts
    │   ├── integrations.test.ts
    │   ├── registry.test.ts
    │   ├── rendering.test.ts
    │   ├── themes.test.ts
    │   └── tokens.test.ts
    └── visual
        ├── templates.spec.ts
        └── templates.spec.ts-snapshots/ (16 PNG baselines)
```
