import { useRef } from "react";
import { useScroll } from "framer-motion";
import ScaleScatter from "../../visualizations/ScaleScatter";
import EditorialPhoto from "../../components/story/EditorialPhoto";
import scaleGridImage from "../../assets/editorial/scale-grid.webp";
import multiclassImage from "../../assets/editorial/multiclass-silverstone.webp";
import contrastImage from "../../assets/editorial/gt-prototype-contrast.webp";
import loneStarStartImage from "../../assets/editorial/lone-star-le-mans-start.webp";
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
                Before examining individual winners, the first step is understanding the overall scale of the championship across its first thirteen seasons.
              </p>
              <p>
                Between 2011 and 2023, the championship staged{" "}
                <strong>
                  {datasetScale.total_events} official race events
                </strong>
                . Across those rounds,{" "}
                <strong>
                  {datasetScale.total_entries.toLocaleString()} cars
                </strong>{" "}
                took the green flag.
              </p>
              <p>
                Each dot represents one car starting one race. Together, they map the full operational footprint of the 2011 to 2023 era.
              </p>

              <EditorialPhoto
                src={scaleGridImage}
                alt="WEC starting grid"
                caption="More than three thousand individual entries took the start across 13 seasons."
                direction="left"
              />

              <p>
                These cars did not race in a single category. WEC fields multiple classes simultaneously on the same circuit, each governed by distinct technical regulations, tyre allocations, and championship standings.
              </p>

              <EditorialPhoto
                src={multiclassImage}
                alt="WEC Field with GT and prototypes"
                caption="Running multiple classes simultaneously requires continuous traffic management."
                direction="right"
              />

              <p>
                The largest share of the grid belonged to the GT categories, where production-derived sports cars competed in close manufacturer battles. Above them ran LMP2, and at the top was the premier prototype class (first LMP1, then Hypercar), competing for overall wins.
              </p>

              <EditorialPhoto
                src={contrastImage}
                alt="Contrast between GT and prototype"
                caption="Pace differentials between prototypes and GT machinery define multi-class endurance racing."
                direction="left"
              />

              <p>
                Maintaining a competitive presence across multiple seasons required substantial commitment. While privateer outfits often entered for specific campaigns, only a handful of factory programs maintained operations across the full decade.
              </p>

              <EditorialPhoto
                src={loneStarStartImage}
                alt="WEC Field taking the start"
                caption="Reliability across dense multi-class fields distinguished the championship's most successful teams."
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
