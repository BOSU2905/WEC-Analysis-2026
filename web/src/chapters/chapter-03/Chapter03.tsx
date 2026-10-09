import { useRef } from "react";
import { useScroll } from "framer-motion";
import ArmadaScatter from "../../visualizations/ArmadaScatter";
import styles from "./Chapter03.module.css";

export default function Chapter03() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <article id="chapter-03" className={styles.chapter}>
      <header className={styles.header}>
        <h2 className={styles.chapterNumber}>Chapter 03</h2>
        <h3 className={styles.chapterTitle}>The Armada Effect</h3>
      </header>

      <div className={styles.scrollyContainer} ref={containerRef}>
        <div className={styles.graphicContainer}>
          <div className={styles.graphicSticky}>
            <ArmadaScatter progress={scrollYProgress} />
          </div>
        </div>

        <div className={styles.textContainer}>
          <div className={styles.step}>
            <div className={styles.narrativeCard}>
              <p>
                While Toyota Gazoo Racing achieved sustained success through
                elite engineering in the top class, dominating the overall
                championship required a different strategy in the GT and LMP2
                classes: sheer volume.
              </p>
              <p>
                Instead of focusing all resources on a single factory prototype,
                manufacturers like Ferrari and Aston Martin flooded the grid
                with massive fleets of customer and factory entries.
              </p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.narrativeCard}>
              <p>This strategy created the "Armada Effect".</p>
              <p>
                AF Corse (Ferrari's primary proxy) fielded an astonishing{" "}
                <strong>269 total entries</strong> across the 13-year period.
                Aston Martin Racing followed closely with{" "}
                <strong>217 entries</strong>.
              </p>
              <p>
                By fielding a sprawling armada—often up to 11 different unique
                vehicles—AF Corse secured 41 absolute GT wins, nearly matching
                Toyota's top-class win count but through overwhelming
                participation rather than sheer speed.
              </p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.narrativeCard}>
              <p>
                These massive customer-racing swarms were the lifeblood of the
                championship. Without the GT and LMP2 armadas, the grids would
                have been virtually empty.
              </p>
              <p>
                They proved that in endurance racing, survival isn't just about
                having the fastest car—it's about fielding enough cars that one
                of them is bound to cross the finish line first.
              </p>
            </div>
          </div>

          <div className={styles.stepSpacer} />
        </div>
      </div>
    </article>
  );
}
