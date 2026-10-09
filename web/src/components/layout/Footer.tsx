import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.infoBlock}>
          <h4>Project Details</h4>
          <p>
            An independent, interactive editorial data-story exploring the FIA
            World Endurance Championship across the 2011–2023 era.
          </p>
          <p className={styles.disclaimer}>
            This is an independent project and is not an official FIA WEC
            publication. All trademarks and copyrights belong to their
            respective owners.
          </p>
        </div>
        <div className={styles.infoBlock}>
          <h4>Credits</h4>
          <p>
            Website and analytical storytelling created by the project author.
          </p>
          <p>
            Dataset sourced from{" "}
            <a
              href="https://www.kaggle.com/datasets/feliperoll/fia-wec-2012-2023-le-mans-2011"
              target="_blank"
              rel="noopener noreferrer"
            >
              Felipe Roll via Kaggle
            </a>
            . (Dataset usage attribution is based on available metadata; an
            explicit open-source license could not be verified in the source
            repository).
          </p>
        </div>
      </div>
    </footer>
  );
}
