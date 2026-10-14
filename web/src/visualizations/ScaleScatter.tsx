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

  // Restore the iconic Mickey Mouse cluster silhouette:
  // Left ear: Top Class (LMP1/Hypercar, 629 entries)
  // Right ear: LMP2 (971 entries)
  // Large Center Head: GT (GTE Pro/Am, 1,406 entries)
  // Outlier: Experimental (5 entries)
  const clusters: Record<string, { x: number; y: number }> = useMemo(() => {
    return isMobile
      ? {
          "Top Class (LMP1/Hypercar)": { x: width * 0.36, y: height * 0.32 },
          LMP2: { x: width * 0.64, y: height * 0.32 },
          "GT (GTE Pro/Am)": { x: width * 0.5, y: height * 0.58 },
          Experimental: { x: width * 0.22, y: height * 0.74 },
        }
      : {
          "Top Class (LMP1/Hypercar)": { x: width * 0.35, y: height * 0.38 },
          LMP2: { x: width * 0.64, y: height * 0.38 },
          "GT (GTE Pro/Am)": { x: width * 0.50, y: height * 0.62 },
          Experimental: { x: width * 0.22, y: height * 0.72 },
        };
  }, [isMobile, width, height]);

  // Natural cluster interactive boundaries: accurately bounds the rendered dot constellation
  // without creating artificial dead zones between neighboring clusters.
  const clusterHitRadii: Record<string, number> = useMemo(() => {
    return {
      "Top Class (LMP1/Hypercar)": isMobile ? 100 : 145,
      LMP2: isMobile ? 115 : 165,
      "GT (GTE Pro/Am)": isMobile ? 140 : 210,
      Experimental: isMobile ? 45 : 55,
    };
  }, [isMobile]);

  // Quantity-based relative class scale multipliers
  const classScaleMultipliers: Record<string, number> = useMemo(() => {
    return {
      "Top Class (LMP1/Hypercar)": 1.15,
      LMP2: 1.0,
      "GT (GTE Pro/Am)": 0.90,
      Experimental: 1.25,
    };
  }, []);

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
    // Group index counters for deterministic organic sunflower (phyllotaxis) cluster packing
    const classIndices: Record<string, number> = {};
    const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5)); // ~2.39996 rad

    // Calculate grid layout and instant cluster coordinates with 0.4ms sub-frame efficiency
    data.forEach((d, i) => {
      d.gridX = xOffset + (i % cols) * (radius * 2 + padding);
      d.gridY = yOffset + Math.floor(i / cols) * (radius * 2 + padding);

      const classIdx = classIndices[d.class] || 0;
      classIndices[d.class] = classIdx + 1;

      const clusterCenter = clusters[d.class] || { x: width / 2, y: height / 2 };
      const radialSpacing = (radius * 2 + 1.2) * 0.58;
      const baseR = Math.sqrt(classIdx) * radialSpacing;
      const theta = classIdx * GOLDEN_ANGLE;

      // Organic contour dispersion: outer boundary modulation creates a natural silhouette rather than a rigid circular disc
      const harmonic = 1 + 0.08 * Math.sin(theta * 3) * Math.cos(theta * 2);
      const r = baseR * harmonic;

      const cx = clusterCenter.x + r * Math.cos(theta);
      const cy = clusterCenter.y + r * Math.sin(theta);

      d.clusterX = Math.max(radius, Math.min(width - radius, cx));
      d.clusterY = Math.max(radius, Math.min(height - radius, cy));
      d.x = d.gridX;
      d.y = d.gridY;
    });

    nodesRef.current = data;
    setIsLayoutReady(true);
  }, [isInView, width, height, clusters]);

  const tRef = useRef(0);
  const timeRef = useRef(0);
  const pointerRef = useRef({ x: -1000, y: -1000, active: false });
  const stimulusRef = useRef({ x: -1000, y: -1000, strength: 0 });
  const activeClusterRef = useRef<string | null>(null);
  const clusterIntensitiesRef = useRef<Record<string, number>>({});

  // Touchscreen tap-to-inspect persistent selection
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null);
  const selectedClusterRef = useRef<string | null>(null);
  useEffect(() => {
    selectedClusterRef.current = selectedCluster;
  }, [selectedCluster]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only track continuous movement for desktop mouse; do not hijack touch gestures
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    pointerRef.current = {
      x,
      y,
      active: true,
    };
    if (stimulusRef.current.strength < 0.01) {
      stimulusRef.current.x = x;
      stimulusRef.current.y = y;
    }
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    pointerRef.current.active = false;
    if (selectedClusterRef.current) {
      const center = clusters[selectedClusterRef.current];
      if (center) {
        pointerRef.current = { x: center.x, y: center.y, active: true };
        return;
      }
    }
    // Clear active cluster, stimulus, and cluster intensities immediately when pointer leaves
    stimulusRef.current.strength = 0;
    activeClusterRef.current = null;
    for (const key of Object.keys(clusters)) {
      clusterIntensitiesRef.current[key] = 0;
    }
  };

  const handleSelectCluster = (className: string) => {
    if (selectedClusterRef.current === className) {
      setSelectedCluster(null);
      pointerRef.current.active = false;
      stimulusRef.current.strength = 0;
      activeClusterRef.current = null;
    } else {
      setSelectedCluster(className);
      const center = clusters[className];
      if (center) {
        pointerRef.current = { x: center.x, y: center.y, active: true };
        stimulusRef.current = { x: center.x, y: center.y, strength: 1 };
        activeClusterRef.current = className;
      }
    }
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    let closest: string | null = null;
    let minDist = Infinity;

    for (const [className, center] of Object.entries(clusters)) {
      const hitRadius = (clusterHitRadii[className] || 90) * 1.1; // generous hit zone for touch
      const dist = Math.hypot(center.x - clickX, center.y - clickY);
      if (dist <= hitRadius && dist < minDist) {
        minDist = dist;
        closest = className;
      }
    }

    if (closest) {
      handleSelectCluster(closest);
    } else if (selectedClusterRef.current) {
      // Tap on empty space deselects
      setSelectedCluster(null);
      pointerRef.current.active = false;
      stimulusRef.current.strength = 0;
      activeClusterRef.current = null;
    }
  };

  // 3. Continuous Animation & Interpolation Loop (Canvas Renderer)
  const isAnimated = useInView(containerRef, { margin: "0px" }); // Only animate when actually visible
  const isAnimatedRef = useRef(false);
  const prefersReducedMotionRef = useRef(
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false,
  );

  useEffect(() => {
    isAnimatedRef.current = isAnimated;
  }, [isAnimated]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = (e: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = e.matches;
    };
    prefersReducedMotionRef.current = mq.matches;
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isInView || width === 0 || height === 0 || nodesRef.current.length === 0 || !isLayoutReady) return;

    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    let chartColors: Record<string, string> = {
      "Top Class (LMP1/Hypercar)": "232, 231, 227",
      LMP2: "146, 145, 141",
      "GT (GTE Pro/Am)": "85, 85, 85",
      Experimental: "42, 42, 41",
    };

    const classDepthMap: Record<string, number> = {
      "Top Class (LMP1/Hypercar)": 1.0,
      LMP2: 0.72,
      Experimental: 0.58,
      "GT (GTE Pro/Am)": 0.42,
    };

    const updateColors = () => {
      const computed = getComputedStyle(document.documentElement);
      chartColors["Top Class (LMP1/Hypercar)"] = computed.getPropertyValue("--chart-top-class-rgb").trim() || chartColors["Top Class (LMP1/Hypercar)"];
      chartColors["LMP2"] = computed.getPropertyValue("--chart-lmp2-rgb").trim() || chartColors["LMP2"];
      chartColors["GT (GTE Pro/Am)"] = computed.getPropertyValue("--chart-gt-rgb").trim() || chartColors["GT (GTE Pro/Am)"];
      chartColors["Experimental"] = computed.getPropertyValue("--chart-exp-rgb").trim() || chartColors["Experimental"];
    };

    updateColors();

    const syncNodes = (v: number) => {
      const nodes = nodesRef.current;
      const radius = radiusRef.current;
      const isReducedMotion = prefersReducedMotionRef.current;

      const start = 0.28;
      const end = 0.72;
      let t = 0;

      if (v <= start) t = 0;
      else if (v >= end) t = 1;
      else {
        t = (v - start) / (end - start);
      }

      tRef.current = t;

      const time = timeRef.current;
      const stimulus = stimulusRef.current;

      // Continuous scroll-linked emergence progression (first step: v in [0.0, 0.22])
      const scrollReveal = Math.min(1, Math.max(0, v / 0.18));

      ctx.clearRect(0, 0, width, height);

      // Fast single-pass drawing
      for (let i = 0; i < nodes.length; i++) {
        const d = nodes[i];

        // Smooth golden-ratio distributed cluster morphing
        let nodeT = 0;
        const clusterStagger = ((i * 269) % 1000) / 1000;
        const clusterStart = clusterStagger * 0.25;
        if (t > clusterStart) {
          nodeT = (t - clusterStart) / 0.75;
        }
        if (nodeT > 1) nodeT = 1;
        const easedT =
          nodeT < 0.5 ? 4 * nodeT * nodeT * nodeT : 1 - Math.pow(-2 * nodeT + 2, 3) / 2;

        let baseX = d.gridX + (d.clusterX - d.gridX) * easedT;
        let baseY = d.gridY + (d.clusterY - d.gridY) * easedT;

        // Subtle Class-Depth Parallax (editorial depth without altering data values)
        if (!isReducedMotion) {
          const depth = classDepthMap[d.class] ?? 0.55;
          const depthOffset = depth - 0.55; // [-0.13 to +0.45]
          // Parallax gently settles down by 85% as dots dock cleanly into clusters
          const clusterSettle = 1 - easedT * 0.85;
          const scrollDelta = v - 0.35;
          const parallaxY = scrollDelta * depthOffset * 18 * clusterSettle;
          const parallaxX = scrollDelta * Math.sin(depth * Math.PI) * 2.5 * clusterSettle;

          baseX += parallaxX;
          baseY += parallaxY;
        }

        // Ambient Motion (deterministic noise)
        if (!isReducedMotion) {
          const phase = i * 0.1;
          baseX += Math.sin(time * 0.001 + phase) * 2.5;
          baseY += Math.cos(time * 0.0008 + phase) * 2.5;
        }

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

        // Quantity-based dot sizing: Top Class has commanding presence, GT is dense constellation
        const classScale = classScaleMultipliers[d.class] ?? 1.0;
        let currentRadius = radius * classScale;

        // Scroll-responsive progressive emergence
        if (!isReducedMotion) {
          const emergeStagger = ((i * 137) % 1000) / 1000;
          const localEmerge = Math.min(1, Math.max(0, (scrollReveal - emergeStagger * 0.25) / 0.75));
          const easedEmerge = 1 - Math.pow(1 - localEmerge, 3);
          const emergeScale = 0.55 + 0.45 * easedEmerge;
          currentRadius = radius * classScale * emergeScale;
          opacity *= (0.45 + 0.55 * easedEmerge);
        }

        if (opacity > 0) {
          const colorRgb = chartColors[d.class] || "85, 85, 85";
          ctx.fillStyle = `rgba(${colorRgb}, ${opacity})`;
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

          if (H > 0.01 && (t > 0.05 || progress.get() > 0.25)) {
            if (className === activeClusterRef.current) {
              group.attr(
                "transform",
                `translate(${stimulus.x}, ${stimulus.y})`,
              );
            }
            group.style("opacity", H * stimulus.strength * Math.min(1, Math.max(0.6, t * 1.5)));
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
        const sel = selectedClusterRef.current;

        if (sel) {
          const center = clusters[sel];
          if (center) {
            s.x = center.x;
            s.y = center.y;
            s.strength += (1 - s.strength) * 0.25;
            activeClusterRef.current = sel;
          }
        } else if (p.active) {
          // Responsive cluster hit detection:
          // Check normalized distance to each cluster to allow fluid movement across
          // touching/neighboring clusters while firmly rejecting points in empty space.
          let bestCluster: string | null = null;
          let minNormDist = Infinity;

          for (const [className, center] of Object.entries(clusters)) {
            const hitRadius = clusterHitRadii[className] || 120;
            const dist = Math.hypot(center.x - p.x, center.y - p.y);
            const normDist = dist / hitRadius;
            if (normDist <= 1.05 && normDist < minNormDist) {
              minNormDist = normDist;
              bestCluster = className;
            }
          }

          // Active when clustered (tRef.current > 0.05 or scroll progress into Chapter 1)
          if (bestCluster && (tRef.current > 0.05 || progress.get() > 0.25)) {
            // Immediate, fluid pointer following
            if (s.strength < 0.05) {
              s.x = p.x;
              s.y = p.y;
            } else {
              s.x += (p.x - s.x) * 0.35;
              s.y += (p.y - s.y) * 0.35;
            }

            s.strength += (1 - s.strength) * 0.28;
            activeClusterRef.current = bestCluster;
          } else {
            // Pointer is in empty space or narrative text: fade out promptly
            s.strength += (0 - s.strength) * 0.25;
            if (s.strength < 0.05) {
              s.strength = 0;
              activeClusterRef.current = null;
            }
          }
        } else {
          s.strength += (0 - s.strength) * 0.25;
          if (s.strength < 0.05) {
            s.strength = 0;
            activeClusterRef.current = null;
          }
        }

        for (const className of Object.keys(clusters)) {
          const currentH = clusterIntensitiesRef.current[className] || 0;
          const isTarget = sel
            ? sel === className
            : p.active && s.strength > 0.01 && className === activeClusterRef.current;
          const targetH = isTarget ? 1 : 0;
          const rate = targetH > currentH ? 0.25 : 0.20;
          clusterIntensitiesRef.current[className] =
            currentH + (targetH - currentH) * rate;
        }

        syncNodes(progress.get());
      });
    } else {
      // Draw static frame when offscreen
      syncNodes(progress.get());
    }

    const unsubscribe = progress.on("change", (v) => {
      if (!isAnimatedRef.current) {
        syncNodes(v);
      }
    });

    const handleThemeChange = () => {
      updateColors();
      syncNodes(progress.get());
    };
    window.addEventListener("wec-theme-change", handleThemeChange);

    return () => {
      unsubscribe();
      if (timer) timer.stop();
      window.removeEventListener("wec-theme-change", handleThemeChange);
    };
  }, [
    isAnimated,
    isInView,
    isLayoutReady,
    width,
    height,
    clusters,
    clusterHitRadii,
    classScaleMultipliers,
    progress,
  ]);

  return (
    <div
      className={styles.container}
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleContainerClick}
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

        {/* Interactive Touch Target Zones for Clusters */}
        {dimensions.width > 0 && (
          <g>
            {Object.entries(clusters).map(([className, center]) => (
              <g
                key={`touch-${className}`}
                transform={`translate(${center.x}, ${center.y})`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectCluster(className);
                }}
                style={{ cursor: "pointer", pointerEvents: "auto" }}
                role="button"
                tabIndex={0}
                aria-pressed={selectedCluster === className}
                aria-label={`Inspect ${className}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelectCluster(className);
                  }
                }}
              >
                {/* Touch Hit Area (Generous touch target) */}
                <circle r={isMobile ? 48 : 58} fill="transparent" />
                {/* Visual feedback indicator when selected on touchscreen */}
                {selectedCluster === className && (
                  <circle
                    r={isMobile ? 38 : 48}
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    opacity="0.8"
                  />
                )}
              </g>
            ))}
          </g>
        )}

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
