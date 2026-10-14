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
                While Toyota built its dynasty by concentrating engineering firepower on two prototype seats, winning the GT ranks required a completely different playbook: sheer numbers. Instead of staking everything on a single entry, Ferrari and Aston Martin turned up with an "Armada"—supporting customer squads and semi-factory operations that filled out every corner of the grid.
              </p>
              
              <EditorialPhoto
                src={armadaImage}
                alt="Aston Martin Vantage GTE"
                caption="GT manufacturers countered prototype exclusivity by fielding expansive fleets of factory and customer cars."
                direction="left"
              />

              <p>
                Leading the charge was AF Corse, Ferrari's long-standing frontline operation, which logged an astounding{" "}
                <strong>269 race entries</strong> across the 13-year dataset. Aston Martin Racing answered with{" "}
                <strong>217 entries</strong> of their own.
              </p>
              <p>
                By keeping as many as 11 cars in competition across a single weekend, AF Corse secured 41 GT class victories. That nearly matched Toyota's entire top-class win count, but they did it through relentless presence and tactical depth rather than solitary prototype speed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
