import styles from "./BrandLogo.module.css";

interface BrandLogoProps {
  variant?: "navbar" | "icon" | "full";
  showDescriptor?: boolean;
  className?: string;
}

export default function BrandLogo({
  variant = "navbar",
  showDescriptor = true,
  className = "",
}: BrandLogoProps) {
  // Pure, precise engineered geometric SVG for the Racing Line Monogram
  const mark = (
    <svg
      className={styles.monogram}
      viewBox="0 0 40 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id="racing-line-grad"
          x1="5"
          y1="14"
          x2="37"
          y2="14"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="var(--logo-line-start, var(--color-primary))" />
          <stop offset="48%" stopColor="var(--logo-line-start, var(--color-primary))" />
          <stop offset="72%" stopColor="var(--color-accent)" />
          <stop offset="100%" stopColor="var(--color-accent)" />
        </linearGradient>
      </defs>

      {/* Main Continuous Engineered Racing Line Ribbon */}
      <path
        d="M 5,7.5 L 12,21.5 C 13,23.5 15,23.5 16,21.5 L 20,10 C 20.5,8.5 21.5,8.5 22,10 L 26,21.5 C 27,23.5 29,23.5 30,21.5 L 37,7.5"
        stroke="url(#racing-line-grad)"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  if (variant === "icon") {
    return <div className={`${styles.iconWrap} ${className}`}>{mark}</div>;
  }

  return (
    <div className={`${styles.lockup} ${styles[variant]} ${className}`}>
      {mark}
      <div className={styles.textGroup}>
        <span className={styles.brandTitle}>ENDURANCE IN DATA</span>
        {showDescriptor && (
          <span className={styles.descriptor}>WEC 2011–2023</span>
        )}
      </div>
    </div>
  );
}
