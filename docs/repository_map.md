# Repository Map

## Current Product
- **`web/`**: The target directory for Phase 2B. This will house the interactive long-form editorial data story web application (e.g. Next.js or Vite). Currently empty, waiting for scaffolding.

## Analytical Foundation
- **`analysis/notebooks/wec_analytical_foundation.ipynb`**: The sole canonical source of truth for all data derivations. This notebook processes the raw data, enforces deduplication, and exports the metrics driving the story.

## Data
- **`data/raw/`**: The untampered original dataset (`wec_data.csv`).
- **`data/processed/`**: The generated outputs produced by the canonical analytical notebook (e.g., `wec_cleaned.csv`). The frontend should exclusively consume files from this directory.

## Documentation
- **`AGENTS.md`**: The primary persistent context and operating contract for the project. Mandatory reading for all agents/developers.
- **`README.md`**: Project overview.
- **`docs/`**: Active documentation regarding repository status and architecture.

## Historical / Reference Material
- **`docs/historical/`**: Old markdown reports, deployment guides, and feature logs from previous prototyping phases. Kept purely for archaeological reference.

## Legacy Streamlit
- **`legacy/streamlit/`**: The abandoned Phase 0 Streamlit implementation. Preserved strictly for UI/charting inspiration. Do not deploy or modify.

## Legacy Dash
- **`legacy/dash/`**: The abandoned Phase 0 Dash implementation. Preserved strictly for UI/charting inspiration. Do not deploy or modify.

## What New Contributors Should Ignore
- Ignore the entire `legacy/` directory and `docs/historical/`. They are not part of the active development pipeline and their code does not reflect the current product direction.

## What New Contributors Should Read First
1. `AGENTS.md` - For the source-of-truth hierarchy and agent rules.
2. `docs/repository_map.md` - For orientation.
3. The artifacts generated in Phase 2A (`phase_2_story_architecture.md`) to understand the product direction.
