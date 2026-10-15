import { useEffect, useRef, useState, useMemo } from "react";
import * as d3 from "d3";
import { MotionValue, useInView } from "framer-motion";
import datasetScale from "../data/dataset_scale.json";
import clusterOffsetsData from "../data/scatter_cluster_offsets.json";
import styles from "./ScaleScatter.module.css";

const clusterOffsets = clusterOffsetsData as unknown as Record<string, [number, number][]>;

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
  pseudoDepth: number;
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

  const { width, height } = dimensions;

  // Quantity-based relative class scale multipliers matching reference screenshot
  const classScaleMultipliers: Record<string, number> = useMemo(() => {
    return {
      "Top Class (LMP1/Hypercar)": 1.0,
      LMP2: 1.0,
      "GT (GTE Pro/Am)": 0.96,
      Experimental: 1.05,
    };
  }, []);

  // User-approved exact organic three-cluster composition matching references/scatter-scaled-approved.png:
  // - Top Class (upper-left): rounded organic mass in muted teal
  // - LMP2 (upper-right): rounded organic mass in muted blue
  // - GT (lower-center): broad warm gold mass nestled below and between the upper pair
  // - Experimental (lower-left): small separate outlier group in green
  // The complete composition is centered in its dedicated container using its total bounding box,
  // scaling to occupy approximately 80 to 90% of the usable container area with comfortable breathing room.
  const clusterLayout = useMemo(() => {
    if (width === 0 || height === 0) {
      return {
        centers: {
          "Top Class (LMP1/Hypercar)": { x: 0, y: 0 },
          LMP2: { x: 0, y: 0 },
          "GT (GTE Pro/Am)": { x: 0, y: 0 },
          Experimental: { x: 0, y: 0 },
        },
        radii: {
          "Top Class (LMP1/Hypercar)": 100,
          LMP2: 120,
          "GT (GTE Pro/Am)": 150,
          Experimental: 20,
        },
        scale: 1.0,
        baseDotRadius: 3.6,
      };
    }

    const isMobileVp = width < 640;
    const isTabletVp = width >= 640 && width < 1024;

    // Composition reference dimensions matching canonical simulation & reference screenshot:
    // Total bounding box of all particles: W = 638px, H = 571px
    const COMP_W = 638;
    const COMP_H = 571;

    // Relative center vectors from the composition's bounding-box center (581.6, 481.6):
    const REL_CENTERS: Record<string, { x: number; y: number }> = {
      "Top Class (LMP1/Hypercar)": { x: -179.6, y: -120.6 },
      LMP2: { x: 155.4, y: -122.6 },
      "GT (GTE Pro/Am)": { x: -12.6, y: 94.5 },
      Experimental: { x: -297.6, y: 121.9 },
    };

    // Dedicated container sizing: approximately 80 to 90% of usable container width and height
    const targetOccupancy = isMobileVp ? 0.90 : isTabletVp ? 0.86 : 0.85;
    const scale = Math.min((width * targetOccupancy) / COMP_W, (height * targetOccupancy) / COMP_H);

    // Responsive dot sizing: scaled proportionally with container
    const baseDotRadius = Math.max(2.1, Math.min(4.8, 4.0 * scale));

    const centers: Record<string, { x: number; y: number }> = {
      "Top Class (LMP1/Hypercar)": {
        x: width * 0.5 + REL_CENTERS["Top Class (LMP1/Hypercar)"].x * scale,
        y: height * 0.5 + REL_CENTERS["Top Class (LMP1/Hypercar)"].y * scale,
      },
      LMP2: {
        x: width * 0.5 + REL_CENTERS["LMP2"].x * scale,
        y: height * 0.5 + REL_CENTERS["LMP2"].y * scale,
      },
      "GT (GTE Pro/Am)": {
        x: width * 0.5 + REL_CENTERS["GT (GTE Pro/Am)"].x * scale,
        y: height * 0.5 + REL_CENTERS["GT (GTE Pro/Am)"].y * scale,
      },
      Experimental: {
        x: width * 0.5 + REL_CENTERS["Experimental"].x * scale,
        y: height * 0.5 + REL_CENTERS["Experimental"].y * scale,
      },
    };

    const radii: Record<string, number> = {
      "Top Class (LMP1/Hypercar)": 145 * scale,
      LMP2: 168 * scale,
      "GT (GTE Pro/Am)": 194 * scale,
      Experimental: 18 * scale,
    };

    return { centers, radii, scale, baseDotRadius };
  }, [width, height]);

  const clusters = clusterLayout.centers;

  // Lightweight spatial grid lookup for O(1) deterministic hit-testing
  type SpatialGridData = {
    grid: number[][];
    cellSize: number;
    numCols: number;
    numRows: number;
    hitThreshold: number;
  };
  const spatialGridRef = useRef<SpatialGridData | null>(null);

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
          pseudoDepth: (((i * 618) % 1000) / 1000) * 2 - 1, // Deterministic [-1, 1] pseudo-depth
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

    // Calculate grid layout and instant deterministic cluster coordinates
    const classIndices: Record<string, number> = {};

    data.forEach((d, i) => {
      d.gridX = xOffset + (i % cols) * (radius * 2 + padding);
      d.gridY = yOffset + Math.floor(i / cols) * (radius * 2 + padding);

      const classIdx = classIndices[d.class] || 0;
      classIndices[d.class] = classIdx + 1;

      const clusterCenter = clusters[d.class] || { x: width / 2, y: height / 2 };
      const offsetsList = clusterOffsets[d.class];
      const offset = offsetsList && offsetsList[classIdx] ? offsetsList[classIdx] : [0, 0];

      d.clusterX = clusterCenter.x + offset[0] * clusterLayout.scale;
      d.clusterY = clusterCenter.y + offset[1] * clusterLayout.scale;
      d.x = d.gridX;
      d.y = d.gridY;
    });

    nodesRef.current = data;

    // Build spatial lookup grid for deterministic category ownership
    const cellSize = 24;
    const numCols = Math.ceil(width / cellSize);
    const numRows = Math.ceil(height / cellSize);
    const grid: number[][] = Array.from({ length: numCols * numRows }, () => []);

    data.forEach((d, i) => {
      const col = Math.floor(d.clusterX / cellSize);
      const row = Math.floor(d.clusterY / cellSize);
      if (col >= 0 && col < numCols && row >= 0 && row < numRows) {
        grid[row * numCols + col].push(i);
      }
    });

    spatialGridRef.current = {
      grid,
      cellSize,
      numCols,
      numRows,
      hitThreshold: Math.max(12, clusterLayout.baseDotRadius * 2.4),
    };

    setIsLayoutReady(true);
  }, [isInView, width, height, clusters, clusterLayout]);

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

  // Deterministic O(1) hit testing: finds which category owns the closest dot
  const findCategoryAtPointer = (px: number, py: number): string | null => {
    const spatial = spatialGridRef.current;
    if (!spatial) return null;
    const { grid, cellSize, numCols, numRows, hitThreshold } = spatial;
    const col = Math.floor(px / cellSize);
    const row = Math.floor(py / cellSize);

    let bestDistSq = hitThreshold * hitThreshold;
    let bestCategory: string | null = null;
    const nodes = nodesRef.current;

    for (let dr = -1; dr <= 1; dr++) {
      const curR = row + dr;
      if (curR < 0 || curR >= numRows) continue;
      for (let dc = -1; dc <= 1; dc++) {
        const curC = col + dc;
        if (curC < 0 || curC >= numCols) continue;
        const cell = grid[curR * numCols + curC];
        if (!cell) continue;
        for (let k = 0; k < cell.length; k++) {
          const d = nodes[cell[k]];
          const distSq = (d.clusterX - px) * (d.clusterX - px) + (d.clusterY - py) * (d.clusterY - py);
          if (distSq < bestDistSq) {
            bestDistSq = distSq;
            bestCategory = d.class;
          }
        }
      }
    }
    return bestCategory;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
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
    // Graceful restoration: do NOT abruptly snap stimulus and intensities to 0.
    // Setting pointerRef.current.active = false allows the animation loop to smoothly
    // decay stimulus.strength and cluster intensities back to default appearance.
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

    const clickedCategory = findCategoryAtPointer(clickX, clickY);
    if (clickedCategory) {
      handleSelectCluster(clickedCategory);
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
          baseX += Math.sin(time * 0.001 + phase) * 1.0;
          baseY += Math.cos(time * 0.0008 + phase) * 1.0;
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
        const stim = stimulus.strength;
        const baseOp = 0.72;
        const activeProminence = 0.94;
        const recedeDim = 0.40;

        let opacity = baseOp;
        if (t > 0 && stim > 0.005) {
          // Hovered island gains brightness and prominence up to 0.94;
          // Inactive islands gently recede to 0.40 without disappearing.
          const targetOp = baseOp + (activeProminence - baseOp) * H - (baseOp - recedeDim) * (1 - H);
          opacity = baseOp + (targetOp - baseOp) * stim;
        }

        // Quantity-based dot sizing: Top Class has commanding presence, GT is dense constellation
        const classScale = classScaleMultipliers[d.class] ?? 1.0;
        const baseDotR = radius + (clusterLayout.baseDotRadius - radius) * easedT;
        // Subtle visual emphasis for the active cluster: +7% radius boost
        const focusScaleBoost = 1 + 0.07 * H * stim;
        let currentRadius = baseDotR * classScale * focusScaleBoost;

        // Scroll-responsive progressive emergence
        if (!isReducedMotion) {
          const emergeStagger = ((i * 137) % 1000) / 1000;
          const localEmerge = Math.min(1, Math.max(0, (scrollReveal - emergeStagger * 0.25) / 0.75));
          const easedEmerge = 1 - Math.pow(1 - localEmerge, 3);
          const emergeScale = 0.55 + 0.45 * easedEmerge;
          currentRadius *= emergeScale;
          opacity *= (0.45 + 0.55 * easedEmerge);
        }

        if (opacity > 0) {
          const colorRgb = chartColors[d.class] || "85, 85, 85";

          // Base dot fill with manufacturer-inspired palette
          ctx.fillStyle = `rgba(${colorRgb}, ${opacity})`;
          ctx.beginPath();
          ctx.arc(baseX, baseY, currentRadius, 0, Math.PI * 2);
          ctx.fill();

          // Subtle pseudo-3D depth cue:
          // Restrained top-left micro-highlight (tactile editorial ink / micro-lens sheen)
          // Dots slightly in foreground receive a delicate specular accent.
          if (currentRadius >= 2.0 && opacity > 0.25) {
            const zNorm = (d.pseudoDepth + 1) * 0.5; // [0, 1]
            const highlightAlpha = opacity * (0.12 + 0.08 * zNorm) * (1 + 0.25 * H * stim);
            if (highlightAlpha > 0.02) {
              ctx.fillStyle = `rgba(255, 255, 255, ${highlightAlpha})`;
              ctx.beginPath();
              ctx.arc(
                baseX - currentRadius * 0.26,
                baseY - currentRadius * 0.26,
                currentRadius * 0.36,
                0,
                Math.PI * 2
              );
              ctx.fill();
            }
          }
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
          // Deterministic spatial hit testing based on actual rendered dot positions:
          // Returns the owning category of the closest dot within hitThreshold,
          // or null if the pointer is in empty space.
          const hoveredCategory = findCategoryAtPointer(p.x, p.y);

          // Active when clustered (tRef.current > 0.05 or scroll progress into Chapter 1)
          if (hoveredCategory && (tRef.current > 0.05 || progress.get() > 0.25)) {
            // Immediate, fluid pointer following
            if (s.strength < 0.05) {
              s.x = p.x;
              s.y = p.y;
            } else {
              s.x += (p.x - s.x) * 0.35;
              s.y += (p.y - s.y) * 0.35;
            }

            s.strength += (1 - s.strength) * 0.28;
            activeClusterRef.current = hoveredCategory;
          } else {
            // Pointer is in empty space or narrative text: fade out smoothly
            s.strength += (0 - s.strength) * 0.22;
            if (s.strength < 0.02) {
              s.strength = 0;
              activeClusterRef.current = null;
            }
          }
        } else {
          // Pointer is outside container: smoothly restore default appearance
          s.strength += (0 - s.strength) * 0.22;
          if (s.strength < 0.02) {
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
          const rate = targetH > currentH ? 0.26 : 0.20;
          const nextH = currentH + (targetH - currentH) * rate;
          clusterIntensitiesRef.current[className] =
            nextH < 0.005 ? 0 : nextH > 0.995 ? 1 : nextH;
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
    clusterLayout,
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
                {/* Touch Hit Area (Tailored directly to actual cluster footprint without overlapping neighbors) */}
                <circle
                  r={
                    className === "Experimental"
                      ? Math.max(18, clusterLayout.radii["Experimental"] * 1.2)
                      : (clusterLayout.radii[className] ?? 50) * 0.85
                  }
                  fill="transparent"
                />
                {/* Visual feedback indicator when selected on touchscreen */}
                {selectedCluster === className && (
                  <circle
                    r={
                      className === "Experimental"
                        ? Math.max(16, clusterLayout.radii["Experimental"])
                        : (clusterLayout.radii[className] ?? 50) * 0.75
                    }
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
