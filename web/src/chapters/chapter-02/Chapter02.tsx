import { useRef } from "react";
import { useScroll } from "framer-motion";
import ManufacturerPersistence from "../../visualizations/ManufacturerPersistence";
import styles from "./Chapter02.module.css";

export default function Chapter02() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <article id="chapter-02" className={styles.chapter}>
      <header className={styles.header}>
        <h2 className={styles.chapterNumber}>Chapter 02</h2>
        <h3 className={styles.chapterTitle}>The Last Manufacturer Standing</h3>
      </header>

      <div className={styles.scrollyContainer} ref={containerRef}>
        <div className={styles.graphicContainer}>
          <div className={styles.graphicSticky}>
            <ManufacturerPersistence progress={scrollYProgress} />
          </div>
        </div>

        <div className={styles.textContainer}>
          <div className={styles.step}>
            <div className={styles.narrativeCard}>
              <p>
                If this championship was so vast and volatile, who actually
                managed to survive it?
              </p>
              <p>
                At the pinnacle of the grid, the Top Class (LMP1 and later
                Hypercar) was the ultimate battleground for global
                manufacturers. It was an environment of extreme engineering,
                massive budgets, and unforgiving endurance constraints.
              </p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.narrativeCard}>
              <p>
                Across the 2011–2023 period, several legendary manufacturers
                entered the top class seeking overall victory. Porsche and Audi
                each defined their own eras of supremacy, while others like
                Ferrari, Peugeot, and Alpine fought fiercely in specific
                seasons.
              </p>
              <p>
                But the defining characteristic of this era wasn't just peaking
                for one season. It was persistence.
              </p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.narrativeCard}>
              <p>
                Toyota Gazoo Racing didn't just win; they accumulated{" "}
                <strong>44 Top-Class victories</strong>.
              </p>
              <p>
                Their defining characteristic in this dataset is their sustained
                presence. While competitors entered and exited as regulations
                and corporate strategies shifted, Toyota consistently adapted,
                enduring both competitive eras and periods of isolation to
                establish an unprecedented record of sustained success.
              </p>
            </div>
          </div>

          <div className={styles.stepSpacer} />
        </div>
      </div>
    </article>
  );
}
