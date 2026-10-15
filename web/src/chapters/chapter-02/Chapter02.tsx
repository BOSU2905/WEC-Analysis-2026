import { useRef } from "react";
import ManufacturerPersistence from "../../visualizations/ManufacturerPersistence";
import EditorialPhoto from "../../components/story/EditorialPhoto";
import toyotaImage from "../../assets/editorial/toyota-ts050.webp";
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
                At the front of the field, the premier prototype class demanded heavy technical investment. Factory programs developed complex hybrid powertrains operating at the limit of mechanical endurance.
              </p>
              <p>
                While Audi and Porsche mounted successful multi-year campaigns before withdrawing, Toyota Gazoo Racing maintained an unbroken factory presence, ultimately collecting <strong>44 top-class victories</strong> across the 13-year period.
              </p>

              <EditorialPhoto
                src={toyotaImage}
                alt="Toyota TS050 Hybrid at Le Mans"
                caption="The Toyota TS050 Hybrid secured back-to-back Le Mans victories during the 2018–2019 Super Season."
                direction="right"
              />

              <p>
                Toyota's statistical dominance stemmed from long-term participation. When rival factory teams withdrew and regulations transitioned from LMP1 to Hypercar, Toyota remained committed, developing the GR010 Hybrid and continuing its winning record.
              </p>

              <p>
                Overall prototype victories represent only one dimension of the championship. The broader health of endurance racing relied on the privateer and GT squads that filled the grid round after round.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
