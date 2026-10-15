import { useRef } from "react";
import { m, useScroll, useTransform, useReducedMotion } from "framer-motion";
import styles from "./Chapter05.module.css";
import EvolutionLineChart from "../../visualizations/EvolutionLineChart";

export default function Chapter05() {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [50, 0, 0, -50]);

  return (
    <article id="chapter-05" className={styles.chapter} ref={containerRef}>
      <div className={styles.gridContainer}>
        <div className={styles.stickyContainer}>
          <m.header
            className={styles.header}
            style={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity, y }}
          >
            <h2 className={styles.chapterNumber}>Chapter 05</h2>
            <h3 className={styles.chapterTitle}>The Evolution of Speed</h3>
            <p className={styles.chapterIntro}>
              Fastest lap times at the 24 Hours of Le Mans provide a consistent benchmark for prototype performance. Over thirteen seasons, technological development drove lap times down until intentional regulatory adjustments reset the baseline.
            </p>
          </m.header>
        </div>

        <div className={styles.content}>
          <div className={styles.visualizationBlock}>
            <EvolutionLineChart />

            <div className={styles.caption}>
              <p>
                <strong>Fastest race lap per season at Le Mans.</strong> During the LMP1 era (2011–2020), hybrid power and aerodynamic refinement lowered lap times to historic marks. In 2021, Hypercar regulations introduced a targeted pace reset to contain budgets and encourage broader manufacturer participation.
                <br />
                <em>
                  Note: Track and weather conditions contribute to year to year variation alongside technical regulations.
                </em>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.closingSection}>
        <m.div
          className={styles.closingContent}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: shouldReduceMotion ? 0 : 1 }}
        >
          <div className={styles.divider} />
          <h3>Thirteen Years of Endurance</h3>
          <p>
            Between 2011 and 2023, the World Endurance Championship shifted from high-cost factory prototype development in LMP1 to the convergence model of the Hypercar era.
          </p>
          <p>
            The data illustrates the underlying structure of that journey: large GT fields where customer scale supported the championship, sustained tyre supply led by Michelin, and an overall win record established by Toyota's continuous participation. While regulatory shifts reset ultimate lap times, the core demands of endurance racing endure.
          </p>
          <p className={styles.finalThought}>
            Outright pace secures track position, but mechanical durability, operational discipline, and traffic management decide the race.
          </p>
        </m.div>
      </div>
    </article>
  );
}
