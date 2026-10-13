import { useState, useEffect, lazy, Suspense } from "react";
import styles from "./Archive.module.css";

const MachinesExperience = lazy(() => import("../components/archive/MachinesExperience"));
const CircuitGuide = lazy(() => import("../components/circuits/CircuitGuide"));

export type ArchiveDestination = "machines" | "paddock";

export default function Archive() {
  const getSubViewFromHash = (): ArchiveDestination => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.toLowerCase().replace("#", "");
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
      if (hash === "paddock" || hash === "circuits") {
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
    window.location.hash = destination === "paddock" ? "paddock" : "machines";
    if (destination === "machines") {
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 50);
    }
  };

  return (
    <div className={styles.archive}>
      <header className={styles.header}>
        <h1 className={styles.title}>The WEC Archive</h1>
        <p className={styles.intro}>
          A user-driven exploration of the machines and circuits that defined
          the 2011–2023 era of the FIA World Endurance Championship.
        </p>

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
              <span className={styles.navLabel}>Machines</span>
              <span className={styles.navTag}>Car Collection &amp; 3D</span>
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
              <span className={styles.navLabel}>The Paddock</span>
              <span className={styles.navTag}>Circuit Guide &amp; Explorer</span>
            </button>
          </div>
        </nav>
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
    </div>
  );
}
