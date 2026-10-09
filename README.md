# WEC Analysis 2011–2023

**13 Years. Hundreds of Races. One Evolving Championship.**

WEC / 2011–2023 is an interactive long-form editorial data story built from a validated analytical foundation. It explores the evolution of the FIA World Endurance Championship, focusing on the endurance battles of the Top Class and the logistical volume of the GT ecosystem.

## Current Project Status
The project is currently in active development. 

The analytical foundation (Phase 1) has been rigorously verified, deduped, and reconciled. The story architecture (Phase 2A) has been mapped. We are currently preparing to scaffold the frontend web application (Phase 2B).

**Note for Developers:** 
The previous Streamlit and Dash implementations have been formally retired and moved to the `legacy/` directory. They are preserved for historical reference and UI inspiration only. **Do not use them as the base for the new web product.**

## Repository Map
For a full breakdown of the directory structure, please read:
[Repository Map](docs/repository_map.md)

## Source of Truth
All agents, AI assistants, and human contributors MUST read `AGENTS.md` before making any modifications to this repository. `AGENTS.md` serves as the persistent context and operating contract for the project.

## Quick Links
- [AGENTS.md](AGENTS.md) - Operating instructions and project state.
- [Canonical Notebook](analysis/notebooks/wec_analytical_foundation.ipynb) - The source of truth for all data aggregation.
- [Story Architecture](docs/repository_organization_report.md) - Find artifacts and blueprints in the `.gemini/` directory or project docs.
