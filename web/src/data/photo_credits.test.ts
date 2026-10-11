import { describe, it, expect } from "vitest";
import { PHOTO_CREDITS, type PhotoCreditEntry } from "./photo_credits";

describe("PHOTO_CREDITS Manifest Integrity & Attribution Verification", () => {
  it("contains exactly 16 verified photographic assets outside Archives", () => {
    expect(PHOTO_CREDITS).toHaveLength(16);
  });

  it("every entry contains all required schema fields with valid types", () => {
    PHOTO_CREDITS.forEach((entry: PhotoCreditEntry) => {
      expect(entry.id).toBeTruthy();
      expect(entry.filename).toBeTruthy();
      expect(entry.assetPath).toBeTruthy();
      expect(entry.sectionUsed).toBeTruthy();
      expect(typeof entry.isDisplayedInStory).toBe("boolean");
      expect(["editorial", "filmstrip"]).toContain(entry.category);
      expect(["verified", "lead_investigated", "unverified"]).toContain(
        entry.verificationStatus,
      );
      expect(entry.statusLabel).toBeTruthy();
      expect(entry.evidenceNotes).toBeTruthy();
      expect(typeof entry.replacementOrPermissionNeeded).toBe("boolean");
      expect(entry.licenseName).toBeTruthy();
      expect(entry.thumbnailSrc).toBeTruthy();
    });
  });

  it("all 16 assets are active in the editorial documentary narrative", () => {
    const activePhotos = PHOTO_CREDITS.filter((e) => e.isDisplayedInStory);
    expect(activePhotos).toHaveLength(16);

    const editorialPhotos = PHOTO_CREDITS.filter((e) => e.category === "editorial");
    const filmstripPhotos = PHOTO_CREDITS.filter((e) => e.category === "filmstrip");

    expect(editorialPhotos).toHaveLength(8);
    expect(filmstripPhotos).toHaveLength(8);
  });

  it("100% of photographic assets have verified open Creative Commons licenses", () => {
    const verifiedPhotos = PHOTO_CREDITS.filter(
      (e) => e.verificationStatus === "verified",
    );
    expect(verifiedPhotos).toHaveLength(16);

    verifiedPhotos.forEach((e) => {
      expect(e.originalSourceUrl).toMatch(/^https:\/\//);
      expect(e.sourcePageUrl).toMatch(/^https:\/\//);
      expect(e.licenseUrl).toMatch(/^https:\/\//);
      expect(e.licenseName).toMatch(/^CC (BY|BY-SA)/);
      expect(e.photographer).toBeTruthy();
      expect(e.copyrightHolder).toBeTruthy();
      expect(e.replacementOrPermissionNeeded).toBe(false);
    });
  });

  it("zero synthetic placeholders or unverified assets remain in the website", () => {
    const unverifiedOrPlaceholder = PHOTO_CREDITS.filter(
      (e) =>
        e.verificationStatus === "unverified" ||
        e.licenseName.toLowerCase().includes("synthetic") ||
        e.replacementOrPermissionNeeded === true,
    );
    expect(unverifiedOrPlaceholder).toHaveLength(0);
  });
});
