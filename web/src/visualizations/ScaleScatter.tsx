import { useEffect, useRef, useState, useMemo } from "react";
import * as d3 from "d3";
import { MotionValue, useInView } from "framer-motion";
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
};

const RGB_COLORS: Record<string, string> = {
  "Top Class (LMP1/Hypercar)": "232, 231, 227",
  LMP2: "146, 145, 141",
  "GT (GTE Pro/Am)": "85, 85, 85",
  Experimental: "42, 42, 41",
};

export default function ScaleScatter({ progress }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const isInView = useInView(containerRef, { once: true, margin: "600px" });
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const nodesRef = useRef<NodeData[]>([]);
  const radiusRef = useRef(2);

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

  // 2. Pre-calculate deterministic layout and setup canvas
  useEffect(() => {
    if (!isInView || width === 0 || height === 0 || !canvasRef.current || !svgRef.current)
      return;

    // High DPI Canvas Setup
    const dpr = window.devicePixelRatio || 1;
    const canvas = canvasRef.current;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    // Set SVG size explicitly to match
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
    radiusRef.current = radius;

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

    let cancelled = false;

    const runLayoutAsync = async () => {
      // Advance simulation silently in smaller chunks to prevent main-thread lag
      for (let i = 0; i < 100; i++) {
        if (cancelled) return;
        sim.tick(1);
        await new Promise((r) => setTimeout(r, 0));
      }

      data.forEach((d) => {
        // Bounding box constraint
        d.clusterX = Math.max(radius, Math.min(width - radius, d.x || 0));
        d.clusterY = Math.max(radius, Math.min(height - radius, d.y || 0));
      });

      if (!cancelled) {
        nodesRef.current = data;
        setIsLayoutReady(true);
      }
    };

    setIsLayoutReady(false);
    runLayoutAsync();

    return () => {
      cancelled = true;
    };
  }, [isInView, width, height, clusters]);

  const tRef = useRef(0);
  const timeRef = useRef(0);
  const pointerRef = useRef({ x: -1000, y: -1000, active: false });
  const stimulusRef = useRef({ x: -1000, y: -1000, strength: 0 });
  const activeClusterRef = useRef<string | null>(null);
  const clusterIntensitiesRef = useRef<Record<string, number>>({});

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    pointerRef.current = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
      active: true,
    };
  };

  const handlePointerLeave = () => {
    pointerRef.current.active = false;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    // Touch events do not have nativeEvent.offsetX, so we must calculate it manually
    // But since touch interactions are rare/different, we can compute the rect here ONCE per touch start
    // instead of binding to the scroll event for the entire page lifecycle.
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    pointerRef.current = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
      active: true,
    };
  };

  const handleTouchEnd = () => {
    pointerRef.current.active = false;
  };

  // 3. Continuous Animation & Interpolation Loop (Canvas Renderer)
  const isAnimated = useInView(containerRef, { margin: "0px" }); // Only animate when actually visible
  const isAnimatedRef = useRef(false);
  const animationStartTime = useRef<number | null>(null);
  const prefersReducedMotionRef = useRef(
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );

  useEffect(() => {
    isAnimatedRef.current = isAnimated;
  }, [isAnimated]);

  useEffect(() => {
    if (!isInView || width === 0 || height === 0 || nodesRef.current.length === 0 || !isLayoutReady) return;

    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const syncNodes = (v: number) => {
      const nodes = nodesRef.current;
      const radius = radiusRef.current;

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

      if (isAnimatedRef.current && animationStartTime.current === null) {
        animationStartTime.current = timeRef.current;
      }

      ctx.clearRect(0, 0, width, height);

      // Fast single-pass drawing
      for (let i = 0; i < nodes.length; i++) {
        const d = nodes[i];

        // Staggered node entrance for cinematic scroll
        let nodeT = 0;
        const stagger = (i % 100) / 100;
        const nodeStart = stagger * 0.3;
        if (t > nodeStart) {
          nodeT = (t - nodeStart) / 0.7;
        }
        if (nodeT > 1) nodeT = 1;
        const easedT =
          nodeT < 0.5 ? 2 * nodeT * nodeT : -1 + (4 - 2 * nodeT) * nodeT;

        let baseX = d.gridX + (d.clusterX - d.gridX) * easedT;
        let baseY = d.gridY + (d.clusterY - d.gridY) * easedT;

        // Ambient Motion (deterministic noise)
        const phase = i * 0.1;
        baseX += Math.sin(time * 0.001 + phase) * 2.5;
        baseY += Math.cos(time * 0.0008 + phase) * 2.5;

        // Stimulus Reaction
        if (stimulus.strength > 0.01) {
          const dx = baseX - stimulus.x;
          const dy = baseY - stimulus.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const influence = 200;
          if (dist < influence) {
            const gap = 60;
            const push =
              gap * Math.pow(1 - dist / influence, 2) * stimulus.strength;
            baseX += (dx / dist) * push;
            baseY += (dy / dist) * push;
          }
        }

        const H = clusterIntensitiesRef.current[d.class] || 0;
        const maxOp = 0.75;
        const minOp = 0.25;
        let opacity =
          t === 0
            ? maxOp
            : maxOp - (maxOp - minOp) * (1 - H) * stimulus.strength;

        let currentRadius = radius;

        // Entrance Animation
        if (prefersReducedMotionRef.current) {
          // Do nothing, keep original radius and opacity
        } else if (animationStartTime.current !== null) {
          const elapsed = timeRef.current - animationStartTime.current;
          const staggerDelay = (i / nodes.length) * 200; // 200ms stagger over all dots
          const dotElapsed = elapsed - staggerDelay;
          
          let dotEnterT = 0;
          if (dotElapsed > 0) {
            dotEnterT = Math.min(1, dotElapsed / 300); // 300ms per dot
          }
          
          const easedDotEnter = d3.easeCubicOut(dotEnterT);
          currentRadius = radius * (0.5 + 0.5 * easedDotEnter);
          opacity *= (0.3 + 0.7 * easedDotEnter);
        } else {
          opacity *= 0.3;
          currentRadius = radius * 0.5;
        }

        if (opacity > 0) {
          ctx.fillStyle = `rgba(${RGB_COLORS[d.class]}, ${opacity})`;
          ctx.beginPath();
          ctx.arc(baseX, baseY, currentRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Position active text exactly at the stimulus void in the overlay SVG
      if (svgRef.current) {
        const svg = d3.select(svgRef.current);
        svg.selectAll("g.label-group").each(function () {
          const group = d3.select(this);
          const className = group.attr("data-class") as string;
          const H = clusterIntensitiesRef.current[className] || 0;

          if (H > 0.01 && t > 0.1) {
            if (className === activeClusterRef.current) {
              group.attr(
                "transform",
                `translate(${stimulus.x}, ${stimulus.y})`,
              );
            }
            group.style("opacity", H * stimulus.strength * t);
          } else {
            group.style("opacity", 0);
          }
        });
      }
    };

    let timer: d3.Timer | null = null;
    
    if (isAnimated) {
      timer = d3.timer((elapsed) => {
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

        for (const className of Object.keys(clusters)) {
          const currentH = clusterIntensitiesRef.current[className] || 0;
          const targetH =
            p.active &&
            s.strength > 0.01 &&
            className === activeClusterRef.current
              ? 1
              : 0;
          const rate = targetH > currentH ? 0.045 : 0.04;
          clusterIntensitiesRef.current[className] =
            currentH + (targetH - currentH) * rate;
        }

        syncNodes(progress.get());
      });
    } else {
      // Draw static frame when offscreen
      syncNodes(progress.get());
    }

    const unsubscribe = progress.on("change", () => {
      // Handled entirely by the d3.timer reading progress.get() when visible
    });

    return () => {
      unsubscribe();
      if (timer) timer.stop();
    };
  }, [isAnimated, isInView, isLayoutReady, width, height, clusters, progress]);

  return (
    <div
      className={styles.container}
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
      />
      <svg
        ref={svgRef}
        className={styles.svg}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
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
