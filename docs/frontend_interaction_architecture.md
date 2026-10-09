# Frontend Interaction Architecture

## Scrollytelling Mechanics
We use a **Scroll-driven State Architecture** using Framer Motion and standard Intersection Observers.

1. **ScrollyContainer**: A `position: relative` container spanning multiple viewports (e.g., `400vh`).
2. **ScrollyGraphic**: A `position: sticky; top: 0; height: 100vh;` container holding the chart.
3. **ScrollyStep**: `position: relative; height: 100vh;` elements containing the narrative text overlaying or beside the graphic.
4. **State Derivation**: As a `ScrollyStep` crosses the center of the viewport (via IntersectionObserver), an active `stepIndex` is updated. 
5. **Chart Reaction**: The `Visualization` component receives the `stepIndex` and animates its D3 selections or Framer Motion states (e.g., highlighting Toyota's line, greying out Audi).

## Animation Philosophy
- **Restraint**: Animations strictly map to analytical change.
- **Accessibility**: All `Framer Motion` elements must check `useReducedMotion()`. If true, transitions are set to `duration: 0` (instant state jumps).

## Responsive Strategy (Mobile-First)

### Desktop (>= 1024px)
- Scrollytelling uses a **Split-Screen** layout.
- Graphic is sticky on the left (or right) taking up 60% of width.
- Narrative text scrolls on the opposite side taking up 40% of width.

### Tablet (768px - 1023px)
- Scrollytelling uses an **Overlay** layout.
- Graphic is sticky and full width (behind the text).
- Narrative text scrolls over the graphic with a heavy glassmorphism/blur background (`backdrop-filter: blur(10px)`) to ensure text readability.

### Mobile (< 768px)
- Scrollytelling is **Flattened**.
- Sticky behavior is disabled to prevent mobile viewport height jump issues (Safari bottom bar).
- Visualizations are rendered as static, sequential charts interleaved directly between the narrative text paragraphs.

## Typography & Accessibility
- Focus states heavily defined (`outline: 2px solid var(--primary)`).
- Semantic HTML tags (`<article>`, `<section>`, `<figure>`, `<figcaption>`).
- Charts include an `.sr-only` `<table>` version of their data for screen readers.
