# Research Hub Site Blueprint

Use for research-focused sites where users need to discover topics, current research, experts, publications/stories, events, and related resources.

## Primary user journeys

- understand the research scope;
- browse by topic;
- find recent or featured research;
- find experts/authors;
- follow related work;
- search a large corpus when warranted;
- attend research events or subscribe/contact.

## Default sitemap

- Home / Research Overview
- Topics / Areas
- Research / Publications / Stories
- Experts / Faculty
- Events / Seminars
- About / Method / Mission when needed
- Resources / Data / Tools when applicable
- Search when justified
- Subscribe / Contact when useful

## Template mapping

- Hub home: `Landing` or `Topic`.
- Topic pages: `Topic`.
- Individual editorial research/story: `Article`.
- Experts: `Directory`.
- Reference/resources: `Standard` or `Directory`.
- Search: `Search`.

## Core entities

Likely: Story, Person, Event, NavigationItem, Action, Asset. New publication/data entities should be introduced only if the content contract cannot be expressed reliably through the current model and the need generalizes.

## Hub composition

1. research identity/scope;
2. topic pathways;
3. featured research;
4. recent research/story collection;
5. expert discovery;
6. events/resources;
7. search/subscription/contact if justified.

## Content model questions before build

- What does “research” mean in this project: editorial stories, papers, datasets, centers, or several types?
- Are topic categories durable and mutually understandable?
- Does the user need filtering/search or can curated navigation solve the task?
- Which metadata is essential for credibility and scanning: author, date, source, topic, publication type?
- How are experts connected to research items?
- What is featured editorially versus simply newest?

## Common component/pattern choices

- navigation CardGrid or SectionNavigation for durable topic routes.
- StoryCollection/StoryCard for editorial research content.
- PersonList for experts.
- SearchForm when known-item/keyword discovery is a real task.
- EventList for seminars and research events.
- FeatureRow for a major featured research item or research area.
- Callout for newsletter/contact only when it supports a real user goal.

## Avoid

- mixing static topic navigation and research stories in one undifferentiated card collection;
- adding search because the site is “research heavy” without a defined search task;
- hiding core topic content inside Tabs;
- using generic Card when Story/Person/Event semantics apply;
- inventing filters without URL state, accessibility, and registry guidance.

## First working prototype acceptance criteria

- users can navigate from hub → topic → research item → related expert/content;
- research metadata is structurally consistent;
- expert relationships use Person data;
- search is omitted unless requirements justify it;
- topic navigation works on mobile and keyboard;
- current theme can express the complete research journey without `new-theme` dependencies.