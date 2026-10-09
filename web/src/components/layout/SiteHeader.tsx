import styles from "./SiteHeader.module.css";

export default function SiteHeader({
  currentView = "story",
}: {
  currentView?: "story" | "archive";
}) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>WEC / 2011–2023</div>
      <div className={styles.progress}>
        {/* Placeholder for progress indicator */}
      </div>
      <nav className={styles.nav}>
        <a
          href="#story"
          className={`${styles.navLink} ${currentView === "story" ? styles.active : ""}`}
        >
          Story
        </a>
        <a
          href="#archive"
          className={`${styles.navLink} ${currentView === "archive" ? styles.active : ""}`}
        >
          Archive
        </a>
      </nav>
    </header>
  );
}
