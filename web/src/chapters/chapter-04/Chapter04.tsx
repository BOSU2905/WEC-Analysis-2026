import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import styles from "./Chapter04.module.css";
import TyreShare from "../../visualizations/TyreShare";

import softTyre from "../../assets/tyres/michelin-soft.svg";
import mediumTyre from "../../assets/tyres/michelin-medium.svg";
import hardTyre from "../../assets/tyres/michelin-hard.svg";
import wetTyre from "../../assets/tyres/michelin-wet.svg";

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
        <m.header className={styles.header} style={{ opacity, y }}>
          <h2 className={styles.chapterNumber}>Chapter 04</h2>
          <h3 className={styles.chapterTitle}>The Grip</h3>
          <p className={styles.chapterIntro}>
            Tyres dictate pace, strategy, and engineering limits. Throughout the
            WEC's history, one supplier dominated the field, capturing 68.3% of
            all tyre assignments across 13 years: <strong>Michelin</strong>.
          </p>
        </m.header>
      </div>

      <div className={styles.content}>
        <div className={styles.tyresSection}>
          <div className={styles.tyresGrid}>
            <div className={styles.tyreCard} tabIndex={0} role="group" aria-label="Soft Tyre Information">
              <div className={styles.tyreIconWrapper}>
                <img src={softTyre} alt="" className={`${styles.tyreIcon} ${styles.rotate1}`} aria-hidden="true" loading="lazy" />
              </div>
              <h5 className={styles.tyreLabel}>Soft</h5>
              <div className={styles.tyreInfo}>
                <span className={styles.tyreType}>Slick</span>
                <p className={styles.tyreDesc}>Intended for temperatures below 15°C or night-time racing.</p>
              </div>
            </div>
            <div className={styles.tyreCard} tabIndex={0} role="group" aria-label="Medium Tyre Information">
              <div className={styles.tyreIconWrapper}>
                <img src={mediumTyre} alt="" className={`${styles.tyreIcon} ${styles.rotate2}`} aria-hidden="true" loading="lazy" />
              </div>
              <h5 className={styles.tyreLabel}>Medium</h5>
              <div className={styles.tyreInfo}>
                <span className={styles.tyreType}>Slick</span>
                <p className={styles.tyreDesc}>Intended for temperatures above 15°C.</p>
              </div>
            </div>
            <div className={styles.tyreCard} tabIndex={0} role="group" aria-label="Hard Tyre Information">
              <div className={styles.tyreIconWrapper}>
                <img src={hardTyre} alt="" className={`${styles.tyreIcon} ${styles.rotate3}`} aria-hidden="true" loading="lazy" />
              </div>
              <h5 className={styles.tyreLabel}>Hard</h5>
              <div className={styles.tyreInfo}>
                <span className={styles.tyreType}>Slick</span>
                <p className={styles.tyreDesc}>Intended for temperatures above 30°C.</p>
              </div>
            </div>
            <div className={styles.tyreCard} tabIndex={0} role="group" aria-label="Wet Tyre Information">
              <div className={styles.tyreIconWrapper}>
                <img src={wetTyre} alt="" className={`${styles.tyreIcon} ${styles.rotate4}`} aria-hidden="true" loading="lazy" />
              </div>
              <h5 className={styles.tyreLabel}>Wet</h5>
              <div className={styles.tyreInfo}>
                <span className={styles.tyreType}>Rain tyre</span>
                <p className={styles.tyreDesc}>Suitable for conditions ranging from damp to very wet.</p>
              </div>
            </div>
          </div>
          <p className={styles.tyresDisclaimer}>
            Source: <a href="https://africa.michelin.com/en/why-michelin/motorsport/michelin-exclusive-tyre-supplier-for-the-wec-s-hypercar-class" target="_blank" rel="noreferrer">Michelin Motorsport</a>.
            <br />
            *Note: Actual tyre life and strategy depend on track conditions, setup, driving style, and race circumstances. The SVGs shown are conceptual illustrations.
          </p>
        </div>

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
