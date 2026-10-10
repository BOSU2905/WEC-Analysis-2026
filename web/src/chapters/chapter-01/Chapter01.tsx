import { useRef } from "react";
import { useScroll } from "framer-motion";
import ScaleScatter from "../../visualizations/ScaleScatter";
import EditorialPhoto from "../../components/story/EditorialPhoto";
import scaleGridImage from "../../assets/editorial/scale-grid.jpg";
import multiclassImage from "../../assets/editorial/multiclass-silverstone.jpg";
import contrastImage from "../../assets/editorial/gt-prototype-contrast.jpg";
import loneStarStartImage from "../../assets/editorial/lone-star-le-mans-start.jpg";
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
    <article id="chapter-01" className={styles.chapter}>
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
              
              <EditorialPhoto
                src={scaleGridImage}
                alt="WEC starting grid"
                caption="The scale of endurance racing spans hundreds of entries."
                direction="left"
              />

              <p>
                However, these entries were not competing in a single homogenous
                race. WEC is a multi-class championship, where distinct
                competitive ecosystems race simultaneously on the same track.
              </p>

              <EditorialPhoto
                src={multiclassImage}
                alt="WEC Field with GT and prototypes"
                caption="Multiple classes racing simultaneously demands constant overtaking."
                direction="right"
              />

              <p>
                The vast majority of the grid belonged to the GT
                ecosystem—production-based cars fighting their own logistical
                war. At the pinnacle sat the Top Class (LMP1 and later
                Hypercar), where manufacturers fought for overall victory.
              </p>

              <EditorialPhoto
                src={contrastImage}
                alt="Contrast between GT and prototype"
                caption="The contrast between production-based GTs and bespoke prototypes is stark."
                direction="left"
              />

              <p>
                Surviving this sprawling, multi-class battlefield demanded
                immense logistical and engineering consistency. While hundreds of
                privateer entries came and went over the 13-year period, true
                dominance in the top class belonged to the few factory programs
                capable of weathering the chaos of the full endurance era.
              </p>

              <EditorialPhoto
                src={loneStarStartImage}
                alt="WEC Field taking the start"
                caption="Navigating a dense multi-class field separates fragile entries from enduring dynasties."
                direction="right"
              />
            </div>
          </div>

          <div className={styles.releaseZone} />
        </div>
      </div>
    </article>
  );
}
