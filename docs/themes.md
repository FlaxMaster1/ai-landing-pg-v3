# Framework themes

## Theme contract

A theme is a visual implementation of the shared functional framework. It may provide design-token values, typography, spacing, color, imagery treatment, and CSS for shared components, patterns, global elements, templates, and utilities. It does not own entities, content contracts, page composition, routing, integration behavior, or accessibility semantics.

The approved theme IDs are:

- `old-theme`: implemented; preserves the current Wharton WordPress CMS visual and behavioral baseline.
- `new-theme`: registered scaffold; reserved for the redesigned Wharton Figma system in Step 7. It intentionally contains no proposed visual design yet.

Each theme is registered in `src/themes/index.ts` and exposes one stylesheet entry at `src/themes/{theme-id}/index.css`. Only the selected stylesheet is linked. The shared Astro component system is rendered once regardless of theme.

## Site configuration and fallback

Set the default in `sites/{site-id}/site.config.json`:

```json
{
  "theme": "old-theme"
}
```

The schema accepts only `old-theme` or `new-theme`. Omitting the property selects `old-theme`. Invalid configured values fail validation; runtime resolution also falls back to `old-theme` if it receives a missing or unavailable theme value outside the validated loader path.

Until Step 7 is approved, production sites should use `old-theme`. Selecting `new-theme` currently demonstrates the theme boundary, not a usable design.

## Development override and selector

The reference site enables `featureFlags.themePreview`. During `npm run dev:reference`, a developer-only selector appears in the lower-right corner. The same page can also be opened directly with either query:

```text
http://localhost:4321/catalog/?theme=old-theme
http://localhost:4321/catalog/?theme=new-theme
```

The override swaps the registered stylesheet and updates `data-site-theme`; it does not rewrite site configuration, content, entities, routes, or page composition. Selecting the configured theme removes the query parameter. The selector and override script are omitted from production builds.

## Theme-specific markup

Theme-specific markup is exceptional. It is permitted only when all of the following are true:

1. A documented theme requirement cannot be expressed with tokens, CSS, an existing variant, configured assets, or shared composition.
2. The difference has a semantic, accessibility, interaction, or asset-delivery consequence—not a purely decorative preference.
3. Both themes retain equivalent content, heading ownership, landmark structure, keyboard behavior, and accessible names.
4. The branch is isolated behind a typed theme-facing contract rather than copied components or templates.
5. The exception is recorded in the framework registry and covered by contract, accessibility, and cross-theme tests.
6. A significant exception receives an ADR before implementation.

Site-specific copy and composition must never enter a theme. Theme-specific components must never be duplicated into `sites/{site-id}`.
