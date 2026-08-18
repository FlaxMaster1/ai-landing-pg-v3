# Starting a New Wharton Website Project

**Status:** Living workflow guide  
**Applies to:** ChatGPT Projects, ChatGPT Work, Codex, Claude Code, GitHub, and the Wharton Web Prototype Framework

This guide explains the recommended end-to-end process for starting a new Wharton website project, moving from early strategy through implementation and deployment without losing context between ChatGPT, Codex, Claude Code, and GitHub.

The key operating principle is:

> **Create one planning workspace per website, but keep implementation inside the shared Wharton framework repository.**

A new website gets its own ChatGPT Project and its own `sites/<site-id>` folder. It does **not** get a duplicate copy of the shared framework unless there is an approved architecture decision to create a separate repository.

---

## 1. The project model at a glance

Use the following structure for every new website:

```text
ChatGPT Project
  strategy + research + decisions + Work artifacts
                ↓
Approved site plan
                ↓
Wharton framework repository
  sites/<site-id>/
                ↓
Codex and/or Claude Code branches
                ↓
Pull Request → main
                ↓
GitHub Pages deployment
```

The responsibilities are intentionally different:

| Environment | Primary role | What belongs there |
|---|---|---|
| ChatGPT Project | Persistent project context | Project brief, source files, conversations, decisions, references |
| ChatGPT Work | Structured planning and durable working artifacts | Strategy, sitemap, content model, page inventory, wireframes, implementation brief |
| Regular Chat | Quick discussion inside the Project | Questions, brainstorming, review, small decisions |
| Codex | Primary implementation environment | Scaffold, code, site configuration, tests, Git branches, PR preparation |
| Claude Code | Secondary/specialist implementation environment | Work on the same repository and site folder using its own Git branch |
| GitHub | Authoritative implementation source | Code, documentation, branches, PRs, history, handoffs, deployment |
| GitHub Pages | Current production preview/host | Successfully merged and deployed `main` state |

---

# 2. Naming convention

Choose the project name and machine-safe site ID before implementation begins.

## Human-readable project name

Use the official or working website name.

Examples:

- Wharton AI Research Hub
- Wharton Executive MBA
- Mack Institute
- Finance Department
- Entrepreneurship Campaign

## Site ID

Use lowercase kebab-case:

```text
ai-research-hub
executive-mba
mack-institute
finance-department
entrepreneurship-campaign
```

Rules:

- lowercase letters;
- numbers when necessary;
- hyphens between words;
- no spaces;
- no underscores;
- keep it short but recognizable;
- avoid names tied to a temporary campaign phase unless that is the actual site identity.

The site ID becomes the stable technical identifier used in the repository:

```text
sites/<site-id>/
```

## Recommended naming across tools

Use the same recognizable project stem everywhere.

### ChatGPT Project

Recommended:

```text
Wharton Web — AI Research Hub
```

Pattern:

```text
Wharton Web — <Project Name>
```

### Work artifacts

Recommended names:

```text
01 — Project Strategy
02 — Audience + User Journeys
03 — Sitemap + Navigation
04 — Content Model
05 — Page Inventory + Wireframes
06 — Framework Implementation Brief
```

Do not create separate ChatGPT Projects for each of these. Keep them inside the same website Project.

### Site folder

```text
sites/ai-research-hub/
```

### Codex branches

```text
codex/ai-research-hub-scaffold
codex/ai-research-hub-homepage
codex/ai-research-hub-content
```

Pattern:

```text
codex/<site-id>-<task>
```

### Claude Code branches

```text
claude/ai-research-hub-directory
claude/ai-research-hub-event-pages
```

Pattern:

```text
claude/<site-id>-<task>
```

### Local folder for Claude Code

Claude should work from a local clone of the same framework repository, for example:

```text
~/Development/wharton-prototype-framework/
```

The website itself remains inside:

```text
~/Development/wharton-prototype-framework/sites/ai-research-hub/
```

Do **not** create an unrelated local folder such as `~/Desktop/ai-research-hub/` containing copied framework code. That creates a second source of truth and makes merging difficult.

---

# 3. Step 1 — Create the ChatGPT Project

Create the ChatGPT Project as soon as the website becomes a real project rather than a quick idea.

Recommended Project name:

```text
Wharton Web — <Project Name>
```

Examples:

```text
Wharton Web — AI Research Hub
Wharton Web — Executive MBA
Wharton Web — Mack Institute
```

Use the Project to hold:

- source documents;
- existing-site audits;
- stakeholder notes;
- research;
- project goals;
- audience information;
- content drafts;
- screenshots/reference material;
- important conversations;
- planning artifacts.

The Project is the planning context. GitHub remains the implementation source of truth.

---

# 4. Step 2 — Start the planning work in Work

Use Work for the substantial planning phase rather than immediately asking Codex to build pages.

Create the first Work artifact:

```text
01 — Project Strategy
```

Use this starter prompt:

```text
I am starting a new Wharton website project called <PROJECT NAME>.

This website will ultimately be implemented using the Wharton Web Prototype Framework in the GitHub repository:
FlaxMaster1/wharton-prototype-framework

Do not begin coding yet.

First, help me develop the website strategy and implementation plan. We need to define:

- project purpose and success criteria;
- primary and secondary audiences;
- user goals and major journeys;
- sitemap and navigation model;
- page inventory;
- content model and structured entities;
- primary and secondary CTA strategy;
- page-level content hierarchy;
- wireframes for priority pages;
- required integrations;
- missing content and assets.

When the strategy is sufficiently defined, identify the closest Wharton framework starter blueprint:

- Program
- Department
- Initiative / Center / Institute
- Research Hub
- Campaign

Then produce a framework implementation brief mapping:

sitemap → framework templates → page recipes → entities → likely patterns/components → integrations → known framework gaps.

Keep the site structure theme-independent. Use the existing functional theme for implementation and do not begin new-theme work.

The final planning package must be detailed enough for Codex or Claude Code to continue without reconstructing decisions from conversation history.
```

Then add what you currently know about the project.

Example:

```text
The project is the Wharton AI Research Hub. Its primary audiences are business leaders, researchers, journalists, students, and prospective partners. The site should organize Wharton's AI research, faculty expertise, events, and related initiatives in one discoverable experience.
```

---

# 5. Step 3 — Develop the planning package

Build the planning material progressively rather than trying to solve the entire site in one prompt.

Recommended Work artifacts:

## 01 — Project Strategy

Capture:

- purpose;
- goals;
- success criteria;
- audiences;
- constraints;
- stakeholder priorities.

## 02 — Audience + User Journeys

Capture:

- primary audiences;
- key questions each audience has;
- top tasks;
- entry points;
- desired outcomes;
- major cross-page journeys.

## 03 — Sitemap + Navigation

Capture:

- proposed sitemap;
- global navigation;
- utility navigation;
- hierarchy;
- naming/labels;
- page relationships.

## 04 — Content Model

Identify reusable entities such as:

- Story;
- Person;
- Event;
- Course;
- research item;
- program;
- publication;
- initiative;
- statistic;
- CTA.

Use existing framework entities where possible. Do not invent presentation-specific data structures before consulting the framework.

## 05 — Page Inventory + Wireframes

For every page, identify:

- route;
- purpose;
- primary audience;
- primary task;
- content hierarchy;
- likely framework template;
- likely page recipe;
- required entities;
- primary CTA;
- key responsive considerations.

Wireframes should describe information hierarchy first. They do not need final visual styling.

## 06 — Framework Implementation Brief

This becomes the handoff into implementation.

It should contain:

- project name;
- site ID;
- selected starter blueprint;
- approved or current sitemap;
- page-to-template mapping;
- page-to-recipe mapping;
- entity/content model;
- navigation model;
- CTA model;
- integrations;
- missing content/assets;
- known framework gaps;
- acceptance criteria for the first working prototype.

---

# 6. Step 4 — Decide when the project is ready for Codex

Do not wait for every sentence of final copy.

The project is ready for implementation when the following are sufficiently stable:

- project purpose;
- site ID;
- major audiences;
- primary journeys;
- sitemap;
- navigation model;
- page inventory;
- first-pass content hierarchy;
- selected starter blueprint;
- implementation brief.

Content can continue to evolve during implementation as long as the underlying architecture is not changing unpredictably.

---

# 7. Step 5 — Open the shared framework repository in Codex

Do **not** create a separate framework repository for the new site by default.

Open:

```text
FlaxMaster1/wharton-prototype-framework
```

Codex should read the repository's `AGENTS.md` before implementation.

Give Codex the approved planning brief and use this starter prompt:

```text
Start implementation of the approved <PROJECT NAME> website plan.

Repository:
FlaxMaster1/wharton-prototype-framework

Site ID:
<SITE-ID>

Read AGENTS.md and all required framework documentation before changing code.

Use the approved planning brief and the closest starter blueprint.

Create the new site using the automated scaffold command.
Keep all project-specific content and configuration in sites/<SITE-ID>/.
Do not modify new-theme.

After scaffolding:

1. review the generated PLAN.md;
2. map the approved sitemap to framework templates and page recipes;
3. implement the approved navigation and starter pages;
4. use existing registered entities, patterns, and components wherever possible;
5. document genuine framework gaps instead of inventing one-off shared elements;
6. run appropriate validation;
7. work on a codex/<SITE-ID>-<TASK> branch;
8. prepare a PR into main;
9. do not merge until production approval is given.
```

Codex should run a scaffold command similar to:

```bash
npm run create:site -- --type=research --id=ai-research-hub --name="Wharton AI Research Hub"
```

The blueprint type should match the approved planning brief.

---

# 8. Step 6 — Review the generated site package

The generator creates:

```text
sites/<site-id>/
├── PLAN.md
├── site.config.json
├── navigation.json
├── footer.json
├── assets.json
├── pages/
├── content/
├── entities/
├── assets/
└── fixtures/
```

`PLAN.md` is especially important. It creates a repository-local bridge between strategy and implementation so either Codex or Claude can understand what the site is intended to become.

After scaffolding, update `PLAN.md` with the approved planning decisions rather than leaving critical decisions only in ChatGPT Work.

At minimum, `PLAN.md` should identify:

- site purpose;
- selected blueprint;
- audiences;
- major journeys;
- sitemap;
- template mapping;
- page-recipe mapping;
- entities;
- CTA model;
- integrations;
- missing content/assets;
- known gaps;
- prototype acceptance criteria.

---

# 9. Step 7 — Make the project readable by Claude Code

Claude Code must be able to continue from the repository without needing a copied ChatGPT transcript.

Claude should work from an up-to-date local clone of:

```text
FlaxMaster1/wharton-prototype-framework
```

Before Claude begins a task, ensure its local repository contains the latest `main` and the relevant branch.

Typical local preparation:

```bash
git checkout main
git pull origin main
```

Then Claude creates or checks out its task branch:

```bash
git checkout -b claude/<site-id>-<task>
```

Claude should read, in this order:

1. `AGENTS.md`;
2. `sites/<site-id>/PLAN.md`;
3. `docs/new-site-project-playbook.md` when project workflow context is needed;
4. the selected file in `docs/site-blueprints/`;
5. `docs/page-recipes.md`;
6. `WHARTON_DESIGN_DECISION_FRAMEWORK.md`;
7. `src/registry/framework-elements.ts`;
8. `docs/component-handbook.md`;
9. relevant site files under `sites/<site-id>/`;
10. `docs/handoffs/current.md` when another agent is handing off work.

Use this starter prompt for Claude Code:

```text
You are continuing work on <PROJECT NAME> in the Wharton Web Prototype Framework.

Repository:
FlaxMaster1/wharton-prototype-framework

Site folder:
sites/<SITE-ID>/

Before changing code, read AGENTS.md and sites/<SITE-ID>/PLAN.md, then read the framework documentation required by AGENTS.md.

Work only on the assigned task and use a claude/<SITE-ID>-<TASK> branch.
Do not copy the framework into another folder.
Do not modify new-theme.
Use existing registered components/patterns before adding anything reusable.
Update the repository handoff when work is returned to Codex.
```

If Claude lacks context from ChatGPT Work, the solution is **not** to paste an entire conversation. Update `PLAN.md`, a relevant project document, or `docs/handoffs/current.md` so the information becomes repository-readable.

---

# 10. Step 8 — Codex and Claude collaboration rules

Treat Codex and Claude as two developers on one project.

They share:

- one repository;
- one `sites/<site-id>` folder;
- one framework;
- one `PLAN.md`;
- one Git history;
- one production branch.

They do not share the same working branch at the same time unless there is a deliberate reason.

Recommended task split:

```text
codex/<site-id>-homepage
claude/<site-id>-directory
codex/<site-id>-navigation
claude/<site-id>-events
```

Avoid having both agents independently edit the same page or shared component simultaneously.

Cross-agent context belongs in:

```text
docs/handoffs/current.md
```

Use `docs/handoffs/TEMPLATE.md`.

---

# 11. Step 9 — Preview during development

The site can be run locally by selecting its site ID:

```bash
SITE=<site-id> npm run dev
```

Example:

```bash
SITE=ai-research-hub npm run dev
```

Build it with:

```bash
SITE=<site-id> npm run build
```

The development objective is functional correctness first:

- IA;
- content hierarchy;
- templates;
- components;
- interactions;
- responsive behavior;
- accessibility;
- content structure.

`new-theme` remains deferred until the working site system has been proven.

---

# 12. Step 10 — Review and merge

For each implementation task:

1. Codex or Claude works on its own branch.
2. The agent commits completed work.
3. The branch is pushed to GitHub.
4. A PR is opened into `main`.
5. Review the implementation and validation results.
6. Make requested corrections on the same task branch.
7. Merge only after approval.
8. GitHub Actions runs the deployment pipeline.
9. Consider the change live only after the Pages deployment succeeds.

Do not treat an unmerged branch as production.

---

# 13. Step 11 — Keep the planning workspace and repository synchronized conceptually

ChatGPT Work and GitHub serve different purposes.

When an important planning decision changes, ask:

> Does Codex or Claude need this information to build correctly?

If yes, move the durable decision into the repository.

Typical destinations:

| Decision | Repository destination |
|---|---|
| Site-specific strategy that affects implementation | `sites/<site-id>/PLAN.md` |
| Cross-agent work state | `docs/handoffs/current.md` |
| New reusable component behavior | typed registry + component docs |
| New page-composition rule | `docs/page-recipes.md` |
| New starter-site rule | `docs/site-blueprints/` |
| Architecture change | `docs/decisions/` ADR |
| General framework workflow | framework documentation |

ChatGPT Work can contain richer planning detail, but implementation-critical decisions must not exist only there.

---

# 14. When to use Chat vs Work vs Codex vs Claude

## Use regular Chat when

- asking a quick question;
- brainstorming names or ideas;
- reviewing a small decision;
- discussing stakeholder feedback;
- deciding what to do next.

Prefer doing this inside the website's ChatGPT Project so context remains attached to the project.

## Use Work when

- developing strategy;
- writing the sitemap;
- creating a content model;
- developing page inventory;
- creating wireframes/content hierarchy;
- preparing the implementation brief;
- maintaining a durable planning artifact.

## Use Codex when

- creating the scaffold;
- editing the repository;
- implementing pages/components/content configuration;
- testing;
- running validation;
- preparing PRs;
- reviewing integration across the framework.

Codex is the default implementation lead unless the project owner intentionally delegates work elsewhere.

## Use Claude Code when

- Codex capacity is constrained;
- a well-bounded task can run in parallel;
- Claude is specifically preferred for a task;
- a specialist implementation task can be cleanly handed off.

Claude must use the same repository and read local repository documentation before coding.

---

# 15. Recommended project kickoff checklist

Before coding begins, confirm:

- [ ] ChatGPT Project created
- [ ] Project named `Wharton Web — <Project Name>`
- [ ] Stable site ID selected
- [ ] `01 — Project Strategy` started in Work
- [ ] audiences defined
- [ ] major user journeys defined
- [ ] sitemap drafted
- [ ] navigation model drafted
- [ ] page inventory drafted
- [ ] content model drafted
- [ ] starter blueprint selected
- [ ] framework implementation brief prepared
- [ ] wireframes/content hierarchy prepared for priority pages
- [ ] Codex opened on the shared framework repository
- [ ] site scaffold generated
- [ ] `sites/<site-id>/PLAN.md` updated with durable decisions
- [ ] first Codex branch created
- [ ] Claude instructions can be derived from repository files without relying on chat history

---

# 16. Example: Wharton AI Research Hub

## ChatGPT Project

```text
Wharton Web — AI Research Hub
```

## Work artifacts

```text
01 — Project Strategy
02 — Audience + User Journeys
03 — Sitemap + Navigation
04 — Content Model
05 — Page Inventory + Wireframes
06 — Framework Implementation Brief
```

## Site ID

```text
ai-research-hub
```

## Blueprint

```text
Research Hub
```

## Scaffold

```bash
npm run create:site -- --type=research --id=ai-research-hub --name="Wharton AI Research Hub"
```

## Site folder

```text
sites/ai-research-hub/
```

## First Codex branch

```text
codex/ai-research-hub-foundation
```

## Example Claude branch

```text
claude/ai-research-hub-faculty-directory
```

## Local Claude path

```text
~/Development/wharton-prototype-framework/sites/ai-research-hub/
```

This naming continuity makes the project recognizable in every environment while preserving GitHub as the technical source of truth.

---

# 17. The simplest way to remember the workflow

```text
CREATE PROJECT
      ↓
PLAN IN WORK
      ↓
DOCUMENT THE PLAN
      ↓
SCAFFOLD IN CODEX
      ↓
BUILD IN CODEX / CLAUDE
      ↓
REVIEW THROUGH GITHUB
      ↓
MERGE TO MAIN
      ↓
DEPLOY THROUGH GITHUB PAGES
```

The planning tools can change over time. The durable rule should remain: **strategy precedes implementation, implementation-critical decisions live in the repository, both AI developers work from the same codebase, and production flows through reviewed Git history.**
