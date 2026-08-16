# Wharton Web Prototype Framework Charter

## Purpose

The Wharton Web Prototype Framework is a reusable system for planning, designing, building, and reviewing high-fidelity website prototypes that closely reflect Wharton’s production WordPress CMS.

The framework should allow future website prototypes to be assembled from an established set of Wharton styles, components, behaviors, templates, and interaction patterns rather than recreated from scratch for every project.

## Primary Goal

Create a repeatable prototype system that:

- Reflects the current Wharton CMS as accurately as practical.
- Can evolve alongside the redesigned Wharton UX and Figma design system.
- Gives Codex a consistent technical foundation for building new sites.
- Keeps content separate from layout and presentation.
- Supports realistic responsive behavior and interactive functionality.
- Produces prototypes suitable for stakeholder review in ChatGPT Sites.
- Makes eventual handoff to the Wharton WordPress development team easier.
- Documents which prototype components correspond to WordPress CMS components.

## Framework Users

The framework is intended primarily for:

- Creative and UX planning.
- Website redesign and prototype projects.
- Codex-assisted frontend development.
- Stakeholder review and testing.
- WordPress implementation reference.

## Core Principle

Every reusable prototype component should have a clear relationship to the Wharton production CMS.

Whenever practical, a prototype element should document:

1. What it is.
2. When it should be used.
3. How it behaves.
4. Its responsive behavior.
5. Its accessibility requirements.
6. Its current CMS equivalent.
7. Its future Figma/design-system equivalent.
8. Any known WordPress implementation constraints.

## Framework Architecture

The framework will contain five primary layers:

### 1. Design Tokens

Reusable visual rules including:

- Brand colors.
- Typography.
- Font sizes.
- Type hierarchy.
- Spacing.
- Grid.
- Breakpoints.
- Borders.
- Radius.
- Shadows.
- Animation and transition rules.

### 2. Components

Reusable interface elements such as:

- Buttons.
- Links.
- Cards.
- Accordions.
- Tabs.
- Forms.
- Calls to action.
- Navigation.
- Breadcrumbs.
- Pagination.
- Media components.
- Faculty profiles.
- News cards.
- Event cards.
- Statistics.
- Quotes.
- Alerts.

### 3. Sections and Patterns

Frequently repeated combinations of components, including:

- Hero sections.
- Feature grids.
- Story layouts.
- News feeds.
- Event feeds.
- Program listings.
- Related-content modules.
- Contact sections.
- Calls to action.
- Landing-page sections.

### 4. Page Templates

Common page structures such as:

- Homepage.
- Landing page.
- Program page.
- Detail page.
- News/article page.
- Faculty/profile page.
- Event page.
- Admissions page.
- Search/results page.

### 5. Documentation

Each framework element should include:

- Visual example.
- Usage guidelines.
- Content guidance.
- Responsive rules.
- Accessibility notes.
- CMS mapping.
- Figma mapping.
- Implementation notes.

## Source-of-Truth Hierarchy

Until the redesigned CMS is complete, the framework will recognize the following hierarchy:

1. Current production Wharton CMS for existing functionality and behavior.
2. Official Wharton visual standards for established brand rules.
3. Approved Figma designs for new and redesigned components.
4. Framework documentation for prototype implementation.
5. Individual website project requirements.

Where a new Figma pattern intentionally replaces an existing CMS pattern, the framework should document both until the transition is complete.

## Technical Philosophy

The framework should favor reusable frontend components rather than page-specific HTML.

Site content should be separated from component code wherever practical so that content revisions do not require rebuilding layouts.

Prototype functionality should simulate the production experience closely enough for meaningful stakeholder review without attempting to recreate the entire WordPress backend.

## Toolchain

### ChatGPT Project
Used for research, planning, decision-making, documentation development, CMS analysis, and preparation of project build packages.

### GitHub
Permanent source of truth for framework code, documentation, reusable components, version history, and project templates.

### Codex
Primary development environment for assembling and maintaining prototype websites using the framework.

### Figma
Source for approved visual design, design-system evolution, component specifications, and future CMS styles.

### ChatGPT Sites
Hosting and presentation environment for functioning stakeholder prototypes.

## Future Project Workflow

Each website project should follow the same basic process:

Research and strategy → site planning → content planning → approved build specification → framework selection → Codex build → prototype review → Sites publication → revisions → WordPress handoff.

Reusable improvements discovered during individual projects should be evaluated for inclusion in the core Wharton Prototype Framework.

## First Validation Project

The Wharton Undergraduate website will serve as the first full implementation and validation of the framework.

Existing Undergraduate HTML pages will be converted into the reusable framework architecture rather than simply combined into a larger static site.

Lessons from this project will be used to refine the framework before it is applied to additional Wharton websites.
