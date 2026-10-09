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

export default function EvolutionLineChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "600px" });

  useEffect(() => {
    if (!isInView || !containerRef.current || !svgRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = 500;
    const margin = { top: 40, right: 30, bottom: 40, left: 50 };

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
      .domain([190, 245]) // Hardcoded domain to fit 197 - 238 range cleanly
      .range([height - margin.bottom, margin.top]);

    // Format Y axis as M:SS
    const formatTime = (seconds: number) => {
      const m = Math.floor(seconds / 60);
      const s = Math.floor(seconds % 60);
      return `${m}:${s.toString().padStart(2, "0")}`;
    };

    const keys = [
      "Top Class (LMP1/Hypercar)",
      "LMP2",
      "GT (GTE Pro/Am)",
    ] as const;
    const colorMap: Record<string, string> = {
      "Top Class (LMP1/Hypercar)": "var(--color-primary)",
      LMP2: "#c4aa82", // Muted gold
      "GT (GTE Pro/Am)": "#4a4a4a", // Gray
    };

    // Draw lines
    const line = d3
      .line<{ season: string; value: number }>()
      .x((d) => x(d.season) || 0)
      .y((d) => y(d.value))
      .curve(d3.curveMonotoneX);

    keys.forEach((key, i) => {
      const seriesData = data
        .filter((d) => d[key] !== undefined)
        .map((d) => ({ season: d.season, value: d[key] as number }));

      // Append path
      const path = svg
        .append("path")
        .datum(seriesData)
        .attr("fill", "none")
        .attr("stroke", colorMap[key])
        .attr("stroke-width", 3)
        .attr("d", line);

      // Animation
      const totalLength = (path.node() as SVGPathElement).getTotalLength();
      path
        .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(2000)
        .delay(i * 300)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0);

      // Add circles
      svg
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
        .attr("opacity", 0)
        .transition()
        .duration(500)
        .delay((_, j) => i * 300 + (j * 2000) / seriesData.length)
        .attr("opacity", 1);
    });

    // Era Annotations
    const hypercarIdx = data.findIndex((d) => d.season === "2021");
    if (hypercarIdx !== -1) {
      const hypercarX = x("2021") || 0;

      // Vertical line
      svg
        .append("line")
        .attr("x1", hypercarX)
        .attr("x2", hypercarX)
        .attr("y1", margin.top)
        .attr("y2", height - margin.bottom)
        .attr("stroke", "var(--color-secondary)")
        .attr("stroke-dasharray", "4,4")
        .attr("opacity", 0)
        .transition()
        .delay(2000)
        .duration(1000)
        .attr("opacity", 0.5);

      // Label
      svg
        .append("text")
        .attr("x", hypercarX + 10)
        .attr("y", margin.top + 10)
        .attr("fill", "var(--color-primary)")
        .style("font-family", "var(--font-mono)")
        .style("font-size", "0.75rem")
        .text("Hypercar Era Begins (Pace Reduction)")
        .attr("opacity", 0)
        .transition()
        .delay(2500)
        .duration(1000)
        .attr("opacity", 1);
    }

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
          .ticks(5)
          .tickFormat((d) => formatTime(d as number))
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
  }, [isInView]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span
            className={styles.swatch}
            style={{ background: "var(--color-primary)" }}
          />{" "}
          Top Class
        </div>
        <div className={styles.legendItem}>
          <span className={styles.swatch} style={{ background: "#c4aa82" }} />{" "}
          LMP2
        </div>
        <div className={styles.legendItem}>
          <span className={styles.swatch} style={{ background: "#4a4a4a" }} />{" "}
          GT
        </div>
      </div>
      <svg className={styles.svg} ref={svgRef}></svg>
    </div>
  );
}
