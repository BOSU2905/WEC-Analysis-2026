import { m } from "framer-motion";
import styles from "./EditorialPhoto.module.css";

type Props = {
  src: string;
  alt: string;
  caption?: string;
  direction?: "left" | "right";
  duration?: number;
  viewportMargin?: string;
  priority?: boolean;
};

export default function EditorialPhoto({
  src,
  alt,
  caption,
  direction = "left",
  viewportMargin = "-100px",
  duration = 1.2,
  priority = false,
}: Props) {
  return (
    <m.div 
      className={styles.container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: viewportMargin }}
    >
      <div className={styles.imageWrapper}>
        <m.img
          src={src}
          alt={alt}
          className={styles.image}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          variants={{
            hidden: {
              x: direction === "left" ? "-10%" : "10%",
              opacity: 0,
              clipPath: direction === "left" ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)",
            },
            visible: {
              x: 0,
              opacity: 1,
              clipPath: "inset(0% 0% 0% 0%)",
              transition: { duration, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        />
      </div>
      {caption && (
        <m.div
          className={styles.caption}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { duration: 0.8, delay: duration * 0.4 } // Modest stagger based on image duration
            }
          }}
        >
          {caption}
        </m.div>
      )}
    </m.div>
  );
}
