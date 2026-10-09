# Frontend Architecture

## Framework

**Decision**: Vite + React + TypeScript
**Reasoning**: A single-page interactive long-form editorial story does not require complex server-side routing or Server-Side Rendering (SSR) data fetching APIs that Next.js provides. Vite provides an incredibly fast, lightweight, and robust bundling environment for a static React SPA. TypeScript enforces the frontend data contracts strictly.
**Alternatives considered**: Next.js (rejected due to unnecessary App Router/SSR complexity for a purely static data story).

## Styling

**Decision**: CSS Modules + Vanilla CSS Variables (Design Tokens)
**Reasoning**: Allows strict scoping of component styles without the overhead of CSS-in-JS libraries. Using vanilla CSS variables perfectly maps to the required Dark/Light theme design tokens (`#090A0B`, `#E8E7E3`, etc.) and allows for easy dynamic theming.
**Alternatives considered**: TailwindCSS (rejected to maintain maximum custom aesthetic control without utility-class clutter), Styled Components (rejected due to runtime performance costs).

## Visualization

**Decision**: D3.js (integrated via React refs)
**Reasoning**: D3 provides the low-level, absolute control required for bespoke, annotated editorial charts (e.g., the dot-multiplication chart for scale, custom barbell charts for GT volume). Generic chart wrappers hide analytical semantics.
**Alternatives considered**: Recharts / Chart.js (rejected because they are too rigid for custom scrollytelling transitions and editorial annotations).

## Animation

**Decision**: Framer Motion
**Reasoning**: Framer Motion provides a declarative API for React that perfectly handles `useScroll`, `useTransform`, and layout animations (like dots sorting into clusters) while natively respecting `prefers-reduced-motion`.
**Alternatives considered**: GSAP (rejected because its imperative DOM mutation paradigm fights with React's virtual DOM), Native CSS (insufficient for complex SVG chart interpolations).

## Data Layer

**Decision**: Static JSON/CSV imports
**Reasoning**: The pipeline is `Raw Data -> Canonical Notebook -> Processed CSV -> Frontend`. The frontend will import the processed data at build time. No database or external API is required.

## Image / Media Strategy

**Decision**: Native `<picture>` and `<img>` tags with WebP format.
**Reasoning**: WebP provides excellent compression. We will handle responsive sizing via `srcset` and CSS `object-fit`.

## Testing

**Decision**: Vitest + React Testing Library + ESLint/Prettier
**Reasoning**: Vitest is a drop-in replacement for Jest that runs natively in the Vite environment, making configuration trivial and execution incredibly fast.

## Deployment

**Decision**: Static HTML/JS/CSS bundle (`npm run build`)
**Reasoning**: The output is entirely static, meaning it can be deployed to any static host (GitHub Pages, Vercel, Netlify) with zero server configuration.

## Dependency Philosophy
We enforce strict dependency discipline. Only install:
- `react`, `react-dom`
- `d3` (for charting)
- `framer-motion` (for animation)
- `d3-dsv` (if CSV parsing is needed at runtime, though build-time conversion to JSON is preferred).
