# Adding a site

A new site should begin with strategy and content structure, not with component selection.

Before creating files, define:

1. primary audiences;
2. primary user goals;
3. site purpose;
4. sitemap and navigation model;
5. page inventory;
6. content/entity needs;
7. wireframe or content hierarchy for key pages.

Then consult, in order:

1. `../WHARTON_DESIGN_DECISION_FRAMEWORK.md` for selection logic;
2. `../src/registry/framework-elements.ts` for what exists;
3. `component-handbook.md` for detailed component/pattern guidance;
4. `page-recipes.md` for full-page and site-type composition guidance.

## Create the site root

Create `sites/{site-id}` with:

```text
site.config.json
navigation.json
footer.json
assets.json
pages/*.json
content/*.md
entities/{stories,events,people,courses}/*.json
assets/{images,video,documents}/
fixtures/
```

The site root owns content and configuration. It must not duplicate shared framework components, patterns, globals, templates, utilities, or theme implementation.

## Map content to the framework

For each page:

1. identify the page purpose and primary user task;
2. select the closest page recipe;
3. choose the registered template that matches the page structure;
4. map structured content to existing entities;
5. choose patterns from the decision framework and component handbook;
6. use registered variants before considering new variants;
7. prefer composition before introducing a new shared component;
8. keep site-specific content in the site root.

Use an existing page section type from the controlled registry. The build fails on unknown types, invalid variants, duplicate routes/IDs, unsafe or missing asset files, dangling entity/asset references, missing Article Markdown, or invalid H1 ownership.

## Theme selection

Declare `"theme": "old-theme"` or `"theme": "new-theme"` in `site.config.json`. The property defaults to `old-theme`. Site content and page composition must not branch by theme. See `themes.md` for the theme contract, development override, and allowed theme-specific markup rules.

## Run the site

```sh
SITE=my-site npm run dev
SITE=my-site npm run build
```

Run relevant validation before review. For framework-affecting work, use the full QA guidance in `testing.md`.

## Reusability rule

If a real use case cannot be expressed with the current registry, document the evidence first. Evaluate solutions in this order:

1. existing component/pattern composition;
2. existing variant;
3. justified new variant;
4. justified new shared component/pattern;
5. site-specific implementation when the need is not broadly reusable.

Any reusable addition must update the typed registry, Design Decision Framework, Component Handbook, relevant page recipes, tests, and other affected documentation in the same change.

## Git and deployment

Codex and Claude Code work on their own branches according to `../AGENTS.md`. New-site implementation reaches production through a reviewed pull request into `main`. GitHub Pages deploys the reference implementation automatically after a successful production workflow. See `deployment.md` for the current production model.