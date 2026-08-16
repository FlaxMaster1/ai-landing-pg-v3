# CMS-to-framework mapping

The framework preserves functional traceability without importing WordPress naming into canonical source names.

| Current CMS concept | Implemented canonical concept | Step 6 status |
|---|---|---|
| Hero Header | Hero | Implemented |
| Classic / Rowhouse / Page Tile | Card / CardGrid | Implemented foundation |
| Story Tile / Top Stories | StoryCard / StoryCollection | Implemented with fixture ContentFeed |
| Bio Card / Staff Listing | PersonCard / PersonList | Implemented with fixture FacultyData |
| Events HQ Embed | EventCard / EventList / EventsProvider | Implemented with fixture provider |
| FAQ Toggle / Accordion | Disclosure / FAQ | Implemented with native details/summary |
| New / Horizontal / Vertical Tabs | Tabs | Implemented horizontal and vertical contracts |
| Message Box | Message | Implemented |
| Callout Block / functional Info Box | Callout | Implemented |
| Counter | Stat / StatsGroup | Implemented |
| Gravity / Campaign Monitor / Pardot form | Form / FormProvider | Prototype provider only |
| Search | SearchInput / SearchForm / SearchProvider | Static fixture foundation |
| Full Window / Full Width | Template width property | Implemented |
| With / No Title | Validated titleMode and H1 ownership | Implemented as default or Hero-owned title |
| VC Row / Columns | Layout utilities | Implemented without VC terminology in APIs |

Mappings for unimplemented canonical capabilities remain in the governing specification and are not represented by empty component shells.

## Old-theme fidelity status

The `old-theme` now expresses the live CMS treatment for the implemented mappings above rather than a generic interpretation: Acumin/Minion type roles, live Wharton blue/red aliases, the 1,225px content boundary, square button and form controls, flat/overlay tile treatments, 300px and 580px Hero heights, current tabs and FAQ styling, and the current header/footer proportions. Detailed evidence and unresolved fidelity limits are in `current-cms-visual-fidelity.md`.

This mapping does not claim that every legacy Classic, Rowhouse, Page Tile, form-provider, or header plugin variation has one identical visual form. The canonical variants remain the approved normalization boundary.
