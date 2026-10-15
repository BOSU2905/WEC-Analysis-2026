import { useState, useRef, useEffect, useMemo } from "react";
import { m, useScroll, useTransform, useSpring } from "framer-motion";
import { TEAMS_HISTORY } from "../data/teams_history";
import type { SeasonHistory } from "../data/teams_history";
import styles from "./Teams.module.css";

// Stable content-weighted scroll geometry:
// Calculate duration for each season proportional to its visible editorial content
// (season heading/context, summary insight, primary featured car/team/record, and default champions)
const TOTAL_SEASONS = TEAMS_HISTORY.length; // 12
const TRANSITION_DISTANCE = 320; // Distance devoted to inter-season horizontal sliding

export default function Teams() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [activeSeasonIndex, setActiveSeasonIndex] = useState(0);
  const [expandedWinnersSeason, setExpandedWinnersSeason] = useState<string | null>(null);
  const [expandedRosterSeason, setExpandedRosterSeason] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(() =>
    typeof window !== "undefined" ? window.innerHeight : 900
  );

  // Check screen dimensions
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
      setViewportHeight(window.innerHeight);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Stable content-aware scroll budgets calculated deterministically per season
  // Each season's duration reflects its visible editorial content (races count, featured dynasties, and narrative summary)
  // Isolating layout expansions from the scroll progress calculation guarantees 100% stability.
  const { seasonMetrics, totalScrollDistance } = useMemo(() => {
    let cumulative = 0;
    const metrics: Array<{
      index: number;
      season: string;
      plateauStart: number;
      plateauEnd: number;
      plateauDuration: number;
      transitionEnd: number;
      totalEnd: number;
    }> = [];

    for (let i = 0; i < TOTAL_SEASONS; i++) {
      const s = TEAMS_HISTORY[i];
      // Content-proportional plateau duration:
      // Base plateau of 380px + 18px per race event + 25px per featured team
      const plateau = 380 + s.races.length * 18 + s.featuredTeams.length * 25;
      const plateauStart = cumulative;
      const plateauEnd = plateauStart + plateau;
      const isLast = i === TOTAL_SEASONS - 1;
      const transitionDist = isLast ? 0 : TRANSITION_DISTANCE;
      const transitionEnd = plateauEnd + transitionDist;
      cumulative = transitionEnd;

      metrics.push({
        index: i,
        season: s.season,
        plateauStart,
        plateauEnd,
        plateauDuration: plateau,
        transitionEnd,
        totalEnd: transitionEnd,
      });
    }

    return {
      seasonMetrics: metrics,
      totalScrollDistance: Math.max(1, cumulative),
    };
  }, []);

  // Total container height on desktop accommodates content-aware vertical runway
  const desktopContainerHeight = totalScrollDistance + viewportHeight;

  // Scroll mapping for desktop vertical-to-horizontal scrollytelling
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Responsive spring with optimal damping: instant reaction, no lag, zero oscillation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 350,
    damping: 36,
    restDelta: 0.0001,
  });

  // Continuous horizontal translation with locked resting plateaus:
  // While inside a season's resting plateau [plateauStart, plateauEnd],
  // xTranslate is locked at EXACTLY -${i * 100}vw (zero drift when accordions open/close).
  // Between plateauEnd and next season's plateauStart, it smoothly slides with smoothstep easing.
  const xTranslate = useTransform(smoothProgress, (progressVal: number) => {
    const clampedProgress = Math.min(1, Math.max(0, progressVal));
    const currentY = clampedProgress * totalScrollDistance;

    // Before first season plateau end, stay at season 0
    if (currentY <= seasonMetrics[0].plateauEnd) {
      return "0vw";
    }

    // At or after last season plateau start, stay at last season
    const lastSeason = seasonMetrics[TOTAL_SEASONS - 1];
    if (currentY >= lastSeason.plateauStart) {
      return `-${(TOTAL_SEASONS - 1) * 100}vw`;
    }

    // Check each season's plateau and transition
    for (let i = 0; i < TOTAL_SEASONS; i++) {
      const metric = seasonMetrics[i];
      // Resting plateau: Locked firmly on season i
      if (currentY >= metric.plateauStart && currentY <= metric.plateauEnd) {
        return `-${i * 100}vw`;
      }

      // Transition zone between season i and season i+1
      if (
        i < TOTAL_SEASONS - 1 &&
        currentY > metric.plateauEnd &&
        currentY < seasonMetrics[i + 1].plateauStart
      ) {
        const nextStart = seasonMetrics[i + 1].plateauStart;
        const u = (currentY - metric.plateauEnd) / (nextStart - metric.plateauEnd);
        // C1 smoothstep easing: derivative is 0 at both ends
        const easedU = u * u * (3 - 2 * u);
        const continuousIndex = i + easedU;
        return `-${continuousIndex * 100}vw`;
      }
    }

    return "0vw";
  });

  // Synchronize active season index with scroll position
  useEffect(() => {
    if (isMobile) return;
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const currentY = Math.min(1, Math.max(0, latest)) * totalScrollDistance;
      let bestIndex = 0;
      for (let i = 0; i < TOTAL_SEASONS; i++) {
        const metric = seasonMetrics[i];
        const nextMetric = seasonMetrics[i + 1];
        const boundary = nextMetric
          ? (metric.plateauEnd + nextMetric.plateauStart) / 2
          : metric.totalEnd;
        if (currentY <= boundary) {
          bestIndex = i;
          break;
        }
      }
      if (bestIndex !== activeSeasonIndex) {
        setActiveSeasonIndex(bestIndex);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, activeSeasonIndex, isMobile, totalScrollDistance, seasonMetrics]);

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
    const targetY = seasonMetrics[index].plateauStart + 60; // resting comfortably inside the plateau
    const containerTop = containerRef.current.offsetTop;
    const targetScrollY = containerTop + targetY;
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
        // Dynamic content-aware height: Base approximately 650px per collapsed season, with expanded bonuses for race winners & rosters
        height: isMobile ? "auto" : `${desktopContainerHeight}px`,
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
                  title={`${seasonItem.label}: ${seasonItem.dominantManufacturer}`}
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
              : `View Season Race Winners (${season.races.length} Races): Overall & Class`}
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
                        {raceItem.overallWinner.drivers.join(", ") || "–"}
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
