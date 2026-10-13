import { useState } from "react";
import { m } from "framer-motion";
import styles from "./CircuitGuide.module.css";
import { CIRCUITS, type CircuitData } from "../../data/circuits_data";
import CircuitExplorerModal from "./CircuitExplorerModal";

export default function CircuitGuide() {
  const [selectedCircuit, setSelectedCircuit] = useState<CircuitData | null>(null);

  const handleOpenCircuit = (circuit: CircuitData) => {
    setSelectedCircuit(circuit);
  };

  const handleCloseExplorer = () => {
    setSelectedCircuit(null);
  };

  return (
    <section id="circuits-guide" className={styles.guideSection} aria-labelledby="circuit-guide-heading">
      <div className={styles.sectionHeader}>
        <div className={styles.badge}>The Paddock &bull; Circuit Guide</div>
        <h2 id="circuit-guide-heading" className={styles.heading}>
          Four Tracks. Four Challenges.
        </h2>
        <p className={styles.subheading}>
          Every circuit tells a different story of endurance, precision, and performance.
        </p>
      </div>

      <div className={styles.circuitsGrid}>
        {CIRCUITS.map((circuit, index) => (
          <m.article
            key={circuit.id}
            className={styles.circuitCard}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
          >
            {/* Vector Track Visual */}
            <div className={styles.trackVisual}>
              <svg
                viewBox={circuit.viewBox}
                className={styles.trackSvg}
                aria-hidden="true"
                preserveAspectRatio="xMidYMid meet"
              >
                {circuit.groupTransform ? (
                  <g transform={circuit.groupTransform}>
                    <path
                      d={circuit.trackPath}
                      className={styles.trackBg}
                    />
                    <path
                      d={circuit.trackPath}
                      className={styles.trackStroke}
                    />
                  </g>
                ) : (
                  <>
                    <path
                      d={circuit.trackPath}
                      className={styles.trackBg}
                    />
                    <path
                      d={circuit.trackPath}
                      className={styles.trackStroke}
                    />
                  </>
                )}
              </svg>
              <div className={styles.trackStatsPill}>
                <span>{circuit.stats.length}</span>
                <span className={styles.statDot}>&bull;</span>
                <span>{circuit.stats.turnsCount} turns</span>
              </div>
            </div>

            {/* Card Content */}
            <div className={styles.cardContent}>
              <div className={styles.cardMeta}>
                <span className={styles.countryBadge}>
                  <span className={styles.flagEmoji} aria-hidden="true">{circuit.countryFlag}</span>
                  <span className={styles.countryName}>{circuit.country}</span>
                </span>
              </div>

              <h3 className={styles.circuitName}>{circuit.name}</h3>
              <p className={styles.cardIntro}>{circuit.editorialIntro}</p>

              <button
                type="button"
                className={styles.exploreButton}
                onClick={() => handleOpenCircuit(circuit)}
                id={`explore-btn-${circuit.id}`}
                aria-label={`Explore ${circuit.name} interactive map and telemetry details`}
              >
                <span className={styles.btnText}>Explore circuit</span>
                <span className={styles.btnArrow} aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </m.article>
        ))}
      </div>

      {/* Near-Fullscreen Interactive Explorer Dialog */}
      {selectedCircuit && (
        <CircuitExplorerModal
          circuit={selectedCircuit}
          onClose={handleCloseExplorer}
          triggerButtonId={`explore-btn-${selectedCircuit.id}`}
        />
      )}
    </section>
  );
}
