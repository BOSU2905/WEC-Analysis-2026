export type VerificationStatus =
  | "verified"
  | "lead_investigated"
  | "unverified";

export interface PhotoCreditEntry {
  id: string;
  filename: string;
  assetPath: string;
  sectionUsed: string;
  isDisplayedInStory: boolean;
  category: "editorial" | "filmstrip";
  originalSourceUrl: string | null;
  sourcePageUrl?: string | null;
  photographer: string | null;
  copyrightHolder: string | null;
  licenseName: string;
  licenseUrl: string | null;
  verificationStatus: VerificationStatus;
  statusLabel: string;
  evidenceNotes: string;
  replacementOrPermissionNeeded: boolean;
  thumbnailSrc?: string;
}

// Imports for thumbnail previews in the credits modal
import contrastImg from "../assets/editorial/gt-prototype-contrast.jpg";
import toyotaImg from "../assets/editorial/toyota-ts050.jpg";
import armadaImg from "../assets/editorial/aston-martin-armada.jpg";
import scaleGridImg from "../assets/editorial/scale-grid.jpg";
import multiclassImg from "../assets/editorial/multiclass-silverstone.jpg";
import loneStarImg from "../assets/editorial/lone-star-le-mans-start.jpg";
import wecStartingGridImg from "../assets/editorial/wec-starting-grid.webp";
import wecPitOperationsImg from "../assets/editorial/wec-pit-operations.webp";

import film01 from "../assets/filmstrip/01.webp";
import film02 from "../assets/filmstrip/02.webp";
import film03 from "../assets/filmstrip/03.webp";
import film04 from "../assets/filmstrip/04.webp";
import film05 from "../assets/filmstrip/05.webp";
import film06 from "../assets/filmstrip/06.webp";
import film07 from "../assets/filmstrip/07.webp";
import film08 from "../assets/filmstrip/08.webp";

export const PHOTO_CREDITS: PhotoCreditEntry[] = [
  // ─── CHAPTER 00: UNDERSTANDING WEC ───────────────────────────────────────
  {
    id: "wec-starting-grid",
    filename: "wec-starting-grid.webp",
    assetPath: "src/assets/editorial/wec-starting-grid.webp",
    sectionUsed: "Chapter 00 (Understanding WEC — Grid)",
    isDisplayedInStory: true,
    category: "editorial",
    originalSourceUrl:
      "https://upload.wikimedia.org/wikipedia/commons/3/3b/2020_24_Hours_of_Le_Mans_starting_grid.jpg",
    sourcePageUrl:
      "https://commons.wikimedia.org/wiki/File:2020_24_Hours_of_Le_Mans_starting_grid.jpg",
    photographer: "United Autosports",
    copyrightHolder: "United Autosports",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
    verificationStatus: "verified",
    statusLabel: "Verified (Open License)",
    evidenceNotes:
      "Confirmed match on Wikimedia Commons and Flickr (photo ID: 50360352512). Depicts the multiclass starting grid lined up on the pit straight at the 2020 24 Hours of Le Mans. Released by United Autosports under Creative Commons Attribution-ShareAlike 2.0 Generic.",
    replacementOrPermissionNeeded: false,
    thumbnailSrc: wecStartingGridImg,
  },
  {
    id: "wec-pit-operations",
    filename: "wec-pit-operations.webp",
    assetPath: "src/assets/editorial/wec-pit-operations.webp",
    sectionUsed: "Chapter 00 (Understanding WEC — Pit Operations)",
    isDisplayedInStory: true,
    category: "editorial",
    originalSourceUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/99/United-autosports-le-mans-race-053.jpg",
    sourcePageUrl:
      "https://commons.wikimedia.org/wiki/File:United-autosports-le-mans-race-053.jpg",
    photographer: "United Autosports",
    copyrightHolder: "United Autosports",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
    verificationStatus: "verified",
    statusLabel: "Verified (Open License)",
    evidenceNotes:
      "Confirmed match on Wikimedia Commons and Flickr (photo ID: 48083818328). Authentic documentary photograph of United Autosports pit crew servicing a prototype during the 2019 24 Hours of Le Mans race. Released by United Autosports under CC BY-SA 2.0.",
    replacementOrPermissionNeeded: false,
    thumbnailSrc: wecPitOperationsImg,
  },

  // ─── CHAPTER 01: THE ANATOMY ─────────────────────────────────────────────
  {
    id: "scale-grid",
    filename: "scale-grid.jpg",
    assetPath: "src/assets/editorial/scale-grid.jpg",
    sectionUsed: "Chapter 01 (The Anatomy)",
    isDisplayedInStory: true,
    category: "editorial",
    originalSourceUrl:
      "https://commons.wikimedia.org/wiki/File:2012_WEC_6_Hours_of_Fuji_opening_lap.jpg",
    sourcePageUrl:
      "https://commons.wikimedia.org/wiki/File:2012_WEC_6_Hours_of_Fuji_opening_lap.jpg",
    photographer: "Morio (Wikimedia Commons User:Morio)",
    copyrightHolder: "Morio",
    licenseName: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    verificationStatus: "verified",
    statusLabel: "Verified (Open License)",
    evidenceNotes:
      "Confirmed match on Wikimedia Commons. Depicts the opening lap of the 2012 WEC 6 Hours of Fuji. Direct author upload under Creative Commons Attribution-ShareAlike 3.0 Unported.",
    replacementOrPermissionNeeded: false,
    thumbnailSrc: scaleGridImg,
  },
  {
    id: "multiclass-silverstone",
    filename: "multiclass-silverstone.jpg",
    assetPath: "src/assets/editorial/multiclass-silverstone.jpg",
    sectionUsed: "Chapter 01 (The Anatomy)",
    isDisplayedInStory: true,
    category: "editorial",
    originalSourceUrl:
      "https://commons.wikimedia.org/wiki/File:BMW_M8_GTE_and_TDS_Racing_Oreca_07_at_Luffield_Silverstone_2018.jpg",
    sourcePageUrl:
      "https://commons.wikimedia.org/wiki/File:BMW_M8_GTE_and_TDS_Racing_Oreca_07_at_Luffield_Silverstone_2018.jpg",
    photographer: "John Chapman (Wikimedia Commons User:Pyrope)",
    copyrightHolder: "John Chapman",
    licenseName: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    verificationStatus: "verified",
    statusLabel: "Verified (Open License)",
    evidenceNotes:
      "Confirmed match on Wikimedia Commons. Depicts BMW M8 GTE (#82) and TDS Racing Oreca 07 (#28) navigating Luffield at the 2018 6 Hours of Silverstone. Uploaded directly by the photographer under CC BY-SA 4.0.",
    replacementOrPermissionNeeded: false,
    thumbnailSrc: multiclassImg,
  },
  {
    id: "gt-prototype-contrast",
    filename: "gt-prototype-contrast.jpg",
    assetPath: "src/assets/editorial/gt-prototype-contrast.jpg",
    sectionUsed: "Chapter 01 (The Anatomy)",
    isDisplayedInStory: true,
    category: "editorial",
    originalSourceUrl:
      "https://commons.wikimedia.org/wiki/File:Oreca_07_-_David_Heinemeier-Hansson,_Fabio_Scherer_%26_Pietro_Fittipaldi_in_the_Esses_at_the_2022_Le_Mans_(53514707676).jpg",
    sourcePageUrl: "https://www.flickr.com/photos/62983535@N06/53514707676",
    photographer: "Martin Lee (London, UK / Flickr User 62983535@N06)",
    copyrightHolder: "Martin Lee",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
    verificationStatus: "verified",
    statusLabel: "Verified (Open License)",
    evidenceNotes:
      "Confirmed match sourced from Flickr via Wikimedia Commons. Shows Inter Europol Oreca 07 #43 in the Esses during the 2022 24 Hours of Le Mans. Licensed under CC BY-SA 2.0 Generic.",
    replacementOrPermissionNeeded: false,
    thumbnailSrc: contrastImg,
  },
  {
    id: "lone-star-le-mans-start",
    filename: "lone-star-le-mans-start.jpg",
    assetPath: "src/assets/editorial/lone-star-le-mans-start.jpg",
    sectionUsed: "Chapter 01 (The Anatomy)",
    isDisplayedInStory: true,
    category: "editorial",
    originalSourceUrl:
      "https://commons.wikimedia.org/wiki/File:2019%E2%80%9320_FIA_World_Endurance_Championship_-_2020_Lone_Star_Le_Mans_-_Circuit_of_the_Americas_-_Race_Start.jpg",
    sourcePageUrl:
      "https://www.flickr.com/photos/unitedautosports/49587658493/",
    photographer: "United Autosports",
    copyrightHolder: "United Autosports",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
    verificationStatus: "verified",
    statusLabel: "Verified (Open License)",
    evidenceNotes:
      "Confirmed match on Wikimedia Commons. Depicts the start of the 2020 Lone Star Le Mans at Circuit of the Americas. Published by racing team United Autosports to Flickr under CC BY-SA 2.0.",
    replacementOrPermissionNeeded: false,
    thumbnailSrc: loneStarImg,
  },

  // ─── CHAPTER 02: THE LAST MANUFACTURER STANDING ──────────────────────────
  {
    id: "toyota-ts050",
    filename: "toyota-ts050.jpg",
    assetPath: "src/assets/editorial/toyota-ts050.jpg",
    sectionUsed: "Chapter 02 (The Last Manufacturer Standing)",
    isDisplayedInStory: true,
    category: "editorial",
    originalSourceUrl:
      "https://commons.wikimedia.org/wiki/File:No._8_Toyota_TS050_Hybrid_-_2017_24_Hours_of_Le_Mans.jpg",
    sourcePageUrl: "https://www.flickr.com/photos/davehamster/35293291241",
    photographer: "David Merrett (Flickr davehamster)",
    copyrightHolder: "David Merrett",
    licenseName: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0",
    verificationStatus: "verified",
    statusLabel: "Verified (Open License)",
    evidenceNotes:
      "Confirmed match sourced from Flickr via Wikimedia Commons. Shows Toyota TS050 Hybrid #8 during the 2017 24 Hours of Le Mans. Licensed under CC BY 2.0 Generic.",
    replacementOrPermissionNeeded: false,
    thumbnailSrc: toyotaImg,
  },

  // ─── CHAPTER 03: THE ARMADA EFFECT ───────────────────────────────────────
  {
    id: "aston-martin-armada",
    filename: "aston-martin-armada.jpg",
    assetPath: "src/assets/editorial/aston-martin-armada.jpg",
    sectionUsed: "Chapter 03 (The Armada Effect)",
    isDisplayedInStory: true,
    category: "editorial",
    originalSourceUrl:
      "https://commons.wikimedia.org/wiki/File:TF_Sport_Aston_Martin_Vantage_GTE_Adam_Silverstone_2018_Club.jpg",
    sourcePageUrl:
      "https://commons.wikimedia.org/wiki/File:TF_Sport_Aston_Martin_Vantage_GTE_Adam_Silverstone_2018_Club.jpg",
    photographer: "John Chapman (Wikimedia Commons User:Pyrope)",
    copyrightHolder: "John Chapman",
    licenseName: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    verificationStatus: "verified",
    statusLabel: "Verified (Open License)",
    evidenceNotes:
      "Confirmed match on Wikimedia Commons. Depicts TF Sport Aston Martin Vantage GTE driven by Jonathan Adam at Club Corner during the 2018 6 Hours of Silverstone. Direct photographer upload under CC BY-SA 4.0.",
    replacementOrPermissionNeeded: false,
    thumbnailSrc: armadaImg,
  },

  // ─── HERO CINEMATIC FILMSTRIP (ALL 8 AUTHENTIC ASSETS) ───────────────────
  {
    id: "filmstrip-01",
    filename: "01.webp",
    assetPath: "src/assets/filmstrip/01.webp",
    sectionUsed: "Hero Component (Filmstrip Loop)",
    isDisplayedInStory: true,
    category: "filmstrip",
    originalSourceUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/ec/2020_24_Hours_of_Le_Mans_-_Race_Start.jpg",
    sourcePageUrl:
      "https://commons.wikimedia.org/wiki/File:2020_24_Hours_of_Le_Mans_-_Race_Start.jpg",
    photographer: "United Autosports",
    copyrightHolder: "United Autosports",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
    verificationStatus: "verified",
    statusLabel: "Verified (Open License)",
    evidenceNotes:
      "Confirmed match on Wikimedia Commons and Flickr (photo ID: 50360349882). Dramatic wide shot of the multiclass field led by the Rebellion R13 prototype accelerating down the Circuit de la Sarthe pit straight into the Dunlop Curve at the start of the 2020 24 Hours of Le Mans. Released by United Autosports under CC BY-SA 2.0.",
    replacementOrPermissionNeeded: false,
    thumbnailSrc: film01,
  },
  {
    id: "filmstrip-02",
    filename: "02.webp",
    assetPath: "src/assets/filmstrip/02.webp",
    sectionUsed: "Hero Component (Filmstrip Loop)",
    isDisplayedInStory: true,
    category: "filmstrip",
    originalSourceUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/96/Toyota_TS050_Alonso_Silverstone_2018_Village.jpg",
    sourcePageUrl:
      "https://commons.wikimedia.org/wiki/File:Toyota_TS050_Alonso_Silverstone_2018.jpg",
    photographer: "John Chapman (Wikimedia Commons User:Pyrope)",
    copyrightHolder: "John Chapman",
    licenseName: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    verificationStatus: "verified",
    statusLabel: "Verified (Open License)",
    evidenceNotes:
      "Confirmed match on Wikimedia Commons. Depicts Toyota Gazoo Racing TS050 Hybrid #8 driven by Fernando Alonso navigating Village corner during the 2018 6 Hours of Silverstone. Direct photographer upload under CC BY-SA 4.0.",
    replacementOrPermissionNeeded: false,
    thumbnailSrc: film02,
  },
  {
    id: "filmstrip-03",
    filename: "03.webp",
    assetPath: "src/assets/filmstrip/03.webp",
    sectionUsed: "Hero Component (Filmstrip Loop)",
    isDisplayedInStory: true,
    category: "filmstrip",
    originalSourceUrl:
      "https://upload.wikimedia.org/wikipedia/commons/d/da/Oak_Racing%27s_Morgan_Nissan_and_Toyota_Racing%27s_Toyota_TS030_Hybrid_%288669458258%29.jpg",
    sourcePageUrl:
      "https://commons.wikimedia.org/wiki/File:Oak_Racing%27s_Morgan_Nissan_and_Toyota_Racing%27s_Toyota_TS030_Hybrid_(8669458258).jpg",
    photographer: "David Merrett (Flickr davehamster)",
    copyrightHolder: "David Merrett",
    licenseName: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0",
    verificationStatus: "verified",
    statusLabel: "Verified (Open License)",
    evidenceNotes:
      "Confirmed match on Wikimedia Commons and Flickr (photo ID: 8669458258). High-intensity wheel-to-wheel combat showing Oak Racing Morgan-Nissan LMP2 battling nose-to-tail with factory Toyota TS030 Hybrid LMP1 at the 2013 6 Hours of Silverstone. Licensed under CC BY 2.0.",
    replacementOrPermissionNeeded: false,
    thumbnailSrc: film03,
  },
  {
    id: "filmstrip-04",
    filename: "04.webp",
    assetPath: "src/assets/filmstrip/04.webp",
    sectionUsed: "Hero Component (Filmstrip Loop)",
    isDisplayedInStory: true,
    category: "filmstrip",
    originalSourceUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/b2/2013_24_Hours_of_Le_Mans_5585_%289120999792%29.jpg",
    sourcePageUrl:
      "https://commons.wikimedia.org/wiki/File:2013_24_Hours_of_Le_Mans_5585_(9120999792).jpg",
    photographer: "David Merrett (Flickr davehamster)",
    copyrightHolder: "David Merrett",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
    verificationStatus: "verified",
    statusLabel: "Verified (Open License)",
    evidenceNotes:
      "Confirmed match on Wikimedia Commons and Flickr (photo ID: 9120999792). Multiclass overtaking action showing Morand Racing Morgan LMP2 #43 aggressively overtaking AF Corse Ferrari 458 Italia GTE #61 during the 2013 24 Hours of Le Mans. Licensed under CC BY-SA 2.0.",
    replacementOrPermissionNeeded: false,
    thumbnailSrc: film04,
  },
  {
    id: "filmstrip-05",
    filename: "05.webp",
    assetPath: "src/assets/filmstrip/05.webp",
    sectionUsed: "Hero Component (Filmstrip Loop)",
    isDisplayedInStory: true,
    category: "filmstrip",
    originalSourceUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/ec/Car_Guy_Racing%27s_Ferrari_488_GTE_about_to_be_overtaken_by_Porsche_GT_Team%27s_Porsche_911_RSR_%2848127003662%29.jpg",
    sourcePageUrl:
      "https://commons.wikimedia.org/wiki/File:Car_Guy_Racing%27s_Ferrari_488_GTE_about_to_be_overtaken_by_Porsche_GT_Team%27s_Porsche_911_RSR_(48127003662).jpg",
    photographer: "David Merrett (Flickr davehamster)",
    copyrightHolder: "David Merrett",
    licenseName: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0",
    verificationStatus: "verified",
    statusLabel: "Verified (Open License)",
    evidenceNotes:
      "Confirmed match on Wikimedia Commons and Flickr (photo ID: 48127003662). Intense GT wheel-to-wheel pursuit showing Car Guy Racing Ferrari 488 GTE about to be overtaken by factory Porsche GT Team 911 RSR at the 2019 24 Hours of Le Mans. Licensed under CC BY 2.0.",
    replacementOrPermissionNeeded: false,
    thumbnailSrc: film05,
  },
  {
    id: "filmstrip-06",
    filename: "06.webp",
    assetPath: "src/assets/filmstrip/06.webp",
    sectionUsed: "Hero Component (Filmstrip Loop)",
    isDisplayedInStory: true,
    category: "filmstrip",
    originalSourceUrl:
      "https://upload.wikimedia.org/wikipedia/commons/d/dd/Porsche_Team_-_Porsche_919_Hybrid_-1_%2827191064873%29.jpg",
    sourcePageUrl:
      "https://commons.wikimedia.org/wiki/File:Porsche_Team_-_Porsche_919_Hybrid_-1_(27191064873).jpg",
    photographer: "Kevin Decherf",
    copyrightHolder: "Kevin Decherf",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
    verificationStatus: "verified",
    statusLabel: "Verified (Open License)",
    evidenceNotes:
      "Confirmed match on Wikimedia Commons and Flickr (photo ID: 27191064873). Dramatic night racing shot of Porsche Team Porsche 919 Hybrid #1 cutting through darkness with glowing headlights during the 2016 24 Hours of Le Mans. Licensed under CC BY-SA 2.0.",
    replacementOrPermissionNeeded: false,
    thumbnailSrc: film06,
  },
  {
    id: "filmstrip-07",
    filename: "07.webp",
    assetPath: "src/assets/filmstrip/07.webp",
    sectionUsed: "Hero Component (Filmstrip Loop)",
    isDisplayedInStory: true,
    category: "filmstrip",
    originalSourceUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/fd/United-autosports-le-mans-race-128.jpg",
    sourcePageUrl:
      "https://commons.wikimedia.org/wiki/File:United-autosports-le-mans-race-128.jpg",
    photographer: "United Autosports",
    copyrightHolder: "United Autosports",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
    verificationStatus: "verified",
    statusLabel: "Verified (Open License)",
    evidenceNotes:
      "Confirmed match on Wikimedia Commons and Flickr (photo ID: 48083861278). Authentic human-centered pit operations capture showing United Autosports pit crew performing rapid refuelling and tyre change choreography during the 2019 24 Hours of Le Mans. Licensed under CC BY-SA 2.0.",
    replacementOrPermissionNeeded: false,
    thumbnailSrc: film07,
  },
  {
    id: "filmstrip-08",
    filename: "08.webp",
    assetPath: "src/assets/filmstrip/08.webp",
    sectionUsed: "Hero Component (Filmstrip Loop)",
    isDisplayedInStory: true,
    category: "filmstrip",
    originalSourceUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/e8/WEC_2014_Silverstone_6_hrs_-_-8_Toyota_TS_040_LMP1_HY_-_Davidson_Lapiere_Buemi_%2813957909844%29.jpg",
    sourcePageUrl:
      "https://commons.wikimedia.org/wiki/File:WEC_2014_Silverstone_6_hrs_-_-8_Toyota_TS_040_LMP1_HY_-_Davidson_Lapiere_Buemi_(13957909844).jpg",
    photographer: "David Merrett (Flickr davehamster)",
    copyrightHolder: "David Merrett",
    licenseName: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0",
    verificationStatus: "verified",
    statusLabel: "Verified (Open License)",
    evidenceNotes:
      "Confirmed match on Wikimedia Commons and Flickr (photo ID: 13957909844). Extreme weather racing action showing Toyota TS040 Hybrid LMP1 #8 (Davidson/Lapierre/Buemi) powering through torrential rain and spray at the 2014 6 Hours of Silverstone. Licensed under CC BY 2.0.",
    replacementOrPermissionNeeded: false,
    thumbnailSrc: film08,
  },
];
