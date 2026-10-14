import styles from "./BrandLogo.module.css";

interface BrandLogoProps {
  variant?: "navbar" | "icon" | "full";
  showDescriptor?: boolean;
  className?: string;
}

const resolveAsset = (path: string) => {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${cleanPath}`;
};

export default function BrandLogo({
  variant = "navbar",
  showDescriptor = true,
  className = "",
}: BrandLogoProps) {
  // Authoritative Continuous Racing-Line Ribbon Monogram from Endurance in Data Logo(1).png
  const mark = (
    <div className={styles.monogramWrap} aria-hidden="true">
      <img
        src={resolveAsset("assets/branding/monogram_dark.webp")}
        alt=""
        className={`${styles.monogramImg} ${styles.darkImg}`}
        width="1066"
        height="340"
        loading="eager"
        decoding="async"
      />
      <img
        src={resolveAsset("assets/branding/monogram_light.webp")}
        alt=""
        className={`${styles.monogramImg} ${styles.lightImg}`}
        width="1066"
        height="340"
        loading="eager"
        decoding="async"
      />
    </div>
  );

  if (variant === "icon") {
    return <div className={`${styles.iconWrap} ${className}`}>{mark}</div>;
  }

  return (
    <div className={`${styles.lockup} ${styles[variant]} ${className}`}>
      {mark}
      <div className={styles.textGroup}>
        <span className={styles.brandTitle}>
          <span className={styles.titleLead}>ENDURANCE</span>{" "}
          <span className={styles.titleAccent}>IN DATA</span>
        </span>
        {showDescriptor && (
          <span className={styles.descriptor}>WEC 2011 — 2023</span>
        )}
      </div>
    </div>
  );
}
