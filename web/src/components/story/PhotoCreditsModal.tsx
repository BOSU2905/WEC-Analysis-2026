import { useState, useEffect, useId } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
  PHOTO_CREDITS,
  type PhotoCreditEntry,
  type VerificationStatus,
} from "../../data/photo_credits";
import styles from "./PhotoCreditsModal.module.css";

interface PhotoCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FilterOption = "all" | "active" | "candidates" | "verified" | "action";

export default function PhotoCreditsModal({
  isOpen,
  onClose,
}: PhotoCreditsModalProps) {
  const [filter, setFilter] = useState<FilterOption>("all");
  const titleId = useId();

  // Escape key handler and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  const filteredEntries = PHOTO_CREDITS.filter((entry) => {
    if (filter === "active") return entry.isDisplayedInStory;
    if (filter === "candidates") return !entry.isDisplayedInStory;
    if (filter === "verified") return entry.verificationStatus === "verified";
    if (filter === "action") return entry.replacementOrPermissionNeeded;
    return true;
  });

  const verifiedCount = PHOTO_CREDITS.filter(
    (e) => e.verificationStatus === "verified",
  ).length;
  const leadCount = PHOTO_CREDITS.filter(
    (e) => e.verificationStatus === "lead_investigated",
  ).length;
  const unverifiedCount = PHOTO_CREDITS.filter(
    (e) => e.verificationStatus === "unverified",
  ).length;
  const activeCount = PHOTO_CREDITS.filter((e) => e.isDisplayedInStory).length;
  const candidateCount = PHOTO_CREDITS.filter(
    (e) => !e.isDisplayedInStory,
  ).length;
  const actionCount = PHOTO_CREDITS.filter(
    (e) => e.replacementOrPermissionNeeded,
  ).length;

  const getStatusClass = (status: VerificationStatus) => {
    switch (status) {
      case "verified":
        return styles.statusVerified;
      case "lead_investigated":
        return styles.statusLead;
      case "unverified":
      default:
        return styles.statusUnverified;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <m.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.titleArea}>
                <div className={styles.eyebrow}>
                  Editorial Standards & Transparency
                </div>
                <h2 id={titleId} className={styles.title}>
                  Photo Credits & Provenance
                </h2>
                <p className={styles.description}>
                  Complete attribution ledger for photographic assets rendered
                  across the WEC 2011–2023 story. This record distinguishes
                  between original source links, photographer credits, copyright
                  owners, and verified legal reuse rights.
                </p>
              </div>
              <button
                type="button"
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Close photo credits ledger"
              >
                <span>Close</span>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            {/* Toolbar & Filters */}
            <div className={styles.toolbar}>
              <div className={styles.filterGroup}>
                <button
                  type="button"
                  className={`${styles.filterBtn} ${
                    filter === "all" ? styles.active : ""
                  }`}
                  onClick={() => setFilter("all")}
                >
                  All ({PHOTO_CREDITS.length})
                </button>
                <button
                  type="button"
                  className={`${styles.filterBtn} ${
                    filter === "active" ? styles.active : ""
                  }`}
                  onClick={() => setFilter("active")}
                >
                  Active in Story ({activeCount})
                </button>
                {candidateCount > 0 && (
                  <button
                    type="button"
                    className={`${styles.filterBtn} ${
                      filter === "candidates" ? styles.active : ""
                    }`}
                    onClick={() => setFilter("candidates")}
                  >
                    Filmstrip Candidates ({candidateCount})
                  </button>
                )}
                <button
                  type="button"
                  className={`${styles.filterBtn} ${
                    filter === "verified" ? styles.active : ""
                  }`}
                  onClick={() => setFilter("verified")}
                >
                  Open Licensed ({verifiedCount})
                </button>
                <button
                  type="button"
                  className={`${styles.filterBtn} ${
                    filter === "action" ? styles.active : ""
                  }`}
                  onClick={() => setFilter("action")}
                >
                  Needs Clearance / Replace ({actionCount})
                </button>
              </div>

              <div className={styles.metrics}>
                <span className={styles.metricItem}>
                  Verified: <strong>{verifiedCount}</strong>
                </span>
                <span className={styles.metricItem}>
                  Leads: <strong>{leadCount}</strong>
                </span>
                <span className={styles.metricItem}>
                  Unverified/Synthetic: <strong>{unverifiedCount}</strong>
                </span>
              </div>
            </div>

            {/* Content List */}
            <div className={styles.scrollArea}>
              <div className={styles.distinctionNotice}>
                <strong>Legal & Attribution Principle</strong>A source lead URL,
                a photographer credit, and an image copyright are legally
                distinct from permission to reuse an image. All public-domain
                and Creative Commons assets are verified below, while
                proprietary press leads and developmental placeholders are
                rigorously documented pending formal clearance or replacement.
              </div>

              {filteredEntries.map((item: PhotoCreditEntry) => (
                <article key={item.id} className={styles.card}>
                  <div className={styles.thumbnailCol}>
                    <div className={styles.thumbnailWrapper}>
                      {item.thumbnailSrc ? (
                        <img
                          src={item.thumbnailSrc}
                          alt={item.filename}
                          className={styles.thumbnail}
                          loading="lazy"
                        />
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            color: "var(--color-secondary)",
                            fontSize: "0.75rem",
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          No Preview
                        </div>
                      )}
                    </div>
                    <div className={styles.filename}>{item.filename}</div>
                    <div className={styles.usageBadge}>
                      {item.isDisplayedInStory
                        ? "Active on Story Page"
                        : "Candidate / Unrendered"}
                    </div>
                  </div>

                  <div className={styles.detailsCol}>
                    <div className={styles.cardHeader}>
                      <div className={styles.statusBadges}>
                        <span
                          className={`${styles.statusPill} ${getStatusClass(
                            item.verificationStatus,
                          )}`}
                        >
                          {item.statusLabel}
                        </span>
                        <span
                          className={`${styles.deployTag} ${
                            item.replacementOrPermissionNeeded
                              ? styles.deployAction
                              : styles.deployReady
                          }`}
                        >
                          {item.replacementOrPermissionNeeded
                            ? "Action: Replacement or Permission Required"
                            : "Cleared: Open License Approved"}
                        </span>
                      </div>
                    </div>

                    <div className={styles.metadataGrid}>
                      <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>
                          Section / Usage
                        </span>
                        <span className={styles.metaValue}>
                          {item.sectionUsed}
                        </span>
                      </div>

                      <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>
                          Photographer / Creator
                        </span>
                        <span className={styles.metaValue}>
                          {item.photographer || "Unverified / Not credited"}
                        </span>
                      </div>

                      <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>
                          Copyright Holder
                        </span>
                        <span className={styles.metaValue}>
                          {item.copyrightHolder || "Unverified / Unknown"}
                        </span>
                      </div>

                      <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>
                          License & Terms
                        </span>
                        <span className={styles.metaValue}>
                          {item.licenseUrl ? (
                            <a
                              href={item.licenseUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.metaLink}
                            >
                              {item.licenseName} &rarr;
                            </a>
                          ) : (
                            item.licenseName
                          )}
                        </span>
                      </div>

                      <div
                        className={styles.metaItem}
                        style={{ gridColumn: "1 / -1" }}
                      >
                        <span className={styles.metaLabel}>
                          Original Source
                        </span>
                        <span className={styles.metaValue}>
                          {item.originalSourceUrl ? (
                            <a
                              href={item.originalSourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.metaLink}
                            >
                              {item.originalSourceUrl}
                            </a>
                          ) : (
                            <span style={{ color: "var(--color-secondary)" }}>
                              No original source URL available (Synthetic
                              development asset)
                            </span>
                          )}
                        </span>
                      </div>
                    </div>

                    <div className={styles.notesBox}>
                      <span className={styles.notesLabel}>
                        Provenance & Verification Notes
                      </span>
                      {item.evidenceNotes}
                    </div>
                  </div>
                </article>
              ))}

              {filteredEntries.length === 0 && (
                <div
                  style={{
                    textAlign: "center",
                    padding: "3.5rem 1.5rem",
                    color: "var(--color-secondary)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "1rem",
                      lineHeight: "1.6",
                    }}
                  >
                    All audited photographs have verified open licenses and
                    documented reuse permissions.
                  </p>
                </div>
              )}
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}
