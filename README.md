# Wharton Web Prototype Framework

A reusable system for planning, designing, building, and reviewing high-fidelity Wharton website prototypes that closely reflect the production WordPress CMS.

## Purpose

This repository is the permanent source of truth for the framework code, documentation, reusable components, version history, and project templates used to build Wharton website prototypes.

The framework is intended to:

- Reflect the current Wharton CMS as accurately as practical.
- Evolve alongside approved Wharton UX and Figma design-system work.
- Give Codex a consistent technical foundation for new prototype sites.
- Keep content separate from layout and presentation wherever practical.
- Support realistic responsive behavior and interaction.
- Produce prototypes suitable for stakeholder review in ChatGPT Sites.
- Make eventual handoff to the Wharton WordPress development team easier.
- Document the relationship between prototype components and production CMS components.

## Repository Structure

```text
wharton-prototype-framework/
├── README.md
├── docs/
│   ├── framework-charter.md
│   ├── architecture.md
│   ├── cms-mapping.md
│   └── decisions/
├── src/
│   ├── tokens/
│   ├── components/
│   ├── patterns/
│   ├── templates/
│   └── utilities/
├── content/
├── public/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── sites/
│   └── undergraduate/
└── tests/
```

## First Validation Project

The Wharton Undergraduate website will be the first full implementation and validation of the framework. Existing Undergraduate HTML pages will be converted into this reusable architecture rather than simply combined into a larger static site.

Lessons from that implementation will be used to refine the framework before it is applied to additional Wharton websites.

## Current Status

The repository is being initialized with a stack-neutral architecture. Frontend framework, build tooling, CSS strategy, content model, and deployment conventions will be defined in a later technical architecture decision rather than assumed here.
