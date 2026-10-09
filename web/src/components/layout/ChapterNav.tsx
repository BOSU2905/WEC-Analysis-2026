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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace("-wrap", "");
            setActiveId(id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" },
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
