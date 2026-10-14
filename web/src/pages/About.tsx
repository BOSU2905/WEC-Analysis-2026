import styles from "./About.module.css";

export default function About() {
  return (
    <article className={styles.aboutContainer}>
      <header className={styles.heroHeader}>
        <div className={styles.metaLead}>EDITORIAL NOTE // AUTHOR &amp; PROJECT GENESIS</div>
        <h1 className={styles.heroTitle}>Behind Endurance in Data</h1>
        <p className={styles.heroSubtitle}>
          An independent exploration at the intersection of data science, motorsport history, and digital craftsmanship.
        </p>
      </header>

      <div className={styles.contentGrid}>
        {/* Left Column: Story & Discoveries */}
        <div className={styles.mainColumn}>
          <section className={styles.sectionBlock}>
            <h2>The Curiosity Behind the Project</h2>
            <p>
              <em>ENDURANCE IN DATA</em> began from genuine curiosity. After recently following the FIA World Endurance Championship, I found myself captivated by the sheer unpredictability of multi-class endurance racing—where race pace, mechanical preservation, weather transitions, and traffic management constantly collide.
            </p>
            <p>
              Browsing motorsport data repositories, I discovered a comprehensive competition dataset compiled by Felipe Roll on Kaggle covering the 2011–2023 seasons. Rather than presenting the data through a corporate dashboard, I wanted to craft a cinematic, editorial documentary that captures both statistical truth and narrative tension.
            </p>
          </section>

          <section className={styles.sectionBlock}>
            <h2>The Formula 1 &amp; Endurance Cross-Over</h2>
            <p>
              One of the most fascinating aspects discovered while exploring the telemetry and rosters was how many elite Formula 1 drivers crossed over to conquer sports car racing:
            </p>
            <div className={styles.driverGrid}>
              <div className={styles.driverCard}>
                <span className={styles.driverName}>Nico Hülkenberg</span>
                <span className={styles.driverAchievement}>2015 Le Mans Winner</span>
                <p>
                  Competed at the 2015 24 Hours of Le Mans as an active F1 driver for Force India, winning outright on debut with the Porsche 919 Hybrid alongside Nick Tandy and Earl Bamber.
                </p>
              </div>
              <div className={styles.driverCard}>
                <span className={styles.driverName}>Fernando Alonso</span>
                <span className={styles.driverAchievement}>2018–2019 World Champion</span>
                <p>
                  Pursued the Triple Crown during his F1 hiatus, taking back-to-back 24 Hours of Le Mans victories and the FIA World Endurance Championship with Toyota Gazoo Racing.
                </p>
              </div>
              <div className={styles.driverCard}>
                <span className={styles.driverName}>Robert Kubica</span>
                <span className={styles.driverAchievement}>2023 LMP2 World Champion</span>
                <p>
                  Rebuilt his top-tier racing career in endurance prototypes, capturing the 2023 FIA Endurance Trophy for LMP2 with Team WRT before stepping up to the 499P Hypercar.
                </p>
              </div>
              <div className={styles.driverCard}>
                <span className={styles.driverName}>Nyck de Vries</span>
                <span className={styles.driverAchievement}>LMP2 Winner &amp; Hypercar Pilot</span>
                <p>
                  Showcased blistering pace in LMP2 with Racing Team Nederland before transitions between Formula E, Formula 1, and the Toyota Gazoo Racing Hypercar squad.
                </p>
              </div>
            </div>
          </section>

          <section className={styles.sectionBlock}>
            <h2>Dataset Coverage &amp; Methodological Transparency</h2>
            <p>
              Scientific integrity requires transparency regarding dataset boundaries and analytical constraints:
            </p>
            <ul className={styles.transparencyList}>
              <li>
                <strong>Temporal Scope:</strong> The dataset strictly spans from the 2011 24 Hours of Le Mans (Intercontinental Le Mans Cup) through the conclusion of the 2023 Bahrain 8 Hours. It does <em>not</em> include 2024–2026 seasons.
              </li>
              <li>
                <strong>Series Classification:</strong> The 2011 records belong to the predecessor Intercontinental Le Mans Cup (ILMC). The official FIA World Endurance Championship was inaugurated in 2012.
              </li>
              <li>
                <strong>Category Transitions:</strong> The Hypercar class was inaugurated in 2021. LMGTE Pro concluded after 2022, and LMGTE Am after 2023. LMGT3 was not active during this dataset era.
              </li>
              <li>
                <strong>Data Provenance:</strong> Derived from Felipe Roll's verified Kaggle collection based on official FIA/ACO timing records.
              </li>
            </ul>
          </section>
        </div>

        {/* Right Column: Author Profile & Academic Context */}
        <aside className={styles.sidebarColumn}>
          <div className={styles.authorCard}>
            <div className={styles.authorBadge}>PROJECT CREATOR</div>
            <h3 className={styles.authorTitle}>Data Science Student</h3>
            <p className={styles.university}>BINUS University</p>

            <div className={styles.interestTags}>
              <span>Automotive</span>
              <span>Business</span>
              <span>Technology</span>
              <span>Machine Learning</span>
              <span>Deep Learning</span>
              <span>Artificial Intelligence</span>
            </div>

            <p className={styles.authorBio}>
              As an undergraduate data science student, this project represents an ongoing journey in data journalism, visualization design, and web engineering. Every chart and interactive model was built to balance statistical rigor with visual immersion.
            </p>

            <div className={styles.learningNote}>
              <span className={styles.noteIcon}>ℹ</span>
              <p>
                This project reflects continuous learning. Constructive feedback, dataset refinements, and collaborative improvements are always welcome.
              </p>
            </div>
          </div>

          <div className={styles.referencesCard}>
            <h4>Verified Primary References</h4>
            <ul className={styles.referenceLinks}>
              <li>
                <a
                  href="https://www.kaggle.com/datasets/feliperoll/fia-wec-2012-2023-le-mans-2011"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Felipe Roll WEC Dataset on Kaggle &rarr;
                </a>
              </li>
              <li>
                <a
                  href="https://www.fiawec.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Official FIA World Endurance Championship &rarr;
                </a>
              </li>
              <li>
                <a
                  href="https://www.24h-lemans.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Automobile Club de l'Ouest (ACO) &rarr;
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </article>
  );
}
