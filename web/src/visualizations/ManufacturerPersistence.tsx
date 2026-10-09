import { useEffect, useRef, useState, useCallback } from "react";
import * as d3 from "d3";
import { MotionValue } from "framer-motion";
import dataUrl from "../data/mfg_season_wins.csv?url";
import styles from "./ManufacturerPersistence.module.css";

type Props = {
  progress: MotionValue<number>;
};

type DataRow = {
  season: string;
  manufacturer: string;
  wins: number;
  cumulativeWins: number;
};

export default function ManufacturerPersistence({ progress }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [data, setData] = useState<DataRow[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const renderStateRef = useRef({ pathsRendered: false });
  const hoveredMfgRef = useRef<string | null>(null);

  const syncChart = useCallback((v: number) => {
    if (!svgRef.current || !renderStateRef.current.pathsRendered) return;
    const svg = d3.select(svgRef.current);

    // v: 0.0 -> 0.3 (Intro)
    // v: 0.3 -> 0.6 (Draw lines step 1)
    // v: 0.6 -> 0.9 (Highlight Toyota step 2)

    let drawT = 0;
    if (v > 0.3 && v <= 0.6) drawT = (v - 0.3) / 0.3;
    else if (v > 0.6) drawT = 1;

    let highlightT = 0;
    if (v > 0.6 && v <= 0.9) highlightT = (v - 0.6) / 0.3;
    else if (v > 0.9) highlightT = 1;

    svg.selectAll("path.visible-line").each(function () {
      const path = d3.select(this);
      const mfgClass = path.attr("class");
      const isToyota = mfgClass.includes("Toyota");
      const currentHover = hoveredMfgRef.current;
      const hoverActive = currentHover !== null;
      const isHovered =
        currentHover && mfgClass.includes(currentHover.replace(/\\s+/g, ""));

      const pathLength = (this as SVGPathElement).getTotalLength();
      path.attr("stroke-dashoffset", pathLength * (1 - drawT));

      let baseOpacity = isToyota
        ? drawT > 0
          ? 1
          : 0
        : drawT > 0
          ? 0.3 - highlightT * 0.2
          : 0;

      if (hoverActive) {
        if (isHovered) {
          baseOpacity = 1;
        } else {
          baseOpacity = isToyota
            ? highlightT > 0
              ? 0.3
              : drawT > 0
                ? 0.15
                : 0
            : drawT === 1
              ? 0.15
              : 0;
        }
      }

      path.attr("opacity", baseOpacity);
      path.attr(
        "stroke-width",
        isHovered
          ? isToyota
            ? 2 + highlightT * 2
            : 3
          : isToyota
            ? 2 + highlightT * 2
            : 2,
      );
    });

    svg.selectAll("circle").each(function () {
      const dot = d3.select(this);
      const mfgClass = dot.attr("class");
      const isToyota = mfgClass.includes("Toyota");
      const currentHover = hoveredMfgRef.current;
      const hoverActive = currentHover !== null;
      const isHovered =
        currentHover && mfgClass.includes(currentHover.replace(/\\s+/g, ""));

      let baseOpacity = isToyota
        ? highlightT > 0
          ? 1
          : 0
        : drawT === 1
          ? 0.3 - highlightT * 0.2
          : 0;

      if (hoverActive) {
        if (isHovered) {
          baseOpacity = 1;
        } else {
          baseOpacity = isToyota
            ? highlightT > 0
              ? 0.3
              : 0
            : drawT === 1
              ? 0.15
              : 0;
        }
      }

      dot.attr("opacity", baseOpacity);
      dot.attr(
        "r",
        isHovered
          ? isToyota
            ? 3 + highlightT * 3
            : 5
          : isToyota
            ? 3 + highlightT * 3
            : 3,
      );
    });

    svg.selectAll("text[class*='label-']").each(function () {
      const text = d3.select(this);
      const mfgClass = text.attr("class");
      const isToyota = mfgClass.includes("Toyota");
      const currentHover = hoveredMfgRef.current;
      const hoverActive = currentHover !== null;
      const isHovered =
        currentHover && mfgClass.includes(currentHover.replace(/\\s+/g, ""));

      const textNode = this as SVGTextElement;
      const currentText = textNode.textContent;
      const baseY = +(text.attr("data-base-y") || 0);

      if (isToyota) {
        if (highlightT > 0.5 && currentText === "Toyota") {
          textNode.textContent = "Toyota: 44 Wins";
          text.attr("class", `label-Toyota visible-label ${styles.annotation}`);
          text.attr("y", baseY - 8); // Shift up slightly for larger font
        } else if (highlightT <= 0.5 && currentText !== "Toyota") {
          textNode.textContent = "Toyota";
          text.attr("class", `label-Toyota visible-label ${styles.subLabel}`);
          text.attr("y", baseY);
        }

        let op = highlightT > 0 ? 1 : 0;
        if (hoverActive && !isHovered) op = highlightT > 0 ? 0.3 : 0;
        text.attr("opacity", op);
      } else {
        let op = drawT === 1 ? 0.3 - highlightT * 0.2 : 0;
        if (hoverActive) {
          op = isHovered ? 1 : drawT === 1 ? 0.15 : 0;
        }

        // Boost size and weight slightly for hover
        if (isHovered) {
          text.style("font-weight", "600");
        } else {
          text.style("font-weight", "normal");
        }

        text.attr("opacity", op);
      }
    });
  }, []);

  useEffect(() => {
    d3.csv(dataUrl).then((raw) => {
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

      setData(fullSeries);
    });
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (
      dimensions.width === 0 ||
      dimensions.height === 0 ||
      data.length === 0 ||
      !svgRef.current
    )
      return;

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

    Array.from(grouped).forEach(([mfg, dataPoints]) => {
      const path = pathsGroup
        .append("path")
        .datum(dataPoints)
        .attr("class", `visible-line line-${mfg.replace(/\\s+/g, "")}`)
        .attr("d", line)
        .attr("fill", "none")
        .attr(
          "stroke",
          mfg === "Toyota" ? "var(--color-primary)" : "var(--color-secondary)",
        )
        .attr("stroke-width", 2)
        .attr("opacity", 0)
        .style("transition", "opacity 0.25s ease, stroke-width 0.25s ease");

      const pathLength = (path.node() as SVGPathElement).getTotalLength();
      path
        .attr("stroke-dasharray", pathLength)
        .attr("stroke-dashoffset", pathLength);

      // Invisible hit area for hover interaction
      pathsGroup
        .append("path")
        .datum(dataPoints)
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "transparent")
        .attr("stroke-width", 30) // forgiving hit area
        .style("cursor", "pointer")
        .on("mouseenter", () => {
          hoveredMfgRef.current = mfg;
          syncChart(progress.get());
        })
        .on("mouseleave", () => {
          hoveredMfgRef.current = null;
          syncChart(progress.get());
        })
        .on("touchstart", () => {
          // allow scroll, just highlight
          if (hoveredMfgRef.current === mfg) {
            hoveredMfgRef.current = null;
          } else {
            hoveredMfgRef.current = mfg;
          }
          syncChart(progress.get());
        });

      const lastPoint = dataPoints[dataPoints.length - 1];

      labelsGroup
        .append("circle")
        .attr("class", `dot-${mfg.replace(/\\s+/g, "")}`)
        .attr("cx", xScale(lastPoint.season) || 0)
        .attr("cy", yScale(lastPoint.cumulativeWins))
        .attr("r", 3)
        .attr(
          "fill",
          mfg === "Toyota" ? "var(--color-primary)" : "var(--color-secondary)",
        )
        .attr("opacity", 0);

      labelsGroup
        .append("text")
        .attr(
          "class",
          `label-${mfg.replace(/\\s+/g, "")} visible-label ${styles.subLabel}`,
        )
        .attr(
          "x",
          mfg === "Toyota"
            ? xScale(lastPoint.season) || 0
            : (xScale(lastPoint.season) || 0) + 24,
        )
        .attr(
          "y",
          mfg === "Toyota"
            ? yScale(lastPoint.cumulativeWins) - 16
            : yScale(lastPoint.cumulativeWins) + 4,
        )
        .attr(
          "data-base-y",
          mfg === "Toyota"
            ? yScale(lastPoint.cumulativeWins) - 16
            : yScale(lastPoint.cumulativeWins) + 4,
        )
        .attr("text-anchor", mfg === "Toyota" ? "middle" : "start")
        .text(mfg)
        .attr("opacity", 0);
    });

    renderStateRef.current.pathsRendered = true;
    syncChart(progress.get());
  }, [data, dimensions, progress, syncChart]);

  useEffect(() => {
    const unsubscribe = progress.on("change", syncChart);
    return () => unsubscribe();
  }, [progress, syncChart]);

  return (
    <div className={styles.container} ref={containerRef}>
      <svg ref={svgRef} className={styles.svg}>
        <title>Cumulative Top Class Wins by Manufacturer</title>
      </svg>
    </div>
  );
}
