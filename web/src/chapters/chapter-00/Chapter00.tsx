import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import styles from "./Chapter00.module.css";
import EditorialPhoto from "../../components/story/EditorialPhoto";
import photoGrid from "../../assets/filmstrip/04.webp"; // Starting Grid placeholder
import photoPit from "../../assets/filmstrip/03.webp"; // Pit stop placeholder

export default function Chapter00() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [50, 0, 0, -50]);

  return (
    <article id="chapter-00" className={styles.chapter} ref={containerRef}>
      <div className={styles.stickyContainer}>
        <m.header className={styles.header} style={{ opacity, y }}>
          <h2 className={styles.chapterNumber}>Chapter 00</h2>
          <h3 className={styles.chapterTitle}>Understanding WEC</h3>
          <p className={styles.chapterIntro}>
            Before analyzing the data, one must understand the race. The FIA
            World Endurance Championship (WEC) is a global series where speed is
            only a prerequisite—endurance is the true test.
          </p>
        </m.header>
      </div>

      <div className={styles.content}>
        <div className={styles.proseBlock}>
          <h4>A Race Against Time</h4>
          <p>
            Unlike conventional sprint races, WEC events span 6, 8, or even 24
            hours. A single race can cover more distance than an entire season
            of Formula 1. The challenge is not merely being the fastest over one
            lap, but maintaining a relentless pace while managing mechanical
            fatigue, changing weather, and human endurance.
          </p>
        </div>

        <EditorialPhoto
          src={photoGrid}
          alt="Starting grid of prototypes and GT cars"
          caption="The starting grid features multiple classes preparing for hours of continuous racing."
          direction="left"
          viewportMargin="0px 0px 200px 0px"
          duration={0.6}
          priority={true}
        />

        <div className={styles.proseBlock}>
          <h4>Multiple Classes, One Circuit</h4>
          <p>
            Between 2011 and 2023, the WEC was defined by a multi-class
            structure. Purpose-built prototypes (like the high-tech{" "}
            <strong>LMP1</strong> and later <strong>Hypercar</strong> classes)
            share the track with production-based sports cars (like{" "}
            <strong>LMGTE Pro</strong> and <strong>Am</strong>).
          </p>
          <p>
            Because these classes race simultaneously, the faster prototypes
            must constantly navigate through slower GT traffic. This dynamic
            turns every lap into a strategic puzzle of overtaking and risk
            management.
          </p>
        </div>

        <EditorialPhoto
          src={photoPit}
          alt="Pit stop during the night"
          caption="Pit stops are highly choreographed, involving driver changes, refuelling, and tyre management."
          direction="right"
        />

        <div className={styles.proseBlock}>
          <h4>The Machine, the Team, the Strategy</h4>
          <p>
            A car is piloted by a rotating crew of two to four drivers. During
            pit stops, teams change drivers, refuel, and replace tyres. Because
            tyre allocations are strictly limited, teams often attempt "double
            stinting"—running the same set of tyres for multiple hours to save
            time in the pits, at the cost of declining grip over the stint.
          </p>
          <p>
            When the data reveals that a single team dominated, it means they
            mastered this entire operational complex, not just the engineering
            of the engine.
          </p>
        </div>

        <div className={styles.proseBlock}>
          <h4>From the Race to the Data</h4>
          <p>
            The following chapters decode 13 years of this championship through
            validated historical data. We explore the anatomy of the grid, the
            dominance of a single manufacturer, the GT class battles, and the
            profound impact of the tyre war.
          </p>
        </div>
      </div>
    </article>
  );
}
