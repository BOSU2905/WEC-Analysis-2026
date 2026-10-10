import { useRef } from "react";
import ManufacturerPersistence from "../../visualizations/ManufacturerPersistence";
import EditorialPhoto from "../../components/story/EditorialPhoto";
import toyotaImage from "../../assets/editorial/toyota-ts050.jpg";
import styles from "./Chapter02.module.css";

export default function Chapter02() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <article id="chapter-02" className={styles.chapter}>
      <header className={styles.header}>
        <h2 className={styles.chapterNumber}>Chapter 02</h2>
        <h3 className={styles.chapterTitle}>The Last Manufacturer Standing</h3>
      </header>

      <div className={styles.scrollyContainer} ref={containerRef}>
        <div className={styles.graphicContainer}>
          <div className={styles.graphicSticky}>
            <ManufacturerPersistence />
          </div>
        </div>

        <div className={styles.textContainer}>
          <div className={styles.step}>
            <div className={styles.narrativeCard}>
              <p>
                If this championship was so vast and volatile, who actually managed to survive it?
                At the pinnacle of the grid, the Top Class was the ultimate battleground for global manufacturers—an environment of extreme engineering, massive budgets, and unforgiving endurance constraints.
                While legends like Porsche and Audi defined their own eras of supremacy, Toyota Gazoo Racing didn't just win; they accumulated <strong>44 Top-Class victories</strong>.
              </p>

              <EditorialPhoto
                src={toyotaImage}
                alt="Toyota TS050 Hybrid at Le Mans"
                caption="The Toyota TS050 Hybrid secured multiple victories during Toyota's dominant era."
                direction="right"
              />

              <p>
                The defining characteristic of this achievement wasn't just peaking for one season, but persistence. While competitors entered and exited as regulations and corporate strategies shifted, Toyota consistently adapted, enduring both competitive eras and periods of isolation to establish an unprecedented record of sustained success.
              </p>

              <p>
                However, Toyota's manufacturer dominance in the top class was only part of the story. To understand the true scale of WEC, we must look beyond the solitary factory prototypes and toward the broader competitive ecosystem that populated the rest of the grid.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
