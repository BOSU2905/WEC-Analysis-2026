import { useRef, useEffect, useState, useCallback, type ReactNode } from "react";
import styles from "./TopographicHero.module.css";

interface TopographicHeroProps {
  children?: ReactNode;
}

export default function TopographicHero({ children }: TopographicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<{
    l1: SVGGElement | null;
    l2: SVGGElement | null;
    l3: SVGGElement | null;
    l4: SVGGElement | null;
  }>({ l1: null, l2: null, l3: null, l4: null });

  const targetPointer = useRef({ x: 0, y: 0 });
  const currentPointer = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  const isVisible = useRef(true);
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  const startLoop = useCallback(() => {
    if (reducedMotion || rafId.current !== null) return;

    const animate = () => {
      if (!isVisible.current) {
        rafId.current = null;
        return;
      }

      // Smooth damping / interpolation (lerp)
      currentPointer.current.x +=
        (targetPointer.current.x - currentPointer.current.x) * 0.06;
      currentPointer.current.y +=
        (targetPointer.current.y - currentPointer.current.y) * 0.06;

      const { x, y } = currentPointer.current;

      // Apply subtle multi-plane parallax depth to contour layers
      if (layersRef.current.l1) {
        layersRef.current.l1.style.transform = `translate3d(${x * 6}px, ${y * 4}px, 0)`;
      }
      if (layersRef.current.l2) {
        layersRef.current.l2.style.transform = `translate3d(${x * 14}px, ${y * 9}px, 0)`;
      }
      if (layersRef.current.l3) {
        layersRef.current.l3.style.transform = `translate3d(${x * 22}px, ${y * 14}px, 0)`;
      }
      if (layersRef.current.l4) {
        layersRef.current.l4.style.transform = `translate3d(${x * 32}px, ${y * 20}px, 0)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);
  }, [reducedMotion]);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
        if (!entry.isIntersecting && rafId.current !== null) {
          cancelAnimationFrame(rafId.current);
          rafId.current = null;
        } else if (entry.isIntersecting && !reducedMotion && rafId.current === null) {
          startLoop();
        }
      },
      { threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion, startLoop]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    targetPointer.current = { x: nx * 2, y: ny * 2 }; // -1 to 1

    if (rafId.current === null && isVisible.current) {
      startLoop();
    }
  };

  const handlePointerLeave = () => {
    targetPointer.current = { x: 0, y: 0 };
  };

  return (
    <div
      ref={containerRef}
      className={styles.heroContainer}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Interactive Topographic Contour Canvas Vector */}
      <div className={styles.topographicBackdrop} aria-hidden="true">
        <svg
          className={styles.topographicSvg}
          viewBox="0 0 1440 680"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient
              id="topo-mask-grad"
              cx="50%"
              cy="45%"
              r="60%"
              fx="50%"
              fy="45%"
            >
              <stop offset="0%" stopColor="#fff" stopOpacity="1" />
              <stop offset="65%" stopColor="#fff" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0.1" />
            </radialGradient>
            <mask id="topo-fade">
              <rect width="1440" height="680" fill="url(#topo-mask-grad)" />
            </mask>
          </defs>

          <g mask="url(#topo-fade)">
            {/* Plane 1: Deep Base Contours (Grand topographic ridges) */}
            <g
              ref={(el) => {
                layersRef.current.l1 = el;
              }}
              className={styles.contourLayer}
              stroke="var(--color-border)"
              strokeWidth="0.85"
              opacity="0.32"
            >
              <path d="M-60 120 C 220 80, 480 210, 720 140 C 960 70, 1220 190, 1500 110" />
              <path d="M-60 180 C 240 140, 500 270, 740 200 C 980 130, 1240 250, 1500 170" />
              <path d="M-60 250 C 260 200, 520 340, 760 270 C 1000 200, 1260 320, 1500 240" />
              <text x="180" y="195" className={styles.topoText}>
                ELEVATION BASE // +120M
              </text>
              <text x="1180" y="165" className={styles.topoText}>
                CONTOUR 01
              </text>
            </g>

            {/* Plane 2: Midground Topographic Valleys (Eau Rouge & Curve dynamics) */}
            <g
              ref={(el) => {
                layersRef.current.l2 = el;
              }}
              className={styles.contourLayer}
              stroke="var(--color-border)"
              strokeWidth="1.1"
              opacity="0.48"
            >
              <path id="hero-track-p2" d="M-60 330 C 200 260, 440 430, 680 340 C 920 250, 1180 390, 1500 310" />
              <path d="M-60 410 C 220 340, 460 510, 700 420 C 940 330, 1200 470, 1500 390" />
              <path d="M-60 490 C 240 420, 480 590, 720 500 C 960 410, 1220 550, 1500 470" />
              <text x="320" y="445" className={styles.topoText}>
                GRADIENT SECTOR 02 // +184M
              </text>
              <text x="960" y="375" className={styles.topoText}>
                RADIAL APEX // +210M
              </text>
              {!reducedMotion && (
                /* Subtle telemetry pulse gliding slowly along elevation contour */
                <circle r="2" fill="var(--color-primary)" opacity="0.45" stroke="none">
                  <animateMotion
                    dur="32s"
                    begin="-8s"
                    repeatCount="indefinite"
                  >
                    <mpath href="#hero-track-p2" />
                  </animateMotion>
                </circle>
              )}
            </g>

            {/* Plane 3: Circuit Geometry Trace (Fine telemetry curves) */}
            <g
              ref={(el) => {
                layersRef.current.l3 = el;
              }}
              className={styles.contourLayer}
              stroke="var(--color-secondary)"
              strokeWidth="1.25"
              strokeDasharray="4 6"
              opacity="0.38"
            >
              <path d="M-60 210 C 310 160, 560 380, 810 240 C 1060 100, 1280 290, 1500 190" />
              <path d="M-60 380 C 280 310, 530 520, 790 390 C 1040 260, 1270 440, 1500 340" />
            </g>

            {/* Plane 4: Focal Racing Line (Burnt-orange apex contour arc) */}
            <g
              ref={(el) => {
                layersRef.current.l4 = el;
              }}
              className={styles.contourLayer}
            >
              <path
                id="hero-track-p4"
                d="M-40 280 C 250 210, 510 460, 760 320 C 1010 180, 1250 360, 1480 260"
                stroke="var(--color-accent)"
                strokeWidth="1.75"
                opacity="0.75"
                strokeLinecap="round"
              />
              {/* Apex marker moved to the right flank (x=1080) to prevent title interference */}
              <circle cx="1080" cy="216" r="3.5" fill="var(--color-accent)" opacity="0.75" />
              <circle
                cx="1080"
                cy="216"
                r="8"
                stroke="var(--color-accent)"
                strokeWidth="1"
                opacity="0.35"
              />
              <text
                x="1096"
                y="220"
                className={styles.apexLabel}
                fill="var(--color-accent)"
                opacity="0.65"
              >
                APEX CREST // SECTOR 2
              </text>
              {!reducedMotion && (
                <>
                  {/* Subtle luminous accent particle gliding along racing line */}
                  <circle r="2.5" fill="var(--color-accent)" opacity="0.85">
                    <animateMotion
                      dur="24s"
                      repeatCount="indefinite"
                    >
                      <mpath href="#hero-track-p4" />
                    </animateMotion>
                  </circle>
                  {/* Staggered secondary pulse */}
                  <circle r="1.75" fill="var(--color-accent)" opacity="0.45">
                    <animateMotion
                      dur="24s"
                      begin="-12s"
                      repeatCount="indefinite"
                    >
                      <mpath href="#hero-track-p4" />
                    </animateMotion>
                  </circle>
                </>
              )}
            </g>
          </g>
        </svg>
      </div>

      {/* Editorial Content Overlay */}
      <div className={styles.contentWrap}>
        <div className={styles.badgeRow}>
          <span className={styles.badge}>
            ARCHIVAL REPOSITORY // TELEMETRY &amp; CIRCUITS
          </span>
        </div>
        <h1 className={styles.title}>The WEC Archive</h1>
        <p className={styles.intro}>
          A user-driven exploration of the machines and circuits that defined
          the 2011 to 2023 era of the FIA World Endurance Championship.
        </p>
        {children}
      </div>
    </div>
  );
}
