import styles from "./SiteHeader.module.css";
import ThemeToggle from "./ThemeToggle";
import BrandLogo from "./BrandLogo";

export type ViewType = "story" | "archive" | "about";

interface SiteHeaderProps {
  currentView?: ViewType;
  onBrandClick?: () => void;
  onNavigate?: (view: ViewType) => void;
}

export default function SiteHeader({
  currentView = "story",
  onBrandClick,
  onNavigate,
}: SiteHeaderProps) {
  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onBrandClick) {
      onBrandClick();
    } else {
      window.location.hash = "story";
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    view: ViewType,
  ) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(view);
    }
  };

  return (
    <header className={styles.header}>
      <a
        href="#story"
        onClick={handleBrandClick}
        className={styles.brandLink}
        aria-label="ENDURANCE IN DATA — Return to start of Story"
        title="ENDURANCE IN DATA — Return to start of Story"
      >
        <BrandLogo variant="navbar" showDescriptor />
      </a>

      <div className={styles.progress}>
        {/* Telemetry spacer */}
      </div>

      <nav className={styles.nav} aria-label="Main Navigation">
        <a
          href="#story"
          onClick={(e) => handleLinkClick(e, "story")}
          className={`${styles.navLink} ${currentView === "story" ? styles.active : ""}`}
        >
          Story
        </a>
        <a
          href="#archive"
          onClick={(e) => handleLinkClick(e, "archive")}
          className={`${styles.navLink} ${currentView === "archive" ? styles.active : ""}`}
        >
          Archive
        </a>
        <a
          href="#about"
          onClick={(e) => handleLinkClick(e, "about")}
          className={`${styles.navLink} ${currentView === "about" ? styles.active : ""}`}
        >
          About
        </a>
        <ThemeToggle />
      </nav>
    </header>
  );
}
