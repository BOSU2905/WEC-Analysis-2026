import BrandLogo from "./BrandLogo";
import styles from "./Footer.module.css";

interface FooterProps {
  onOpenCredits?: () => void;
  onNavigate?: (view: "story" | "archive" | "about") => void;
}

export default function Footer({ onOpenCredits, onNavigate }: FooterProps) {
  const handleNav = (
    e: React.MouseEvent<HTMLAnchorElement>,
    view: "story" | "archive" | "about",
  ) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(view);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.brandColumn}>
          <BrandLogo variant="navbar" />
          <p className={styles.brandTagline}>
            An independent, interactive editorial motorsport data story exploring
            the 2011–2023 era of the FIA World Endurance Championship.
          </p>
          <div className={styles.navQuickLinks}>
            <a href="#story" onClick={(e) => handleNav(e, "story")}>
              Story
            </a>
            <span>•</span>
            <a href="#teams" onClick={() => {
              window.location.hash = "teams";
              if (onNavigate) onNavigate("archive");
            }}>
              Teams &amp; Dynasties
            </a>
            <span>•</span>
            <a href="#archive" onClick={(e) => handleNav(e, "archive")}>
              Archive
            </a>
            <span>•</span>
            <a href="#about" onClick={(e) => handleNav(e, "about")}>
              Creator &amp; About
            </a>
          </div>
          <p className={styles.disclaimer}>
            This is an independent project and is not an official FIA WEC
            publication. All trademarks, vehicle designations, and circuit
            names belong to their respective owners.
          </p>
        </div>
        <div className={styles.infoBlock}>
          <h4>Credits &amp; Provenance</h4>
          <p>
            Analytical data investigation and documentary storytelling by the
            project author (BINUS University Data Science).
          </p>
          <p>
            Historical competition data sourced from{" "}
            <a
              href="https://www.kaggle.com/datasets/feliperoll/fia-wec-2012-2023-le-mans-2011"
              target="_blank"
              rel="noopener noreferrer"
            >
              Felipe Roll via Kaggle
            </a>
            .
          </p>
          <p>
            Photographic assets and license provenance are recorded in the{" "}
            <button
              type="button"
              onClick={onOpenCredits}
              className={styles.creditsBtn}
            >
              Photo Credits Ledger &rarr;
            </button>
          </p>
        </div>
      </div>
    </footer>
  );
}
