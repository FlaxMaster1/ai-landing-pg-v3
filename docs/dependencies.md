# Dependency rationale

Runtime dependencies are intentionally limited:

- `astro`: approved static-first rendering and routing architecture.
- `zod`: approved structured-data and configuration validation.

Development dependencies:

- `typescript` 6.x: strict contracts; pinned to the current `@astrojs/check` peer range rather than bypassing dependency safety for TypeScript 7.
- `@astrojs/check`: Astro template and TypeScript checking.
- `vitest`: unit and structural tests.
- `@playwright/test`: browser, responsive, interaction, and visual regression tests.
- `@axe-core/playwright`: automated accessibility checks in real rendered pages.
- `@types/node`: typed build-time file and script APIs.

No client framework, global state library, styling framework, component kit, animation framework, or Storybook dependency is installed.
