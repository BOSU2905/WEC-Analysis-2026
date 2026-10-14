import { useEffect, useRef, useState, useId } from "react";
import * as d3 from "d3";
import { useInView } from "framer-motion";
import tyreData from "../data/tyre_share.json";
import styles from "./TyreShare.module.css";

interface TyreDatum {
  season: string;
  michelin_pct: number;
  dunlop_pct: number;
  goodyear_pct: number;
  other_pct: number;
  total_entries: number;
  michelin_count: number;
}

const data = tyreData as TyreDatum[];

type ManufacturerKey = "michelin_pct" | "dunlop_pct" | "goodyear_pct" | "other_pct";

interface ActiveInspection {
  key: ManufacturerKey;
  name: string;
  season: string;
  pct: number;
  count: number;
  total: number;
  seasonX: number;
  dotY: number;
  alignLeft: boolean;
  flipDown: boolean;
}

// Approved Editorial Muted Palette Configuration:
// Michelin: #4F83AD
// Dunlop: #D6B84C
// Goodyear: #426B9C (secondary yellow accent: #D9BD55)
const MFG_PALETTE: Record<
  ManufacturerKey,
  {
    fill: string;
    fillFade: string;
    ridge: string;
    highlight: string;
    accent: string;
  }
> = {
  michelin_pct: {
    fill: "#4F83AD",
    fillFade: "rgba(79, 131, 173, 0.40)",
    ridge: "rgba(255, 255, 255, 0.40)",
    highlight: "#7AB3DE",
    accent: "#4F83AD",
  },
  dunlop_pct: {
    fill: "#D6B84C",
    fillFade: "rgba(214, 184, 76, 0.38)",
    ridge: "rgba(214, 184, 76, 0.70)",
    highlight: "#EAD072",
    accent: "#D6B84C",
  },
  goodyear_pct: {
    fill: "#426B9C",
    fillFade: "rgba(66, 107, 156, 0.40)",
    ridge: "#D9BD55", // Goodyear secondary yellow accent contour
    highlight: "#D9BD55", // Goodyear secondary yellow accent active state
    accent: "#D9BD55",
  },
  other_pct: {
    fill: "#24272D",
    fillFade: "rgba(36, 39, 45, 0.30)",
    ridge: "rgba(255, 255, 255, 0.15)",
    highlight: "rgba(255, 255, 255, 0.4)",
    accent: "#888888",
  },
};

// Compact, authentic vector badges for the tyre manufacturers
function ManufacturerLogo({ name }: { name: string }) {
  if (name === "Michelin") {
    return (
      <svg
        className={styles.brandLogo}
        viewBox="0 0 110 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Michelin brand logo"
      >
        <rect width="110" height="26" rx="3" fill="#002244" />
        <path d="M4 22L12 4H18L10 22H4Z" fill="#4F83AD" />
        <text
          x="23"
          y="18"
          fill="#FFFFFF"
          fontFamily="'Space Grotesk', system-ui, sans-serif"
          fontWeight="800"
          fontStyle="italic"
          fontSize="13"
          letterSpacing="0.06em"
        >
          MICHELIN
        </text>
      </svg>
    );
  }

  if (name === "Dunlop") {
    return (
      <svg
        className={styles.brandLogo}
        viewBox="0 0 100 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Dunlop brand logo"
      >
        <rect width="100" height="26" rx="3" fill="#151515" />
        <polygon points="6,21 15,5 11,5 2,21" fill="#D6B84C" />
        <polygon points="12,21 21,5 17,5 8,21" fill="#D6B84C" opacity="0.6" />
        <text
          x="24"
          y="18"
          fill="#D6B84C"
          fontFamily="'Space Grotesk', system-ui, sans-serif"
          fontWeight="800"
          fontStyle="italic"
          fontSize="13"
          letterSpacing="0.08em"
        >
          DUNLOP
        </text>
      </svg>
    );
  }

  if (name === "Goodyear") {
    return (
      <svg
        className={styles.brandLogo}
        viewBox="0 0 112 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Goodyear brand logo"
      >
        <rect width="112" height="26" rx="3" fill="#0A2240" />
        <path
          d="M7 17C9 14 11 11 15 10C13 11 12 13 12 15C14 13 16 12 19 12C16 14 15 16 15 18C12 18 9 18 7 17Z"
          fill="#D9BD55"
        />
        <text
          x="22"
          y="18"
          fill="#D9BD55"
          fontFamily="'Space Grotesk', system-ui, sans-serif"
          fontWeight="800"
          fontStyle="italic"
          fontSize="12.5"
          letterSpacing="0.06em"
        >
          GOODYEAR
        </text>
      </svg>
    );
  }

  return <span className={styles.otherBadge}>Other</span>;
}

export default function TyreShare({
  progress: _progress,
}: {
  progress: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const hasAnimatedRef = useRef(false);
  const lastWidthRef = useRef(0);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const rawClipId = useId();
  const clipId = `tyre-clip-${rawClipId.replace(/:/g, "")}`;

  const [activeInspection, setActiveInspection] = useState<ActiveInspection | null>(null);

  useEffect(() => {
    if (!isInView || !containerRef.current || !svgRef.current) return;

    let rafId: number | null = null;

    const renderChart = () => {
      if (!containerRef.current || !svgRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = 550;
      const isMobile = width < 560;
      const margin = {
        top: 32,
        right: isMobile ? 20 : 35,
        bottom: isMobile ? 78 : 55,
        left: isMobile ? 68 : 78,
      };

      const svg = d3.select(svgRef.current);
      svg.selectAll("*").interrupt();
      svg.selectAll("*").remove();

      svg.attr("width", width).attr("height", height);
      svg.style("overflow", "visible");

      // Scales
      const seasons = data.map((d) => d.season);
      const x = d3
        .scalePoint()
        .domain(seasons)
        .range([margin.left, width - margin.right]);

      const y = d3
        .scaleLinear()
        .domain([0, 100])
        .range([height - margin.bottom, margin.top]);

      // Stack configuration
      const stack = d3
        .stack<TyreDatum>()
        .keys(["michelin_pct", "dunlop_pct", "goodyear_pct", "other_pct"])
        .order(d3.stackOrderNone)
        .offset(d3.stackOffsetNone);

      const series = stack(data);

      const nameMap: Record<ManufacturerKey, string> = {
        michelin_pct: "Michelin",
        dunlop_pct: "Dunlop",
        goodyear_pct: "Goodyear",
        other_pct: "Other",
      };

      // Area generator
      const area = d3
        .area<d3.SeriesPoint<TyreDatum>>()
        .x((d) => x(d.data.season) || 0)
        .y0((d) => y(d[0]))
        .y1((d) => y(d[1]))
        .curve(d3.curveMonotoneX);

      // Top boundary ridge line generator for physical layered contour depth
      const ridgeLine = d3
        .line<d3.SeriesPoint<TyreDatum>>()
        .x((d) => x(d.data.season) || 0)
        .y((d) => y(d[1]))
        .curve(d3.curveMonotoneX);

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const shouldAnimate = !hasAnimatedRef.current && !prefersReducedMotion;

      // Defs: Gradients, Filters, and Reveal Clip
      const defs = svg.append("defs");

      // Soft vertical gradients with restrained transparency
      const addGradient = (id: string, topColor: string, bottomColor: string) => {
        const grad = defs
          .append("linearGradient")
          .attr("id", id)
          .attr("x1", "0%")
          .attr("y1", "0%")
          .attr("x2", "0%")
          .attr("y2", "100%");
        grad
          .append("stop")
          .attr("offset", "0%")
          .attr("stop-color", topColor)
          .attr("stop-opacity", 0.95);
        grad
          .append("stop")
          .attr("offset", "100%")
          .attr("stop-color", bottomColor)
          .attr("stop-opacity", 0.82);
      };

      addGradient(
        "ch4-grad-michelin",
        MFG_PALETTE.michelin_pct.fill,
        MFG_PALETTE.michelin_pct.fillFade,
      );
      addGradient(
        "ch4-grad-dunlop",
        MFG_PALETTE.dunlop_pct.fill,
        MFG_PALETTE.dunlop_pct.fillFade,
      );
      addGradient(
        "ch4-grad-goodyear",
        MFG_PALETTE.goodyear_pct.fill,
        MFG_PALETTE.goodyear_pct.fillFade,
      );
      addGradient(
        "ch4-grad-other",
        MFG_PALETTE.other_pct.fill,
        MFG_PALETTE.other_pct.fillFade,
      );

      // Elevation shadow filter for restrained layered depth
      const filter = defs
        .append("filter")
        .attr("id", "ch4-area-elevation")
        .attr("x", "-5%")
        .attr("y", "-10%")
        .attr("width", "110%")
        .attr("height", "130%");
      filter
        .append("feDropShadow")
        .attr("dx", 0)
        .attr("dy", 3)
        .attr("stdDeviation", 3)
        .attr("flood-color", "#000000")
        .attr("flood-opacity", 0.35);

      // Sweep reveal clip-path
      const clipPath = defs.append("clipPath").attr("id", clipId);
      const clipRect = clipPath
        .append("rect")
        .attr("x", margin.left)
        .attr("y", margin.top)
        .attr("height", height - margin.top - margin.bottom);

      // Render layers inside clip group
      const layerGroup = svg.append("g").attr("clip-path", `url(#${clipId})`);

      // Interactive Layer Paths
      const layerElements = layerGroup
        .selectAll<SVGPathElement, d3.Series<TyreDatum, string>>("path.layer")
        .data(series)
        .enter()
        .append("path")
        .attr("class", "layer")
        .attr("d", area)
        .attr("fill", (d) => `url(#ch4-grad-${d.key.replace("_pct", "")})`)
        .attr("stroke", "var(--color-bg)")
        .attr("stroke-width", 1.2)
        .style("cursor", "crosshair")
        .style("transition", "opacity 0.2s ease, filter 0.2s ease");

      // Ridge highlight strokes along the upper crest of each area
      layerGroup
        .selectAll<SVGPathElement, d3.Series<TyreDatum, string>>("path.ridge")
        .data(series)
        .enter()
        .append("path")
        .attr("class", "ridge")
        .attr("d", ridgeLine)
        .attr("fill", "none")
        .attr("stroke", (d) => MFG_PALETTE[d.key as ManufacturerKey].ridge)
        .attr("stroke-width", (d) => (d.key === "goodyear_pct" ? 2.0 : 1.5))
        .attr("pointer-events", "none");

      if (shouldAnimate) {
        clipRect
          .attr("width", 0)
          .transition()
          .duration(1400)
          .ease(d3.easeCubicOut)
          .attr("width", width - margin.left - margin.right);

        layerElements
          .attr("opacity", 0)
          .transition()
          .duration(800)
          .delay((_, i) => i * 150)
          .attr("opacity", 1);
      } else {
        clipRect.attr("width", width - margin.left - margin.right);
        layerElements.attr("opacity", 1);
      }

      // X-Axis
      const xAxis = svg
        .append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSize(0).tickPadding(10));

      xAxis.select(".domain").remove();
      const xTicks = xAxis
        .selectAll<SVGTextElement, string>("text")
        .attr("fill", "var(--color-secondary)")
        .style("font-family", "var(--font-mono)")
        .style("font-size", isMobile ? "0.65rem" : "0.7rem");

      if (isMobile) {
        xTicks
          .attr("transform", "rotate(-40)")
          .attr("text-anchor", "end")
          .attr("dx", "-0.4em")
          .attr("dy", "0.2em");
      }

      // Explicit X-Axis Label
      const xLabel = svg
        .append("text")
        .attr(
          "x",
          (width - margin.left - margin.right) / 2 + margin.left,
        )
        .attr("y", height - (isMobile ? 8 : 12))
        .attr("text-anchor", "middle")
        .attr("fill", "var(--color-secondary)")
        .style("font-family", "var(--font-mono)")
        .style("font-size", "0.75rem")
        .style("letter-spacing", "0.04em")
        .text("Season (Year)");

      // Y-Axis
      const yAxis = svg
        .append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(
          d3
            .axisLeft(y)
            .tickValues([0, 25, 50, 75, 100])
            .tickFormat((d) => `${d}%`)
            .tickSize(-width + margin.left + margin.right),
        );

      yAxis.select(".domain").remove();
      yAxis
        .selectAll("text")
        .attr("fill", "var(--color-secondary)")
        .style("font-family", "var(--font-mono)")
        .style("font-size", "0.7rem");
      yAxis
        .selectAll("line")
        .attr("stroke", "var(--color-border)")
        .attr("stroke-dasharray", "4,4")
        .attr("opacity", 0.3);

      // Explicit Y-Axis Label
      const yLabel = svg
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr(
          "x",
          -((height - margin.top - margin.bottom) / 2 + margin.top),
        )
        .attr("y", isMobile ? 20 : 25)
        .attr("text-anchor", "middle")
        .attr("fill", "var(--color-secondary)")
        .style("font-family", "var(--font-mono)")
        .style("font-size", "0.75rem")
        .style("letter-spacing", "0.04em")
        .text("Tyre Assignment Share (%)");

      // Hover / Touch interaction overlay elements
      const interactionGroup = svg
        .append("g")
        .attr("class", "interaction-layer")
        .attr("pointer-events", "none");

      // Vertical guide hairline
      const hairlineV = interactionGroup
        .append("line")
        .attr("y1", margin.top)
        .attr("y2", height - margin.bottom)
        .attr("stroke", "rgba(255, 255, 255, 0.45)")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "3,3")
        .attr("opacity", 0);

      // Horizontal crosshair hairline
      const hairlineH = interactionGroup
        .append("line")
        .attr("x1", margin.left)
        .attr("stroke", "rgba(255, 255, 255, 0.25)")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "2,2")
        .attr("opacity", 0);

      // Focus outer halo ring
      const focusRing = interactionGroup
        .append("circle")
        .attr("r", 8)
        .attr("fill", "none")
        .attr("stroke-width", 1.5)
        .attr("opacity", 0);

      // Focus center dot
      const focusDot = interactionGroup
        .append("circle")
        .attr("r", 4.5)
        .attr("stroke", "#0D0E11")
        .attr("stroke-width", 2)
        .attr("opacity", 0);

      // Helper to find nearest season from pointer X coordinate
      const getNearestSeasonIndex = (mouseX: number) => {
        let nearestIndex = 0;
        let minDistance = Infinity;
        seasons.forEach((season, index) => {
          const seasonX = x(season) || 0;
          const dist = Math.abs(mouseX - seasonX);
          if (dist < minDistance) {
            minDistance = dist;
            nearestIndex = index;
          }
        });
        return nearestIndex;
      };

      // Update hover state and visuals with synchronized crosshairs
      const highlight = (key: ManufacturerKey, seasonIndex: number) => {
        const datum = data[seasonIndex];
        const season = datum.season;
        const seasonX = x(season) || 0;
        const pct = datum[key];
        const pal = MFG_PALETTE[key];

        // Calculate count using verified percentage
        let count = 0;
        if (key === "michelin_pct") {
          count = datum.michelin_count;
        } else {
          count = Math.round((datum.total_entries * pct) / 100);
        }

        // Find Y midpoint for focus dot & crosshair
        const targetSeries = series.find((s) => s.key === key);
        let dotY = height - margin.bottom;
        if (targetSeries) {
          const pt = targetSeries[seasonIndex];
          dotY = y((pt[0] + pt[1]) / 2);
        }

        // Synchronize crosshairs
        hairlineV.attr("x1", seasonX).attr("x2", seasonX).attr("opacity", 1);
        hairlineH
          .attr("x2", seasonX)
          .attr("y1", dotY)
          .attr("y2", dotY)
          .attr("opacity", 0.7);

        focusDot
          .attr("cx", seasonX)
          .attr("cy", dotY)
          .attr("fill", pal.accent)
          .attr("opacity", pct > 0 ? 1 : 0);

        focusRing
          .attr("cx", seasonX)
          .attr("cy", dotY)
          .attr("stroke", pal.accent)
          .attr("opacity", pct > 0 ? 0.8 : 0);

        // Highlight selected layer, subdue background layers
        layerElements.each(function (d) {
          const el = d3.select(this);
          if (d.key === key) {
            el.attr("opacity", 1.0)
              .attr("stroke", pal.highlight)
              .attr("stroke-width", 1.8)
              .attr("filter", "url(#ch4-area-elevation)");
          } else {
            el.attr("opacity", 0.35)
              .attr("stroke", "var(--color-bg)")
              .attr("stroke-width", 1)
              .attr("filter", null);
          }
        });

        // Determine if tooltip should align left or flip down to stay in bounds
        const alignLeft = seasonX > width * 0.7;
        const flipDown = dotY < margin.top + 70;

        setActiveInspection({
          key,
          name: nameMap[key],
          season,
          pct,
          count,
          total: datum.total_entries,
          seasonX,
          dotY,
          alignLeft,
          flipDown,
        });
      };

      const resetHighlight = () => {
        hairlineV.attr("opacity", 0);
        hairlineH.attr("opacity", 0);
        focusDot.attr("opacity", 0);
        focusRing.attr("opacity", 0);
        layerElements
          .attr("opacity", 1.0)
          .attr("stroke", "var(--color-bg)")
          .attr("stroke-width", 1.2)
          .attr("filter", null);
        setActiveInspection(null);
      };

      // Pointer event listeners on layers
      layerElements
        .on("pointerenter", function (event, d) {
          const [mouseX] = d3.pointer(event, svgRef.current);
          const seasonIdx = getNearestSeasonIndex(mouseX);
          highlight(d.key as ManufacturerKey, seasonIdx);
        })
        .on("pointermove", function (event, d) {
          const [mouseX] = d3.pointer(event, svgRef.current);
          const seasonIdx = getNearestSeasonIndex(mouseX);
          highlight(d.key as ManufacturerKey, seasonIdx);
        })
        .on("pointerleave", function () {
          resetHighlight();
        })
        .on("click", function (event, d) {
          event.stopPropagation();
          const [mouseX] = d3.pointer(event, svgRef.current);
          const seasonIdx = getNearestSeasonIndex(mouseX);
          highlight(d.key as ManufacturerKey, seasonIdx);
        });

      // Background click/tap outside resets
      svg.on("click", () => {
        resetHighlight();
      });

      if (shouldAnimate) {
        xAxis
          .attr("opacity", 0)
          .transition()
          .duration(800)
          .delay(300)
          .attr("opacity", 1);
        yAxis
          .attr("opacity", 0)
          .transition()
          .duration(800)
          .delay(150)
          .attr("opacity", 1);
        xLabel
          .attr("opacity", 0)
          .transition()
          .duration(800)
          .delay(400)
          .attr("opacity", 1);
        yLabel
          .attr("opacity", 0)
          .transition()
          .duration(800)
          .delay(400)
          .attr("opacity", 1);
      }

      hasAnimatedRef.current = true;
      lastWidthRef.current = width;
    };

    const svgElement = svgRef.current;
    const containerElement = containerRef.current;

    renderChart();

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = Math.round(entry.contentRect.width);
        if (newWidth > 0 && newWidth !== lastWidthRef.current) {
          lastWidthRef.current = newWidth;
          if (rafId) cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(() => {
            renderChart();
          });
        }
      }
    });

    observer.observe(containerElement);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      observer.disconnect();
      if (svgElement) {
        d3.select(svgElement).selectAll("*").interrupt();
      }
    };
  }, [isInView, clipId]);

  return (
    <div className={styles.container} ref={containerRef}>
      {/* Top Header & Compact Editorial Legend */}
      <div className={styles.topBar}>
        <div className={styles.topMeta}>
          <span className={styles.chartBadge}>TYRE ALLOCATION SHARE</span>
          <span className={styles.chartHint}>• Hover or tap to track crosshair</span>
        </div>

        {/* Legend with Approved Manufacturer Colors */}
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <span
              className={styles.swatch}
              style={{ background: MFG_PALETTE.michelin_pct.fill }}
            />
            Michelin
          </div>
          <div className={styles.legendItem}>
            <span
              className={styles.swatch}
              style={{ background: MFG_PALETTE.dunlop_pct.fill }}
            />
            Dunlop
          </div>
          <div className={styles.legendItem}>
            <span
              className={styles.swatch}
              style={{
                background: MFG_PALETTE.goodyear_pct.fill,
                boxShadow: `inset 0 0 0 1.5px ${MFG_PALETTE.goodyear_pct.ridge}`,
              }}
            />
            Goodyear
          </div>
        </div>
      </div>

      {/* Synchronized tracking contextual label that follows cursor / touch position */}
      {activeInspection && (
        <div
          className={styles.trackingTooltip}
          style={{
            left: `${activeInspection.seasonX}px`,
            top: `${activeInspection.dotY}px`,
            transform: activeInspection.alignLeft
              ? activeInspection.flipDown
                ? "translate(-100%, 15%)"
                : "translate(-100%, -115%)"
              : activeInspection.flipDown
                ? "translate(0%, 15%)"
                : "translate(0%, -115%)",
            marginLeft: activeInspection.alignLeft ? "-12px" : "12px",
          }}
        >
          <div className={styles.tooltipHeader}>
            <ManufacturerLogo name={activeInspection.name} />
            <span className={styles.tooltipSeason}>
              Season {activeInspection.season}
            </span>
          </div>
          <div className={styles.tooltipMetrics}>
            <div className={styles.tooltipShare}>
              <strong>{activeInspection.pct.toFixed(1)}%</strong>
              <span className={styles.tooltipShareUnit}>Share</span>
            </div>
            <div className={styles.tooltipCount}>
              {activeInspection.count} / {activeInspection.total} entries
            </div>
          </div>
        </div>
      )}

      <svg className={styles.svg} ref={svgRef} />
    </div>
  );
}
