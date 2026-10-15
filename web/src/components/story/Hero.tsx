import { m, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import styles from "./Hero.module.css";

import img1 from "../../assets/filmstrip/01.webp";
import img2 from "../../assets/filmstrip/02.webp";
import img3 from "../../assets/filmstrip/03.webp";
import img4 from "../../assets/filmstrip/04.webp";
import img5 from "../../assets/filmstrip/05.webp";
import img6 from "../../assets/filmstrip/06.webp";
import img7 from "../../assets/filmstrip/07.webp";
import img8 from "../../assets/filmstrip/08.webp";

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

  // 8 authentic editorial moments curated for a cinematic documentary sequence
  const filmstripItems = [
    {
      src: img1,
      alt: "Multiclass field led by the Rebellion R13 prototype accelerating down the pit straight at the 2020 24 Hours of Le Mans",
    },
    {
      src: img2,
      alt: "Toyota TS050 Hybrid driven by Fernando Alonso navigating Village corner at the 2018 6 Hours of Silverstone",
    },
    {
      src: img3,
      alt: "Oak Racing Morgan LMP2 battling nose-to-tail with factory Toyota TS030 Hybrid LMP1 at the 2013 6 Hours of Silverstone",
    },
    {
      src: img4,
      alt: "Morand Racing Morgan LMP2 prototype overtaking an AF Corse Ferrari 458 Italia GTE at the 2013 24 Hours of Le Mans",
    },
    {
      src: img5,
      alt: "Car Guy Racing Ferrari 488 GTE pursued closely by the factory Porsche 911 RSR at the 2019 24 Hours of Le Mans",
    },
    {
      src: img6,
      alt: "Porsche 919 Hybrid racing at night during the 2016 24 Hours of Le Mans",
    },
    {
      src: img7,
      alt: "United Autosports pit crew servicing a prototype during the 2019 24 Hours of Le Mans",
    },
    {
      src: img8,
      alt: "Toyota TS040 Hybrid LMP1 racing in wet conditions at the 2014 6 Hours of Silverstone",
    },
  ];

  // Duplicate arrays to create a seamless infinite loop across all 8 authentic editorial photos
  const topRow = [...filmstripItems, ...filmstripItems];
  const bottomRow = [
    ...filmstripItems.slice(4),
    ...filmstripItems.slice(0, 4),
    ...filmstripItems.slice(4),
    ...filmstripItems.slice(0, 4),
  ];

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
          {topRow.map((item, i) => (
            <img
              key={`top-${i}`}
              src={item.src}
              className={styles.filmstripImage}
              alt={item.alt}
              fetchPriority="low"
              loading={i < 2 ? "eager" : "lazy"}
              decoding="async"
              width="800"
              height="533"
            />
          ))}
        </div>
        <div className={`${styles.filmstripRow} ${styles.scrollRight}`}>
          {bottomRow.map((item, i) => (
            <img
              key={`bot-${i}`}
              src={item.src}
              className={styles.filmstripImage}
              alt={item.alt}
              fetchPriority="low"
              loading={i < 2 ? "eager" : "lazy"}
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
            Between 2011 and 2023, the FIA World Endurance Championship weathered
            major regulation shifts, manufacturer departures, and a global
            pandemic. Drawing on timing records, grid participation, and lap
            data, this analysis examines how the championship evolved and
            where competitive dominance emerged.
          </p>
          <div className={styles.metadata}>
            <span>Analytical Record: 2011 to 2023</span>
          </div>
        </m.div>
      </div>
    </section>
  );
}
