# Frontend Component Map

The application follows a strict modular hierarchy designed for long-form editorial content. No generic, monolithic page components.

## Component Tree

```text
App
├── Layout
│   ├── SiteHeader (Navigation, Progress bar)
│   ├── MainContent (Scroll container)
│   └── SiteFooter (Credits, Methodology)
│
├── Story
│   ├── Hero (Title, Tagline, Cinematic entry)
│   │
│   ├── Chapter (Wrapper for a narrative section)
│   │   ├── ChapterHeader (Title, intent)
│   │   ├── ScrollyContainer (Sticky visualization + scrolling text)
│   │   │   ├── ScrollyGraphic (Sticky position)
│   │   │   │   └── Visualization (D3 Chart instances)
│   │   │   └── ScrollyStep (Scrolling text block)
│   │   │       ├── NarrativeText (Editorial copy)
│   │   │       └── Annotation (Callouts)
│   │   └── ChapterTransition (Photography/breathing room)
│   │
│   └── Conclusion (Final thesis wrap-up)
│
├── Visualizations (Pure D3/React bridging components)
│   ├── ChartBase (SVG/Canvas wrapper, ResizeObserver)
│   ├── ScaleScatter (Chapter 1)
│   ├── CumulativeLine (Chapter 2)
│   ├── ArmadaPlot (Chapter 3)
│   ├── StackedArea (Chapter 4)
│   └── PaceLine (Chapter 5)
│
└── UI
    ├── Typography (H1, H2, Body, Caption, TelemetryData)
    └── Structural (Container, Grid, SplitScreen)
```

## Visualization Component Boundary
A `Visualization` component is strictly responsible for rendering. It receives:
1. `data`: Strictly typed JSON.
2. `dimensions`: Provided by `ChartBase`.
3. `progress` / `step`: From the ScrollyContainer to drive animations.
It does NOT fetch data or compute analytical metrics.
