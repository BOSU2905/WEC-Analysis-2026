import { describe, it, expect } from "vitest";
import { CIRCUITS } from "./circuits_data";

describe("Circuits Dataset Integrity", () => {
  it("contains all 4 editorial circuits", () => {
    expect(CIRCUITS).toHaveLength(4);
    const ids = CIRCUITS.map((c) => c.id);
    expect(ids).toContain("le-mans");
    expect(ids).toContain("spa");
    expect(ids).toContain("imola");
    expect(ids).toContain("fuji");
  });

  it("assigns the verified country and flag to each track without subjective taglines", () => {
    const leMans = CIRCUITS.find((c) => c.id === "le-mans")!;
    const spa = CIRCUITS.find((c) => c.id === "spa")!;
    const imola = CIRCUITS.find((c) => c.id === "imola")!;
    const fuji = CIRCUITS.find((c) => c.id === "fuji")!;

    expect(leMans.country).toBe("France");
    expect(leMans.countryFlag).toBe("🇫🇷");
    expect(spa.country).toBe("Belgium");
    expect(spa.countryFlag).toBe("🇧🇪");
    expect(imola.country).toBe("Italy");
    expect(imola.countryFlag).toBe("🇮🇹");
    expect(fuji.country).toBe("Japan");
    expect(fuji.countryFlag).toBe("🇯🇵");

    // Subjective editorial taglines must not be present
    CIRCUITS.forEach((circuit: any) => {
      expect(circuit.editorialTheme).toBeUndefined();
    });
  });

  it("ensures Fuji Speedway SVG track silhouette has valid geometry within viewBox (regression test)", () => {
    const fuji = CIRCUITS.find((c) => c.id === "fuji")!;
    expect(fuji.trackPath).toBeTruthy();
    expect(fuji.viewBox).toBe("0 0 1400 480");

    // Must not start at negative coordinate (which caused the silhouette to clip outside viewport)
    expect(fuji.trackPath).not.toMatch(/^m\s*-\d+/i);
    expect(fuji.trackPath).toMatch(/^m\s*1315/i);

    // Verify all 4 circuits have positive, non-empty paths within their viewboxes
    CIRCUITS.forEach((circuit) => {
      expect(circuit.trackPath.length).toBeGreaterThan(100);
      expect(circuit.viewBox).toBeTruthy();
    });
  });

  it("has valid sector definitions (S1, S2, S3) with non-empty highlight paths for every circuit", () => {
    CIRCUITS.forEach((circuit) => {
      expect(circuit.sectors).toHaveLength(3);
      expect(circuit.sectors.map((s) => s.sector)).toEqual([1, 2, 3]);
      circuit.sectors.forEach((sec) => {
        expect(sec.name).toBeTruthy();
        expect(sec.description).toBeTruthy();
        expect(sec.highlightPath).toBeTruthy();
      });
    });
  });

  it("contains verified turn markers with valid coordinates and sector mappings", () => {
    CIRCUITS.forEach((circuit) => {
      expect(circuit.turns.length).toBeGreaterThanOrEqual(10);
      circuit.turns.forEach((turn) => {
        expect(turn.id).toBeTruthy();
        expect(turn.number).toBeTruthy();
        expect(turn.name).toBeTruthy();
        expect([1, 2, 3]).toContain(turn.sector);
        expect(typeof turn.x).toBe("number");
        expect(typeof turn.y).toBe("number");
        expect(turn.direction).toBeTruthy();
        expect(turn.enduranceImportance).toBeTruthy();
      });
    });
  });

  it("includes verified provenance metadata for each circuit", () => {
    CIRCUITS.forEach((circuit) => {
      expect(circuit.provenance.geometrySource).toBeTruthy();
      expect(circuit.provenance.geometrySourceUrl).toMatch(/^https?:\/\//);
      expect(circuit.provenance.configurationContext).toBeTruthy();
      expect(circuit.provenance.notes).toBeTruthy();
    });
  });
});
