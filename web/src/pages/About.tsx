import { useRef, useEffect, useState, useCallback } from "react";
import styles from "./About.module.css";
import creatorPhoto from "../assets/editorial/creator-photo.webp";

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const layersRef = useRef<{
    l1: SVGGElement | null;
    l2: SVGGElement | null;
    l3: SVGGElement | null;
  }>({ l1: null, l2: null, l3: null });

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

      currentPointer.current.x +=
        (targetPointer.current.x - currentPointer.current.x) * 0.06;
      currentPointer.current.y +=
        (targetPointer.current.y - currentPointer.current.y) * 0.06;

      const { x, y } = currentPointer.current;

      if (layersRef.current.l1) {
        layersRef.current.l1.style.transform = `translate3d(${x * 6}px, ${y * 4}px, 0)`;
      }
      if (layersRef.current.l2) {
        layersRef.current.l2.style.transform = `translate3d(${x * 14}px, ${y * 9}px, 0)`;
      }
      if (layersRef.current.l3) {
        layersRef.current.l3.style.transform = `translate3d(${x * 24}px, ${y * 16}px, 0)`;
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

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reducedMotion || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    targetPointer.current = { x: nx * 2, y: ny * 2 };

    if (rafId.current === null && isVisible.current) {
      startLoop();
    }
  };

  const handlePointerLeave = () => {
    targetPointer.current = { x: 0, y: 0 };
  };

  return (
    <article className={styles.aboutContainer}>
      <header
        className={styles.heroHeader}
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {/* Interactive Topographic Contour Canvas Vector */}
        <div className={styles.topographicBackdrop} aria-hidden="true">
          <svg
            className={styles.topographicSvg}
            viewBox="0 0 1200 440"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient
                id="about-topo-mask-grad"
                cx="50%"
                cy="45%"
                r="65%"
                fx="50%"
                fy="45%"
              >
                <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                <stop offset="65%" stopColor="#fff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0.1" />
              </radialGradient>
              <mask id="about-topo-fade">
                <rect width="1200" height="440" fill="url(#about-topo-mask-grad)" />
              </mask>
            </defs>

            <g mask="url(#about-topo-fade)">
              {/* Plane 1: Deep Geographic Contour Lines */}
              <g
                ref={(el) => {
                  layersRef.current.l1 = el;
                }}
                className={styles.contourLayer}
                stroke="var(--color-border)"
                strokeWidth="0.85"
                opacity="0.35"
              >
                <path d="M-40 80 C 200 30, 420 150, 640 90 C 860 30, 1060 130, 1260 70" />
                <path d="M-40 140 C 220 90, 440 210, 660 150 C 880 90, 1080 190, 1260 130" />
                <path d="M-40 210 C 240 150, 460 280, 680 210 C 900 140, 1100 250, 1260 190" />
                <text x="70" y="135" className={styles.topoText}>
                  LAT -6.2088 // LON 106.8456 // ELEV +35M
                </text>
                <text x="960" y="95" className={styles.topoText}>
                  DISCOVERY CONTOUR // 01
                </text>
              </g>

              {/* Plane 2: Midground Journey Flows */}
              <g
                ref={(el) => {
                  layersRef.current.l2 = el;
                }}
                className={styles.contourLayer}
                stroke="var(--color-border)"
                strokeWidth="1.1"
                opacity="0.48"
              >
                <path d="M-40 270 C 180 200, 420 340, 660 260 C 900 180, 1100 300, 1260 230" />
                <path d="M-40 340 C 200 270, 440 410, 680 330 C 920 250, 1120 370, 1260 300" />
                <text x="320" y="295" className={styles.topoText}>
                  ANALYTICAL VECTOR // 2011–2023
                </text>
              </g>

              {/* Plane 3: Burnt-Orange Apex Accent Line */}
              <g
                ref={(el) => {
                  layersRef.current.l3 = el;
                }}
                className={styles.contourLayer}
              >
                <path
                  id="about-track-p3"
                  d="M-30 180 C 220 110, 460 330, 700 190 C 940 70, 1120 240, 1250 150"
                  stroke="var(--color-accent)"
                  strokeWidth="1.6"
                  opacity="0.72"
                  strokeLinecap="round"
                />
                <circle cx="890" cy="115" r="3.5" fill="var(--color-accent)" opacity="0.8" />
                <circle
                  cx="890"
                  cy="115"
                  r="8"
                  stroke="var(--color-accent)"
                  strokeWidth="1"
                  opacity="0.35"
                />
                <text
                  x="906"
                  y="119"
                  className={styles.apexLabel}
                  fill="var(--color-accent)"
                  opacity="0.75"
                >
                  APEX // NARRATIVE ARC
                </text>
                {!reducedMotion && (
                  <circle r="2.2" fill="var(--color-accent)" opacity="0.85">
                    <animateMotion
                      dur="26s"
                      repeatCount="indefinite"
                    >
                      <mpath href="#about-track-p3" />
                    </animateMotion>
                  </circle>
                )}
              </g>
            </g>
          </svg>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.metaLead}>EDITORIAL NOTE // AUTHOR &amp; PROJECT GENESIS</div>
          <h1 className={styles.heroTitle}>Behind Endurance in Data</h1>
          <p className={styles.heroSubtitle}>
            An independent exploration at the intersection of data science, motorsport history, and digital craftsmanship.
          </p>
        </div>
      </header>

      <div className={styles.contentGrid}>
        {/* Left Column: Story & Discoveries */}
        <div className={styles.mainColumn}>
          <section className={styles.sectionBlock}>
            <h2>The Curiosity Behind the Project</h2>
            <p>
              <em>ENDURANCE IN DATA</em> began from genuine curiosity. After following the FIA World Endurance Championship, I was drawn to the strategic depth of multi-class sports car racing, where lap pace, mechanical preservation, changing weather, and traffic management interact continuously.
            </p>
            <p>
              While reviewing motorsport data archives, I came across Felipe Roll's competition dataset on Kaggle covering the 2011 to 2023 seasons. Rather than building a conventional dashboard, I set out to create an interactive editorial narrative that combines statistical rigor with the rhythm of endurance racing.
            </p>
          </section>

          <section className={styles.sectionBlock}>
            <h2>The Formula 1 &amp; Endurance Cross-Over</h2>
            <p>
              A prominent pattern across the championship's rosters is how frequently Formula 1 drivers crossed over to endurance prototypes:
            </p>
            <div className={styles.driverGrid}>
              <div className={styles.driverCard}>
                <span className={styles.driverName}>Nico Hülkenberg</span>
                <span className={styles.driverAchievement}>2015 Le Mans Winner</span>
                <p>
                  Competed at the 2015 24 Hours of Le Mans as an active F1 driver for Force India, winning outright on debut with the Porsche 919 Hybrid alongside Nick Tandy and Earl Bamber.
                </p>
              </div>
              <div className={styles.driverCard}>
                <span className={styles.driverName}>Fernando Alonso</span>
                <span className={styles.driverAchievement}>2018–2019 World Champion</span>
                <p>
                  Joined Toyota Gazoo Racing during a break from Formula 1, taking consecutive 24 Hours of Le Mans victories and securing the 2018–2019 World Endurance Championship.
                </p>
              </div>
              <div className={styles.driverCard}>
                <span className={styles.driverName}>Robert Kubica</span>
                <span className={styles.driverAchievement}>2023 LMP2 World Champion</span>
                <p>
                  Transitioned into prototype racing, winning the 2023 FIA Endurance Trophy for LMP2 with Team WRT before advancing to the Ferrari 499P Hypercar.
                </p>
              </div>
              <div className={styles.driverCard}>
                <span className={styles.driverName}>Nyck de Vries</span>
                <span className={styles.driverAchievement}>LMP2 Winner &amp; Hypercar Pilot</span>
                <p>
                  Competed in LMP2 with Racing Team Nederland before racing in Formula E and Formula 1, later joining the Toyota Gazoo Racing Hypercar squad.
                </p>
              </div>
            </div>
          </section>

          <section className={styles.sectionBlock}>
            <h2>Dataset Coverage &amp; Methodological Transparency</h2>
            <p>
              Analytical integrity requires clear dataset boundaries and methodological context:
            </p>
            <ul className={styles.transparencyList}>
              <li>
                <strong>Temporal Scope:</strong> The dataset strictly spans from the 2011 24 Hours of Le Mans (Intercontinental Le Mans Cup) through the conclusion of the 2023 Bahrain 8 Hours. It does <em>not</em> include 2024–2026 seasons.
              </li>
              <li>
                <strong>Series Classification:</strong> The 2011 records belong to the predecessor Intercontinental Le Mans Cup (ILMC). The official FIA World Endurance Championship was inaugurated in 2012.
              </li>
              <li>
                <strong>Category Transitions:</strong> The Hypercar class was inaugurated in 2021. LMGTE Pro concluded after 2022, and LMGTE Am after 2023. LMGT3 was not active during this dataset era.
              </li>
              <li>
                <strong>Data Provenance:</strong> Derived from Felipe Roll's verified Kaggle collection based on official FIA/ACO timing records.
              </li>
            </ul>
          </section>
        </div>

        {/* Right Column: Author Profile & Academic Context */}
        <aside className={styles.sidebarColumn}>
          <div className={styles.authorCard}>
            {/* Creator Portrait Area */}
            <div className={styles.portraitPlaceholder} aria-label="Project Creator Portrait">
              <div className={styles.portraitFrame}>
                <div className={styles.cornerReticleTopLeft} />
                <div className={styles.cornerReticleTopRight} />
                <div className={styles.cornerReticleBottomLeft} />
                <div className={styles.cornerReticleBottomRight} />
                <img
                  src={creatorPhoto}
                  alt="Ben, Project Creator and Data Science Student"
                  className={styles.portraitImage}
                  loading="lazy"
                  decoding="async"
                  width="1024"
                  height="683"
                />
              </div>
            </div>

            <div className={styles.authorHeader}>
              <div className={styles.authorBadge}>PROJECT CREATOR</div>
              <h3 className={styles.authorTitle}>Data Science Student</h3>
              <p className={styles.university}>BINUS University</p>
            </div>

            <div className={styles.interestTags}>
              <span>Automotive</span>
              <span>Business</span>
              <span>Technology</span>
              <span>Machine Learning</span>
              <span>Deep Learning</span>
              <span>Artificial Intelligence</span>
            </div>

            <p className={styles.authorBio}>
              As an undergraduate data science student, I created this project to explore motorsport data analysis, interactive visualization, and editorial presentation. Each chart and comparison is designed to balance empirical detail with clear narrative context.
            </p>

            <div className={styles.learningNote}>
              <span className={styles.noteTag}>NOTE //</span>
              <p>
                This project reflects an ongoing learning process. Constructive feedback, dataset refinements, and discussions on motorsport analysis are always welcome.
              </p>
            </div>
          </div>

          <div className={styles.referencesCard}>
            <h4>Verified Primary References</h4>
            <ul className={styles.referenceLinks}>
              <li>
                <a
                  href="https://www.kaggle.com/datasets/feliperoll/fia-wec-2012-2023-le-mans-2011"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Felipe Roll WEC Dataset on Kaggle &rarr;
                </a>
              </li>
              <li>
                <a
                  href="https://www.fiawec.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Official FIA World Endurance Championship &rarr;
                </a>
              </li>
              <li>
                <a
                  href="https://www.24h-lemans.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Automobile Club de l'Ouest (ACO) &rarr;
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </article>
  );
}
