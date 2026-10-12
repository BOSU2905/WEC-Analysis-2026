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

    // Map precomputed normalized coordinates instantly (0ms simulation delay)
    const rawCoords = isMobile ? armadaLayout.mobile : armadaLayout.desktop;
    const nodes: NodeData[] = new Array(rawCoords.length);
    for (let i = 0; i < rawCoords.length; i++) {
      const c = rawCoords[i];
      nodes[i] = {
        id: `node-${i}`,
        startX: c[0] * width,
        startY: c[1] * height,
        targetX: c[2] * width,
        targetY: c[3] * height,
      };
    }
    nodesRef.current = nodes;
  }, [dimensions, width, height, isMobile]);

  // Viewport tracking: trigger entrance as soon as Chapter 3 enters view
  const isAnimated = useInView(containerRef, { amount: 0.15 });
  const animationStartTime = useRef<number | null>(null);
  const hasEnteredRef = useRef(false);
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
    if (!isAnimated && !hasEnteredRef.current) {
      animationStartTime.current = null;
    }
  }, [isAnimated]);

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
      if (!nodes || nodes.length === 0) return;

      const v = tRef.current;
      const time = timeRef.current;

      const start = 0.05;
      const end = 0.95;
      let t = 0;
      if (v <= start) t = 0;
      else if (v >= end) t = 1;
      else {
        t = (v - start) / (end - start);
      }

      // Start entrance timing immediately when in view
      if (!hasEnteredRef.current && isAnimated && animationStartTime.current === null) {
        animationStartTime.current = time;
      }

      const easedT = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const isReducedMotion = prefersReducedMotionRef.current;

      const centerX = width / 2;
      const centerY = height / 2;

      const elapsedSinceEntrance = animationStartTime.current !== null
        ? time - animationStartTime.current
        : 0;
      const enterProgress = hasEnteredRef.current || isReducedMotion
        ? 1
        : Math.min(1, elapsedSinceEntrance / 1200);

      if (enterProgress >= 1) {
        hasEnteredRef.current = true;
      }

      const enterEase = d3.easeCubicOut(enterProgress);

      const rCurrent = isReducedMotion
        ? rBase
        : rBase * (0.2 + 0.8 * enterEase);
      const enterFade = isReducedMotion ? 1 : enterEase;
      const mainOpacity = (0.75 + 0.25 * easedT) * enterFade;
      const otherOpacity = (0.2 + 0.3 * (1 - easedT)) * enterFade;

      ctx.clearRect(0, 0, width, height);

      // 1. Batch GT group (1 draw call)
      if (mainOpacity > 0 && gt.length > 0) {
        ctx.fillStyle = `rgba(${gtRgb}, ${mainOpacity})`;
        ctx.beginPath();
        for (let k = 0; k < gt.length; k++) {
          const idx = gt[k];
          const d = nodes[idx];
          const targetBaseX = d.startX + (d.targetX - d.startX) * easedT;
          const targetBaseY = d.startY + (d.targetY - d.startY) * easedT;
          let cx = isReducedMotion
            ? targetBaseX
            : centerX + (targetBaseX - centerX) * enterEase;
          let cy = isReducedMotion
            ? targetBaseY
            : centerY + (targetBaseY - centerY) * enterEase;
          if (!isReducedMotion && enterProgress > 0.2) {
            const ambientAmp = 2.5 * enterEase;
            const phase = idx * 0.1;
            cx += Math.sin(time * 0.001 + phase) * ambientAmp;
            cy += Math.cos(time * 0.0008 + phase) * ambientAmp;
          }
          ctx.moveTo(cx + rCurrent, cy);
          ctx.arc(cx, cy, rCurrent, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      // 2. Batch Top Class group (1 draw call)
      if (mainOpacity > 0 && topClass.length > 0) {
        ctx.fillStyle = `rgba(${topClassRgb}, ${mainOpacity})`;
        ctx.beginPath();
        for (let k = 0; k < topClass.length; k++) {
          const idx = topClass[k];
          const d = nodes[idx];
          const targetBaseX = d.startX + (d.targetX - d.startX) * easedT;
          const targetBaseY = d.startY + (d.targetY - d.startY) * easedT;
          let cx = isReducedMotion
            ? targetBaseX
            : centerX + (targetBaseX - centerX) * enterEase;
          let cy = isReducedMotion
            ? targetBaseY
            : centerY + (targetBaseY - centerY) * enterEase;
          if (!isReducedMotion && enterProgress > 0.2) {
            const ambientAmp = 2.5 * enterEase;
            const phase = idx * 0.1;
            cx += Math.sin(time * 0.001 + phase) * ambientAmp;
            cy += Math.cos(time * 0.0008 + phase) * ambientAmp;
          }
          ctx.moveTo(cx + rCurrent, cy);
          ctx.arc(cx, cy, rCurrent, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      // 3. Batch Other group (1 draw call)
      if (otherOpacity > 0 && other.length > 0) {
        ctx.fillStyle = `rgba(${expRgb}, ${otherOpacity})`;
        ctx.beginPath();
        for (let k = 0; k < other.length; k++) {
          const idx = other[k];
          const d = nodes[idx];
          const targetBaseX = d.startX + (d.targetX - d.startX) * easedT;
          const targetBaseY = d.startY + (d.targetY - d.startY) * easedT;
          let cx = isReducedMotion
            ? targetBaseX
            : centerX + (targetBaseX - centerX) * enterEase;
          let cy = isReducedMotion
            ? targetBaseY
            : centerY + (targetBaseY - centerY) * enterEase;
          if (!isReducedMotion && enterProgress > 0.2) {
            const ambientAmp = 2.5 * enterEase;
            const phase = idx * 0.1;
            cx += Math.sin(time * 0.001 + phase) * ambientAmp;
            cy += Math.cos(time * 0.0008 + phase) * ambientAmp;
          }
          ctx.moveTo(cx + rCurrent, cy);
          ctx.arc(cx, cy, rCurrent, 0, Math.PI * 2);
        }
        ctx.fill();
      }

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
      window.removeEventListener("wec-theme-change", updateColors);
    };
  }, [isAnimated, width, height]);

  // Progress tracking
  useEffect(() => {
    const unsubscribe = progress.on("change", (v) => {
      tRef.current = v;
    });
    tRef.current = progress.get();
    return () => unsubscribe();
  }, [progress]);

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

  return (
    <div className={styles.container} ref={containerRef}>
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
            return (
              <div
                key={team}
                className={styles.annotationCard}
                style={getAnnotationStyle(team, center)}
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
