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
  const isInView = useInView(containerRef, { once: true, margin: "600px" });

  useEffect(() => {
    if (!isInView || !containerRef.current || !svgRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = 550; // Increased height for visualization
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };

    const svg = d3.select(svgRef.current);
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
      michelin_pct: "var(--color-primary)",
      dunlop_pct: "#c4aa82", // Muted gold
      goodyear_pct: "#4a4a4a", // Gray
      other_pct: "#1a1a1a",
    };

    // Area generator
    const area = d3
      .area<d3.SeriesPoint<TyreDatum>>()
      .x((d) => x(d.data.season) || 0)
      .y0((d) => y(d[0]))
      .y1((d) => y(d[1]))
      .curve(d3.curveMonotoneX);

    // Render layers
    svg
      .selectAll("path.layer")
      .data(series)
      .enter()
      .append("path")
      .attr("class", "layer")
      .attr("d", area)
      .attr("fill", (d) => colorMap[d.key])
      .attr("opacity", 0) // Start hidden for animation
      .attr("stroke", "var(--color-bg)")
      .attr("stroke-width", 1)
      .transition()
      .duration(1000)
      .delay((_, i) => i * 200)
      .attr("opacity", 1);

    // Axes
    const xAxis = svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSize(0).tickPadding(10));

    xAxis.select(".domain").remove();
    xAxis
      .selectAll("text")
      .attr("fill", "var(--color-secondary)")
      .style("font-family", "var(--font-mono)")
      .style("font-size", "0.7rem");

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
  }, [isInView]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span
            className={styles.swatch}
            style={{ background: "var(--color-primary)" }}
          />{" "}
          Michelin
        </div>
        <div className={styles.legendItem}>
          <span className={styles.swatch} style={{ background: "#c4aa82" }} />{" "}
          Dunlop
        </div>
        <div className={styles.legendItem}>
          <span className={styles.swatch} style={{ background: "#4a4a4a" }} />{" "}
          Goodyear
        </div>
      </div>
      <svg className={styles.svg} ref={svgRef}></svg>
    </div>
  );
}
