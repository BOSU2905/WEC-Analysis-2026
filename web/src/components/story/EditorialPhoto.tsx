import { motion } from "framer-motion";
import styles from "./EditorialPhoto.module.css";

type Props = {
  src: string;
  alt: string;
  caption?: string;
  direction?: "left" | "right";
};

export default function EditorialPhoto({
  src,
  alt,
  caption,
  direction = "left",
}: Props) {
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.imageWrapper}
        initial={{
          x: direction === "left" ? "-10%" : "10%",
          opacity: 0,
          clipPath:
            direction === "left" ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
        }}
        whileInView={{ x: 0, opacity: 1, clipPath: "inset(0 0 0 0)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <img src={src} alt={alt} className={styles.image} />
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
