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
                Before looking at who won, it helps to take in the sheer scale of the championship over its first thirteen seasons.
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
                Every dot on this screen represents one car lining up on the grid for one race. Together, they map out the entire operational footprint of the era.
              </p>
              
              <EditorialPhoto
                src={scaleGridImage}
                alt="WEC starting grid"
                caption="The scale of endurance racing spans hundreds of entries."
                direction="left"
              />

              <p>
                These entries weren't racing in a single pack, though. WEC runs several distinct categories at once on the same circuit, each with its own technical rules, tyre allotments, and championship stakes.
              </p>

              <EditorialPhoto
                src={multiclassImage}
                alt="WEC Field with GT and prototypes"
                caption="Multiple classes racing simultaneously demands constant overtaking."
                direction="right"
              />

              <p>
                The vast majority of the grid belonged to the GT ranks—production-based sports cars fighting brutal door-to-door battles. Above them sat LMP2, and at the summit was the Top Class (first LMP1, then Hypercar), where factory giants fought for overall victory.
              </p>

              <EditorialPhoto
                src={contrastImage}
                alt="Contrast between GT and prototype"
                caption="The contrast between production-based GTs and bespoke prototypes is stark."
                direction="left"
              />

              <p>
                Surviving this multiclass grinder over 13 seasons took extraordinary consistency. While dozens of privateer outfits came and went, only a handful of factory programs had the resources and reliability to endure across the entire decade.
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
