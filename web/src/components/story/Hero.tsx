import { m, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import styles from "./Hero.module.css";

import img1 from "../../assets/filmstrip/01.webp";
import img2 from "../../assets/filmstrip/02.webp";
import img3 from "../../assets/filmstrip/03.webp";
import img4 from "../../assets/filmstrip/04.webp";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const filmstripVariant: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : -20 },
    visible: {
      opacity: 0.25, // visually subordinate
      y: 0,
      transition: { duration: 2, ease: "easeOut", delay: 0.1 },
    },
  };

  // Duplicate arrays to create a seamless infinite loop
  const topRow = [img1, img2, img3, img4, img1, img2, img3, img4];
  const bottomRow = [img3, img4, img1, img2, img3, img4, img1, img2];

  return (
    <section className={styles.hero}>
      {/* Cinematic Filmstrip Background */}
      <m.div
        className={styles.filmstripContainer}
        initial="hidden"
        animate="visible"
        variants={filmstripVariant}
      >
        <div className={`${styles.filmstripRow} ${styles.scrollLeft}`}>
          {topRow.map((src, i) => (
            <img
              key={`top-${i}`}
              src={src}
              className={styles.filmstripImage}
              alt=""
              aria-hidden="true"
              fetchPriority={i < 2 ? "high" : "auto"}
              loading={i < 4 ? "eager" : "lazy"}
              decoding="async"
              width="800"
              height="533"
            />
          ))}
        </div>
        <div className={`${styles.filmstripRow} ${styles.scrollRight}`}>
          {bottomRow.map((src, i) => (
            <img
              key={`bot-${i}`}
              src={src}
              className={styles.filmstripImage}
              alt=""
              aria-hidden="true"
              loading={i >= 4 ? "eager" : "lazy"}
              decoding="async"
              width="800"
              height="533"
            />
          ))}
        </div>
      </m.div>

      {/* Overlays for fading, masking and texture */}
      <div className={styles.grainOverlay} />
      <div className={styles.vignetteOverlay} />
      <div className={styles.overlay} />

      <div className={styles.content}>
        <m.div
          className={styles.titleGroup}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
        >
          <h1 className={styles.title}>
            <span className={styles.line}>13 Years.</span>
            <span className={styles.line}>Hundreds of Races.</span>
            <span className={styles.line}>One Evolving Championship.</span>
          </h1>
        </m.div>

        <m.div
          className={styles.editorialGroup}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          transition={{ delay: 0.4 }}
        >
          <p className={styles.editorial}>
            Between 2011 and 2023, the FIA World Endurance Championship survived
            dramatic regulation shifts, manufacturer exoduses, and a global
            pandemic. Through race results, team participation, and pace
            evolution, this data story examines how the championship changed—and
            who actually dominated it.
          </p>
          <div className={styles.metadata}>
            <span>Analytical Record: 2011 — 2023</span>
          </div>
        </m.div>
      </div>
    </section>
  );
}
