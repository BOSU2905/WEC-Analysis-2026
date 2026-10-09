import { useRef } from "react";
import { useScroll } from "framer-motion";
import ScaleScatter from "../../visualizations/ScaleScatter";
import EditorialPhoto from "../../components/story/EditorialPhoto";
import heroImage from "../../assets/hero.png";
import datasetScale from "../../data/dataset_scale.json";
import styles from "./Chapter01.module.css";

export default function Chapter01() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress strictly within the scrolly container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <article className={styles.chapter}>
      <header className={styles.header}>
        <h2 className={styles.chapterNumber}>Chapter 01</h2>
        <h3 className={styles.chapterTitle}>The Anatomy</h3>
      </header>

      {/* The container determines the total scrollable height for this chapter's sequence */}
      <div className={styles.scrollyContainer} ref={containerRef}>
        <div className={styles.graphicContainer}>
          <div className={styles.graphicSticky}>
            <ScaleScatter progress={scrollYProgress} />
          </div>
        </div>

        <div className={styles.textContainer}>
          {/* We use extra height on the steps to space out the narrative and drive the scroll progress */}
          <div className={styles.step}>
            <div className={styles.narrativeCard}>
              <p>
                Before asking who dominated WEC, we must understand the sheer
                logistical scale of the championship.
              </p>
              <p>
                Between 2011 and 2023, the World Endurance Championship staged{" "}
                <strong>
                  {datasetScale.total_events} official race events
                </strong>
                . Across these events, there were{" "}
                <strong>
                  {datasetScale.total_entries.toLocaleString()} valid car
                  entries
                </strong>{" "}
                taking the green flag.
              </p>
              <p>
                Each dot here represents a single car entering a single race.
                Together, they form the foundation of our analysis.
              </p>
            </div>
          </div>

          <div className={styles.stepSpacer} />

          <div className={styles.step}>
            <div className={styles.narrativeCard}>
              <p>
                However, these entries were not competing in a single homogenous
                race. WEC is a multi-class championship, where distinct
                competitive ecosystems race simultaneously on the same track.
              </p>

              <EditorialPhoto
                src={heroImage}
                alt="WEC Field"
                caption="Multi-class racing on track"
                direction="left"
              />

              <p>
                The vast majority of the grid belonged to the GT
                ecosystem—production-based cars fighting their own logistical
                war. At the pinnacle sat the Top Class (LMP1 and later
                Hypercar), where manufacturers fought for overall victory.
              </p>
            </div>
          </div>

          <div className={styles.releaseZone} />
        </div>
      </div>
    </article>
  );
}
