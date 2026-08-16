# ADR 008: Generic page renderer

Status: Accepted by Step 5.

Page JSON selects one of eight canonical templates and an ordered list of approved section discriminants. Zod rejects unknown types. The generic route and renderer resolve controlled registries rather than requiring a custom `.astro` page for each route.
