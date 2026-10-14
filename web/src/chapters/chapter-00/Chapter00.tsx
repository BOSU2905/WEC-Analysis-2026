import { useRef } from "react";
import { m, useScroll, useTransform, useReducedMotion } from "framer-motion";
import styles from "./Chapter00.module.css";
import EditorialPhoto from "../../components/story/EditorialPhoto";
import photoGrid from "../../assets/editorial/wec-starting-grid.webp";
import photoPit from "../../assets/editorial/wec-pit-operations.webp";

export default function Chapter00() {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [50, 0, 0, -50]);

  return (
    <article id="chapter-00" className={styles.chapter} ref={containerRef}>
      <div className={styles.stickyContainer}>
        <m.header
          className={styles.header}
          style={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity, y }}
        >
          <h2 className={styles.chapterNumber}>Chapter 00</h2>
          <h3 className={styles.chapterTitle}>Understanding WEC</h3>
          <p className={styles.chapterIntro}>
            Before digging into the numbers, it helps to understand what makes endurance racing distinct. In the FIA World Endurance Championship (WEC), raw speed is only the entry ticket—endurance is what decides who actually reaches the finish line.
          </p>
        </m.header>
      </div>

      <div className={styles.content}>
        <div className={styles.proseBlock}>
          <h4>A Race Against Time</h4>
          <p>
            Unlike conventional sprint races, WEC events run for 6, 8, or 24 hours. A single weekend at Le Mans covers more race distance than an entire Formula 1 season. The real challenge is keeping up a relentless pace while managing mechanical wear, sudden rain showers, and driver fatigue around the clock.
          </p>
        </div>

        <EditorialPhoto
          src={photoGrid}
          alt="Starting grid of the 2020 24 Hours of Le Mans with prototypes and GT cars lined up on the pit straight"
          caption="The multiclass starting grid lined up on the pit straight before 24 hours of continuous racing."
          direction="left"
        />

        <div className={styles.proseBlock}>
          <h4>Multiple Classes, One Circuit</h4>
          <p>
            Between 2011 and 2023, the championship ran on a multiclass format. Purpose-built prototypes (like the hybrid <strong>LMP1</strong> and modern <strong>Hypercar</strong> machinery) share the tarmac with production-based sports cars (like <strong>LMGTE Pro</strong> and <strong>Am</strong>).
          </p>
          <p>
            Because every class races at the same time, top-tier prototypes spend the entire race lapping slower GT traffic. That turns every single lap into high-speed puzzle solving—balancing aggressive overtakes against the constant risk of contact.
          </p>
        </div>

        <EditorialPhoto
          src={photoPit}
          alt="United Autosports pit crew servicing a prototype during the 2019 24 Hours of Le Mans"
          caption="Pit stops are highly choreographed operational sprints involving tyre changes, refuelling, and driver swaps."
          direction="right"
        />

        <div className={styles.proseBlock}>
          <h4>The Machine, the Team, the Strategy</h4>
          <p>
            Each car is shared by two to three drivers swapping out across the race. During pit stops, crews refuel and bolt on fresh tyres in seconds. Because tyre sets are strictly limited per weekend, teams frequently "double stint"—running the same rubber for two consecutive fuel loads to save precious pit lane seconds, even as grip fades.
          </p>
          <p>
            When the data shows a team dominating over an entire championship, it isn't just because their engine had more power. It means their crew nailed hundreds of pit stops, tyre strategies, and driver handoffs without cracking under pressure.
          </p>
        </div>

        <div className={styles.proseBlock}>
          <h4>From the Race to the Data</h4>
          <p>
            The chapters ahead explore 13 years of championship history through validated timing and classification records. We trace the shape of the grid, the rise of factory dynasties, the fierce battles across the GT classes, and the quiet technical influence of the tyre war.
          </p>
        </div>
      </div>
    </article>
  );
}
