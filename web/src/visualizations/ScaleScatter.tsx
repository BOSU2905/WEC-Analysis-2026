import { useEffect, useRef, useState, useMemo } from "react";
import * as d3 from "d3";
import { MotionValue } from "framer-motion";
import datasetScale from "../data/dataset_scale.json";
import styles from "./ScaleScatter.module.css";

type Props = {
  progress: MotionValue<number>;
};

type NodeData = {
  id: string;
  class: string;
  gridX: number;
  gridY: number;
  clusterX: number;
  clusterY: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
};

export default function ScaleScatter({ progress }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const nodesRef = useRef<NodeData[]>([]);

  // 1. Handle ResizeObserver
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

  const isMobile = dimensions.width < 768;
  const { width, height } = dimensions;

  const clusters: Record<string, { x: number; y: number }> = useMemo(() => {
    return isMobile
      ? {
        "Top Class (LMP1/Hypercar)": { x: width * 0.5, y: height * 0.3 },
        LMP2: { x: width * 0.5, y: height * 0.45 },
        "GT (GTE Pro/Am)": { x: width * 0.5, y: height * 0.65 },
        Experimental: { x: width * 0.5, y: height * 0.8 },
      }
      : {
        "Top Class (LMP1/Hypercar)": { x: width * 0.35, y: height * 0.4 },
        LMP2: { x: width * 0.65, y: height * 0.4 },
        "GT (GTE Pro/Am)": { x: width * 0.5, y: height * 0.65 },
        Experimental: { x: width * 0.25, y: height * 0.7 },
      };
  }, [isMobile, width, height]);

  // 2. Pre-calculate deterministic layout when dimensions change
  useEffect(() => {
    if (width === 0 || height === 0 || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.attr("width", width).attr("height", height);

    // Initial data generation
    const data: NodeData[] = [];
    Object.entries(datasetScale.classes).forEach(([className, count]) => {
      for (let i = 0; i < count; i++) {
        data.push({
          id: `${className}-${i}`,
          class: className,
          gridX: 0,
          gridY: 0,
          clusterX: 0,
          clusterY: 0,
        });
      }
    });

    const padding = 2;
    const safeArea = width * height;
    const maxRadius = Math.max(
      1,
      Math.floor(Math.sqrt(safeArea / data.length) / 2) - padding,
    );
    const radius = Math.min(maxRadius, 8);

    const cols = Math.floor(Math.sqrt(data.length * (width / height)));
    const rows = Math.ceil(data.length / cols);
    const xOffset = (width - cols * (radius * 2 + padding)) / 2;
    const yOffset = (height - rows * (radius * 2 + padding)) / 2;

    // Calculate grid layout
    data.forEach((d, i) => {
      d.gridX = xOffset + (i % cols) * (radius * 2 + padding);
      d.gridY = yOffset + Math.floor(i / cols) * (radius * 2 + padding);
      d.x = width / 2;
      d.y = height / 2;
    });

    // Run a fast, headless static simulation to determine final clustered coordinates
    const sim = d3
      .forceSimulation(data)
      .force(
        "x",
        d3.forceX<NodeData>((d) => clusters[d.class].x).strength(0.15),
      )
      .force(
        "y",
        d3.forceY<NodeData>((d) => clusters[d.class].y).strength(0.15),
      )
      .force("collide", d3.forceCollide(radius + 1).iterations(2))
      .stop();

    // Advance simulation silently
    sim.tick(100);

    data.forEach((d) => {
      // Bounding box constraint to ensure it NEVER leaves container visually
      d.clusterX = Math.max(radius, Math.min(width - radius, d.x || 0));
      d.clusterY = Math.max(radius, Math.min(height - radius, d.y || 0));
    });

    nodesRef.current = data;

    // Colors
    const colorScale = d3
      .scaleOrdinal<string>()
      .domain([
        "Top Class (LMP1/Hypercar)",
        "LMP2",
        "GT (GTE Pro/Am)",
        "Experimental",
      ])
      .range(["#E8E7E3", "#92918D", "#555555", "#2A2A29"]);

    // Render DOM nodes initially
    const circles = svg.selectAll("circle").data(data, (d: any) => d.id);

    circles
      .enter()
      .append("circle")
      .attr("r", radius)
      .attr("fill", (d) => colorScale(d.class))
      .merge(circles as any)
      .attr("cx", (d) => d.gridX)
      .attr("cy", (d) => d.gridY);

    circles.exit().remove();
  }, [dimensions, clusters]);

  const tRef = useRef(0);
  const timeRef = useRef(0);
  const pointerRef = useRef({ x: -1000, y: -1000, active: false });
  const stimulusRef = useRef({ x: -1000, y: -1000, strength: 0 });
  const activeClusterRef = useRef<string | null>(null);

  // 3. Continuous Animation & Interpolation Loop
  useEffect(() => {
    const syncNodes = (v: number) => {
      if (!svgRef.current || nodesRef.current.length === 0) return;

      const start = 0.3;
      const end = 0.7;
      let t = 0;

      if (v <= start) t = 0;
      else if (v >= end) t = 1;
      else {
        t = (v - start) / (end - start);
      }

      tRef.current = t;

      const time = timeRef.current;
      const stimulus = stimulusRef.current;

      const svg = d3.select(svgRef.current);

      svg
        .selectAll<SVGCircleElement, NodeData>("circle")
        .attr("cx", (d, i) => {
          // Staggered node entrance for cinematic scroll
          let nodeT = 0;
          const stagger = (i % 100) / 100; // 0 to 1
          const nodeStart = stagger * 0.3;
          if (t > nodeStart) {
            nodeT = (t - nodeStart) / 0.7;
          }
          if (nodeT > 1) nodeT = 1;
          const easedT =
            nodeT < 0.5 ? 2 * nodeT * nodeT : -1 + (4 - 2 * nodeT) * nodeT;

          // 1. Base deterministic position
          let base = d.gridX + (d.clusterX - d.gridX) * easedT;

          // 2. Ambient Motion (deterministic noise)
          const phaseX = i * 0.1;
          const ambient = Math.sin(time * 0.001 + phaseX) * 2.5;
          base += ambient;

          // 3. Stimulus Reaction
          if (stimulus.strength > 0.01) {
            const ambientY = Math.cos(time * 0.0008 + phaseX) * 2.5;
            const dy =
              d.gridY + (d.clusterY - d.gridY) * easedT + ambientY - stimulus.y;
            const dx = base - stimulus.x;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const influence = 200;
            if (dist < influence) {
              const gap = 60;
              const push =
                gap * Math.pow(1 - dist / influence, 2) * stimulus.strength;
              base += (dx / dist) * push;
            }
          }
          return base;
        })
        .attr("cy", (d, i) => {
          let nodeT = 0;
          const stagger = (i % 100) / 100;
          const nodeStart = stagger * 0.3;
          if (t > nodeStart) nodeT = (t - nodeStart) / 0.7;
          if (nodeT > 1) nodeT = 1;
          const easedT =
            nodeT < 0.5 ? 2 * nodeT * nodeT : -1 + (4 - 2 * nodeT) * nodeT;

          let base = d.gridY + (d.clusterY - d.gridY) * easedT;
          const phaseY = i * 0.1;
          const ambient = Math.cos(time * 0.0008 + phaseY) * 2.5;
          base += ambient;

          if (stimulus.strength > 0.01) {
            const ambientX = Math.sin(time * 0.001 + phaseY) * 2.5;
            const dx =
              d.gridX + (d.clusterX - d.gridX) * easedT + ambientX - stimulus.x;
            const dy = base - stimulus.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const influence = 200;
            if (dist < influence) {
              const gap = 60;
              const push =
                gap * Math.pow(1 - dist / influence, 2) * stimulus.strength;
              base += (dy / dist) * push;
            }
          }
          return base;
        })
        .attr("opacity", (d) => {
          if (t === 0) return 1;
          const isActive = d.class === activeClusterRef.current;
          return 1.0 - (isActive ? 0 : stimulus.strength * 0.6);
        });

      // Position active text exactly at the stimulus void
      svg.selectAll("g.label-group").each(function () {
        const group = d3.select(this);
        const className = group.attr("data-class") as string;
        if (
          className === activeClusterRef.current &&
          stimulus.strength > 0.01 &&
          t > 0.1
        ) {
          group.attr("transform", `translate(${stimulus.x}, ${stimulus.y})`);
          group.style("opacity", stimulus.strength * t);
        } else {
          group.style("opacity", 0);
        }
      });
    };

    const timer = d3.timer((elapsed) => {
      timeRef.current = elapsed;

      const p = pointerRef.current;
      const s = stimulusRef.current;

      if (p.active) {
        if (s.strength < 0.01) {
          s.x = p.x;
          s.y = p.y;
        } else {
          s.x += (p.x - s.x) * 0.15;
          s.y += (p.y - s.y) * 0.15;
        }
      }

      const targetStrength = p.active ? 1 : 0;
      s.strength += (targetStrength - s.strength) * 0.04;

      if (s.strength > 0.01) {
        let minDist = Infinity;
        let closest = null;
        for (const [className, center] of Object.entries(clusters)) {
          const dSq = (center.x - s.x) ** 2 + (center.y - s.y) ** 2;
          if (dSq < minDist) {
            minDist = dSq;
            closest = className;
          }
        }
        activeClusterRef.current = closest;
      }

      syncNodes(progress.get());
    });

    const unsubscribe = progress.on("change", () => {
      // React to scroll instantly by letting framer-motion update its internal value.
      // syncNodes happens naturally in the d3.timer every frame!
    });

    return () => {
      unsubscribe();
      timer.stop();
    };
  }, [progress, dimensions, clusters]);

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const svgRect = svgRef.current.getBoundingClientRect();
    pointerRef.current = {
      x: e.clientX - svgRect.left,
      y: e.clientY - svgRect.top,
      active: true,
    };
  };

  const handlePointerLeave = () => {
    pointerRef.current.active = false;
  };

  const handleTouchStart = (e: React.TouchEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const svgRect = svgRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    pointerRef.current = {
      x: touch.clientX - svgRect.left,
      y: touch.clientY - svgRect.top,
      active: true,
    };
  };

  const handleTouchEnd = () => {
    pointerRef.current.active = false;
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <svg
        ref={svgRef}
        className={styles.svg}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        <title>
          Scatter plot representing {datasetScale.total_entries} entries across{" "}
          {datasetScale.total_events} events.
        </title>

        {/* Native SVG Annotations */}
        {dimensions.width > 0 && (
          <g pointerEvents="none">
            {Object.entries(clusters).map(([className, center]) => (
              <g
                key={className}
                className="label-group"
                data-class={className}
                transform={`translate(${center.x}, ${center.y})`}
                style={{ opacity: 0 }}
              >
                <text
                  className={styles.nativeLabelEyebrow}
                  y={-20}
                  textAnchor="middle"
                >
                  {className === "Top Class (LMP1/Hypercar)"
                    ? "TOP CLASS"
                    : className === "Experimental"
                      ? "EXPERIMENTAL / PROTOTYPE"
                      : className.toUpperCase()}
                </text>
                <text
                  className={styles.nativeLabelValue}
                  y={4}
                  textAnchor="middle"
                  style={{ fontSize: "1.5rem" }}
                >
                  {
                    datasetScale.classes[
                    className as keyof typeof datasetScale.classes
                    ]
                  }
                </text>
                <text
                  className={styles.nativeLabelEyebrow}
                  y={24}
                  textAnchor="middle"
                  style={{ opacity: 0.7 }}
                >
                  ENTRIES
                </text>
              </g>
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}
