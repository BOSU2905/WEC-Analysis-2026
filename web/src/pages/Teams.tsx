import { useState, useRef, useEffect, useMemo } from "react";
import { m, useScroll, useTransform, useSpring } from "framer-motion";
import { TEAMS_HISTORY } from "../data/teams_history";
import type { SeasonHistory } from "../data/teams_history";
import styles from "./Teams.module.css";

// Stable content-weighted scroll geometry:
// Calculate duration for each season proportional to its visible editorial content
// (season heading/context, summary insight, primary featured car/team/record, and default champions)
// Accordion details (rosters & race tables) are excluded from the main scroll distance.
const TOTAL_SEASONS = TEAMS_HISTORY.length; // 12
const TRANSITION_DURATION = 0.032; // Consistent ~3.2% transition interval between seasons

// Calculate visible content weight per season (statically deterministic)
const SEASON_WEIGHTS = (() => {
  const visibleLengths = TEAMS_HISTORY.map((s) => {
    const pTeam = s.featuredTeams[0] || {};
    return (
      (s.label || "").length +
      (s.seriesContext || "").length +
      (s.era || "").length +
      (s.dominantManufacturer || "").length +
      (s.summary || "").length +
      (pTeam.name || "").length +
      (pTeam.carModel || "").length +
      (pTeam.carNumber || "").length +
      (pTeam.drivers || []).join(" ").length +
      (pTeam.keyStat || "").length +
      (pTeam.historicalSignificance || "").length +
      s.champions.reduce(
        (acc, c) =>
          acc +
          (c.category || "").length +
          (c.team || "").length +
          (c.car || "").length +
          (c.drivers || []).join(" ").length,
        0,
      )
    );
  });

  const avg =
    visibleLengths.reduce((a, b) => a + b, 0) / visibleLengths.length;

  // Relative content weights clamped to [0.85, 1.25]
  // Short seasons: ~0.85x to 0.92x (e.g. 2014, 2021)
  // Typical seasons: ~0.95x to 1.05x (e.g. 2013, 2015, 2016, 2017)
  // Content-heavy seasons: ~1.10x to 1.25x (e.g. 2011, 2012, 2018–2019, 2023)
  return visibleLengths.map((len) =>
    Math.max(0.85, Math.min(1.25, len / avg)),
  );
})();

interface SeasonScrollInterval {
  pStart: number;
  pEnd: number;
  midPoint: number;
  transitionThreshold: number;
}

const SEASON_SCROLL_INTERVALS: SeasonScrollInterval[] = (() => {
  const sumW = SEASON_WEIGHTS.reduce((a, b) => a + b, 0);
  const remainingForPlateaus = 1.0 - (TOTAL_SEASONS - 1) * TRANSITION_DURATION;
  const plateaus = SEASON_WEIGHTS.map(
    (w) => (w / sumW) * remainingForPlateaus,
  );

  const intervals: SeasonScrollInterval[] = [];
  let current = 0;

  for (let i = 0; i < TOTAL_SEASONS; i++) {
    const pStart = current;
    const pEnd = i === TOTAL_SEASONS - 1 ? 1.0 : pStart + plateaus[i];
    const midPoint = (pStart + pEnd) / 2;
    const transitionThreshold = pEnd + 0.5 * TRANSITION_DURATION;

    intervals.push({
      pStart,
      pEnd,
      midPoint,
      transitionThreshold,
    });

    current = pEnd + TRANSITION_DURATION;
  }

  return intervals;
})();

export default function Teams() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [activeSeasonIndex, setActiveSeasonIndex] = useState(0);
  const [expandedWinnersSeason, setExpandedWinnersSeason] = useState<string | null>(null);
  const [expandedRosterSeason, setExpandedRosterSeason] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen dimensions
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 992);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll mapping for desktop vertical-to-horizontal scrollytelling
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring for natural, responsive wheel and trackpad inertia
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 30,
    restDelta: 0.0005,
  });

  // Construct piecewise plateau transform arrays based on content-weighted intervals
  const { inputPoints, outputTranslate } = useMemo(() => {
    const inputs: number[] = [];
    const outputs: string[] = [];

    for (let i = 0; i < TOTAL_SEASONS; i++) {
      const { pStart, pEnd } = SEASON_SCROLL_INTERVALS[i];
      const xVal = `-${i * 100}vw`;

      inputs.push(pStart);
      outputs.push(xVal);

      inputs.push(pEnd);
      outputs.push(xVal);
    }

    return { inputPoints: inputs, outputTranslate: outputs };
  }, []);

  // Horizontal translation with rock-solid resting plateaus for each season
  const xTranslate = useTransform(smoothProgress, inputPoints, outputTranslate);

  // Synchronize active season index with scroll position based on content-weighted transition midpoints
  useEffect(() => {
    if (isMobile) return;
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      let resolvedIndex = TOTAL_SEASONS - 1;
      for (let i = 0; i < TOTAL_SEASONS - 1; i++) {
        if (latest < SEASON_SCROLL_INTERVALS[i].transitionThreshold) {
          resolvedIndex = i;
          break;
        }
      }
      if (resolvedIndex !== activeSeasonIndex) {
        setActiveSeasonIndex(resolvedIndex);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, activeSeasonIndex, isMobile]);

  // Jump directly to the center of a season's resting plateau
  const handleJumpToSeason = (index: number) => {
    setActiveSeasonIndex(index);
    if (isMobile) {
      const el = document.getElementById(`season-card-${TEAMS_HISTORY[index].season}`);
      if (el) {
        const yOffset = -140; // Clean offset accounting for sticky navigation
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
      return;
    }

    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const totalScrollableDistance =
      containerRef.current.scrollHeight - window.innerHeight;

    // Target the center of season's resting plateau
    const targetProgress = Math.min(
      1.0,
      Math.max(0, SEASON_SCROLL_INTERVALS[index].midPoint),
    );
    const targetScrollY = containerTop + targetProgress * totalScrollableDistance;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  const toggleRaceWinners = (seasonKey: string) => {
    setExpandedWinnersSeason((prev) => (prev === seasonKey ? null : seasonKey));
  };

  const toggleRoster = (seasonKey: string) => {
    setExpandedRosterSeason((prev) => (prev === seasonKey ? null : seasonKey));
  };

  return (
    <div
      className={styles.teamsExperience}
      ref={containerRef}
      style={{
        // Height on desktop accommodates vertical scroll to advance 12 seasons horizontally
        height: isMobile ? "auto" : `${TOTAL_SEASONS * 110}vh`,
      }}
    >
      {/* Sticky Storytelling Viewport for Desktop (Pinned at top 68px below site header) */}
      <div className={isMobile ? styles.mobileWrapper : styles.stickyViewport}>
        {/* Top Header & Segmented Year Progress Indicator */}
        <nav
          className={styles.yearNavigator}
          aria-label="Season Timeline Navigator"
        >
          <div className={styles.navHeader}>
            <span className={styles.navSectionLabel}>TEAMS &amp; DYNASTIES</span>
            <span className={styles.navEraIndicator}>
              {TEAMS_HISTORY[activeSeasonIndex]?.era}
            </span>
          </div>

          <div className={styles.segmentedBar}>
            {TEAMS_HISTORY.map((seasonItem, index) => {
              const isActive = activeSeasonIndex === index;
              return (
                <button
                  key={seasonItem.season}
                  type="button"
                  className={`${styles.segmentButton} ${isActive ? styles.activeSegment : ""}`}
                  onClick={() => handleJumpToSeason(index)}
                  aria-label={`Jump to season ${seasonItem.label}`}
                  title={`${seasonItem.label} — ${seasonItem.dominantManufacturer}`}
                >
                  <span className={styles.segmentTick} />
                  <span className={styles.segmentYear}>{seasonItem.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Content Track */}
        {isMobile ? (
          /* Mobile: Streamlined vertical flow with rich typography and collapsible details */
          <div className={styles.mobileStream}>
            {TEAMS_HISTORY.map((season) => (
              <SeasonPanel
                key={season.season}
                season={season}
                isWinnersExpanded={expandedWinnersSeason === season.season}
                isRosterExpanded={expandedRosterSeason === season.season}
                onToggleWinners={() => toggleRaceWinners(season.season)}
                onToggleRoster={() => toggleRoster(season.season)}
                domId={`season-card-${season.season}`}
              />
            ))}
          </div>
        ) : (
          /* Desktop: Horizontal Translated Story Track with Plateaus */
          <m.div
            className={styles.horizontalTrack}
            ref={trackRef}
            style={{ x: xTranslate }}
          >
            {TEAMS_HISTORY.map((season) => (
              <div key={season.season} className={styles.seasonSlide}>
                <SeasonPanel
                  season={season}
                  isWinnersExpanded={expandedWinnersSeason === season.season}
                  isRosterExpanded={expandedRosterSeason === season.season}
                  onToggleWinners={() => toggleRaceWinners(season.season)}
                  onToggleRoster={() => toggleRoster(season.season)}
                />
              </div>
            ))}
          </m.div>
        )}
      </div>
    </div>
  );
}

interface SeasonPanelProps {
  season: SeasonHistory;
  isWinnersExpanded: boolean;
  isRosterExpanded: boolean;
  onToggleWinners: () => void;
  onToggleRoster: () => void;
  domId?: string;
}

function SeasonPanel({
  season,
  isWinnersExpanded,
  isRosterExpanded,
  onToggleWinners,
  onToggleRoster,
  domId,
}: SeasonPanelProps) {
  // Primary protagonist entry
  const primaryTeam = season.featuredTeams[0];
  const secondaryTeams = season.featuredTeams.slice(1);

  return (
    <article className={styles.slideContainer} id={domId}>
      {/* Single Cohesive Editorial Season Card (Image removed, spacious typographic hierarchy) */}
      <div className={styles.editorialSeasonCard}>
        {/* Subtle Watermark Manufacturer Name in Background */}
        <div className={styles.watermarkManufacturer}>
          {primaryTeam.manufacturer}
        </div>

        {/* Card Header: Year, Series Context, and Concise Historical Insight */}
        <div className={styles.cardHeader}>
          <div className={styles.yearRow}>
            <div className={styles.yearAndBadges}>
              <h2 className={styles.seasonYear}>{season.label}</h2>
              <div className={styles.badgeRow}>
                <span className={styles.seriesBadge}>{season.seriesContext}</span>
                <span className={styles.eraBadge}>{season.era}</span>
                <span className={styles.dominanceBadge}>
                  Dominance: {season.dominantManufacturer}
                </span>
              </div>
            </div>
          </div>
          <p className={styles.historicalInsight}>{season.summary}</p>
        </div>

        <div className={styles.cardDivider} />

        {/* Primary Featured Protagonist (Team, Car Model, Number, Drivers, and Key Record) */}
        <section className={styles.primaryEntrySection} aria-label="Primary Featured Team">
          <div className={styles.entryTopMeta}>
            <div className={styles.carIdentity}>
              <span className={styles.carNumber}>{primaryTeam.carNumber}</span>
              <span className={styles.classTag}>{primaryTeam.category}</span>
              <h3 className={styles.teamHeading}>{primaryTeam.name}</h3>
            </div>
            <span className={styles.entryRoleBadge}>PRIMARY PROTAGONIST</span>
          </div>

          <div className={styles.entryDetailsGrid}>
            <div className={styles.entryDetailCol}>
              <span className={styles.detailLabel}>Vehicle Model</span>
              <span className={styles.detailValueBold}>{primaryTeam.carModel}</span>
            </div>
            <div className={styles.entryDetailCol}>
              <span className={styles.detailLabel}>Lead Crew</span>
              <span className={styles.detailValue}>
                {primaryTeam.drivers.join(" • ")}
              </span>
            </div>
            <div className={styles.entryDetailCol}>
              <span className={styles.detailLabel}>Benchmark Record</span>
              <span className={styles.recordBadge}>{primaryTeam.keyStat}</span>
            </div>
          </div>

          <p className={styles.tacticalNote}>{primaryTeam.historicalSignificance}</p>
        </section>

        <div className={styles.cardDivider} />

        {/* Official Season Champions Grid (Integrated cleanly within the same card) */}
        <section className={styles.championsSection} aria-label="Official Season Champions">
          <div className={styles.championsHeader}>
            <span className={styles.trophyIcon} aria-hidden="true">🏆</span>
            <span>Official Season Champions</span>
          </div>
          <div className={styles.championsGrid}>
            {season.champions.map((champ, cIdx) => (
              <div key={cIdx} className={styles.champCard}>
                <span className={styles.champCategory}>{champ.category}</span>
                <span className={styles.champTeam}>{champ.team}</span>
                <span className={styles.champCar}>{champ.car}</span>
                {champ.drivers.length > 0 && (
                  <span className={styles.champDrivers}>
                    {champ.drivers.join(" • ")}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Expandable Section 1: Detailed Roster & Secondary Featured Dynasties */}
      <section className={styles.expandableSection}>
        <button
          type="button"
          className={styles.expandButton}
          onClick={onToggleRoster}
          aria-expanded={isRosterExpanded}
        >
          <span className={styles.toggleIcon}>{isRosterExpanded ? "−" : "+"}</span>
          <span>
            {isRosterExpanded
              ? "Hide Season Roster & Champion Details"
              : `Explore Full Season Roster (${season.featuredTeams.length} Featured Teams & All Champions)`}
          </span>
        </button>

        {isRosterExpanded && (
          <div className={styles.expandedDetailPanel}>
            {/* Detailed Champions Breakdown */}
            <div className={styles.detailedChampionsGrid}>
              {season.champions.map((champ, idx) => (
                <div key={idx} className={styles.detailedChampCard}>
                  <div className={styles.detailedChampCategory}>{champ.category}</div>
                  <div className={styles.detailedChampTeam}>{champ.team}</div>
                  <div className={styles.detailedChampCar}>{champ.car}</div>
                  <div className={styles.detailedChampDrivers}>
                    {champ.drivers.join(" • ")}
                  </div>
                  {champ.note && (
                    <div className={styles.detailedChampNote}>* {champ.note}</div>
                  )}
                </div>
              ))}
            </div>

            {/* Additional Featured Dynasties */}
            {secondaryTeams.length > 0 && (
              <div className={styles.secondaryTeamsGrid}>
                {secondaryTeams.map((team) => (
                  <div key={team.id} className={styles.secondaryTeamCard}>
                    <div className={styles.secondaryCardHeader}>
                      <span className={styles.carNumber}>{team.carNumber}</span>
                      <span className={styles.classTag}>{team.category}</span>
                    </div>
                    <h4 className={styles.secondaryTeamName}>{team.name}</h4>
                    <div className={styles.secondaryCarModel}>{team.carModel}</div>
                    <div className={styles.secondaryDrivers}>
                      {team.drivers.join(" / ")}
                    </div>
                    <p className={styles.secondarySignificance}>
                      {team.historicalSignificance}
                    </p>
                    <div className={styles.spotlightRecord}>
                      <span className={styles.recordTag}>STAT:</span>
                      <span className={styles.recordText}>{team.keyStat}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Expandable Section 2: Season Race Winners (Overall & Class) */}
      <section className={styles.expandableSection}>
        <button
          type="button"
          className={styles.expandButton}
          onClick={onToggleWinners}
          aria-expanded={isWinnersExpanded}
        >
          <span className={styles.toggleIcon}>{isWinnersExpanded ? "−" : "+"}</span>
          <span>
            {isWinnersExpanded
              ? `Hide Season Race Winners (${season.races.length} Races)`
              : `View Season Race Winners (${season.races.length} Races) — Overall & Class`}
          </span>
        </button>

        {isWinnersExpanded && (
          <div className={styles.expandedDetailPanel}>
            <div className={styles.racesTableWrapper}>
              <table className={styles.racesTable}>
                <thead>
                  <tr>
                    <th>Race Event</th>
                    <th>Overall Winner</th>
                    <th>Winning Drivers</th>
                    <th>Class Winners (LMP2 / GTE / Hypercar)</th>
                  </tr>
                </thead>
                <tbody>
                  {season.races.map((raceItem, rIdx) => (
                    <tr key={rIdx}>
                      <td className={styles.raceNameCell}>
                        <strong>{raceItem.race}</strong>
                      </td>
                      <td className={styles.overallWinnerCell}>
                        <span className={styles.overallCarBadge}>
                          {raceItem.overallWinner.car}
                        </span>
                        <div className={styles.winnerTeamName}>
                          {raceItem.overallWinner.team}
                        </div>
                      </td>
                      <td className={styles.driversCell}>
                        {raceItem.overallWinner.drivers.join(", ") || "—"}
                      </td>
                      <td className={styles.classWinnersCell}>
                        <div className={styles.classPillList}>
                          {raceItem.classWinners.map((cw, cIdx) => (
                            <span key={cIdx} className={styles.classWinnerPill}>
                              <strong>{cw.category}:</strong> {cw.team} (
                              {cw.vehicle})
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* Historical Provenance Footnote */}
      <footer className={styles.panelFooter}>
        <p className={styles.provenanceText}>
          Source Provenance: {season.sourceProvenance}
        </p>
      </footer>
    </article>
  );
}
