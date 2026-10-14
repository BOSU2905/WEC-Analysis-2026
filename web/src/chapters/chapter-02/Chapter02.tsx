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
                At the front of the grid, the Top Class was an unforgiving proving ground. Factory programs poured immense resources into experimental hybrid powertrains, only to face the brutal reality of 24-hour attrition.
              </p>
              <p>
                While Audi and Porsche engineered unforgettable eras of dominance before bowing out, Toyota Gazoo Racing stayed the course—ultimately collecting <strong>44 Top-Class victories</strong> across the 13-year span.
              </p>

              <EditorialPhoto
                src={toyotaImage}
                alt="Toyota TS050 Hybrid at Le Mans"
                caption="The Toyota TS050 Hybrid was the technical backbone of Toyota's historic Super Season sweep."
                direction="right"
              />

              <p>
                What set Toyota apart wasn't just peaking for a single season; it was persistence. As rival factory programs departed and regulations evolved from LMP1-Hybrid into the modern Hypercar era, Toyota kept racing, refining, and winning.
              </p>

              <p>
                Yet factory prototype trophies only tell half the story. To understand how endurance racing actually functions, we have to look past the top step of the podium and into the swarms of privateer and GT teams that kept the grid alive.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
