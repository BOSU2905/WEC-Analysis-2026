import styles from "./SiteHeader.module.css";

export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>WEC / 2011–2023</div>
      <div className={styles.progress}>
        {/* Placeholder for progress indicator */}
      </div>
    </header>
  );
}
