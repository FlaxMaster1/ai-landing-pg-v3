# Wharton Web Prototype Framework Charter

## Purpose

The Wharton Web Prototype Framework is a reusable system for planning, designing, building, and reviewing high-fidelity website prototypes that closely reflect Wharton’s production WordPress CMS while remaining independent from WordPress implementation details.

The framework allows future website prototypes to be assembled from an established set of Wharton tokens, entities, components, patterns, global elements, templates, utilities, and integration contracts rather than recreated from scratch for every project.

## Primary goal

Create a repeatable prototype system that:

- Reflects the current Wharton CMS as accurately as practical.
- Evolves alongside the redesigned Wharton UX and Figma design system.
- Gives Codex a consistent technical foundation for building new sites.
- Keeps content separate from layout and presentation.
- Supports realistic responsive behavior and interactive functionality.
- Produces prototypes suitable for stakeholder review in ChatGPT Sites.
- Makes eventual handoff to the Wharton WordPress development team easier.
- Documents which prototype elements correspond to WordPress CMS concepts.
- Supports many Wharton sites without site-specific framework forks.

## Framework users

The framework is intended primarily for:

- Creative and UX planning.
- Website redesign and prototype projects.
- Codex-assisted frontend development.
- Stakeholder review and testing.
- WordPress implementation reference.

## Core principle

Every reusable prototype element should have a clear functional identity and a traceable relationship to Wharton’s production CMS where one exists.

Whenever practical, an element should document:

1. What it is.
2. When it should be used.
3. How it behaves.
4. Its responsive behavior.
5. Its accessibility requirements.
6. Its current CMS equivalent.
7. Its future Figma/design-system equivalent.
8. Any known WordPress implementation constraints.

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

## Source-of-truth hierarchy

Until the redesigned CMS is complete, the framework recognizes:

1. The approved canonical framework specification for architecture and implementation guardrails.
2. Current production Wharton CMS evidence for existing functionality and behavior.
3. Official Wharton visual standards for established brand rules.
4. Approved Figma designs for new and redesigned components.
5. Framework documentation for prototype implementation.
6. Individual website project requirements within the framework boundaries.

Where a new Figma pattern intentionally replaces an existing CMS pattern, the registry should document both until the transition is complete.

## Technical philosophy

Functional concepts are canonical. Content and presentation stay separate. Structured entities remain independent from presentation. Static HTML is the default, client JavaScript is local and opt-in, and accessibility is part of every relevant contract.

The operating model is:

```text
Wharton Framework + Site Configuration + Structured Content + Assets = Prototype Site
```

Prototype functionality should simulate the production experience closely enough for meaningful stakeholder review without recreating the WordPress backend or carrying forward historical technical debt.

## Toolchain

### ChatGPT Project

Research, planning, decision-making, documentation development, CMS analysis, and preparation of approved build specifications.

### GitHub

Permanent source of truth for framework code, documentation, reusable elements, version history, and project templates.

### Codex

Primary development environment for implementing and maintaining framework and site code.

### Figma

Source for approved visual design, design-system evolution, component specifications, and future CMS styles.

### ChatGPT Sites

Target hosting and presentation environment for functioning stakeholder prototypes, subject to compatibility validation.

## Future project workflow

Research and strategy → site planning → content planning → approved build specification → framework selection → Codex build → prototype review → Sites publication → revisions → WordPress handoff.

Reusable improvements discovered during individual projects should be evaluated against the admission rules before inclusion in the shared framework.

## First validation project

The neutral Step 6 reference site validates the architecture only. Wharton Undergraduate remains the first full real-site validation target for Step 7 and must not dictate or fork the architecture.

Undergraduate should be implemented through site configuration, structured content, assets, and shared framework composition rather than by combining or directly migrating legacy HTML.

The complete governing requirements remain in `../WHARTON_WEB_PROTOTYPE_FRAMEWORK_CANONICAL_SPEC.md`.
