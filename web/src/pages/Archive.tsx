import { lazy, Suspense } from "react";
import styles from "./Archive.module.css";

const MachinesExperience = lazy(() => import("../components/archive/MachinesExperience"));

export default function Archive() {
  return (
    <main className={styles.archive}>
      <header className={styles.header}>
        <h1 className={styles.title}>The WEC Archive</h1>
        <p className={styles.intro}>
          A user-driven exploration of the machines and circuits that defined
          the 2011–2023 era of the FIA World Endurance Championship.
        </p>
      </header>

      <Suspense fallback={<div style={{ minHeight: "50vh" }} />}>
        <MachinesExperience />
      </Suspense>

      <section className={styles.futureSection}>
        <div className={styles.placeholder}>
          <h2>Circuits That Define Endurance</h2>
          <p>
            The canonical dataset tracks historical events across iconic venues
            like Le Mans, Spa-Francorchamps, and Fuji. However, topological
            facts (track length, corner counts) must be accurately verified and
            externally sourced before this interactive map experience can be
            launched.
          </p>
          <span className={styles.comingSoon}>Coming Soon</span>
        </div>
      </section>
    </main>
  );
}
