import { useState, useEffect, useRef, useId, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import styles from "./CircuitExplorerModal.module.css";
import type { CircuitData, CircuitTurn } from "../../data/circuits_data";

interface CircuitExplorerModalProps {
  circuit: CircuitData;
  onClose: () => void;
  triggerButtonId?: string;
}

export default function CircuitExplorerModal({
  circuit,
  onClose,
  triggerButtonId,
}: CircuitExplorerModalProps) {
  // Initial state: default to Turn 1 (or first turn)
  const [selectedTurnId, setSelectedTurnId] = useState<string>(
    circuit.turns[0]?.id || ""
  );
  const [selectedSectorNum, setSelectedSectorNum] = useState<1 | 2 | 3 | null>(
    circuit.turns[0]?.sector || 1
  );
  const [hoveredTurn, setHoveredTurn] = useState<CircuitTurn | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descId = useId();

  const selectedTurn = circuit.turns.find((t) => t.id === selectedTurnId) || circuit.turns[0];
  const selectedSector = selectedSectorNum
    ? circuit.sectors.find((s) => s.sector === selectedSectorNum) || null
    : null;

  // Reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Close handler with scroll preservation & focus restoration
  const handleClose = useCallback(() => {
    onClose();
    if (triggerButtonId) {
      // Restore focus to originating card button
      requestAnimationFrame(() => {
        const btn = document.getElementById(triggerButtonId);
        btn?.focus();
      });
    }
  }, [onClose, triggerButtonId]);

  // Lock background scroll and handle Escape key & Focus Trap
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    // Auto-focus close button on mount
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      } else if (e.key === "Tab") {
        // Trap focus inside modal
        if (!dialogRef.current) return;
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClose]);

  // When a turn is selected:
  const handleSelectTurn = (turn: CircuitTurn) => {
    setSelectedTurnId(turn.id);
    setSelectedSectorNum(turn.sector);
  };

  // When a sector filter is clicked:
  const handleSelectSector = (sectorNum: 1 | 2 | 3 | null) => {
    setSelectedSectorNum(sectorNum);
    if (sectorNum !== null) {
      // If current turn is not in this sector, switch to first turn of this sector
      const firstTurnInSector = circuit.turns.find((t) => t.sector === sectorNum);
      if (firstTurnInSector && selectedTurn.sector !== sectorNum) {
        setSelectedTurnId(firstTurnInSector.id);
      }
    }
  };

  // Next / Previous turn navigation
  const handlePrevTurn = () => {
    const currentIndex = circuit.turns.findIndex((t) => t.id === selectedTurnId);
    const prevIndex = (currentIndex - 1 + circuit.turns.length) % circuit.turns.length;
    const prevTurn = circuit.turns[prevIndex];
    handleSelectTurn(prevTurn);
  };

  const handleNextTurn = () => {
    const currentIndex = circuit.turns.findIndex((t) => t.id === selectedTurnId);
    const nextIndex = (currentIndex + 1) % circuit.turns.length;
    const nextTurn = circuit.turns[nextIndex];
    handleSelectTurn(nextTurn);
  };

  // Filter or highlight turns based on active sector
  const activeSectorTurns = selectedSectorNum
    ? circuit.turns.filter((t) => t.sector === selectedSectorNum)
    : circuit.turns;

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
      ref={dialogRef}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <m.div
        className={styles.dialogContainer}
        initial={{ opacity: 0, scale: 0.98, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 16 }}
        transition={{ duration: prefersReducedMotion ? 0.05 : 0.25, ease: "easeOut" }}
      >
        {/* Modal Top Bar */}
        <header className={styles.header}>
          <div className={styles.circuitIdentity}>
            <span className={styles.countryBadge}>
              <span className={styles.flagEmoji} aria-hidden="true">{circuit.countryFlag}</span>{" "}
              {circuit.country}
            </span>
            <h2 id={titleId} className={styles.circuitTitle}>
              {circuit.name}
            </h2>
          </div>

          <div className={styles.topControls}>
            <div className={styles.circuitQuickStats}>
              <span>{circuit.stats.length}</span>
              <span className={styles.quickStatDivider}>/</span>
              <span>{circuit.stats.turnsCount} Corners</span>
              <span className={styles.quickStatDivider}>/</span>
              <span>{circuit.stats.direction}</span>
            </div>

            <button
              type="button"
              ref={closeButtonRef}
              className={styles.closeButton}
              onClick={handleClose}
              aria-label={`Close ${circuit.name} interactive explorer`}
              title="Close (Esc)"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </header>

        {/* Modal Body: Two-Column Composition */}
        <div className={styles.contentLayout}>
          {/* Left Column: Interactive Map Panel */}
          <div className={styles.mapPanel}>
            {/* Sector Selection Toolbar */}
            <div className={styles.sectorToolbar} role="group" aria-label="Sector selection filters">
              <button
                type="button"
                className={`${styles.sectorTab} ${selectedSectorNum === null ? styles.sectorTabActive : ""}`}
                onClick={() => handleSelectSector(null)}
                aria-pressed={selectedSectorNum === null}
              >
                All Circuit
              </button>
              {circuit.sectors.map((sec) => (
                <button
                  key={sec.sector}
                  type="button"
                  className={`${styles.sectorTab} ${selectedSectorNum === sec.sector ? styles.sectorTabActive : ""}`}
                  onClick={() => handleSelectSector(sec.sector)}
                  aria-pressed={selectedSectorNum === sec.sector}
                >
                  <span
                    className={styles.sectorDot}
                    style={{
                      backgroundColor:
                        sec.sector === 1
                          ? "var(--sector-1, #e69d45)"
                          : sec.sector === 2
                          ? "var(--sector-2, #5a9bd4)"
                          : "var(--sector-3, #4ea37e)",
                    }}
                  />
                  Sector {sec.sector}
                </button>
              ))}
            </div>

            {/* SVG Interactive Map Viewport */}
            <div className={styles.svgViewport}>
              <svg
                viewBox={circuit.viewBox}
                className={styles.interactiveSvg}
                preserveAspectRatio="xMidYMid meet"
                aria-label={`Interactive circuit map for ${circuit.name}`}
              >
                <defs>
                  {/* Glowing filter for highlighted turn marker */}
                  <filter id="turnGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <g transform={circuit.groupTransform || undefined}>
                  {/* Track base background path */}
                  <path
                    d={circuit.trackPath}
                    className={styles.mapTrackBg}
                  />

                  {/* Main animated circuit outline path */}
                  <m.path
                    d={circuit.trackPath}
                    className={styles.mapTrackOutline}
                    initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 1.2, ease: "easeOut" }}
                  />

                  {/* Sector highlighted overlay path */}
                  {selectedSector && selectedSector.highlightPath && (
                    <m.path
                      key={`highlight-${selectedSector.sector}`}
                      d={selectedSector.highlightPath}
                      className={styles.mapSectorHighlight}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        stroke:
                          selectedSector.sector === 1
                            ? "var(--sector-1, #e69d45)"
                            : selectedSector.sector === 2
                            ? "var(--sector-2, #5a9bd4)"
                            : "var(--sector-3, #4ea37e)",
                      }}
                    />
                  )}

                  {/* Turn Markers */}
                  {circuit.turns.map((turn) => {
                    const isSelected = turn.id === selectedTurnId;
                    const isHovered = hoveredTurn?.id === turn.id;
                    const isDimmed = selectedSectorNum !== null && turn.sector !== selectedSectorNum;

                    const markerColor =
                      turn.sector === 1
                        ? "var(--sector-1, #e69d45)"
                        : turn.sector === 2
                        ? "var(--sector-2, #5a9bd4)"
                        : "var(--sector-3, #4ea37e)";

                    return (
                      <g
                        key={turn.id}
                        className={`${styles.markerGroup} ${isSelected ? styles.markerSelected : ""} ${isDimmed ? styles.markerDimmed : ""}`}
                        transform={`translate(${turn.x}, ${turn.y})`}
                        onClick={() => handleSelectTurn(turn)}
                        onMouseEnter={() => setHoveredTurn(turn)}
                        onMouseLeave={() => setHoveredTurn(null)}
                        tabIndex={0}
                        role="button"
                        aria-label={`Select ${turn.number} ${turn.name}, Sector ${turn.sector}`}
                        aria-pressed={isSelected}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleSelectTurn(turn);
                          }
                        }}
                      >
                        {/* Generous touch hit area */}
                        <circle r="22" className={styles.markerHitArea} />

                        {/* Selected pulse halo ring */}
                        {isSelected && (
                          <m.circle
                            r="14"
                            className={styles.markerHalo}
                            initial={{ scale: 0.7, opacity: 0 }}
                            animate={{ scale: 1.2, opacity: [0.6, 0.2, 0.6] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            style={{ stroke: markerColor }}
                          />
                        )}

                        {/* Outer visible marker */}
                        <circle
                          r={isSelected ? "9" : isHovered ? "8" : "6.5"}
                          className={styles.markerCircle}
                          style={{
                            fill: isSelected ? "#ffffff" : markerColor,
                            stroke: isSelected ? markerColor : "var(--color-bg)",
                          }}
                        />

                        {/* Inner accent dot */}
                        <circle
                          r={isSelected ? "3.5" : "2"}
                          fill={isSelected ? markerColor : "var(--color-bg)"}
                        />

                        {/* Accessible label text tag inside SVG */}
                        {(isSelected || isHovered) && (
                          <g className={styles.markerTooltipG} transform="translate(0, -18)">
                            <rect
                              x={-turn.name.length * 3.8 - 14}
                              y="-16"
                              width={turn.name.length * 7.6 + 28}
                              height="20"
                              rx="4"
                              className={styles.svgTooltipBg}
                            />
                            <text
                              textAnchor="middle"
                              y="-2"
                              className={styles.svgTooltipText}
                            >
                              {turn.number} &bull; {turn.name}
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}
                </g>
              </svg>

              <div className={styles.mapHintLayer}>
                <span className={styles.mapHintText}>
                  Click corner marker or use sector tabs to explore verified telemetry
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Persistent Information Panel */}
          <aside className={styles.infoPanel} aria-label="Selected corner and sector details">
            <AnimatePresence mode="wait">
              <m.div
                key={selectedTurn.id}
                className={styles.infoCard}
                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: prefersReducedMotion ? 0 : -12 }}
                transition={{ duration: prefersReducedMotion ? 0.05 : 0.2, ease: "easeOut" }}
              >
                {/* Turn Header */}
                <div className={styles.turnHeader}>
                  <div className={styles.turnBadges}>
                    <span className={styles.turnNumberBadge}>{selectedTurn.number}</span>
                    <span
                      className={styles.sectorBadge}
                      style={{
                        borderColor:
                          selectedTurn.sector === 1
                            ? "var(--sector-1, #e69d45)"
                            : selectedTurn.sector === 2
                            ? "var(--sector-2, #5a9bd4)"
                            : "var(--sector-3, #4ea37e)",
                        color:
                          selectedTurn.sector === 1
                            ? "var(--sector-1, #e69d45)"
                            : selectedTurn.sector === 2
                            ? "var(--sector-2, #5a9bd4)"
                            : "var(--sector-3, #4ea37e)",
                      }}
                    >
                      Sector {selectedTurn.sector}
                    </span>
                    <span className={styles.directionBadge}>{selectedTurn.direction}</span>
                  </div>

                  <h3 className={styles.turnName}>{selectedTurn.name}</h3>
                </div>

                {/* Verified Technical Telemetry Details */}
                {selectedTurn.technicalDetails && (
                  <div className={styles.technicalBlock}>
                    <span className={styles.blockTitle}>Telemetry & Geometry Profile</span>
                    <p className={styles.technicalText}>{selectedTurn.technicalDetails}</p>
                  </div>
                )}

                {/* Endurance Significance Analysis */}
                <div className={styles.analysisBlock}>
                  <span className={styles.blockTitle}>Why It Matters In Endurance Racing</span>
                  <p className={styles.analysisText}>{selectedTurn.enduranceImportance}</p>
                </div>

                {/* Did You Know Callout */}
                {selectedTurn.didYouKnow && (
                  <div className={styles.factCallout}>
                    <div className={styles.factHeader}>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12.01" y2="8" />
                      </svg>
                      <span>Did You Know?</span>
                    </div>
                    <p className={styles.factText}>{selectedTurn.didYouKnow.fact}</p>
                    <span className={styles.factSource}>Source: {selectedTurn.didYouKnow.source}</span>
                  </div>
                )}

                {/* Sector Context Overview */}
                {selectedSector && (
                  <div className={styles.sectorContextBlock}>
                    <span className={styles.blockTitle}>{selectedSector.name}</span>
                    <p className={styles.sectorOverviewText}>{selectedSector.description}</p>
                    <div className={styles.sectorTurnsList}>
                      <span className={styles.sectorTurnsListLabel}>Corners in this sector:</span>
                      <div className={styles.sectorTurnChips}>
                        {activeSectorTurns.map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            className={`${styles.turnChip} ${t.id === selectedTurn.id ? styles.turnChipActive : ""}`}
                            onClick={() => handleSelectTurn(t)}
                            aria-label={`Select ${t.number} ${t.name}`}
                          >
                            {t.number}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Corner Carousel / Step Controls */}
                <div className={styles.cornerNavRow}>
                  <button
                    type="button"
                    className={styles.cornerNavBtn}
                    onClick={handlePrevTurn}
                    aria-label="Previous corner"
                  >
                    &larr; Prev Corner
                  </button>
                  <span className={styles.cornerCountIndicator}>
                    {circuit.turns.findIndex((t) => t.id === selectedTurn.id) + 1} of{" "}
                    {circuit.turns.length}
                  </span>
                  <button
                    type="button"
                    className={styles.cornerNavBtn}
                    onClick={handleNextTurn}
                    aria-label="Next corner"
                  >
                    Next Corner &rarr;
                  </button>
                </div>

                {/* Circuit Provenance & Data Contract */}
                <div className={styles.provenanceFooter}>
                  <h4>Verified Provenance & Data Standards</h4>
                  <p>
                    <strong>Geometry Source:</strong>{" "}
                    <a
                      href={circuit.provenance.geometrySourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {circuit.provenance.geometrySource}
                    </a>
                  </p>
                  <p>
                    <strong>Configuration Context:</strong> {circuit.provenance.configurationContext}
                  </p>
                  <p className={styles.provenanceNotes}>{circuit.provenance.notes}</p>
                  {circuit.stats.lapRecordTopClass && (
                    <p className={styles.lapRecordNotice}>
                      <strong>Historical WEC Top-Class Record:</strong>{" "}
                      {circuit.stats.lapRecordTopClass}
                    </p>
                  )}
                </div>
              </m.div>
            </AnimatePresence>
          </aside>
        </div>
      </m.div>
    </div>
  );
}
