import { motion } from "framer-motion";
import styles from "./EditorialPhoto.module.css";

type Props = {
  src: string;
  alt: string;
  caption?: string;
  direction?: "left" | "right";
  duration?: number;
  viewportMargin?: string;
};

export default function EditorialPhoto({
  src,
  alt,
  caption,
  direction = "left",
  viewportMargin = "0px",
  duration = 1.2,
}: Props) {
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.imageWrapper}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: viewportMargin }}
      >
        <motion.img
          src={src}
          alt={alt}
          className={styles.image}
          variants={{
            hidden: {
              x: direction === "left" ? "-10%" : "10%",
              opacity: 0,
              clipPath:
                direction === "left" ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)",
            },
            visible: {
              x: 0,
              opacity: 1,
              clipPath: "inset(0% 0% 0% 0%)",
              transition: { duration, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        />
      </motion.div>
      {caption && (
        <motion.div
          className={styles.caption}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {caption}
        </motion.div>
      )}
    </div>
  );
}
