import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./Chapter04.module.css";
import TyreShare from "../../visualizations/TyreShare";

export default function Chapter04() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [50, 0, 0, -50]);

  return (
    <article id="chapter-04" className={styles.chapter} ref={containerRef}>
      <div className={styles.stickyContainer}>
        <motion.header className={styles.header} style={{ opacity, y }}>
          <h2 className={styles.chapterNumber}>Chapter 04</h2>
          <h3 className={styles.chapterTitle}>The Grip</h3>
          <p className={styles.chapterIntro}>
            Tyres dictate pace, strategy, and engineering limits. Throughout the
            WEC's history, one supplier dominated the field, capturing 68.3% of
            all tyre assignments across 13 years: <strong>Michelin</strong>.
          </p>
        </motion.header>
      </div>

      <div className={styles.content}>
        <div className={styles.visualizationBlock}>
          <TyreShare progress={0} />

          <div className={styles.caption}>
            <p>
              <strong>100% Stacked Area Chart</strong> showing the share of tyre
              assignments by manufacturer across seasons. Michelin held a
              near-monopoly until the introduction of Goodyear in recent
              seasons. Data based on 3,011 valid entry assignments.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
