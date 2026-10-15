import { useRef } from "react";
import { useScroll } from "framer-motion";
import ArmadaScatter from "../../visualizations/ArmadaScatter";
import EditorialPhoto from "../../components/story/EditorialPhoto";
import armadaImage from "../../assets/editorial/aston-martin-armada.webp";
import styles from "./Chapter03.module.css";

export default function Chapter03() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <article id="chapter-03" className={styles.chapter}>
      <header className={styles.header}>
        <h2 className={styles.chapterNumber}>Chapter 03</h2>
        <h3 className={styles.chapterTitle}>The Armada Effect</h3>
      </header>

      <div className={styles.scrollyContainer} ref={containerRef}>
        <div className={styles.graphicContainer}>
          <div className={styles.graphicSticky}>
            <ArmadaScatter progress={scrollYProgress} />
          </div>
        </div>

        <div className={styles.textContainer}>
          <div className={styles.step}>
            <div className={styles.narrativeCard}>
              <p>
                While Toyota built its top class record by fielding two factory prototype entries, success in the GT ranks followed a different model. Rather than relying on a solitary factory effort, Ferrari and Aston Martin supported customer teams and semi works squads across both professional and amateur classes.
              </p>

              <EditorialPhoto
                src={armadaImage}
                alt="Aston Martin Vantage GTE"
                caption="GT manufacturers maintained a broad presence by supplying both factory and customer operations."
                direction="left"
              />

              <p>
                Central to this strategy was AF Corse, Ferrari's frontline partner, which logged{" "}
                <strong>269 race entries</strong> across the 13 year dataset. Aston Martin Racing recorded{" "}
                <strong>217 entries</strong>.
              </p>
              <p>
                By fielding multiple entries across pro and amateur divisions, AF Corse accumulated 41 GT class victories. That total nearly equalled Toyota's overall win tally, achieved through extensive customer depth and operational consistency rather than prototype exclusivity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
