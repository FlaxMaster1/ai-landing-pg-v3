# Wharton Site Starter Blueprints

These blueprints turn approved strategy, sitemap, content planning, and wireframes into a consistent starting structure for implementation with the Wharton Web Prototype Framework.

They are **planning and scaffolding guides, not fixed designs**. A blueprint proposes a durable site information architecture, likely page inventory, recommended template families, common entities, likely framework patterns, and implementation checkpoints. It must be adapted to the project's actual user research, content, and business goals.

## Current blueprints

- `program.md` — degree, certificate, executive education, and other program sites.
- `department.md` — academic department sites centered on faculty, research, teaching, and activity.
- `initiative-center.md` — centers, institutes, initiatives, labs, and mission-led organizations.
- `research-hub.md` — research publications, topic hubs, expert discovery, and research storytelling.
- `campaign.md` — focused campaign or conversion-oriented landing experiences.

## When to use a blueprint

Use a blueprint after the team has defined:

1. primary audiences;
2. primary user journeys;
3. site purpose and success criteria;
4. draft sitemap;
5. content inventory/model;
6. key calls to action;
7. wireframe-level hierarchy.

Do not choose a blueprint solely because a site has a familiar organizational label. Choose the blueprint whose user journeys and content model most closely match the project.

## Required implementation sequence

For a new site, Codex or Claude should use this sequence:

**Strategy → Sitemap → Content model → Wireframes → Closest site blueprint → Page Recipes → Design Decision Framework → Typed Registry → Component Handbook → Site implementation**

The blueprint answers **what the site probably needs**. Page Recipes answer **how page types should be composed**. The Design Decision Framework and Component Handbook answer **which patterns/components should express each content relationship**.

## Blueprint adaptation rules

- Delete sections/pages that do not serve a validated user need.
- Add project-specific pages when required, but map them to existing templates and recipes whenever possible.
- Do not create a new shared component merely because a blueprint calls for content the current framework does not yet support.
- First try existing components, patterns, entities, and composition.
- If a reusable gap remains, follow the framework admission process before expanding the shared system.
- Site-specific content belongs under `sites/{site-id}`.
- Shared framework code must remain independent of any single blueprint or site.
- Keep the current functional theme stable while the system is being validated. `new-theme` work is intentionally deferred until the underlying site-building workflow is proven.

## Blueprint output contract

Before implementation starts, a project should be able to produce a short planning artifact containing:

- selected blueprint and rationale;
- primary audiences and user goals;
- proposed sitemap;
- page-to-template mapping;
- page-to-recipe mapping;
- entity/content model needs;
- navigation model;
- primary/secondary CTA model;
- integrations required, if any;
- known framework gaps;
- content/assets still needed;
- acceptance criteria for the first working prototype.

That artifact becomes the bridge from strategy/wireframes into implementation and can be handed to either Codex or Claude without relying on chat history.