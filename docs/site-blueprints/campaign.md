# Campaign Site Blueprint

Use for focused campaign experiences with one dominant proposition and one primary conversion goal.

## Primary user journeys

- understand the campaign proposition;
- assess relevance and credibility;
- see proof/benefits;
- resolve common objections;
- complete one primary action.

## Default sitemap

Campaigns should stay intentionally small. Typical structure:

- Landing / Home
- Details / About when needed
- Stories / Proof when substantial
- FAQ when justified
- Contact / Form / Conversion destination

Many campaigns should remain a single landing page rather than becoming miniature websites.

## Template mapping

- Primary campaign page: `Landing`.
- Supporting narrative/story: `Article` or `Standard`.
- FAQ/details: often remain sections of the Landing page rather than separate routes.
- Conversion form: use the existing Form pattern/provider boundary when an on-page form is required.

## Core entities

Likely: Action, Asset, Story. Event or Person may support proof when semantically relevant.

## Landing composition

1. clear proposition;
2. primary CTA;
3. concise explanation/benefits;
4. evidence or proof;
5. supporting story/examples;
6. objections/details/FAQ;
7. final CTA or form.

## Content model questions before build

- What is the single primary conversion action?
- What must users understand before they are ready to act?
- Which proof is credible and specific?
- What objections/questions block conversion?
- Is a full site necessary, or will one focused page perform better?
- Does the campaign need the full site navigation shell or a more restrained configuration within existing global rules?

## Common component/pattern choices

- Hero for a strong proposition.
- one primary Button/CTA treatment in each decision context.
- FeatureRow for major benefits/proof stories.
- StatsGroup for sourced evidence.
- StoryCard/StoryCollection for substantive testimonials/editorial proof when modeled as Story entities.
- FAQ for genuine questions/objections.
- Form for conversion only when required.
- final Callout for the main next action.

## Avoid

- several unrelated primary CTAs;
- excessive navigation that pulls users away from the campaign task;
- giant forms before value is established;
- decorative testimonials with no attribution/context;
- Tabs used to hide essential campaign information;
- campaign-only shared framework components that duplicate existing composition.

## First working prototype acceptance criteria

- primary proposition and CTA are unambiguous;
- campaign works as a complete keyboard/mobile journey;
- form behavior and result states are accessible when used;
- proof claims have appropriate context;
- page remains understandable without final visual polish;
- campaign implementation is fully functional with the current theme and introduces no `new-theme` dependency.