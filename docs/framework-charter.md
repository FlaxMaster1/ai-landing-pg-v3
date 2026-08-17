# Wharton Web Prototype Framework Charter

## Purpose

The Wharton Web Prototype Framework is a reusable system for planning, designing, building, and reviewing high-fidelity Wharton websites while remaining independent from any one site and from WordPress implementation details.

The framework is intended to let future website projects begin with strategy, audience needs, sitemap, content planning, and wireframes, then apply a consistent Wharton presentation and behavior system around that content. It should function as a reusable platform/skin, not as a collection of predesigned pages that force every site into the same composition.

## Primary goal

Create a repeatable website system that:

- Reflects the current Wharton CMS as accurately as practical where legacy fidelity is required.
- Evolves alongside the redesigned Wharton UX and Figma design system.
- Gives Codex and Claude Code the same documented technical and design-decision foundation.
- Keeps content separate from layout and presentation.
- Makes component and pattern selection explicit rather than dependent on agent memory or taste.
- Supports realistic responsive behavior and interactive functionality.
- Produces stakeholder-reviewable prototypes/sites through a normal GitHub workflow.
- Makes eventual handoff to the Wharton WordPress development team easier.
- Documents which framework elements correspond to WordPress CMS concepts.
- Supports many Wharton sites without site-specific framework forks.

## Framework users

The framework is intended for:

- Creative, UX, and content strategy.
- Website redesign and prototype projects.
- Codex- and Claude-assisted frontend development.
- Stakeholder review and testing.
- WordPress implementation reference.

## Core principle

Every reusable element should have a clear functional identity, documented selection logic, and a traceable relationship to Wharton’s production CMS or redesigned system where one exists.

Whenever practical, an element should document:

1. what it is;
2. which user/content problem it solves;
3. when it should be used;
4. when it should not be used;
5. its content contract and variants;
6. its responsive behavior;
7. its accessibility requirements;
8. its current CMS equivalent;
9. its future Figma/design-system equivalent;
10. any known WordPress implementation constraints.

## Canonical framework architecture

The approved taxonomy is:

```text
Tokens → Entities → Components → Patterns → Global Elements → Templates → Utilities → Integrations
```

### Tokens
Reusable visual decisions including color, typography, spacing, size, border, elevation, motion, and content-driven breakpoints.

### Entities
Structured content and navigation data such as Story, Event, Person, Course, NavigationItem, Action, and Asset.

### Components
Reusable semantic interface elements such as buttons, links, cards, disclosures, form controls, search controls, people, stories, events, statistics, and messages.

### Patterns
Purposeful compositions such as Hero, PageIntro, CardGrid, FeatureRow, StoryCollection, EventList, FAQ, Tabs, forms, and navigation patterns.

### Global elements
The shared program navigation, site identity/header, local navigation, mobile navigation, search, footer, and back-to-top shell.

### Templates
Functional page structures: Homepage, Standard, Landing, Article, Topic, Directory, Search, and Sidebar. Width, title ownership, and sidebar placement are configuration rather than duplicate templates.

### Utilities
Meaning-neutral layout, container, visibility, surface, media, anchor, screen-reader, and focus-management behavior.

### Integrations
Typed provider boundaries for events, faculty data, content, forms, video, authentication, search, and analytics.

## Decision and composition system

The framework's reusable design logic is documented as a stack:

1. `WHARTON_WEB_PROTOTYPE_FRAMEWORK_CANONICAL_SPEC.md` governs architecture and guardrails.
2. `WHARTON_DESIGN_DECISION_FRAMEWORK.md` maps user goals/content relationships to framework choices.
3. `src/registry/framework-elements.ts` is the machine-readable source of truth for implemented elements and contracts.
4. `docs/component-handbook.md` documents detailed component/pattern selection and behavior.
5. `docs/page-recipes.md` documents complete-page and site-type composition guidance.

This system allows any capable agent or developer to make consistent, explainable design decisions from repository evidence rather than conversational memory.

## Source-of-truth hierarchy

Until the redesigned CMS is complete, the framework recognizes:

1. the approved canonical framework specification;
2. accepted architecture decision records;
3. the shared repository instructions in `AGENTS.md`;
4. current production Wharton CMS evidence for existing functionality/behavior;
5. official Wharton visual standards and approved Figma designs;
6. the Design Decision Framework and typed registry;
7. the Component Handbook and Page Recipes;
8. individual website project requirements within framework boundaries.

Where a new Figma pattern intentionally replaces an existing CMS pattern, the registry should document both until the transition is complete.

## Technical philosophy

Functional concepts are canonical. Content and presentation stay separate. Structured entities remain independent from presentation. Static HTML is the default, client JavaScript is local and opt-in, and accessibility is part of every relevant contract.

The operating model is:

```text
Site strategy + content + sitemap + wireframes
                    ↓
Wharton Framework + Site Configuration + Structured Content + Assets
                    ↓
Reusable Wharton website
```

Prototype functionality should simulate the intended production experience closely enough for meaningful stakeholder review without recreating the WordPress backend or carrying forward historical technical debt.

## Toolchain

### GitHub
Permanent source of truth for framework/site code, documentation, reusable elements, review history, handoffs, version history, and deployment history.

### Codex and Claude Code
Peer development agents working against the same repository. Both follow `AGENTS.md`, use agent-owned branches, and hand work through GitHub rather than shared conversational context.

### ChatGPT
Strategy, planning, design decisions, documentation development, project direction, review, and Codex-assisted implementation.

### Figma
Source for approved visual design, design-system evolution, component specifications, and future CMS styles.

### GitHub Pages
Primary production hosting path for the reference implementation. Reviewed merges to `main` automatically validate/build/deploy through GitHub Actions.

### ChatGPT Sites
Compatibility/experimentation path only. It is not the primary source of truth or production workflow.

## Future project workflow

```text
research + strategy
→ audience/user goals
→ sitemap + content planning
→ wireframes/content hierarchy
→ select closest page recipes
→ map content to entities/templates/patterns
→ Codex or Claude implementation
→ branch + pull request
→ review/QA
→ merge to main
→ GitHub Pages deployment
→ revisions
→ WordPress handoff when appropriate
```

Reusable improvements discovered during individual projects should be evaluated against the admission rules before inclusion in the shared framework.

## First validation project

The neutral reference site validates the architecture and documentation system. Wharton Undergraduate remains the first full real-site validation target and must not dictate or fork the architecture.

Undergraduate should be implemented through strategy, site configuration, structured content, assets, the decision framework, and shared framework composition rather than by combining or directly migrating legacy HTML.

The complete governing requirements remain in `../WHARTON_WEB_PROTOTYPE_FRAMEWORK_CANONICAL_SPEC.md`.