# Adding a site

A new site should begin with strategy and content structure, not with component selection.

Before creating files, define:

1. primary audiences;
2. primary user goals and journeys;
3. site purpose and success criteria;
4. sitemap and navigation model;
5. page inventory;
6. content/entity needs;
7. primary and secondary CTA model;
8. wireframe or content hierarchy for key pages.

Then select and adapt the closest starter blueprint in `site-blueprints/`:

- `site-blueprints/program.md`
- `site-blueprints/department.md`
- `site-blueprints/initiative-center.md`
- `site-blueprints/research-hub.md`
- `site-blueprints/campaign.md`

The blueprint is a starting model, not a fixed sitemap. Remove anything that does not serve a validated user need and add project-specific pages when required.

Then consult, in order:

1. `page-recipes.md` for page/site composition guidance;
2. `../WHARTON_DESIGN_DECISION_FRAMEWORK.md` for selection logic;
3. `../src/registry/framework-elements.ts` for what exists;
4. `component-handbook.md` for detailed component/pattern guidance.

## Planning handoff before implementation

Before Codex or Claude starts building, capture:

- selected blueprint and rationale;
- approved/draft sitemap;
- page-to-template mapping;
- page-to-recipe mapping;
- entity/content model needs;
- navigation model;
- CTA model;
- integrations required;
- known framework gaps;
- missing content/assets;
- first-prototype acceptance criteria.

This planning artifact should be sufficient for either agent to begin from repository/project evidence rather than reconstructing strategy from chat history.

## Automated scaffold

Once the site type and ID are known, generate the starter package instead of creating the folder tree manually:

```sh
npm run create:site -- --type=program --id=executive-mba --name="Executive MBA"
```

Supported `--type` values are:

- `program`
- `department`
- `initiative`
- `research`
- `campaign`

The command creates `sites/{site-id}` with starter configuration, blueprint-informed routes, navigation, footer data, empty entity stores, asset directories, fixture guidance, and a `PLAN.md` handoff file. It deliberately uses `old-theme`, disables theme preview, and does not add any `new-theme` implementation.

The generator is intentionally non-destructive. It rejects invalid IDs and refuses to overwrite an existing `sites/{site-id}` directory. Use lowercase letters, numbers, and hyphens for site IDs.

Generated content is scaffolding, not approved IA or copy. Immediately review the generated `PLAN.md`, sitemap, route list, labels, and page templates against the actual project strategy and blueprint.

## Site root

The generated site root contains the required structure:

```text
site.config.json
navigation.json
footer.json
assets.json
PLAN.md
pages/*.json
content/
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

The current priority is to prove the site-building system before applying the redesigned visual layer. New sites should therefore use the existing functional theme while their IA, content model, page composition, interactions, responsive behavior, accessibility, and deployment are validated.

`new-theme` implementation is intentionally deferred until the underlying system is working end-to-end. Do not make new-site requirements depend on `new-theme` styling or add `new-theme` work incidentally during site scaffolding.

Site content and page composition must remain theme-independent so the redesigned styles can later be layered over the same working structure. See `themes.md` for the theme boundary.

## Run the generated site

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

Any reusable addition must update the typed registry, Design Decision Framework, Component Handbook, relevant Page Recipes/Blueprints, tests, and other affected documentation in the same change.

## Git and deployment

Codex and Claude Code work on their own branches according to `../AGENTS.md`. New-site implementation reaches production through a reviewed pull request into `main`. GitHub Pages deploys the reference implementation automatically after a successful production workflow. See `deployment.md` for the current production model.
