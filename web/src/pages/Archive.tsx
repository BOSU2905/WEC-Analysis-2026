import { useState, useEffect, lazy, Suspense } from "react";
import styles from "./Archive.module.css";

import TopographicHero from "../components/archive/TopographicHero";

const MachinesExperience = lazy(() => import("../components/archive/MachinesExperience"));
const CircuitGuide = lazy(() => import("../components/circuits/CircuitGuide"));
const Teams = lazy(() => import("./Teams"));

export type ArchiveDestination = "machines" | "paddock" | "teams";

export default function Archive() {
  const getSubViewFromHash = (): ArchiveDestination => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.toLowerCase().replace("#", "");
      if (hash === "teams" || hash === "teams-dynasties") {
        return "teams";
      }
      if (hash === "paddock" || hash === "circuits") {
        return "paddock";
      }
    }
    return "machines";
  };

  const [activeSection, setActiveSection] = useState<ArchiveDestination>(getSubViewFromHash);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase().replace("#", "");
      if (hash === "teams" || hash === "teams-dynasties") {
        setActiveSection("teams");
      } else if (hash === "paddock" || hash === "circuits") {
        setActiveSection("paddock");
      } else if (hash === "machines" || hash === "archive") {
        setActiveSection("machines");
      }
    };

    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const navigateTo = (destination: ArchiveDestination) => {
    setActiveSection(destination);
    window.location.hash = destination;
    if (destination === "machines") {
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 50);
    }
  };

  return (
    <div className={styles.archive}>
      <header className={styles.heroWrapper}>
        <TopographicHero>
          {/* Archival Destination Navigation */}
          <nav className={styles.sectionNav} aria-label="Archive Destinations">
            <div className={styles.navTrack} role="tablist">
              <button
                id="tab-machines"
                role="tab"
                aria-selected={activeSection === "machines"}
                aria-controls="panel-machines"
                tabIndex={activeSection === "machines" ? 0 : -1}
                className={`${styles.navButton} ${activeSection === "machines" ? styles.active : ""}`}
                onClick={() => navigateTo("machines")}
              >
                <span className={styles.navIndicator} aria-hidden="true" />
                <span className={styles.navLabel}>Machines</span>
              </button>

              <button
                id="tab-paddock"
                role="tab"
                aria-selected={activeSection === "paddock"}
                aria-controls="panel-paddock"
                tabIndex={activeSection === "paddock" ? 0 : -1}
                className={`${styles.navButton} ${activeSection === "paddock" ? styles.active : ""}`}
                onClick={() => navigateTo("paddock")}
              >
                <span className={styles.navIndicator} aria-hidden="true" />
                <span className={styles.navLabel}>Tracks</span>
              </button>

              <button
                id="tab-teams"
                role="tab"
                aria-selected={activeSection === "teams"}
                aria-controls="panel-teams"
                tabIndex={activeSection === "teams" ? 0 : -1}
                className={`${styles.navButton} ${activeSection === "teams" ? styles.active : ""}`}
                onClick={() => navigateTo("teams")}
              >
                <span className={styles.navIndicator} aria-hidden="true" />
                <span className={styles.navLabel}>Teams</span>
              </button>
            </div>
          </nav>
        </TopographicHero>
      </header>

      {/* Separate destinations: keep mounted to prevent 3D state loss */}
      <section
        id="panel-machines"
        role="tabpanel"
        aria-labelledby="tab-machines"
        hidden={activeSection !== "machines"}
        className={`${styles.contentPanel} ${activeSection !== "machines" ? styles.hidden : ""}`}
      >
        <Suspense fallback={<div className={styles.panelLoading}>Loading Machines...</div>}>
          <MachinesExperience />
        </Suspense>
      </section>

      <section
        id="panel-paddock"
        role="tabpanel"
        aria-labelledby="tab-paddock"
        hidden={activeSection !== "paddock"}
        className={`${styles.contentPanel} ${activeSection !== "paddock" ? styles.hidden : ""}`}
      >
        <Suspense fallback={<div className={styles.panelLoading}>Loading Circuit Guide...</div>}>
          <CircuitGuide />
        </Suspense>
      </section>

      <section
        id="panel-teams"
        role="tabpanel"
        aria-labelledby="tab-teams"
        hidden={activeSection !== "teams"}
        className={`${styles.contentPanel} ${activeSection !== "teams" ? styles.hidden : ""}`}
      >
        <Suspense fallback={<div className={styles.panelLoading}>Loading Teams &amp; Dynasties...</div>}>
          <Teams />
        </Suspense>
      </section>
    </div>
  );
}
