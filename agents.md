# AGENTS.md

## WEC Analysis 2011–2023

This file is the persistent operating context for AI agents working on this repository.

Any AI coding/research agent entering this repository MUST read this file before making changes.

The purpose of this file is to preserve project intent, analytical decisions, current progression, constraints, and lessons learned across different agents, models, IDEs, and sessions.

---

# 1. Project Identity

## Project

**WEC Analysis 2011–2023**

Repository:

`https://github.com/BOSU2905/WEC-Analysis-2026.git`

Working concept:

> An interactive long-form data story exploring how the FIA World Endurance Championship evolved from 2011 to 2023.

This project began as a personal/fun EDA project.

It is now being developed into a more rigorous:

* analytical product
* data storytelling experience
* interactive editorial web experience
* motorsport data investigation

The final product should demonstrate:

> "I can build a data product / analytical product."

This is more important than simply demonstrating that the developer can build a visually impressive website.

---

# 2. Core Product Direction

The final experience MUST NOT become:

* a generic analytics dashboard
* a BI dashboard
* an automotive admin panel
* a motorsport statistics website
* a gaming-style racing website
* a collection of disconnected charts
* a flashy visualization playground

The intended experience is:

> **An interactive long-form editorial data story.**

The primary inspiration for the storytelling architecture is:

`https://tej.as/story`

The project should learn from the **storytelling philosophy and information architecture**, NOT copy the website.

Use the following principles:

* long-form narrative
* chapter-based progression
* a central analytical thread
* minimal navigation
* persistent sense of progress
* carefully paced sections
* media integrated into the narrative
* charts embedded where they explain something
* editorial restraint
* strong typography
* intentional whitespace
* contextual annotations
* visual storytelling

Do NOT copy:

* visual identity
* typography
* exact layout
* content
* implementation
* animations
* branding

The goal is:

> **Inspired by the editorial storytelling philosophy of tej.as/story, but clearly an original WEC data product.**

---

# 3. Visual Direction

The intended visual language is:

### Primary

**Premium motorsport editorial**

### Secondary

**Technical / telemetry**

### Tertiary

**Cinematic documentary**

Approximate balance:

* 70% analytical/editorial
* 20% photography/media
* 10% cinematic effects

This ratio may evolve after implementation testing, but analytical clarity must remain dominant.

The website should feel like an independent data intelligence publication.

It should NOT feel like an official FIA/WEC website.

It should NOT feel like a fan-made racing site.

---

# 4. Design Principles

## Color

Dark mode is the default direction.

Approximate dark palette:

```text
Background: #090A0B
Surface:    #111214
Primary:    #E8E7E3
Secondary:  #92918D
Border:     #2A2A29
```

Light mode should feel like:

* archival paper
* technical publication
* engineering documentation

Approximate light palette:

```text
Background: #F1F0EC
Surface:    #E7E6E1
Primary:    #171717
Secondary:  #6D6C68
Border:     #D2D0C9
```

Color should primarily communicate meaning.

Avoid unnecessary decorative colors.

---

# 5. Typography

Preferred typography:

### Headings

**Space Grotesk**

### Body / UI

**Geist**

### Data / telemetry / metadata

**Geist Mono**

Typography should create hierarchy without excessive styling.

Avoid:

* excessive uppercase text
* excessive bold text
* excessive font sizes
* decorative motorsport fonts
* gaming-style typography

---

# 6. Motion Philosophy

Motion is part of the storytelling system.

It must NOT become decoration.

Good motion should:

* reveal information
* communicate change
* establish hierarchy
* guide attention
* connect narrative sections
* make charts feel alive

Examples:

* line drawing as a chart enters
* bars revealing ranking changes
* pinned visuals while narrative text changes
* image entering from the side
* gradual image reveal
* subtle transitions between chapters
* horizontal movement tied to scroll position

Avoid:

* constant animation
* excessive parallax
* bouncing elements
* gaming-style effects
* unnecessary 3D
* animation that makes charts harder to understand

Always support:

```css
prefers-reduced-motion
```

---

# 7. Hero Direction

The hero should combine:

* WEC identity
* strong typography
* race photography
* subtle telemetry/data information

Working title:

> **WEC / 2011–2023**

Working tagline:

> **13 Years. Hundreds of Races. One Evolving Championship.**

The hero may use a race car image entering/revealing through scroll interaction.

The image should feel photographic and editorial rather than like a game advertisement.

Potential visual idea:

* race car positioned partially off-screen
* image gradually revealed
* typography layered over/near the image
* subtle telemetry metadata
* restrained film grain

Do not make the hero visually overpower the analytical story.

---

# 8. Analytical Philosophy

This is the most important section of the project.

The project MUST prioritize analytical correctness over visual convenience.

Every analytical claim should pass three questions:

### 1. Is it correct?

Does the data actually support it?

### 2. Is it meaningful?

Does it tell us something useful about WEC evolution?

### 3. Does it contribute to the story?

Does it deserve space in the final experience?

If the answer is no, the analysis may be removed.

---

# 9. Old Notebook Policy

The existing notebook:

`analysis.ipynb`

is a **historical reference only**.

It is NOT the canonical analytical source of truth.

Agents MUST NOT assume that existing analysis is correct.

The old notebook may contain:

* exploratory analysis
* incorrect assumptions
* misleading terminology
* redundant charts
* weak visualizations
* incomplete methodology
* analyses that are no longer useful

Agents are explicitly allowed to:

* rewrite analyses
* replace analyses
* delete analyses
* restructure notebook sections
* create a completely new notebook

This is encouraged when necessary.

The preferred canonical notebook is something like:

```text
wec_analytical_foundation.ipynb
```

The exact filename may be chosen by the agent if there is a better naming convention.

---

# 10. Analytical Source of Truth

The new canonical analytical notebook should become the source of truth for:

* cleaned analytical data
* entity normalization
* class normalization
* race integrity
* winner definitions
* team analysis
* manufacturer analysis
* car analysis
* tyre analysis
* speed analysis
* lap-time analysis
* circuit analysis
* analytical findings

The final website should consume validated/exported analytical data rather than depending on arbitrary notebook state.

---

# 11. Critical Analytical Definitions

## "Winner"

The existing analysis uses:

```python
df[df["class_position"] == 1]
```

This does NOT automatically mean:

> overall race winner

It may mean:

> an entry finishing first within its class.

Agents MUST explicitly audit and define what "win" means in every analysis.

Never use ambiguous language.

---

# 12. Historical Class Normalization

The project historically contains classes such as:

* LMP1
* LMP2
* LMGTE Pro
* LMGTE Am
* HYPERCAR
* potentially other historical categories

The existing analysis groups them into broad analytical categories such as:

* Hypercar
* LMP2
* GT / LMGT3

This is an **analytical normalization**, not a historical claim.

For example:

> "LMGT3 dominated the entire 2011–2023 period"

would be misleading if LMGTE Pro + LMGTE Am were combined and described as LMGT3.

A better interpretation may be:

> "The GT category accumulated more class-win records because two historical GTE categories were combined for cross-era comparison."

Agents MUST preserve this distinction.

Do not rewrite historical classes simply to make the story cleaner.

---

# 13. Entity Normalization

Team, manufacturer, driver, car and tyre names may contain:

* spelling differences
* naming changes
* sponsor naming changes
* organizational changes
* historical aliases

Normalization is allowed and often necessary.

Example:

```text
Toyota Racing
→
Toyota Gazoo Racing
```

However, normalization decisions MUST be documented.

Never merge entities merely because their names look similar.

When uncertain:

> mark the entity as UNKNOWN and investigate.

---

# 14. Team ≠ Manufacturer ≠ Car

These concepts MUST remain separate.

For example:

```text
Manufacturer
Toyota

Team
Toyota Gazoo Racing

Car
Toyota TS050 Hybrid
```

Do not treat:

* manufacturer
* team
* car model

as interchangeable.

Every visualization must make clear which entity it is analyzing.

---

# 15. GT Analysis Warning

Previous exploratory analysis suggested:

* AF Corse had many GT class wins
* Aston Martin Racing had many GT class wins

These numbers MUST be audited before being presented as findings.

Potential causes of large totals include:

* multiple cars per team
* Pro/Am aggregation
* multiple class results
* multiple races
* team naming
* duplicated entities

Do not assume the number represents "dominance" until the counting unit is understood.

---

# 16. Car Dominance Claims

Previous exploratory interpretations associated dominance with cars such as:

* Aston Martin Vantage
* Ferrari 488 GTE / 488 GTB

These may be interesting hypotheses.

They are NOT automatically established findings.

Always distinguish:

### Observation

What the dataset directly shows.

### Interpretation

A reasonable explanation based on the observed pattern.

### External/domain explanation

An explanation requiring external knowledge.

Do not present interpretation or external explanation as if it were directly proven by the dataset.

---

# 17. Tyre Analysis

Tyre manufacturer analysis must define what "most used" means.

Possible units:

* rows
* entries
* cars
* races
* seasons
* starts

These are not equivalent.

The website should never say:

> "Michelin was the most used tyre"

without defining what was counted.

---

# 18. Speed Analysis

Potentially useful metrics include:

* average speed
* fastest lap speed
* season-level speed evolution
* class-level speed evolution

However, speed comparisons across different circuits require context.

A circuit is not equivalent to another circuit.

Never imply that:

```text
Circuit A = faster than Circuit B
```

means one car/team/class is inherently faster.

Track characteristics matter.

---

# 19. Lap-Time Analysis

Raw lap time across different circuits is generally not directly comparable.

Avoid misleading charts such as:

```text
race → fastest_lap_seconds
```

with lines connecting unrelated circuits.

A better approach may involve:

* track-specific comparisons
* small multiples
* within-circuit evolution
* class-specific comparisons
* normalized metrics

Chart choice must follow the analytical question.

---

# 20. Chart Philosophy

Do NOT create a chart merely because the data can produce one.

Every chart must answer a question.

Use:

### Ranking

Horizontal bar / lollipop

### Evolution

Line chart

### Comparison

Dot plot / slope chart

### Distribution

Histogram / beeswarm

### Track comparison

Small multiples

### Composition

Stacked bar

### Timeline

Annotated scatter / timeline

Avoid pie charts unless there is a compelling analytical reason.

---

# 21. Analytical Story Structure

A useful analytical unit is:

```text
Question
↓
Data
↓
Finding
↓
Best visual
↓
Annotation
↓
Narrative
```

If a chart cannot fit into this structure, question whether it belongs in the final product.

---

# 22. Candidate Narrative

This is provisional.

The analytical audit has authority to change or remove sections.

Possible structure:

```text
01 — Hero
02 — The Grid
03 — The Winners
04 — The Teams
05 — The Machines
06 — The GT Fight
07 — The Rubber
08 — The Pace
09 — The Circuits
10 — The Lap
11 — The Thread
```

Potential interpretation:

### The Grid

How WEC's classes changed over time.

### The Winners

Who accumulated class wins.

### The Teams

Which organizations dominated different eras.

### The Machines

How car-level performance evolved.

### The GT Fight

GT competition, only if validated.

### The Rubber

Tyre landscape, only if meaningful.

### The Pace

Speed evolution.

### The Circuits

Track-specific performance.

### The Lap

Lap-time evolution.

### The Thread

Final synthesis.

Again:

> Do not force the dataset into this narrative.

If the audit reveals a better story, change it.

---

# 23. Editorial Tone

The final site should be written in English.

The writing should be:

* clear
* conversational
* confident
* analytical
* curious
* concise

Avoid overly academic language.

Preferred style:

> "Toyota didn't just win. They kept winning."

Rather than:

> "Toyota demonstrated a statistically significant degree of competitive dominance across the observational period."

The project is analytical, but it should still feel human.

---

# 24. Product Personality

The intended personality combines:

* serious data analyst
* motorsport enthusiast
* curious developer

The website should feel like:

> someone investigated the data deeply and wants to show you what they found.

Not:

> a corporation publishing an annual report.

---

# 25. Navigation

Navigation should remain minimal.

Preferred direction:

* minimal sticky top navigation
* progress indicator
* chapter awareness
* scroll-driven progression

Avoid large navigation systems.

The user should feel:

> "I am reading a story."

Not:

> "I am operating a dashboard."

---

# 26. Interactivity

Preferred interaction level:

**Scroll + hover + click**

But interaction should remain purposeful.

Good:

* hover to reveal exact values
* scroll to change chart state
* click to inspect a specific entity
* pinned chart reacting to narrative
* image movement tied to story progression

Bad:

* dozens of filters
* dashboard-style dropdowns everywhere
* excessive toggles
* complicated control panels
* interaction for interaction's sake

---

# 27. Photography

Photography is an important storytelling layer.

Possible sources:

* official race photography
* official press photography
* historical motorsport imagery
* car/team photography
* transparent vehicle cutouts where appropriate

Use photography to establish:

* era
* emotion
* machinery
* scale
* transition

Photography must support the analysis.

Do not turn the project into a photo gallery.

---

# 28. Film Grain

Film grain may be used as a subtle photographic texture.

It must remain:

* subtle
* restrained
* atmospheric

It should never become an obvious visual filter.

---

# 29. Accessibility

The final implementation MUST consider:

* keyboard navigation
* semantic HTML
* contrast
* screen-reader structure
* reduced motion
* responsive layouts

Always support:

```css
@media (prefers-reduced-motion: reduce)
```

---

# 30. Responsive Design

The experience must work across:

* desktop
* laptop
* tablet
* mobile

Do not assume that scroll-driven desktop interactions can simply shrink onto mobile.

Mobile may require alternate interaction patterns.

---

# 31. Existing Implementations

The repository currently contains previous implementations, including:

* Streamlit
* Dash
* existing notebook analysis

These are historical/reference implementations.

They should NOT automatically dictate the architecture of the new product.

The old implementations may be useful for:

* understanding previous analysis
* recovering data transformations
* understanding existing calculations
* comparing results

But they should not be treated as the final product direction.

---

# 32. Development Philosophy

The project should be developed in stages.

## Phase 0 — Repository Reconnaissance

Understand:

* repository structure
* data files
* notebooks
* existing apps
* scripts
* dependencies
* generated data
* documentation

No major changes yet.

---

## Phase 1 — Analytical Audit

Audit:

* dataset integrity
* schema
* missing values
* duplicates
* entities
* historical classes
* race structure
* winners
* teams
* manufacturers
* cars
* tyres
* speeds
* lap times
* circuits

Challenge existing assumptions.

---

## Phase 2 — Analytical Foundation

Create a new canonical notebook.

Suggested name:

```text
wec_analytical_foundation.ipynb
```

This notebook should contain the validated analysis.

---

## Phase 3 — Findings

Produce an analytical findings report.

Every major finding should contain:

```text
Finding
Evidence
Confidence
Interpretation
Caveat
Potential visualization
```

Confidence:

* HIGH
* MEDIUM
* LOW

---

## Phase 4 — Narrative Design

Only after the analysis is validated should the final story structure be designed.

---

## Phase 5 — Design System

Define:

* typography
* spacing
* color
* chart language
* motion
* photography treatment
* responsive behavior

---

## Phase 6 — Web Implementation

Only after analytical and narrative foundations are stable.

---

# 33. Current Development State

Agents MUST update this section whenever meaningful project progress occurs.

Current state:

```text
PROJECT STATUS:
Phase 3C Refinement 5 completed. The ScaleScatter visualization has been transformed into a living system. A continuous `d3.timer` interpolation loop now provides subtle, deterministic ambient motion (via sinusoidal noise) to all data points at all times. Hovering acts as a global stimulus, creating a smooth, organic repulsive force field around the pointer. Instead of a hard toggle, populations organically deform away from the cursor while maintaining cohesion, creating negative space for the data labels. The entrance animation was significantly slowed down and staggered to feel cinematic and organic as the reader scrolls.

CURRENT PHASE:
Phase 3C Refinement 5 → Phase 3D (Chapter 03)

COMPLETED:
- Project concept established
- Existing Streamlit/Dash implementations identified as references
- Existing notebook identified as historical reference only
- Final product direction established
- Editorial/scrollytelling direction established
- tej.as/story identified as the storytelling philosophy reference
- Visual direction established
- Analytical philosophy established
- Repository reconnaissance and data audit completed
- Canonical analytical notebook created
- Phase 1 Rigorous Verification Pass completed
- Phase 1.1 Analytical Integrity Remediation completed
- Phase 1.2 Final Analytical Reconciliation completed
- Phase 2A Analytical Story Architecture generated
- Phase 2A.5 Repository Organization & Legacy Separation completed
- Phase 2B Frontend Product Architecture & Scaffolding completed
- Phase 3A First Editorial Vertical Slice completed
- Phase 3A.1 Editorial Refinement completed
- Phase 3B Chapter 02 Implementation completed
- Phase 3C Scrollytelling Refinement completed





CURRENT TASK:
None (Awaiting next phase instructions)

NEXT EXPECTED STEP:
Plan the website frontend architecture and begin UI prototyping based on the recommended narrative.

UI IMPLEMENTATION:
NOT STARTED

FINAL STORY:
DRAFTED (See recommended_narrative.md)

ANALYTICAL FINDINGS:
VALIDATED (See analytical_findings.md)

CANONICAL NOTEBOOK:
CREATED (notebooks/wec_analytical_foundation.ipynb)
```

---

# 34. Agent Handoff Protocol

Whenever an agent starts work:

1. Read `AGENTS.md`.
2. Inspect the repository state.
3. Determine the current phase.
4. Inspect recent changes.
5. Check whether another agent has modified the analytical assumptions.
6. Continue from the current state.
7. Do not restart work unnecessarily.

Before ending meaningful work, update:

```text
Current Development State
```

and record:

* what was completed
* what changed
* important findings
* unresolved questions
* files created/modified
* next recommended step
* known risks

---

# 35. Change Log

Agents should append meaningful milestones here.

## 2026-10-09 — Agent / Gemini 3.1 Pro

Phase: Phase 0/1
Task: WEC Analysis 2011–2023 — Analytical Audit & Foundation

Completed:
- Repository and dataset audit.
- Generated new canonical notebook `wec_analytical_foundation.ipynb`.
- Created artifacts: `repository_audit.md`, `analytical_audit.md`, `data_quality_report.md`, `analytical_findings.md`, `recommended_narrative.md`, `remaining_questions.md`.

Findings:
- Identified 24 exact duplicate pairs in the dataset.
- Verified GT competition requires separate handling from Hypercar, as the previous notebook anachronistically grouped them into 'LMGT3'.
- Noted varying tracks necessitate circuit-specific pace measurements rather than global connecting lines.

Decisions:
- Dropped exact duplicates.
- Added normalized mapping for class (`GT (GTE Pro/Am)` instead of `LMGT3`).
- Ensured pace is measured contextually via `fl_kph_average` within each circuit.
- Recommended a 6-chapter editorial narrative based on the new validated findings.

Files changed:
- Added `notebooks/wec_analytical_foundation.ipynb`.
- Created detailed markdown reports in artifact directory.
- Updated `AGENTS.md` status.

Remaining:
- How to appropriately link team/manufacturer for GT classes.
- Whether DNF cars are ever classified as `class_position == 1`.
- How double-header races (e.g. 2019-2020 Bahrain 1 & 2) should be displayed in the UI chronologically.

## 2026-10-09 — Agent / Gemini 3.1 Pro (Verification)

Phase: Phase 1
Task: Phase 1 Verification Pass

Completed:
- Deep verification of exact duplicates (Confirmed mathematically impossible to be separate races; 2019-2020 Bahrain copy-paste error).
- Delineated `overall_position == 1` vs `class_position == 1`.
- Verified Toyota dominance (45 Top Class wins, all Overall wins).
- Assessed GT counts (Revealed AF Corse & Aston Martin numbers are inflated by multi-car entries across both Pro and Am classes).
- Created `analytical_verification_report.md`.

Findings:
- Michelin was downgraded from "monopoly" to "majority" (68.5% of entries).
- Re-confirmed that mapping GTE to LMGT3 is historically invalid; canonical notebook uses `GT (GTE Pro/Am)`.
- Re-confirmed lap time continuity between different circuits is mathematically invalid.

Decisions:
- The `wec_analytical_foundation.ipynb` is declared robust and PASSED verification.

Remaining:
- Need to substring/parse the `vehicle` column if Manufacturer-level aggregation (rather than Team-level) is required in the UI.

## 2026-10-09 — Agent / Gemini 3.1 Pro (Phase 1.1 Remediation)

Phase: Phase 1.1
Task: Analytical Integrity Remediation

Completed:
- Fully remediated the `notebooks/wec_analytical_foundation.ipynb` to enforce rigorous analytical integrity.
- Re-executed canonical notebook non-interactively to verify reproducibility and artifacts generation.
- Created `analytical_integrity_remediation.md`.

Findings:
- Re-established `event_id = season + race` to guarantee race-level uniqueness (exactly 85 unique events and 85 unique overall winners).
- Confirmed Michelin tyre share mathematically (68.5% over 3011 entries).
- Established formal Counting Units (`Overall wins`, `Class wins`, `Tyre assignments`, `Car entries`).

Decisions:
- Stripped the unsupported causal claim regarding Hypercar's cost-control speed reduction, replacing it purely with the observed metric change.
- Ensured GT wins are explicitly contextualized against the number of unique vehicles fielded (e.g. AF Corse's 11 vehicles).

Remaining:
- Driver-level analytics remain out of scope for current datasets.
- Track condition (weather) variance cannot be resolved via available WEC CSV data.

## 2026-10-09 — Agent / Gemini 3.1 Pro (Phase 1.2 Reconciliation)

Phase: Phase 1.2
Task: Final Analytical Reconciliation

Completed:
- Executed strict mathematical reconciliation of all numerical discrepancies arising between Phase 1 and Phase 1.1.
- Updated `notebooks/wec_analytical_foundation.ipynb` to reflect the final reconciled values securely post-deduplication.
- Created `analytical_reconciliation_report.md` locking in Final Canonical Metrics.

Findings:
- Reconciled 86 vs 85 events: The 2019-2020 Bahrain duplicate rows included an exact copy of the overall winner. After strict sequence deduplication, the true canonical overall winner count is precisely 85 across exactly 85 unique events.
- Reconciled Toyota Dominance: The previous 45 Top-Class count was inflated by the single Bahrain duplicate. Toyota's true, canonical, deduplicated Top-Class win count is 44.
- Reconciled Tyre Denominator: Of the 24 duplicate ghost rows removed, 22 possessed Michelin tyres. Thus, Michelin tyre assignments dropped from 2079 to 2057 out of a final denominator of 3011 (68.3%).

Decisions:
- The 44 Toyota victories and 85 Race Events are now the authoritative headline numbers to be used globally across the UI.

Remaining:
- No remaining numerical discrepancies. Analytical foundation is locked.

## 2026-10-09 — Agent / Gemini 3.1 Pro (Phase 2A Architecture)

Phase: Phase 2A
Task: Analytical Story Architecture

Completed:
- Designed the editorial narrative arc based securely on the Phase 1.2 reconciled metrics.
- Generated the `phase_2_story_architecture.md` blueprint outlining a 5-chapter scrollytelling journey.
- Separated direct data observations from external interpretations.

Findings / Direction:
- Central Thesis: WEC is defined by two distinct battlegrounds—top-class manufacturer attrition (Toyota) and GT volume/armadas (AF Corse).
- Selected Chart Types: Scatter dot-multiplication (scale), Cumulative line chart (Top-Class dominance), Barbell/Dot Plot (GT volume), 100% Stacked Area (Tyres), and Min-Lap Line Chart (Pace).
- Rejected Chart Types: Cross-circuit speed averages, un-normalized raw row counts.

External Context Requirements Identified:
- Porsche/Audi LMP1 exits (cost escalation).
- Hypercar regulation origins (convergence/cost-capping).
- Pro/Am FIA driver categorisation rules.

## 2026-10-09 — Agent / Gemini 3.1 Pro (Phase 2A.5 Repository Organization)

Phase: Phase 2A.5
Task: Repository Organization & Legacy Separation

Completed:
- Audited the entire file tree to separate the current analytical pipeline from historical prototype artifacts.
- Created `legacy/` directory and isolated Streamlit and Dash implementations into `legacy/streamlit/` and `legacy/dash/`.
- Moved the canonical notebook to `analysis/notebooks/wec_analytical_foundation.ipynb`.
- Audited and updated all broken absolute/relative paths globally, preserving the integrity of the data pipeline.
- Re-executed the canonical notebook to verify no disruptions occurred to the Phase 1.2 locked metrics (85 events, 85 overall winners, 44 Toyota Top-Class wins, 68.3% Michelin share). 
- Generated `docs/repository_map.md` and `docs/repository_organization_report.md`.
- Rewrote the global `README.md` to reflect the interactive editorial data story identity and direct users to `AGENTS.md`.

Development Rules Added:
- **Legacy UI Rule**: Do not treat the legacy Streamlit or Dash code as the current frontend architecture. They are historical reference only. Do not deploy or modify them.
- **Source-of-Truth Rule**: `AGENTS.md` and the canonical analytical exports in `data/processed/` remain the absolute source of truth.

Next step:
- Transition to Phase 3: Implementation of the interactive story (Chapter 01, etc.) using the established scaffolding.

## 2026-10-09 — Agent / Gemini 3.1 Pro (Phase 2B Frontend Product Architecture & Scaffolding)

Phase: Phase 2B
Task: Frontend Product Architecture & Technical Scaffolding

Completed:
- Designed and documented the frontend architecture for the interactive editorial data story in `docs/frontend_architecture.md`.
- Chose **Vite + React + TypeScript** as the framework (fast, robust static SPA without unnecessary SSR complexity).
- Chose **CSS Modules + Vanilla CSS Variables** for lightweight, strictly scoped design tokens (defined Dark/Light themes and typography scales).
- Chose **D3.js** for bespoke analytical visualization, keeping logic deeply semantic rather than obscured by generic chart wrappers.
- Chose **Framer Motion** for performant, accessible scroll-driven animations and state transitions.
- Defined a strict **Frontend Data Contract** in `docs/frontend_data_contract.md`, ensuring the React frontend strictly consumes `wec_analytical_foundation.ipynb` outputs and performs zero analytical recalculation.
- Mapped out the component hierarchy (`docs/frontend_component_map.md`) and scrollytelling interaction mechanics (`docs/frontend_interaction_architecture.md`).
- Scaffolded the frontend inside `web/` with strict directory structures (`components`, `chapters`, `visualizations`, `data`, `styles`).
- Set up a testing and validation foundation via **Vitest**.
- Executed `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test`, and `npm run build`. The build pipeline successfully produces a static HTML/JS/CSS artifact without errors.

Next step:
- Transition to Phase 3: Component and Story Implementation. Begin actively implementing the chapters, starting with Chapter 01 (The Anatomy).

## 2026-10-09 — Agent / Gemini 3.1 Pro (Phase 3A First Editorial Vertical Slice)

Phase: Phase 3A
Task: First Editorial Vertical Slice (Hero + Chapter 01)

Completed:
- Created the **Global Navigation** (`SiteHeader`) with minimal, restrained styling.
- Built the **Hero component** featuring a placeholder image composition with a gradient overlay, restrained cinematic entrances via Framer Motion, and precise typography mimicking a premium data publication.
- Extended the analytical notebook `wec_analytical_foundation.ipynb` to securely export `dataset_scale.json` and `entry_dots.csv` directly into the frontend `web/src/data` folder.
- Developed the **Chapter 01 (The Anatomy)** narrative section with full scroll-driven state derivation via Intersection Observers.
- Implemented **ScaleScatter**, a React/D3 visualization that physically renders 3,011 SVG circles. On scroll step 0, it renders as a massive grid indicating the sheer volume of valid entries. On step 1, a D3 force simulation animates the dots into distinct class clusters (GT, LMP2, Top Class, Experimental) with CSS-animated annotations.
- Implemented **ChapterTransition**, ensuring a smooth editorial handoff toward Chapter 02.
- Validated mobile-first CSS architecture for the sticky/overlay scrollytelling container.
- Execution pipeline (`format`, `lint`, `typecheck`, `test`, `build`) passes flawlessly.

Known Limitations / Caveats:
- Visual QA via the automated browser subagent failed due to a Playwright driver (404) environment error. Human visual verification is required.
- Hero imagery relies on a programmatic placeholder pending final asset acquisition.

Next step:
- Transition to Phase 3B: Chapter 02 Implementation (The Last Manufacturer Standing), focusing on the longitudinal Toyota step-chart.

## 2026-10-09 — Agent / Gemini 3.1 Pro (Phase 3A.1 & Phase 3B)

Phase: Phase 3B
Task: Phase 3A.1 Editorial Refinement + Phase 3B Chapter 02

Completed (3A.1):
- Refined Hero spacing by decreasing `min-height` to `85vh` and centering the content, eliminating the massive vertical gap.
- Improved `ScaleScatter` typography legibility by applying deep text-shadows (`rgba(0,0,0,0.8)`) and a subtle translucent radial gradient backdrop to the annotation nodes, solving the contrast issue against moving dots.
- Tightened scroll/narrative synchronization by switching the `IntersectionObserver` to trigger strictly at the viewport center (`rootMargin: "-40% 0px -40% 0px"`).

Completed (3B):
- Extended canonical exports in `wec_analytical_foundation.ipynb` to generate `mfg_season_wins.csv` (mapping Toyota's 44 overall top-class wins cumulatively against rivals).
- Created **Chapter 02 (The Last Manufacturer Standing)** highlighting the Toyota persistence narrative.
- Built **ManufacturerPersistence**, a new D3 visualization plotting cumulative wins over time. Unveils all competitors in Step 1, then highlights Toyota reaching 44 wins in Step 2.
- Cleanly integrated the new chapter into `App.tsx` following the established strict layout hierarchy.
- Confirmed full QA pipeline (`format`, `lint`, `typecheck`, `test`, `build`) passes.

Next step:
- Transition to Phase 3C: Chapter 03 Implementation (The Architecture of Dominance).

## 2026-10-09 — Agent / Gemini 3.1 Pro (Phase 3C)

Phase: Phase 3C
Task: Scrollytelling Refinement, ScaleScatter Redesign, and Chapter 02 Chart Polish

Completed:
- Re-architected `Chapter01` and `ScaleScatter` interaction model using `framer-motion`'s `useScroll` hook to map scroll progression deterministically to the D3 visualization frame-by-frame. Reverse, fast, and slow scrolling now maintain perfect narrative sync.
- Improved `ScaleScatter` responsiveness. The node radius scales dynamically based on container area size via `ResizeObserver`. Pre-calculated D3 force layout ensures optimal rendering bounds, and nodes visually never escape the container boundaries.
- Re-designed the `ScaleScatter` annotation UI into editorial technical telemetry panels. Utilizing monospace typography, thin translucent borders, and robust structural containers that fade in deterministically.
- Improved `ManufacturerPersistence` (Chapter 02 D3 Chart). Reconfigured X/Y margins to eliminate origin tick collisions. Appended precise "Season" and "Cumulative Top-Class Wins" axis labels.
- Added direct line labeling for Chapter 02 (Toyota highlighted, rivals correctly identified as subdued telemetry tails) enhancing immediate readability.
- Retained strict boundaries across the dataset contract and preserved the dark cinematic identity. Full automated suite tested and passed.

Next step:
- Transition to Phase 3D: Chapter 03 Implementation (The Architecture of Dominance).

## 2026-10-09 — Agent / Gemini 3.1 Pro (Phase 3C Refinement)

Phase: Phase 3C Refinement
Task: ScaleScatter Interaction, Chapter 02 Sync & Spacing

Completed:
- Increased `ScaleScatter` safe area container bounds multiplier from 0.6 to 0.85, retaining responsivenes while increasing physical node sizing.
- Added mouse and touch hover interactions to `ScaleScatter` semantic cluster annotations, executing a D3 opacity transition across unhovered nodes to emphasize the target cluster.
- Re-architected `Chapter02.tsx` to utilize `framer-motion` `useScroll`, completely replacing `IntersectionObserver` step logic. Passed `progress` into `ManufacturerPersistence.tsx` for fully deterministic stroke drawing and Toyota highlighting based on scrolling position.
- Repaired the 2017 -> 2021 gap in `ManufacturerPersistence.tsx`. Discovered the analytical artifact natively exported `2018-2019` strings but the visualization improperly attempted to cast these into Numbers (`NaN`), causing them to drop out of continuous linearity. Replaced `scaleLinear` with `scalePoint` across the raw string categorical domain, explicitly honoring the WEC super seasons and preserving chronological integrity without visually distorting the gap.
- Increased Manufacturer label standoff margin from +12 to +24 for layout precision.
- Changed scrollytelling steps from strict `100vh` to `min-height: 40vh` padded by `50vh` terminal spacers. This massively improved paragraph density and narrative continuity without deleting vertical rhythm space.
- Cleanly passed validation suite (`format:check`, `lint`, `typecheck`, `test`, `build`).

Next step:
- Transition to Chapter 03 Implementation (The Architecture of Dominance).

## 2026-10-09 — Agent / Gemini 3.1 Pro (Phase 3C Refinement 2)

Phase: Phase 3C Refinement 2
Task: ScaleScatter Native Focus Reveal, Scroll Pacing & Editorial Photography

Completed:
- Restored `ScaleScatter` radius scaling to its original impact footprint by setting `safeArea` natively against `width * height`, capping `maxRadius` safely to 4.
- Completely removed HTML/DOM annotation panels from `ScaleScatter`, replacing them with native SVG `<g>` groups and text labels synced directly to the cluster centroids.
- Re-architected hover interactions inside `syncNodes`. On pointer move, the nearest cluster is identified, triggering a smooth dimming (`0.25s` opacity transition) on unselected groups, while actively hovered nodes are organically repelled outward by 20% from their centroid, creating a "blooming" analytical reveal that respects strict determinism.
- Added explicit "Experimental / Prototype" labeling to the formerly isolated bottom-left cluster.
- Implemented `EditorialPhoto` generic component using `framer-motion` `whileInView`, introducing cinematic delayed image reveals between narrative blocks.
- Added a `150vh` `.releaseZone` at the end of Chapter 01 to allow the user a persistent reading window while the animation sequence locks at 100%.
- Refined Toyota's end-line label in `ManufacturerPersistence.tsx` to center cleanly above the final scatter coordinate, resolving boundary collision issues.
- Cleanly passed validation suite.

Next step:
- Transition to Phase 3D: Chapter 03 Implementation (The Architecture of Dominance).

## 2026-10-09 — Agent / Gemini 3.1 Pro (Phase 3C Refinement 3)

Phase: Phase 3C Refinement 3
Task: ScaleScatter Bloom Animation & Interactive Manufacturer Lines

Completed:
- ScaleScatter radius bounding was raised to `Math.min(maxRadius, 8)`, successfully restoring the original majestic visual scale of the scatter layout.
- Rewrote the hover behavior in `syncNodes` to incorporate a genuine *bloom* interaction. When hovered, the nodes calculate their vector relative to the cluster centroid and push radially outward by `50px` plus a fractional displacement, creating an organic central void perfectly sized for the native SVG text labels.
- Adjusted hit-area logic for ScaleScatter to measure distance-to-cluster-centroid against unbloomed node coordinates (`d.gridX` / `d.clusterX`), entirely eliminating hover flicker.
- Formatted `ScaleScatter` SVG text into a stark three-tier hierarchy (Category → Large Value → "ENTRIES").
- Modified `ManufacturerPersistence.tsx` to include an invisible `30px` hit-area path for every line, introducing robust interactivity across all manufacturers.
- Built a non-destructive state overlay mapping `hoveredMfgRef.current` against the existing `drawT` and `highlightT` progression variables. This ensures hovering Porsche dims Toyota smoothly without permanently altering Toyota's unique narrative Step 2 emphasis.
- Ensured validation suite (lint, typecheck, build) continues to pass cleanly.

Next step:
- Transition to Phase 3D: Chapter 03 Implementation (The Architecture of Dominance).

## 2026-10-09 — Agent / Gemini 3.1 Pro (Phase 3C Refinement 5)

Phase: Phase 3C Refinement 5
Task: Living ScaleScatter System, Global Stimulus Interaction & Cinematic Entrance

Completed:
- Added a permanent `d3.timer` loop that adds deterministic, phase-staggered sinusoidal ambient motion to all nodes. The visualization feels alive even when resting.
- Rewrote the hover logic to treat the pointer as a global repulsive stimulus with a smoothed decay radius (200px) that softly pushes nodes away mathematically to form a 60px void.
- Smoothly interpolated pointer target strength and coordinates so that fast mouse movements gracefully drag the void through the population field rather than instantly popping nodes.
- Displayed the active cluster's semantic information directly inside the negative space created by the pointer, acting as a contextual lens.
- Made the global scroll-driven entrance cinematic by significantly expanding `.stepSpacer` and assigning a staggered index-based time window to each node, ensuring they organically dissolve into their clusters.
- Preserved perfect deterministic scroll linkage without introducing runaway physics or random jitter.

Next step:
- Transition to Phase 3D: Chapter 03 Implementation (The Architecture of Dominance).







Format:

```text
## YYYY-MM-DD — Agent / Model

Phase:
Task:

Completed:
- ...

Findings:
- ...

Decisions:
- ...

Files changed:
- ...

Remaining:
- ...

Next step:
- ...
```

Do not record trivial formatting changes.

---

# 36. Analytical Integrity Rules

These are NON-NEGOTIABLE.

### Never manipulate data to fit the narrative.

### Never invent a finding.

### Never invent a causal explanation.

### Never hide an inconvenient result.

### Never rename historical categories without documenting the transformation.

### Never present an analytical normalization as historical fact.

### Never confuse team, manufacturer, and car.

### Never compare incomparable metrics without normalization/context.

### Never use a chart solely because it looks impressive.

### Never sacrifice analytical correctness for visual design.

### Never remove an inconvenient finding simply because it makes the story less exciting.

---

# 37. AI Agent Behavior

AI agents are expected to behave as:

> research collaborators + software engineers + analytical reviewers

Not as blind code generators.

Before writing substantial code, understand why the code is needed.

When uncertain:

* investigate
* inspect source data
* test assumptions
* document uncertainty

Do not silently guess.

When an existing implementation is questionable:

> challenge it.

When the data contradicts the desired narrative:

> trust the data.

---

# 38. Model / Effort Guidance

For analytical audits, data validation, architecture decisions, and complex reasoning:

**Recommended model: Gemini 3.1 Pro**
**Recommended effort: High**

For this project, prioritize reasoning quality over generation speed.

Do not switch to a weaker/faster model for tasks involving:

* analytical validation
* data definitions
* statistical interpretation
* narrative decisions
* architecture decisions
* major refactoring

A faster model may be appropriate for trivial formatting or mechanical tasks only.

---

# 39. Definition of Done

A phase is NOT complete merely because code runs.

A phase is complete when:

* the reasoning is documented
* the implementation works
* assumptions are explicit
* findings are validated
* limitations are understood
* the next phase is clearly defined

For analytical work specifically:

> "It runs" ≠ "It is correct."

---

# 40. Final Product Principle

The ultimate goal is not to make the most complicated WEC website.

The goal is to create a product where:

> **The data tells a story, and the interface makes that story easier to understand.**

The strongest final result should make the viewer think:

> "I didn't just look at WEC statistics. I understood how the championship evolved."

And from a portfolio perspective:

> "This person can turn messy historical data into a coherent analytical product."

---

# 41. Important Instruction to Future Agents

If you are a new agent entering this repository:

**Do not assume previous agents were correct.**

Read their work.

Understand their reasoning.

Validate important assumptions.

Preserve good decisions.

Correct bad decisions.

Document meaningful changes.

And most importantly:

> **Do not rush into building the website.**

The analytical foundation comes first.
