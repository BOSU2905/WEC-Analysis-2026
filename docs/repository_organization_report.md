# Repository Organization Report

## Before
The repository previously contained a flat, chaotic mix of files from multiple lifecycle phases. The root directory was polluted with legacy Streamlit and Dash deployments, old exploratory notebooks, processing scripts, generated reports, and configuration files. This created architectural risk by muddying the boundary between the active "Phase 2 Web Product" and abandoned prototypes.

## Classification

| File / Directory | Category | Current Status | Action |
| ---------------- | -------- | -------------- | ------ |
| `wec_analytical_foundation.ipynb` | Analytical Foundation | Canonical | MOVED to `analysis/notebooks/` |
| `analysis.ipynb` | Historical Reference | Legacy | MOVED to `legacy/notebooks/` |
| `Data/raw/*` | Data | Canonical | MOVED to `data/raw/` |
| `Data/processed/*` | Generated Artifacts | Canonical | MOVED to `data/processed/` |
| `.streamlit`, `app.py`, `app_simple.py`, `run.sh` | Legacy Streamlit | Historical Code | MOVED to `legacy/streamlit/` |
| `app_dash.py`, `run_dash.sh`, `preview_generator.py` | Legacy Dash | Historical Code | MOVED to `legacy/dash/` |
| `requirements.txt` | Configuration | Legacy | MOVED to `legacy/` |
| `*.md` (Old reports) | Historical / Reference | Deprecated | MOVED to `docs/historical/` |
| `AGENTS.md` | Documentation | Core Product | KEEP in `/` |
| `README.md` | Documentation | Core Product | KEEP in `/` |

## After
The final directory tree enforces a strict semantic boundary:

```
WEC-Analysis-2026/
├── AGENTS.md
├── README.md
├── analysis/
│   └── notebooks/
│       └── wec_analytical_foundation.ipynb
├── data/
│   ├── raw/
│   └── processed/
├── docs/
│   ├── historical/
│   ├── repository_map.md
│   └── repository_organization_report.md
├── legacy/
│   ├── dash/
│   ├── notebooks/
│   └── streamlit/
└── web/ (Phase 2B scaffolding target)
```

## Validation
- **Analytical validation**: Re-ran `wec_analytical_foundation.ipynb` end-to-end. Execution succeeded. 
- **Metrics check**: 85 events, 85 overall winners, Toyota 44 wins, 68.3% Michelin share strictly preserved.
- **Broken Reference search**: Searched for old paths (`Data/raw/wec_data.csv`) and successfully updated them inside `wec_analytical_foundation.ipynb` and the legacy python scripts to use the correct `../../data/raw/wec_data.csv` relative paths.
- **Git State**: All structural changes tracked cleanly via `git mv` and `git add`.

## Remaining Cleanup Candidates
- `legacy/` directory is intentionally preserved for Phase 2 implementation context (chart formats, component ideas), but is a strong candidate for deletion in Phase 3 once the Next.js/Vite frontend is fully stabilized.
