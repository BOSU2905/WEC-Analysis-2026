import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./Chapter05.module.css";
import EvolutionLineChart from "../../visualizations/EvolutionLineChart";

export default function Chapter05() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [50, 0, 0, -50]);

  return (
    <article id="chapter-05" className={styles.chapter} ref={containerRef}>
      <div className={styles.gridContainer}>
        <div className={styles.stickyContainer}>
          <motion.header className={styles.header} style={{ opacity, y }}>
            <h2 className={styles.chapterNumber}>Chapter 05</h2>
            <h3 className={styles.chapterTitle}>The Evolution of Speed</h3>
            <p className={styles.chapterIntro}>
              Did the cars become faster? At the 24 Hours of Le Mans, the
              ultimate proving ground, engineering warfare pushed lap times
              relentlessly downward. But progress is rarely a straight line.
            </p>
          </motion.header>
        </div>

        <div className={styles.content}>
          <div className={styles.visualizationBlock}>
            <EvolutionLineChart />

            <div className={styles.caption}>
              <p>
                <strong>Minimum Fastest Lap Time at Le Mans.</strong> During the
                LMP1 era (2011–2020), aerodynamic and hybrid engineering drove
                times downward. In 2021, the Hypercar regulations deliberately
                forced a pace reduction to manage costs and enable a converged
                competitive field.
                <br />
                <em>
                  Note: Weather heavily influences year-to-year variation,
                  meaning pace is not solely an indicator of engineering
                  capability.
                </em>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.closingSection}>
        <motion.div
          className={styles.closingContent}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1 }}
        >
          <div className={styles.divider} />
          <h3>Endurance, Validated</h3>
          <p>
            Across 13 years, the FIA World Endurance Championship evolved from
            the high-cost technological warfare of the LMP1 era to the
            accessible, sustainable structure of the Hypercar era.
          </p>
          <p>
            Our data reveals a championship defined by intense operational
            realities: massive GT fields where scale dictated success, a 68.3%
            tyre assignment dominance by Michelin, and a top-class win record
            held firmly by Toyota. As lap times were deliberately pulled back in
            the name of competitive convergence, the core truth of endurance
            racing remained unchanged.
          </p>
          <p className={styles.finalThought}>
            Speed is essential. But survival is paramount.
          </p>
        </motion.div>
      </div>
    </article>
  );
}
