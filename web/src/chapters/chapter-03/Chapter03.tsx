import { useRef } from "react";
import { useScroll } from "framer-motion";
import ArmadaScatter from "../../visualizations/ArmadaScatter";
import EditorialPhoto from "../../components/story/EditorialPhoto";
import armadaImage from "../../assets/editorial/aston-martin-armada.jpg";
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
                While Toyota achieved sustained success through elite engineering in the top class, dominating the GT and LMP2 classes required a different strategy: sheer volume. Instead of focusing all resources on a single factory prototype, manufacturers like Ferrari and Aston Martin created an "Armada Effect" by flooding the grid with massive fleets of customer and factory entries. These massive swarms were the lifeblood of the championship, proving that survival isn't just about having the fastest car—it's about fielding enough cars that one is bound to finish first.
              </p>
              
              <EditorialPhoto
                src={armadaImage}
                alt="Aston Martin Vantage GTE"
                caption="GT manufacturers fielded massive armadas of customer and factory entries."
                direction="left"
              />

              <p>
                AF Corse (Ferrari's primary proxy) fielded an astonishing{" "}
                <strong>269 total entries</strong> across the 13-year period.
                Aston Martin Racing followed closely with{" "}
                <strong>217 entries</strong>.
              </p>
              <p>
                By fielding a sprawling armada—often up to 11 different unique
                vehicles per race—AF Corse secured 41 absolute GT wins. This strategy nearly matched
                Toyota's win count, but achieved it through overwhelming
                participation rather than sheer speed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
