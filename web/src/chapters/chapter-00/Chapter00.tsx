import { useRef } from "react";
import { m, useScroll, useTransform, useReducedMotion } from "framer-motion";
import styles from "./Chapter00.module.css";
import EditorialPhoto from "../../components/story/EditorialPhoto";
import photoGrid from "../../assets/editorial/wec-starting-grid.webp";
import photoPit from "../../assets/editorial/wec-pit-operations.webp";

export default function Chapter00() {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [50, 0, 0, -50]);

  return (
    <article id="chapter-00" className={styles.chapter} ref={containerRef}>
      <div className={styles.stickyContainer}>
        <m.header
          className={styles.header}
          style={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity, y }}
        >
          <h2 className={styles.chapterNumber}>Chapter 00</h2>
          <h3 className={styles.chapterTitle}>Understanding WEC</h3>
          <p className={styles.chapterIntro}>
            Before examining the data, it helps to understand how endurance racing functions. In the FIA World Endurance Championship (WEC), outright pace only sets the baseline. Reliability, strategy, and traffic management determine who reaches the finish.
          </p>
        </m.header>
      </div>

      <div className={styles.content}>
        <div className={styles.proseBlock}>
          <h4>A Race Against Time</h4>
          <p>
            Unlike sprint races, WEC rounds run for 6, 8, or 24 hours. A single 24 Hours of Le Mans covers roughly 5,000 kilometres, more race distance than an entire Formula 1 season. Teams must maintain competitive lap times while managing mechanical strain, variable weather, and driver rotations day and night.
          </p>
        </div>

        <EditorialPhoto
          src={photoGrid}
          alt="Starting grid of the 2020 24 Hours of Le Mans with prototypes and GT cars lined up on the pit straight"
          caption="The multiclass starting grid lined up on the pit straight before 24 hours of continuous racing."
          direction="left"
        />

        <div className={styles.proseBlock}>
          <h4>Multiple Classes, One Circuit</h4>
          <p>
            Throughout the 2011 to 2023 era, the championship used a multiclass structure. Purpose-built prototypes (such as hybrid <strong>LMP1</strong> and later <strong>Hypercars</strong>) shared the track with production-based sports cars (<strong>LMGTE Pro</strong> and <strong>Am</strong>).
          </p>
          <p>
            Because all classes run simultaneously, top-tier prototypes spend entire stints lapping slower GT traffic. Every lap requires active traffic management, balancing decisive overtakes against the risk of race-ending contact.
          </p>
        </div>

        <EditorialPhoto
          src={photoPit}
          alt="United Autosports pit crew servicing a prototype during the 2019 24 Hours of Le Mans"
          caption="Pit stops are highly choreographed operational sequences involving tyre changes, refuelling, and driver swaps."
          direction="right"
        />

        <div className={styles.proseBlock}>
          <h4>The Machine, the Team, the Strategy</h4>
          <p>
            Each car is shared by two or three drivers rotating through stints. Pit crews refuel, change tyres, and hand over the cockpit in seconds. With tyre allocations strictly capped per race weekend, teams routinely double-stint, running one set of tyres across two fuel loads to save pit lane time as grip deteriorates.
          </p>
          <p>
            Sustained championship dominance rarely comes down to horsepower alone. It requires error-free pit stops, calculated tyre strategies, and consistent execution over hundreds of racing hours.
          </p>
        </div>

        <div className={styles.proseBlock}>
          <h4>From the Race to the Data</h4>
          <p>
            The following chapters examine 13 seasons of championship data through validated timing and classification records: the distribution of the grid, factory prototype dynasties, manufacturer competition across the GT field, and the technical role of tyre supply.
          </p>
        </div>
      </div>
    </article>
  );
}
