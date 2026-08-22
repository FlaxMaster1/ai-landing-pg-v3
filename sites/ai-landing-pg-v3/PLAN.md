# The Wharton AI Advantage — V3 site plan

**Blueprint:** Campaign

**Site ID:** `ai-landing-pg-v3`

**Theme:** `old-theme`

**Primary route:** `/`

## Purpose

Present a unified Wharton story about AI education, research, and leadership across the learner lifecycle. The prototype should demonstrate that Wharton combines technical fluency with human judgment, accountability, and real-world application.

## Primary audiences and goals

- Prospective learners: understand how AI learning develops from pre-college through executive leadership.
- Current students: discover curricular pathways and hands-on opportunities.
- Executives and organizations: find AI and Analytics upskilling programs.
- Faculty, partners, and media: explore Wharton research, ideas, and applied impact.

## Information architecture

The site is a single campaign homepage using the framework Homepage recipe:

1. Hero and two campaign CTAs
2. By the Numbers
3. Dean Erika H. James perspective
4. Our Approach
5. AI Leadership Journey
6. Faculty Expertise and Course Spotlight
7. Academic leadership perspective
8. Student Experience
9. Unified AI Upskilling, AI Infrastructure, and Global Community section
10. Research and Insights
11. News and Stories
12. Wharton and Penn AI callout

The primary navigation is an on-page anchor navigation with exactly four destinations:

- Our Approach → `#approach`
- Faculty Expertise → `#faculty-expertise`
- Student Experience → `#student-experience`
- Research and Insights → `#research-insights`

## Framework composition

- `Hero`: campaign promise and primary/secondary actions.
- `StatsGroup`: four proof points.
- `FeatureRow`: Dean quote, approach, faculty expertise, and course spotlight.
- `CardGrid`: leadership journey, student pathways, and leadership-support mosaic.
- `Callout`: academic leadership placeholder and Penn AI connection.
- `PageIntro`: section-level framing copy.
- `StoryCollection`: six research entities and six news entities.

Research and News story cards carry their Story topic as a semantic content category. The site maps the six approved categories—Special Reports, Faculty Research, Articles, News & Stories, Multimedia, and Exec Ed—to a consistent Wharton-palette gradient, even when a category is not represented in the current twelve-card lineup.

The leadership journey and three-panel leadership-support mosaic are site-specific compositions implemented through scoped CSS over registered patterns. They do not add shared component variants or alter framework schemas.

## Content and entity model

- One JSON page owns the campaign narrative and section order.
- Twelve Story entities support the Research and Insights and News and Stories collections.
- Two local image assets support the Dean and faculty/teaching narratives.
- External URLs point to authoritative Wharton, Penn, Knowledge at Wharton, and selected media destinations.

## CTA model

- Primary conversion: read about Wharton’s AI curriculum.
- Secondary orientation: jump to the AI Leadership Journey.
- Section CTAs: research, student pathways, accelerator, Hack-AI-thon, executive programs, and Penn AI.

## Known content approvals and gaps

- The Executive Education program count (`10`) remains subject to confirmation from that team.
- The academic leadership callout intentionally uses un-attributed holding copy until a Vice Dean or Deputy Dean quote is approved.
- The final six-item Research and Insights lineup, including URLs for “The Skills Mismatch Economy,” “Cognitive Surrender,” and “AI and Creativity,” requires Caroline/Emily approval. Those three cards currently route to the Knowledge at Wharton AI index.
- The approved Course Spotlight video was not supplied; the prototype presents the approved course copy and curriculum link without inventing media.
- Final production imagery and image credits should receive brand/editorial review.

## Acceptance criteria

- One accessible H1 and semantic section headings.
- Four requested anchor-navigation labels and working destinations.
- Responsive layouts from mobile through wide desktop.
- AI Upskilling displayed as the large left panel, with AI Infrastructure above A Global Community of AI Leaders on the right; mobile order remains Upskilling, Infrastructure, Community.
- All approved V3 copy represented; no removed V2 positioning reintroduced.
- Structured data validates, the static site builds, and the output audit passes.
- Keyboard navigation, focus visibility, contrast, and reduced layout fragility receive browser QA before review.
