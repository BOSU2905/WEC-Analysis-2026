import { useEffect, useRef, useState, useMemo } from "react";
import * as d3 from "d3";
import { MotionValue, useInView } from "framer-motion";
import armadaLayout from "../data/armada_layout.json";
import styles from "./ArmadaScatter.module.css";

type Props = {
  progress: MotionValue<number>;
};

type NodeData = {
  id: string;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
};

const MAIN_TEAMS = [
  "AF Corse",
  "Aston Martin Racing",
  "Toyota Gazoo Racing",
  "Rebellion Racing",
  "Audi Sport Team Joest",
  "Porsche GT Team",
];

const TEAM_INFO: Record<string, string> = {
  "AF Corse": "Secured 41 absolute GT wins by fielding 11 unique vehicles.",
  "Aston Martin Racing":
    "Secured 42 absolute GT wins fielding 5 unique vehicles.",
  "Toyota Gazoo Racing": "Accumulated 44 Top Class victories.",
  "Porsche GT Team": "Secured 11 absolute GT wins fielding 4 unique vehicles.",
  "Audi Sport Team Joest": "Secured 18 Top Class victories.",
  "Rebellion Racing": "Secured 3 Top Class victories.",
};

export default function ArmadaScatter({ progress }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const annotationsRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const nodesRef = useRef<NodeData[]>([]);
  const delaysRef = useRef<Float32Array | null>(null);
  const syncNodesRef = useRef<(() => void) | null>(null);
  const lastAnnotationOpacityRef = useRef<number>(-1);

  const tRef = useRef(0);
  const timeRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  const clusters = useMemo(() => {
    return isMobile
      ? {
          "AF Corse": { x: width * 0.3, y: height * 0.25 },
          "Aston Martin Racing": { x: width * 0.7, y: height * 0.25 },
          "Toyota Gazoo Racing": { x: width * 0.5, y: height * 0.45 },
          "Porsche GT Team": { x: width * 0.3, y: height * 0.65 },
          "Audi Sport Team Joest": { x: width * 0.7, y: height * 0.65 },
          "Rebellion Racing": { x: width * 0.5, y: height * 0.8 },
          Other: { x: width * 0.5, y: height * 0.5 },
        }
      : {
          "AF Corse": { x: width * 0.25, y: height * 0.35 },
          "Aston Martin Racing": { x: width * 0.75, y: height * 0.35 },
          "Toyota Gazoo Racing": { x: width * 0.5, y: height * 0.3 },
          "Porsche GT Team": { x: width * 0.25, y: height * 0.65 },
          "Audi Sport Team Joest": { x: width * 0.75, y: height * 0.65 },
          "Rebellion Racing": { x: width * 0.5, y: height * 0.7 },
          Other: { x: width * 0.5, y: height * 0.5 },
        };
  }, [isMobile, width, height]);

  // Initial instant layout resolution from precomputed deterministic positions
  useEffect(() => {
    if (width === 0 || height === 0 || !canvasRef.current || !svgRef.current) return;

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

    const svg = d3.select(svgRef.current);
    svg.attr("width", width).attr("height", height);

    // Map precomputed normalized coordinates instantly
    const rawCoords = isMobile ? armadaLayout.mobile : armadaLayout.desktop;
    const nodes: NodeData[] = new Array(rawCoords.length);
    const delays = new Float32Array(rawCoords.length);
    const centerX = width / 2;
    const centerY = height / 2;
    const maxDist = Math.hypot(width * 0.5, height * 0.5) || 1;

    for (let i = 0; i < rawCoords.length; i++) {
      const c = rawCoords[i];
      const sx = c[0] * width;
      const sy = c[1] * height;
      nodes[i] = {
        id: `node-${i}`,
        startX: sx,
        startY: sy,
        targetX: c[2] * width,
        targetY: c[3] * height,
      };

      const dx = sx - centerX;
      const dy = sy - centerY;
      const dist = Math.hypot(dx, dy);
      const normDist = Math.min(1, dist / maxDist);
      const angle = Math.atan2(dy, dx);
      // Deterministic pseudo-random jitter
      const jitter = Math.abs(Math.sin(i * 12.9898 + i * 78.233));
      // Organic harmonic perimeter wave
      const wave = Math.sin(angle * 3 + i * 0.05) * 0.12;

      const delay = 0.52 * normDist + 0.36 * jitter + wave;
      delays[i] = Math.max(0, Math.min(1, delay));
    }
    nodesRef.current = nodes;
    delaysRef.current = delays;
  }, [dimensions, width, height, isMobile]);

  // Viewport tracking: trigger animation when Chapter 3 enters view
  const isAnimated = useInView(containerRef, { amount: 0.15 });
  const prefersReducedMotionRef = useRef(
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );

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
    if (width === 0 || height === 0 || nodesRef.current.length === 0) return;

    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    let gtRgb = "85, 85, 85";
    let topClassRgb = "232, 231, 227";
    let expRgb = "42, 42, 41";

    const updateColors = () => {
      const computed = getComputedStyle(document.documentElement);
      gtRgb = computed.getPropertyValue("--chart-gt-rgb").trim() || gtRgb;
      topClassRgb =
        computed.getPropertyValue("--chart-top-class-rgb").trim() ||
        topClassRgb;
      expRgb = computed.getPropertyValue("--chart-exp-rgb").trim() || expRgb;
      syncNodesRef.current?.();
    };

    updateColors();
    window.addEventListener("wec-theme-change", updateColors);

    const padding = 2;
    const safeArea = width * height;
    const maxRadius = Math.max(
      1,
      Math.floor(Math.sqrt(safeArea / nodesRef.current.length) / 2) - padding,
    );
    const rBase = Math.min(maxRadius, 8);
    const { gt, topClass, other } = armadaLayout.groups;

    const syncNodes = () => {
      const nodes = nodesRef.current;
      const delays = delaysRef.current;
      if (!nodes || nodes.length === 0) return;

      const v = tRef.current;
      const time = timeRef.current;
      const isReducedMotion = prefersReducedMotionRef.current;
      const centerX = width / 2;
      const centerY = height / 2;

      // Organic bloom progression driven directly by scroll (opening narrative: v in [0.0, 0.34])
      const rawBloom = Math.min(1, Math.max(0, v / 0.32));
      const bloomProgress = isReducedMotion ? 1 : 0.08 + 0.92 * rawBloom;

      // Team clustering progression: v in [0.32, 0.86]
      const clusterStart = 0.32;
      const clusterEnd = 0.86;
      let t = 0;
      if (v <= clusterStart) t = 0;
      else if (v >= clusterEnd) t = 1;
      else {
        t = (v - clusterStart) / (clusterEnd - clusterStart);
      }
      const easedT = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const staggerWindow = 0.42;
      const enterFade = isReducedMotion ? 1 : Math.min(1, 0.35 + 0.65 * bloomProgress);
      const mainOpacity = (0.75 + 0.25 * easedT) * enterFade;
      const otherOpacity = (0.2 + 0.3 * (1 - easedT)) * enterFade;

      ctx.clearRect(0, 0, width, height);

      const renderGroup = (indices: number[], colorRgb: string, opacity: number) => {
        if (opacity <= 0 || indices.length === 0) return;
        ctx.fillStyle = `rgba(${colorRgb}, ${opacity})`;
        ctx.beginPath();
        for (let k = 0; k < indices.length; k++) {
          const idx = indices[k];
          const d = nodes[idx];
          const targetBaseX = d.startX + (d.targetX - d.startX) * easedT;
          const targetBaseY = d.startY + (d.targetY - d.startY) * easedT;

          let cx = targetBaseX;
          let cy = targetBaseY;
          let nodeRadius = rBase;

          if (!isReducedMotion) {
            const delay = delays ? delays[idx] : 0;
            let localP = 0;
            if (bloomProgress > delay * staggerWindow) {
              localP = (bloomProgress - delay * staggerWindow) / (1 - delay * staggerWindow);
            }
            if (localP > 1) localP = 1;
            const nodeEase = 1 - Math.pow(1 - localP, 3);

            cx = centerX + (targetBaseX - centerX) * nodeEase;
            cy = centerY + (targetBaseY - centerY) * nodeEase;
            nodeRadius = rBase * (0.3 + 0.7 * nodeEase);

            if (nodeEase > 0.15) {
              const ambientAmp = 2.5 * nodeEase;
              const phase = idx * 0.1;
              cx += Math.sin(time * 0.001 + phase) * ambientAmp;
              cy += Math.cos(time * 0.0008 + phase) * ambientAmp;
            }
          }

          ctx.moveTo(cx + nodeRadius, cy);
          ctx.arc(cx, cy, nodeRadius, 0, Math.PI * 2);
        }
        ctx.fill();
      };

      // 1. Batch GT group (1 draw call)
      renderGroup(gt, gtRgb, mainOpacity);

      // 2. Batch Top Class group (1 draw call)
      renderGroup(topClass, topClassRgb, mainOpacity);

      // 3. Batch Other group (1 draw call)
      renderGroup(other, expRgb, otherOpacity);

      // Sync annotations overlay
      if (annotationsRef.current) {
        const targetOpacity = easedT > 0.1 ? easedT : 0;
        if (
          Math.abs(lastAnnotationOpacityRef.current - targetOpacity) > 0.005
        ) {
          annotationsRef.current.style.opacity = `${targetOpacity}`;
          lastAnnotationOpacityRef.current = targetOpacity;
        }
      }
    };

    syncNodesRef.current = syncNodes;

    let timer: d3.Timer | null = null;

    if (isAnimated) {
      timer = d3.timer(() => {
        timeRef.current = performance.now();
        syncNodes();
      });
    } else {
      timeRef.current = performance.now();
      syncNodes();
    }

    return () => {
      if (timer) timer.stop();
      syncNodesRef.current = null;
      window.removeEventListener("wec-theme-change", updateColors);
    };
  }, [isAnimated, width, height]);

  // Progress tracking
  useEffect(() => {
    const unsubscribe = progress.on("change", (v) => {
      tRef.current = v;
      if (!isAnimated) {
        syncNodesRef.current?.();
      }
    });
    tRef.current = progress.get();
    return () => unsubscribe();
  }, [progress, isAnimated]);

  const teamCounts = armadaLayout.teamCounts as Record<string, number>;

  const getAnnotationStyle = (
    team: string,
    center: { x: number; y: number },
  ) => {
    const gapX = isMobile ? 20 : 40;
    const gapY = isMobile ? 25 : 45;

    if (team === "AF Corse" || team === "Porsche GT Team") {
      return {
        left: `${center.x - gapX}px`,
        top: `${center.y}px`,
        transform: "translate(-100%, -50%)",
        textAlign: "right" as const,
        borderLeft: "none",
        borderRight: "2px solid rgba(212, 184, 134, 0.5)",
      };
    }
    if (team === "Aston Martin Racing" || team === "Audi Sport Team Joest") {
      return {
        left: `${center.x + gapX}px`,
        top: `${center.y}px`,
        transform: "translate(0, -50%)",
        textAlign: "left" as const,
      };
    }
    if (team === "Toyota Gazoo Racing") {
      return {
        left: `${center.x}px`,
        top: `${center.y - gapY}px`,
        transform: "translate(-50%, -100%)",
        textAlign: "center" as const,
        borderLeft: "none",
        borderBottom: "2px solid rgba(212, 184, 134, 0.5)",
      };
    }
    if (team === "Rebellion Racing") {
      const extraOffset = isMobile ? 50 : 80;
      return {
        left: `${center.x}px`,
        top: `${center.y + gapY + extraOffset}px`,
        transform: "translate(-50%, 0)",
        textAlign: "center" as const,
        borderLeft: "none",
        borderTop: "2px solid rgba(212, 184, 134, 0.5)",
      };
    }
    return { display: "none" };
  };

  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const handleTeamClick = (team: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedTeam((prev) => (prev === team ? null : team));
  };

  const handleContainerClick = () => {
    if (selectedTeam) {
      setSelectedTeam(null);
    }
  };

  return (
    <div
      className={styles.container}
      ref={containerRef}
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
        className={styles.svg}
        ref={svgRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
      ></svg>

      <div
        className={styles.annotationsOverlay}
        ref={annotationsRef}
        style={{ opacity: 0 }}
      >
        {dimensions.width > 0 &&
          MAIN_TEAMS.map((team) => {
            const center = clusters[team as keyof typeof clusters];
            if (!center) return null;
            const isSelected = selectedTeam === team;
            const isDimmed = selectedTeam !== null && !isSelected;

            return (
              <div
                key={team}
                className={`${styles.annotationCard} ${
                  isSelected ? styles.selectedCard : ""
                } ${isDimmed ? styles.dimmedCard : ""}`}
                style={getAnnotationStyle(team, center)}
                onClick={(e) => handleTeamClick(team, e)}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                aria-label={`Inspect ${team} statistics`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleTeamClick(team, e as unknown as React.MouseEvent);
                  }
                }}
              >
                <div className={styles.teamName}>{team}</div>
                <div className={styles.teamMetric}>
                  {teamCounts[team]} Entries
                </div>
                {TEAM_INFO[team] && (
                  <div className={styles.teamDesc}>{TEAM_INFO[team]}</div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
