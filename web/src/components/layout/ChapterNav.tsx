import { useEffect, useState } from "react";
import styles from "./ChapterNav.module.css";

const CHAPTERS = [
  { id: "chapter-00", num: "00", title: "Understanding WEC" },
  { id: "chapter-01", num: "01", title: "The Anatomy" },
  { id: "chapter-02", num: "02", title: "The Last Manufacturer Standing" },
  { id: "chapter-03", num: "03", title: "The Armada Effect" },
  { id: "chapter-04", num: "04", title: "The Grip" },
  { id: "chapter-05", num: "05", title: "The Evolution of Speed" },
];

export default function ChapterNav() {
  const [activeId, setActiveId] = useState("chapter-00");

  useEffect(() => {
    // Keep track of all currently intersecting chapters
    const visibleChapters = new Map<string, IntersectionObserverEntry>();
    
    const observer = new IntersectionObserver(
      (entries) => {
        let hasChanges = false;
        
        entries.forEach((entry) => {
          const id = entry.target.id.replace("-wrap", "");
          if (entry.isIntersecting) {
            visibleChapters.set(id, entry);
            hasChanges = true;
          } else {
            if (visibleChapters.has(id)) {
              visibleChapters.delete(id);
              hasChanges = true;
            }
          }
        });

        if (hasChanges && visibleChapters.size > 0) {
          // Sort visible chapters by their DOM order (or simply prioritize the one taking up the most space)
          // For a vertical narrative, the one whose top is closest to the middle of the screen is usually active,
          // or just the first one in the set that has the highest intersection ratio.
          
          let bestId = "";
          let maxRatio = -1;
          let highestTop = -Infinity;

          visibleChapters.forEach((entry, id) => {
            // If the chapter is massive (like Chapter 1), intersectionRatio might be small, 
            // but we still want it to be active if it spans the viewport.
            // Using the top position relative to viewport center is more reliable.
            const rect = entry.boundingClientRect;
            
            // For very tall sticky containers, the container might cover the whole screen.
            // In that case, it is clearly the active chapter.
            if (entry.intersectionRatio > maxRatio) {
              maxRatio = entry.intersectionRatio;
              bestId = id;
            } else if (entry.intersectionRatio === maxRatio) {
              // Tie-breaker: which one is further down the page? 
              if (rect.top > highestTop) {
                highestTop = rect.top;
                bestId = id;
              }
            }
          });

          if (bestId) {
            setActiveId((prev) => (prev !== bestId ? bestId : prev));
          }
        }
      },
      // Check a generous middle band to catch tall scrolling sections
      { rootMargin: "-20% 0px -20% 0px", threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] },
    );

    CHAPTERS.forEach((chapter) => {
      const el = document.getElementById(chapter.id) || document.getElementById(`${chapter.id}-wrap`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id) || document.getElementById(`${id}-wrap`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={styles.nav} aria-label="Chapter Navigation">
      <div className={styles.track} />
      <ul className={styles.list}>
        {CHAPTERS.map((ch) => (
          <li key={ch.id} className={styles.item}>
            <a
              href={`#${ch.id}`}
              onClick={(e) => handleClick(e, ch.id)}
              className={`${styles.link} ${activeId === ch.id ? styles.active : ""}`}
              aria-current={activeId === ch.id ? "step" : undefined}
            >
              <div className={styles.indicatorWrapper}>
                <span className={styles.indicator} />
              </div>
              <span className={styles.label}>
                <span className={styles.num}>{ch.num}</span> {ch.title}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
