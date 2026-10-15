import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useInView } from "framer-motion";
import lapData from "../data/circuit_evolution_lemans.json";
import styles from "./EvolutionLineChart.module.css";

interface LapDatum {
  season: string;
  "Top Class (LMP1/Hypercar)"?: number;
  LMP2?: number;
  "GT (GTE Pro/Am)"?: number;
  Experimental?: number;
}

const data = lapData as LapDatum[];

// Format Y axis tick as M:SS
const formatTimeAxis = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

// Format point lap time precisely as M:SS.mmm using authentic WEC timing conventions
const formatLapTimeDetailed = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const rem = seconds % 60;
  const s = Math.floor(rem);
  const ms = Math.round((rem - s) * 1000);
  return `${m}:${s.toString().padStart(2, "0")}.${ms.toString().padStart(3, "0")}`;
};

export default function EvolutionLineChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);
  const lastWidthRef = useRef(0);
  const activePointKeyRef = useRef<string | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!isInView || !containerRef.current || !svgRef.current) return;

    let rafId: number | null = null;

    const renderChart = () => {
      if (!containerRef.current || !svgRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = 500;
      const isMobile = width < 560;
      const margin = {
        top: 40,
        right: isMobile ? 20 : 35,
        bottom: isMobile ? 78 : 55,
        left: isMobile ? 68 : 78,
      };

      if (tooltipRef.current) {
        tooltipRef.current.style.opacity = "0";
      }

      const svg = d3.select(svgRef.current);
      svg.selectAll("*").interrupt();
      svg.selectAll("*").remove();

      svg.attr("width", width).attr("height", height);
      svg.style("overflow", "visible");

      // Dismiss tooltip when clicking / tapping background
      svg.on("pointerdown", (event) => {
        if ((event.target as Element).tagName !== "circle") {
          hideTooltip();
        }
      });

      // Scales
      const x = d3
        .scalePoint()
        .domain(data.map((d) => d.season))
        .range([margin.left, width - margin.right]);

      const y = d3
        .scaleLinear()
        .domain([190, 245]) // Fits 197.475 - 238.876 range cleanly
        .range([height - margin.bottom, margin.top]);

      const keys = [
        "Top Class (LMP1/Hypercar)",
        "LMP2",
        "GT (GTE Pro/Am)",
      ] as const;
      const colorMap: Record<string, string> = {
        "Top Class (LMP1/Hypercar)": "var(--chart-top-class)",
        LMP2: "var(--chart-evo-lmp2)",
        "GT (GTE Pro/Am)": "var(--chart-evo-gt)",
      };

      // Draw lines
      const line = d3
        .line<{ season: string; value: number }>()
        .x((d) => x(d.season) || 0)
        .y((d) => y(d.value))
        .curve(d3.curveMonotoneX);

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const shouldAnimate = !hasAnimatedRef.current && !prefersReducedMotion;

      keys.forEach((key, i) => {
        const seriesData = data
          .filter((d) => d[key] !== undefined)
          .map((d) => ({ season: d.season, value: d[key] as number }));

        // Append line path
        const path = svg
          .append("path")
          .datum(seriesData)
          .attr("fill", "none")
          .attr("stroke", colorMap[key])
          .attr("stroke-width", 3)
          .attr("d", line);

        if (shouldAnimate) {
          const totalLength = (path.node() as SVGPathElement).getTotalLength();
          path
            .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(1800)
            .delay(i * 250)
            .ease(d3.easeCubicOut)
            .attr("stroke-dashoffset", 0)
            .on("end", function () {
              d3.select(this)
                .attr("stroke-dasharray", null)
                .attr("stroke-dashoffset", null);
            });
        }

        // Base dots (r=4, stroke-width=2 with entrance scale & fade)
        const dots = svg
          .selectAll(`.dot-${i}`)
          .data(seriesData)
          .enter()
          .append("circle")
          .attr("class", `dot-${i}`)
          .attr("cx", (d) => x(d.season) || 0)
          .attr("cy", (d) => y(d.value))
          .attr("r", 4)
          .attr("fill", "var(--color-bg)")
          .attr("stroke", colorMap[key])
          .attr("stroke-width", 2)
          .style("pointer-events", "none");

        if (shouldAnimate) {
          dots
            .attr("opacity", 0)
            .attr("r", 0)
            .transition()
            .duration(400)
            .delay((_, j) => i * 250 + (j * 1500) / seriesData.length)
            .ease(d3.easeBackOut)
            .attr("opacity", 1)
            .attr("r", 4);
        } else {
          dots.attr("opacity", 1).attr("r", 4);
        }
      });

      // Active Hover Highlight Element (dedicated layer above lines and base dots)
      const highlightGroup = svg
        .append("g")
        .attr("class", styles.highlightGroup)
        .attr("opacity", 0)
        .style("pointer-events", "none");

      const haloDot = highlightGroup
        .append("circle")
        .attr("class", styles.highlightDot)
        .attr("r", 12)
        .attr("opacity", 0.25);

      const coreDot = highlightGroup
        .append("circle")
        .attr("class", styles.highlightDot)
        .attr("r", 6.5)
        .attr("fill", "var(--color-surface)")
        .attr("stroke-width", 2.5);

      const showTooltip = (
        season: string,
        key: string,
        value: number,
        cx: number,
        cy: number,
        color: string,
      ) => {
        if (!tooltipRef.current || !containerRef.current) return;
        const tooltip = tooltipRef.current;

        // Position active highlight dot
        highlightGroup.attr("opacity", 1);
        haloDot.attr("cx", cx).attr("cy", cy).attr("fill", color);
        coreDot.attr("cx", cx).attr("cy", cy).attr("stroke", color);

        // Update tooltip content only when point changes to prevent content flickering
        const pointId = `${season}-${key}`;
        if (activePointKeyRef.current !== pointId) {
          activePointKeyRef.current = pointId;
          tooltip.innerHTML = `
            <div class="${styles.tooltipHeader}">
              <span class="${styles.tooltipDot}" style="background-color: ${color}"></span>
              <span class="${styles.tooltipClass}">${key}</span>
            </div>
            <div class="${styles.tooltipTime}">${formatLapTimeDetailed(value)}</div>
            <div class="${styles.tooltipMeta}">
              <span>Season: <strong>${season}</strong></span>
              <span class="${styles.tooltipSeconds}">${value.toFixed(3)}s</span>
            </div>
          `;
        }

        const containerRect = containerRef.current.getBoundingClientRect();
        const svgRect = svgRef.current
          ? svgRef.current.getBoundingClientRect()
          : containerRect;
        const tooltipWidth = tooltip.offsetWidth || 180;
        const tooltipHeight = tooltip.offsetHeight || 75;

        // SVG element offsets relative to container
        const svgOffsetTop = svgRect.top - containerRect.top;
        const svgOffsetLeft = svgRect.left - containerRect.left;
        const pointX = cx + svgOffsetLeft;
        const pointY = cy + svgOffsetTop;

        // Horizontal positioning with edge clamping to prevent container clipping
        let left = pointX;
        let transformX = "-50%";
        if (pointX - tooltipWidth / 2 < 12) {
          left = 12;
          transformX = "0%";
        } else if (pointX + tooltipWidth / 2 > containerRect.width - 12) {
          left = containerRect.width - 12;
          transformX = "-100%";
        }

        // Vertical positioning: default above point, flipping below if close to top edge
        let top = pointY - 14;
        let transformY = "-100%";
        if (pointY - tooltipHeight - 14 < 0) {
          top = pointY + 16;
          transformY = "0%";
        }

        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
        tooltip.style.transform = `translate(${transformX}, ${transformY})`;
        tooltip.style.opacity = "1";
      };

      const hideTooltip = () => {
        activePointKeyRef.current = null;
        if (tooltipRef.current) {
          tooltipRef.current.style.opacity = "0";
        }
        highlightGroup.attr("opacity", 0);
      };

      // Interactive hit targets layer (generous hit area + keyboard/touch accessibility)
      const hitAreaGroup = svg.append("g").attr("class", "hit-area-group");

      keys.forEach((key) => {
        const seriesData = data
          .filter((d) => d[key] !== undefined)
          .map((d) => ({ season: d.season, value: d[key] as number }));

        hitAreaGroup
          .selectAll(`.hit-${key.replace(/[^a-zA-Z0-9]/g, "_")}`)
          .data(seriesData)
          .enter()
          .append("circle")
          .attr("class", styles.hitTarget)
          .attr("cx", (d) => x(d.season) || 0)
          .attr("cy", (d) => y(d.value))
          .attr("r", 16)
          .attr("fill", "transparent")
          .attr("tabindex", 0)
          .attr("role", "graphics-symbol")
          .attr(
            "aria-label",
            (d) =>
              `${key}, Season ${d.season}: ${formatLapTimeDetailed(d.value)}`,
          )
          .on("pointerenter", function (_, d) {
            const cx = x(d.season) || 0;
            const cy = y(d.value);
            showTooltip(d.season, key, d.value, cx, cy, colorMap[key]);
          })
          .on("pointerleave", function () {
            hideTooltip();
          })
          .on("focus", function (_, d) {
            const cx = x(d.season) || 0;
            const cy = y(d.value);
            showTooltip(d.season, key, d.value, cx, cy, colorMap[key]);
          })
          .on("blur", function () {
            hideTooltip();
          })
          .on("keydown", function (event) {
            if (event.key === "Escape") {
              hideTooltip();
              (this as SVGElement).blur();
            }
          })
          .on("touchstart", function (event, d) {
            event.preventDefault();
            const cx = x(d.season) || 0;
            const cy = y(d.value);
            showTooltip(d.season, key, d.value, cx, cy, colorMap[key]);
          });
      });

      // Era Annotations
      const hypercarIdx = data.findIndex((d) => d.season === "2021");
      if (hypercarIdx !== -1) {
        const hypercarX = x("2021") || 0;

        // Vertical line
        const annoLine = svg
          .append("line")
          .attr("x1", hypercarX)
          .attr("x2", hypercarX)
          .attr("y1", margin.top)
          .attr("y2", height - margin.bottom)
          .attr("stroke", "var(--color-secondary)")
          .attr("stroke-dasharray", "4,4");

        // Label
        const annoText = svg
          .append("text")
          .attr("x", hypercarX - 10)
          .attr("y", margin.top + 10)
          .attr("text-anchor", "end")
          .attr("fill", "var(--chart-top-class)")
          .style("font-family", "var(--font-mono)")
          .style("font-size", isMobile ? "0.65rem" : "0.75rem")
          .text("Hypercar Era Begins (Targeted Pace Reset)");

        if (shouldAnimate) {
          annoLine
            .attr("opacity", 0)
            .transition()
            .delay(2000)
            .duration(1000)
            .attr("opacity", 0.5);

          annoText
            .attr("opacity", 0)
            .transition()
            .delay(2500)
            .duration(1000)
            .attr("opacity", 1);
        } else {
          annoLine.attr("opacity", 0.5);
          annoText.attr("opacity", 1);
        }
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
        .text("Season");

      // Y-Axis
      const yAxis = svg
        .append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(
          d3
            .axisLeft(y)
            .ticks(5)
            .tickFormat((d) => formatTimeAxis(d as number))
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
        .attr("stroke-dasharray", "2,4")
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
        .text("Fastest Lap Time (mm:ss)");

      if (shouldAnimate) {
        xAxis
          .attr("opacity", 0)
          .transition()
          .duration(800)
          .delay(200)
          .attr("opacity", 1);
        yAxis
          .attr("opacity", 0)
          .transition()
          .duration(800)
          .delay(100)
          .attr("opacity", 1);
        xLabel
          .attr("opacity", 0)
          .transition()
          .duration(800)
          .delay(300)
          .attr("opacity", 1);
        yLabel
          .attr("opacity", 0)
          .transition()
          .duration(800)
          .delay(300)
          .attr("opacity", 1);
      }

      hasAnimatedRef.current = true;
      lastWidthRef.current = width;
    };

    const svgElement = svgRef.current;
    const containerElement = containerRef.current;

    renderChart();

    // Responsive resize observer with debounced RAF to avoid layout thrashing
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
  }, [isInView]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span
            className={styles.swatch}
            style={{ background: "var(--chart-top-class)" }}
          />{" "}
          Top Class
        </div>
        <div className={styles.legendItem}>
          <span
            className={styles.swatch}
            style={{ background: "var(--chart-evo-lmp2)" }}
          />{" "}
          LMP2
        </div>
        <div className={styles.legendItem}>
          <span
            className={styles.swatch}
            style={{ background: "var(--chart-evo-gt)" }}
          />{" "}
          GT
        </div>
      </div>
      <svg className={styles.svg} ref={svgRef} />
      <div
        ref={tooltipRef}
        className={styles.tooltip}
        role="status"
        aria-live="polite"
      />
    </div>
  );
}
