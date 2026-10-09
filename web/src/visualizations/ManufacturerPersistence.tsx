import { useEffect, useRef, useState, useCallback } from "react";
import * as d3 from "d3";
import { useInView } from "framer-motion";
import dataUrl from "../data/mfg_season_wins.csv?url";
import styles from "./ManufacturerPersistence.module.css";

type DataRow = {
  season: string;
  manufacturer: string;
  wins: number;
  cumulativeWins: number;
};

// Preload and parse data at module evaluation time
let preprocessedData: DataRow[] | null = null;
const dataPromise = d3.csv(dataUrl).then((raw) => {
  const mfgMap = new Map<string, number>();

  const processed: DataRow[] = raw.map((d) => {
    const mfg = d.manufacturer!;
    const wins = +d.wins!;
    const currentTotal = (mfgMap.get(mfg) || 0) + wins;
    mfgMap.set(mfg, currentTotal);
    return {
      season: d.season!,
      manufacturer: mfg,
      wins,
      cumulativeWins: currentTotal,
    };
  });

  const seasons = Array.from(new Set(processed.map((d) => d.season)));
  const manufacturers = Array.from(
    new Set(processed.map((d) => d.manufacturer)),
  );

  const fullSeries: DataRow[] = [];
  manufacturers.forEach((mfg) => {
    let cumulative = 0;
    seasons.forEach((season) => {
      const point = processed.find(
        (p) => p.manufacturer === mfg && p.season === season,
      );
      if (point) {
        cumulative = point.cumulativeWins;
      }
      fullSeries.push({
        season,
        manufacturer: mfg,
        wins: point ? point.wins : 0,
        cumulativeWins: cumulative,
      });
    });
  });

  preprocessedData = fullSeries;
  return fullSeries;
});

export default function ManufacturerPersistence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [data, setData] = useState<DataRow[]>(preprocessedData || []);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const hoveredMfgRef = useRef<string | null>(null);
  const previousHoveredMfgRef = useRef<string | null>(null);

  // INSTRUMENTATION
  const renderCount = useRef(0);
  
  useEffect(() => {
    renderCount.current++;
    console.log(`[Ch2] Component Render ${renderCount.current} at ${performance.now().toFixed(1)}ms`);
  });

  const isInView = useInView(containerRef, { once: true, margin: "200px" });

  const updateHoverState = useCallback(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    
    const currentHover = hoveredMfgRef.current;
    const previousHover = previousHoveredMfgRef.current;
    
    if (currentHover === previousHover) return;

    if (previousHover) {
      const cls = previousHover.replace(/\s+/g, "");
      svg.selectAll(`.line-${cls}, .dot-${cls}, .label-${cls}`).classed(styles.isHovered, false);
    }

    if (currentHover) {
      svg.classed(styles.isHovering, true);
      const cls = currentHover.replace(/\s+/g, "");
      svg.selectAll(`.line-${cls}, .dot-${cls}, .label-${cls}`).classed(styles.isHovered, true);
      
      // Raise hovered line to front to prevent occlusion
      svg.select(`.line-${cls}`).each(function() {
        const node = this as unknown as SVGPathElement;
        if (node.parentNode) node.parentNode.appendChild(node);
      });
    } else {
      svg.classed(styles.isHovering, false);
    }
    
    previousHoveredMfgRef.current = currentHover;
  }, []);

  useEffect(() => {
    dataPromise.then((fullSeries) => {
      setData(fullSeries);
    });
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions((prev) => {
          if (
            prev.width === entry.contentRect.width &&
            prev.height === entry.contentRect.height
          ) {
            return prev;
          }
          console.log(`[Ch2] ResizeObserver triggered: ${entry.contentRect.width}x${entry.contentRect.height} at ${performance.now().toFixed(1)}ms`);
          return {
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          };
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (
      !isInView ||
      dimensions.width === 0 ||
      dimensions.height === 0 ||
      data.length === 0 ||
      !svgRef.current
    )
      return;

    console.log(`[Ch2] Starting D3 layout and transition setup at ${performance.now().toFixed(1)}ms`);
    const layoutStart = performance.now();

    const { width, height } = dimensions;
    const margin = { top: 60, right: 140, bottom: 80, left: 80 };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.attr("width", width).attr("height", height);
    svg.selectAll("*").remove();

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Seasons in string format preserve correct categorical flow, fixing the 2018-2019 gap bug
    const seasons = Array.from(new Set(data.map((d) => d.season)));

    const xScale = d3
      .scalePoint()
      .domain(seasons)
      .range([0, innerWidth])
      .padding(0.1);

    const yScale = d3.scaleLinear().domain([0, 45]).range([innerHeight, 0]);

    // Axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale).ticks(5);

    const xAxisGroup = chart
      .append("g")
      .attr("class", styles.axis)
      .attr("transform", `translate(0,${innerHeight})`)
      .call(xAxis);

    xAxisGroup
      .selectAll("text")
      .style("font-family", "var(--font-mono)")
      .style("color", "var(--color-secondary)");

    chart
      .append("text")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + 50)
      .attr("text-anchor", "middle")
      .attr("class", styles.axisLabel)
      .text("Season");

    const yAxisGroup = chart.append("g").attr("class", styles.axis).call(yAxis);

    yAxisGroup
      .selectAll("text")
      .style("font-family", "var(--font-mono)")
      .style("color", "var(--color-secondary)");

    chart
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -innerHeight / 2)
      .attr("y", -50)
      .attr("text-anchor", "middle")
      .attr("class", styles.axisLabel)
      .text("Cumulative Top-Class Wins");

    chart
      .append("g")
      .attr("class", styles.grid)
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(-innerWidth)
          .tickFormat(() => ""),
      )
      .style("stroke-opacity", 0.1);

    const grouped = d3.group(data, (d) => d.manufacturer);

    const line = d3
      .line<DataRow>()
      .x((d) => xScale(d.season) || 0)
      .y((d) => yScale(d.cumulativeWins))
      .curve(d3.curveStepAfter);

    const pathsGroup = chart.append("g").attr("class", "paths");
    const labelsGroup = chart.append("g").attr("class", "labels");

    Array.from(grouped).forEach(([mfg, dataPoints], index) => {
      const isToyota = mfg === "Toyota";
      
      const path = pathsGroup
        .append("path")
        .datum(dataPoints)
        .attr("class", `${styles.visibleLine} ${isToyota ? styles.isToyota : ""} line-${mfg.replace(/\s+/g, "")}`)
        .attr("d", line)
        .attr("fill", "none")
        .attr(
          "stroke",
          isToyota ? "var(--color-primary)" : "var(--color-secondary)",
        )
        .attr("stroke-width", isToyota ? 4 : 2);

      const pathNode = path.node() as any;

      let pathLength = 0;
      for (let i = 1; i < dataPoints.length; i++) {
        const p0 = dataPoints[i - 1];
        const p1 = dataPoints[i];
        const dx = Math.abs((xScale(p1.season) || 0) - (xScale(p0.season) || 0));
        const dy = Math.abs(yScale(p1.cumulativeWins) - yScale(p0.cumulativeWins));
        pathLength += dx + dy;
      }

      if (pathNode) {
        pathNode._mfg = mfg;
        pathNode._isToyota = isToyota;
        pathNode._pathLength = pathLength;
      }

      path
        .attr("stroke-dasharray", pathLength)
        .attr("stroke-dashoffset", pathLength)
        .attr("opacity", isToyota ? 1 : 0.3)
        .style("transition", `stroke-dashoffset 2000ms linear ${isToyota ? 1000 : (index * 150) % 1500}ms`);

      // Trigger CSS transition on next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (pathNode) {
            pathNode.style.strokeDashoffset = "0";
          }
        });
      });

      // Invisible hit area for hover interaction
      const hitPath = pathsGroup
        .append("path")
        .datum(dataPoints)
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "transparent")
        .attr("stroke-width", 15) // Reduced from 30 to prevent massive overlapping occlusion
        .style("pointer-events", "stroke")
        .style("cursor", "pointer");
        
      hitPath
        .on("mouseenter", () => {
          hoveredMfgRef.current = mfg;
          updateHoverState();
        })
        .on("mouseleave", () => {
          hoveredMfgRef.current = null;
          updateHoverState();
        })
        .on("touchstart", () => {
          if (hoveredMfgRef.current === mfg) {
            hoveredMfgRef.current = null;
          } else {
            hoveredMfgRef.current = mfg;
          }
          updateHoverState();
        });

      const lastPoint = dataPoints[dataPoints.length - 1];

      // A group to handle the fade-in independently of hover state
      const entryFadeGroup = labelsGroup
        .append("g")
        .attr("opacity", 0)
        .style("transition", `opacity 500ms linear ${isToyota ? 3000 : 2000 + ((index * 150) % 1500)}ms`);
        
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (entryFadeGroup.node()) {
            (entryFadeGroup.node() as any).style.opacity = "1";
          }
        });
      });

      const dot = entryFadeGroup
        .append("circle")
        .attr("class", `${styles.visibleDot} ${isToyota ? styles.isToyota : ""} dot-${mfg.replace(/\s+/g, "")}`)
        .attr("cx", xScale(lastPoint.season) || 0)
        .attr("cy", yScale(lastPoint.cumulativeWins))
        .attr("r", isToyota ? 6 : 3)
        .attr(
          "fill",
          isToyota ? "var(--color-primary)" : "var(--color-secondary)",
        )
        .attr("opacity", isToyota ? 1 : 0.3);

      const dotNode = dot.node() as any;
      if (dotNode) {
        dotNode._mfg = mfg;
        dotNode._isToyota = isToyota;
      }

      const text = entryFadeGroup
        .append("text")
        .attr(
          "class",
          isToyota
            ? `${styles.visibleLabel} ${styles.isToyota} ${styles.annotation} label-${mfg.replace(/\s+/g, "")}`
            : `${styles.visibleLabel} ${styles.subLabel} label-${mfg.replace(/\s+/g, "")}`,
        )
        .attr(
          "x",
          isToyota
            ? xScale(lastPoint.season) || 0
            : (xScale(lastPoint.season) || 0) + 24,
        )
        .attr(
          "y",
          isToyota
            ? yScale(lastPoint.cumulativeWins) - 24
            : yScale(lastPoint.cumulativeWins) + 4,
        )
        .attr("text-anchor", isToyota ? "middle" : "start")
        .text(isToyota ? "Toyota: 44 Wins" : mfg)
        .attr("opacity", isToyota ? 1 : 0.3);

      const textNode = text.node() as any;
      if (textNode) {
        textNode._mfg = mfg;
        textNode._isToyota = isToyota;
        textNode._baseY = isToyota ? yScale(lastPoint.cumulativeWins) - 24 : yScale(lastPoint.cumulativeWins) + 4;
      }
    });

    console.log(`[Ch2] D3 setup completed in ${(performance.now() - layoutStart).toFixed(1)}ms`);
  }, [data, dimensions, isInView, updateHoverState]);



  return (
    <div className={styles.container} ref={containerRef}>
      <svg ref={svgRef} className={styles.svg}>
        <title>Cumulative Top Class Wins by Manufacturer</title>
      </svg>
    </div>
  );
}
