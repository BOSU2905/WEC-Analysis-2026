import { useEffect, useRef, useState, useMemo } from "react";
import * as d3 from "d3";
import { MotionValue } from "framer-motion";
import dataUrl from "../data/entry_dots.csv?url";
import styles from "./ArmadaScatter.module.css";

type Props = {
  progress: MotionValue<number>;
};

type DataRow = {
  season: string;
  event_id: string;
  class_group: string;
  team: string;
};

type NodeData = {
  id: string;
  class: string;
  team: string;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  x?: number;
  y?: number;
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
  const [data, setData] = useState<DataRow[]>([]);
  const nodesRef = useRef<NodeData[]>([]);

  const tRef = useRef(0);
  const timeRef = useRef(0);

  useEffect(() => {
    d3.csv(dataUrl).then((res) => {
      setData(res as unknown as DataRow[]);
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

  // Initial layout calculation
  useEffect(() => {
    if (width === 0 || height === 0 || !svgRef.current || data.length === 0)
      return;

    const svg = d3.select(svgRef.current);
    svg.attr("width", width).attr("height", height);

    const nodes: NodeData[] = data.map((d, i) => {
      const teamGroup = MAIN_TEAMS.includes(d.team) ? d.team : "Other";
      return {
        id: `node-${i}`,
        class: d.class_group,
        team: teamGroup,
        startX: width / 2 + (Math.random() - 0.5) * 100,
        startY: height / 2 + (Math.random() - 0.5) * 100,
        targetX: 0,
        targetY: 0,
        x: width / 2,
        y: height / 2,
      };
    });

    const padding = 2;
    const safeArea = width * height;
    const maxRadius = Math.max(
      1,
      Math.floor(Math.sqrt(safeArea / nodes.length) / 2) - padding,
    );
    const radius = Math.min(maxRadius, 8);

    // Initial simulation: clump loosely in the center
    const simStart = d3
      .forceSimulation(nodes)
      .force("x", d3.forceX(width / 2).strength(0.05))
      .force("y", d3.forceY(height / 2).strength(0.05))
      .force("collide", d3.forceCollide(radius + 0.5).iterations(2))
      .stop();

    simStart.tick(150);
    nodes.forEach((d) => {
      d.startX = d.x || width / 2;
      d.startY = d.y || height / 2;
    });

    // Target simulation: cluster by team
    nodes.forEach((d) => {
      d.x = d.startX;
      d.y = d.startY;
    });

    const simTarget = d3
      .forceSimulation(nodes)
      .force(
        "x",
        d3
          .forceX<NodeData>((d) => clusters[d.team as keyof typeof clusters].x)
          .strength(0.2),
      )
      .force(
        "y",
        d3
          .forceY<NodeData>((d) => clusters[d.team as keyof typeof clusters].y)
          .strength(0.2),
      )
      .force("collide", d3.forceCollide(radius + 1).iterations(2))
      .stop();

    simTarget.tick(200);
    nodes.forEach((d) => {
      d.targetX = d.x || 0;
      d.targetY = d.y || 0;
    });

    nodesRef.current = nodes;

    const colorScale = (team: string) => {
      if (team === "AF Corse" || team === "Aston Martin Racing")
        return "#E8E7E3";
      if (
        team === "Toyota Gazoo Racing" ||
        team === "Audi Sport Team Joest" ||
        team === "Porsche GT Team" ||
        team === "Rebellion Racing"
      )
        return "#92918D";
      return "#2A2A29";
    };

    const circles = svg.selectAll("circle").data(nodes, (d: any) => d.id);

    circles
      .enter()
      .append("circle")
      .attr("r", radius)
      .attr("fill", (d) => colorScale(d.team))
      .merge(circles as any)
      .attr("cx", (d) => d.startX)
      .attr("cy", (d) => d.startY);

    circles.exit().remove();
  }, [data, dimensions, clusters, width, height]);

  // Continuous animation loop (matches Chapter 1's ambient motion style)
  useEffect(() => {
    if (width === 0 || height === 0 || data.length === 0) return;

    const syncNodes = () => {
      if (!svgRef.current || nodesRef.current.length === 0) return;

      const v = tRef.current;
      const time = timeRef.current;

      const start = 0.2;
      const end = 0.8;
      let t = 0;

      if (v <= start) t = 0;
      else if (v >= end) t = 1;
      else {
        t = (v - start) / (end - start);
      }

      const easedT = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const svg = d3.select(svgRef.current);

      svg
        .selectAll<SVGCircleElement, NodeData>("circle")
        .attr("cx", (d, i) => {
          let base = d.startX + (d.targetX - d.startX) * easedT;
          const phaseX = i * 0.1;
          const ambient = Math.sin(time * 0.001 + phaseX) * 2.5;
          base += ambient;
          return base;
        })
        .attr("cy", (d, i) => {
          let base = d.startY + (d.targetY - d.startY) * easedT;
          const phaseY = i * 0.1;
          const ambient = Math.cos(time * 0.0008 + phaseY) * 2.5;
          base += ambient;
          return base;
        })
        .attr("opacity", (d) => {
          if (d.team === "Other") return 0.2 + 0.3 * (1 - easedT);
          return 0.75 + 0.25 * easedT;
        });

      if (annotationsRef.current) {
        // Use a threshold to pop them in when settled, or fade them smoothly
        d3.select(annotationsRef.current).style(
          "opacity",
          easedT > 0.1 ? easedT : 0,
        );
      }
    };

    const timer = d3.timer((elapsed) => {
      timeRef.current = elapsed;
      syncNodes();
    });

    return () => timer.stop();
  }, [width, height, data]);

  // Progress tracking
  useEffect(() => {
    const unsubscribe = progress.on("change", (v) => {
      tRef.current = v;
    });
    tRef.current = progress.get();
    return () => unsubscribe();
  }, [progress]);

  const teamCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    data.forEach((d) => {
      const t = MAIN_TEAMS.includes(d.team) ? d.team : "Other";
      counts[t] = (counts[t] || 0) + 1;
    });
    return counts;
  }, [data]);

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
      <svg className={styles.svg} ref={svgRef}></svg>

      <div
        className={styles.annotationsOverlay}
        ref={annotationsRef}
        style={{ opacity: 0 }}
      >
        {dimensions.width > 0 &&
          data.length > 0 &&
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
