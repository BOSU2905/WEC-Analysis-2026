import { describe, it, expect } from "vitest";
import { TEAMS_HISTORY } from "./teams_history";

describe("Historical Matrix & Teams Data Integrity", () => {
  it("contains all 12 consecutive seasons from 2011 to 2023", () => {
    expect(TEAMS_HISTORY.length).toBe(12);
    const expectedSeasons = [
      "2011",
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018-2019",
      "2019-2020",
      "2021",
      "2022",
      "2023",
    ];
    const actualSeasons = TEAMS_HISTORY.map((s) => s.season);
    expect(actualSeasons).toEqual(expectedSeasons);
  });

  it("strictly labels 2011 as ILMC / Pre-WEC predecessor season", () => {
    const s2011 = TEAMS_HISTORY.find((s) => s.season === "2011")!;
    expect(s2011.era).toBe("ILMC Era");
    expect(s2011.seriesContext).toContain("Intercontinental Le Mans Cup");
    const overallChamp = s2011.champions.find((c) => c.category === "Overall / Top Class")!;
    expect(overallChamp.note).toContain("FIA WEC was inaugurated in 2012");
  });

  it("verifies Hypercar inauguration in 2021 and class retirements", () => {
    const s2021 = TEAMS_HISTORY.find((s) => s.season === "2021")!;
    expect(s2021.era).toBe("Hypercar Era");
    expect(s2021.featuredTeams[0].category).toBe("Hypercar");

    const s2022 = TEAMS_HISTORY.find((s) => s.season === "2022")!;
    const gtePro2022 = s2022.champions.find((c) => c.category === "LMGTE Pro");
    expect(gtePro2022).toBeDefined();
    expect(gtePro2022?.note).toContain("Final LMGTE Pro");

    const s2023 = TEAMS_HISTORY.find((s) => s.season === "2023")!;
    const gtePro2023 = s2023.champions.find((c) => c.category === "LMGTE Pro");
    expect(gtePro2023).toBeUndefined(); // LMGTE Pro was retired after 2022

    const gteAm2023 = s2023.champions.find((c) => c.category === "LMGTE Am");
    expect(gteAm2023).toBeDefined(); // Final year of LMGTE Am

    // Ensure LMGT3 is NOT an active racing class in 2023 (it began in 2024)
    const hasLmgt3Category =
      s2023.champions.some((c) => c.category.toUpperCase().includes("LMGT3")) ||
      s2023.races.some((r) => r.classWinners.some((cw) => cw.category.toUpperCase().includes("LMGT3")));
    expect(hasLmgt3Category).toBe(false);
  });

  it("ensures every season has verified race winners and driver rosters", () => {
    TEAMS_HISTORY.forEach((season) => {
      expect(season.races.length).toBeGreaterThan(0);
      season.races.forEach((race) => {
        expect(race.race).toBeTruthy();
        expect(race.overallWinner.team).toBeTruthy();
        expect(race.overallWinner.vehicle).toBeTruthy();
        expect(race.overallWinner.drivers.length).toBeGreaterThan(0);
      });
    });
  });
});
