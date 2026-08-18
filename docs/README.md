# Wharton Web Prototype Framework Documentation Map

This directory contains the working documentation for the Wharton Web Prototype Framework. Use this map to determine which document owns which kind of decision.

## Governing documents

1. `../WHARTON_WEB_PROTOTYPE_FRAMEWORK_CANONICAL_SPEC.md`
   - Governing architecture, taxonomy, guardrails, and approved implementation constraints.
2. `../AGENTS.md`
   - Repository instructions for Codex and Claude Code, including Git workflow, branch ownership, QA, handoffs, and deployment rules.
3. Accepted ADRs in `decisions/`
   - Durable architecture decisions that modify or clarify the technical model.

## Design and composition system

1. `../WHARTON_DESIGN_DECISION_FRAMEWORK.md`
   - Decision logic from user goals and content relationships to patterns/components.
2. `../src/registry/framework-elements.ts`
   - Machine-readable inventory and contracts for registered framework elements.
3. `component-handbook.md`
   - Detailed component and pattern usage, variants, use/avoid guidance, accessibility, responsive behavior, and adjacent-choice distinctions.
4. `page-recipes.md`
   - Complete-page and site-type composition guidance for homepages, programs, departments, initiatives, research, campaigns, standard content, articles, directories, search, and related experiences.
5. `component-model.md`
   - Summary of the functional taxonomy and implementation admission process.
6. `themes.md`
   - Theme boundary, old/new theme behavior, and visual-system rules.
7. `current-cms-visual-fidelity.md`
   - Measured current-CMS visual fidelity record and unresolved legacy differences.

## Building a site

- `new-site-project-playbook.md` — step-by-step workflow for creating a ChatGPT Project, planning in Work, naming the project consistently, scaffolding in Codex, making the repository readable by Claude Code, collaborating through branches, and moving to production.
- `site-blueprints/README.md` — starter-blueprint system and planning output contract.
- `site-blueprints/program.md` — program/degree/certificate site starting model.
- `site-blueprints/department.md` — academic department starting model.
- `site-blueprints/initiative-center.md` — initiative, center, institute, or lab starting model.
- `site-blueprints/research-hub.md` — research discovery/hub starting model.
- `site-blueprints/campaign.md` — focused campaign/conversion starting model.
- `adding-a-site.md` — create a new site root and move from strategy/content planning into framework implementation.
- `architecture.md` — runtime, rendering, content, token, asset, theme, and hosting architecture.
- `sites-validation.md` — historical ChatGPT Sites compatibility validation record.
- `cms-mapping.md` — mapping between framework concepts and current CMS concepts.
- `cms-audit/README.md` — source audit material used to establish the framework model.

For new sites, start with `new-site-project-playbook.md` and use the sequence:

**ChatGPT Project → Work planning → Strategy → Sitemap → Content model → Wireframes → Site Blueprint → Implementation Brief → Scaffold → Page Recipes → Design Decision Framework → Typed Registry → Component Handbook → Codex/Claude implementation → PR → GitHub Pages**

The current priority is validating this functional workflow end-to-end. `new-theme` work is intentionally deferred until the system is working; site composition must remain theme-independent so new visual styles can later be layered over the same structure.

## Development workflow

- `agent-collaboration.md` — how Codex and Claude Code collaborate in one repository.
- `handoffs/TEMPLATE.md` — required cross-agent handoff format.
- `handoffs/current.md` — active handoff state, if any.
- `testing.md` — local QA and GitHub Pages production validation gates.
- `deployment.md` — GitHub Pages production deployment model.
- `dependencies.md` — dependency policy and rationale.

## Project status and structure

- `implementation-status.md` — current implementation status, remaining gaps, and active roadmap context.
- `repository-tree.md` — repository structure and key path responsibilities.
- `framework-charter.md` — purpose, users, operating model, and long-term role of the framework.

## Source-of-truth rule

When documentation conflicts, use this order:

1. canonical specification;
2. accepted ADRs;
3. `AGENTS.md`;
4. Design Decision Framework;
5. typed registry for what exists and its machine-readable contract;
6. Component Handbook;
7. Page Recipes;
8. Site Blueprints for new-site starting structure;
9. workflow/deployment/testing documentation;
10. project-specific instructions including `sites/<site-id>/PLAN.md`;
11. conversational context.

Historical audit and validation documents may intentionally describe older hosting or implementation states. They should be read as evidence/history unless another governing document explicitly incorporates them into the current workflow.