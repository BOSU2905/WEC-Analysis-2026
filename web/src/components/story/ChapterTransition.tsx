import styles from "./ChapterTransition.module.css";

type Props = {
  nextChapterNumber: string;
  nextChapterTitle: string;
  teaserText: string;
};

export default function ChapterTransition({
  nextChapterNumber,
  nextChapterTitle,
  teaserText,
}: Props) {
  return (
    <section className={styles.transition}>
      <div className={styles.content}>
        <p className={styles.teaser}>{teaserText}</p>
        <div className={styles.divider} />
        <div className={styles.nextInfo}>
          <span className={styles.label}>Next</span>
          <h2 className={styles.title}>
            <span className={styles.number}>Chapter {nextChapterNumber}</span>
            {nextChapterTitle}
          </h2>
        </div>
      </div>
    </section>
  );
}
