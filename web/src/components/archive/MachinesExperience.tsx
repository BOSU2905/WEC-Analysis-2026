import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import styles from "./MachinesExperience.module.css";
import machineData from "../../data/machine_wins.json";
import editorialData from "../../data/machine_metadata.json";

interface MachineDatum {
  vehicle: string;
  class_wins: number;
  primary_class: string;
  first_win: string;
  last_win: string;
}

const machines = machineData as MachineDatum[];
type EditorialKey = keyof typeof editorialData;

export default function MachinesExperience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMachine = machines[activeIndex];
  const editorial = editorialData[activeMachine.vehicle as EditorialKey];

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2>Machines That Defined an Era</h2>
        <p>
          Explore the statistically dominant platforms in the WEC 2011–2023
          dataset.
        </p>
      </div>

      <div className={styles.selector}>
        {machines.map((machine, index) => (
          <button
            key={machine.vehicle}
            className={`${styles.tab} ${activeIndex === index ? styles.active : ""}`}
            onClick={() => setActiveIndex(index)}
          >
            {machine.vehicle}
          </button>
        ))}
      </div>

      <div className={styles.stage}>
        <AnimatePresence mode="wait">
          <m.div
            key={activeMachine.vehicle}
            className={styles.carStage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className={styles.visualContainer}>
              {editorial.image.placeholder ? (
                <div className={styles.photoPlaceholder}>
                  <div className={styles.assetNotice}>
                    <p>
                      <strong>[Pending Photography Asset]</strong>
                    </p>
                    <p>{(editorial.image as any).source_requirement}</p>
                  </div>
                </div>
              ) : (
                <div className={styles.photoContainer}>
                  <img
                    src={editorial.image.url}
                    alt={`Photograph of ${activeMachine.vehicle}`}
                    className={styles.photo}
                  />
                  <div className={styles.attribution}>
                    Photo: {editorial.image.credit}
                  </div>
                </div>
              )}
              {editorial.side_view_url ? (
                <m.div
                  className={styles.sideViewContainer}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                  <img
                    src={editorial.side_view_url}
                    alt={`${activeMachine.vehicle} side profile`}
                    className={`${styles.sideViewImage} ${activeMachine.vehicle === 'Porsche 911 RSR' ? styles.enlargedSideView : ''}`}
                  />
                </m.div>
              ) : (
                <div className={styles.silhouettePlaceholder}>
                  <div className={styles.assetNotice}>
                    <p>
                      <strong>[Editorial Constraint Note]</strong>
                    </p>
                    <p>
                      To prevent factual misrepresentation, generic car
                      silhouettes are not used. Accurate, recognizable side-view
                      assets for the {activeMachine.vehicle} are pending asset
                      delivery.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.metadata}>
              <h3 className={styles.machineName}>{activeMachine.vehicle}</h3>
              <p className={styles.insight}>{editorial.historical_insight}</p>

              <div className={styles.statsRow}>
                <div className={styles.statBox}>
                  <span className={styles.statLabel}>Class Wins</span>
                  <span className={styles.statValue}>
                    {activeMachine.class_wins}
                  </span>
                </div>
                <div className={styles.statBox}>
                  <span className={styles.statLabel}>Primary Class</span>
                  <span className={styles.statValue}>
                    {activeMachine.primary_class}
                  </span>
                </div>
                <div className={styles.statBox}>
                  <span className={styles.statLabel}>Era of Success</span>
                  <span className={styles.statValue}>
                    {activeMachine.first_win} – {activeMachine.last_win}
                  </span>
                </div>
              </div>

              <div className={styles.detailsGrid}>
                <div className={styles.specsPanel}>
                  <h4>Technical Specifications</h4>
                  <dl>
                    {editorial.specs.map((spec, i) => (
                      <div key={i} className={styles.specItem}>
                        <dt>{spec.label}</dt>
                        <dd>{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className={styles.entryPanel}>
                  <h4>Representative Entry</h4>
                  <div className={styles.entryContent}>
                    <p className={styles.entryTeam}>
                      {editorial.representative_entry.team} (
                      {editorial.representative_entry.season})
                    </p>
                    <p className={styles.entryDrivers}>
                      {editorial.representative_entry.drivers.join(" / ")}
                    </p>
                    <p className={styles.entrySignificance}>
                      {editorial.representative_entry.significance}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </m.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
