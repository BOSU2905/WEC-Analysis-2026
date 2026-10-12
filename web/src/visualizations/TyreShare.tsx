import { useEffect, useRef } from "react";
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

  useEffect(() => {
    if (!isInView || !containerRef.current || !svgRef.current) return;

    let rafId: number | null = null;

    const renderChart = () => {
      if (!containerRef.current || !svgRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = 550;
      const isMobile = width < 560;
      const margin = {
        top: 30,
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
      const x = d3
        .scalePoint()
        .domain(data.map((d) => d.season))
        .range([margin.left, width - margin.right]);

      const y = d3
        .scaleLinear()
        .domain([0, 100])
        .range([height - margin.bottom, margin.top]);

      // Stack
      const stack = d3
        .stack<TyreDatum>()
        .keys(["michelin_pct", "dunlop_pct", "goodyear_pct", "other_pct"])
        .order(d3.stackOrderNone)
        .offset(d3.stackOffsetNone);

      const series = stack(data);

      // Color map matching the aesthetic
      const colorMap: Record<string, string> = {
        michelin_pct: "var(--chart-ch4-michelin)",
        dunlop_pct: "var(--chart-ch4-dunlop)",
        goodyear_pct: "var(--chart-ch4-goodyear)",
        other_pct: "var(--chart-ch4-other)",
      };

      // Area generator
      const area = d3
        .area<d3.SeriesPoint<TyreDatum>>()
        .x((d) => x(d.data.season) || 0)
        .y0((d) => y(d[0]))
        .y1((d) => y(d[1]))
        .curve(d3.curveMonotoneX);

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const shouldAnimate = !hasAnimatedRef.current && !prefersReducedMotion;

      // Reveal clip-path for horizontal sweep entrance
      const defs = svg.append("defs");
      const clipId = "ch4-tyre-clip";
      const clipPath = defs.append("clipPath").attr("id", clipId);
      const clipRect = clipPath
        .append("rect")
        .attr("x", margin.left)
        .attr("y", margin.top)
        .attr("height", height - margin.top - margin.bottom);

      // Render layers inside clip group
      const layerGroup = svg.append("g").attr("clip-path", `url(#${clipId})`);
      const layers = layerGroup
        .selectAll("path.layer")
        .data(series)
        .enter()
        .append("path")
        .attr("class", "layer")
        .attr("d", area)
        .attr("fill", (d) => colorMap[d.key])
        .attr("stroke", "var(--color-bg)")
        .attr("stroke-width", 1);

      if (shouldAnimate) {
        clipRect
          .attr("width", 0)
          .transition()
          .duration(1400)
          .ease(d3.easeCubicOut)
          .attr("width", width - margin.left - margin.right);

        layers
          .attr("opacity", 0)
          .transition()
          .duration(800)
          .delay((_, i) => i * 150)
          .attr("opacity", 1);
      } else {
        clipRect.attr("width", width - margin.left - margin.right);
        layers.attr("opacity", 1);
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

    // Responsive resize observer with debounced RAF to prevent layout thrashing
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
            style={{ background: "var(--chart-ch4-michelin)" }}
          />{" "}
          Michelin
        </div>
        <div className={styles.legendItem}>
          <span
            className={styles.swatch}
            style={{ background: "var(--chart-ch4-dunlop)" }}
          />{" "}
          Dunlop
        </div>
        <div className={styles.legendItem}>
          <span
            className={styles.swatch}
            style={{ background: "var(--chart-ch4-goodyear)" }}
          />{" "}
          Goodyear
        </div>
      </div>
      <svg className={styles.svg} ref={svgRef} />
    </div>
  );
}
