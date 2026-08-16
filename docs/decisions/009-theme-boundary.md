# ADR 009: Coexisting visual themes

**Status:** Accepted for implementation

**Date:** 2026-08-16

## Context

The framework's functional contracts and current Wharton CMS presentation were implemented together, but the current presentation was identified only as `current` and its CSS was loaded globally. Step 7 will introduce a redesigned Figma-derived presentation. Both visual systems must render the same validated site data, entities, components, patterns, templates, utilities, integrations, and page composition without duplicating those functional layers.

## Decision

- The current Wharton CMS implementation is preserved as the framework theme `old-theme`.
- `old-theme` is the default when `theme` is omitted and the runtime fallback if a resolved theme entry is unavailable.
- Site configuration accepts only `old-theme` or `new-theme`.
- Each theme has one stylesheet entry in `src/themes/{theme-id}/index.css`. The existing token, base, utility, component, pattern, global, and site CSS modules are loaded only through the `old-theme` entry.
- `new-theme` has a registered, intentionally empty stylesheet entry until the redesigned Figma system is implemented in Step 7.
- Shared Astro markup stays theme-independent. Theme-specific markup is permitted only when a documented semantic, accessibility, interaction, or asset-delivery requirement cannot be expressed through the shared contract and composition; it requires registry documentation, tests, and an ADR or an amendment to this decision.
- A development-only reference-site selector may replace the active theme stylesheet and `data-site-theme` value from the `?theme=` URL parameter. It does not mutate site configuration or page content and is not emitted in production builds.

## Options considered

### Duplicate the component system per theme

Rejected because it would split functional behavior, accessibility fixes, schemas, and content composition across two implementations.

### Load both themes globally and scope every selector

Rejected for now because it increases payload and cascade risk. A single registered stylesheet is loaded at a time, while the development selector swaps that stylesheet in place.

### Keep one global stylesheet and override selected tokens

Rejected because the Figma system may require differences beyond tokens. A stylesheet entrypoint gives each theme a complete design-layer boundary without changing functional markup.

## Consequences

- Theme identity and availability are explicit and type-safe.
- Sites can change presentation without changing content or composition.
- Step 7 can add tokens and styles behind `new-theme` while reusing the functional system.
- The reference selector intentionally shows an unstyled scaffold for `new-theme` until Step 7; it must not be interpreted as a design proposal.
- Visual regression baselines remain the `old-theme` baseline until a separate `new-theme` baseline is approved.
