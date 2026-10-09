import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import styles from "./Hero.module.css";

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

  const fadeVariant: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.5, ease: "easeOut", delay: 0.2 },
    },
  };

  return (
    <section className={styles.hero}>
      <motion.div
        className={styles.imagePlaceholder}
        initial="hidden"
        animate="visible"
        variants={fadeVariant}
      >
        <div className={styles.overlay} />
      </motion.div>

      <div className={styles.content}>
        <motion.div
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
        </motion.div>

        <motion.div
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
        </motion.div>
      </div>
    </section>
  );
}
