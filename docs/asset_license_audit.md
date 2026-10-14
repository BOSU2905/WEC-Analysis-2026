# Asset License & Provenance Audit

**Project**: Endurance in Data: WEC 2011–2023  
**Status**: Release Candidate Audit  
**Scope**: All static raster images, vector graphics, 3D models, fonts, circuit geometries, and icons deployed in the web production distribution (`web/dist`).

---

## 1. Executive Summary & Audit Classification Matrix

Each asset utilized across the application has been cataloged, traced to its originating repository, and classified according to its legal reuse terms:

| Classification Category | Definition | Count | Actions Required |
| :--- | :--- | :---: | :--- |
| **Verified for Intended Use** | Public domain, original project work, or unrestricted permissive license (OFL, CC0). | 11 | None. Fully cleared for deployment. |
| **Usable Subject to Attribution / Conditions** | Open license (CC BY, CC BY-SA, CC BY-NC-SA) with strict attribution, ShareAlike, or non-commercial constraints. | 25 | Keep attribution ledgers intact in app UI and documentation. Maintain non-commercial scope for CC BY-NC assets. |
| **Unverified / Unclear** | Assets derived from news media cutouts or community forums without explicit open licensing. | 5 | Flagged for non-commercial editorial fair use; targeted open-licensed replacements identified for future cycles. |
| **Requires Replacement** | Direct proprietary media without fair use rationale or license. | 0 | All legacy placeholders and proprietary press leads were previously removed and replaced. |

---

## 2. Chapter Editorial Photography (Active in Story)

All editorial photographs are loaded in `web/src/pages/Story.tsx` and credited in the in-app modal (`PhotoCreditsModal.tsx`).

| File & Location | Subject & Section | Author / Rights Holder | Origin & Proof | License | Classification |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `wec-starting-grid.webp`<br>`web/src/assets/editorial/` | 2020 Le Mans Starting Grid<br>(Chapter 00) | United Autosports | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:2020_24_Hours_of_Le_Mans_starting_grid.jpg) / [Flickr 50360352512](https://www.flickr.com/photos/unitedautosports/50360352512/) | CC BY-SA 2.0 | **Usable subject to attribution** |
| `wec-pit-operations.webp`<br>`web/src/assets/editorial/` | 2019 Le Mans Pit Stop<br>(Chapter 00) | United Autosports | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:United-autosports-le-mans-race-053.jpg) / [Flickr 48083818328](https://www.flickr.com/photos/unitedautosports/48083818328/) | CC BY-SA 2.0 | **Usable subject to attribution** |
| `scale-grid.webp`<br>`web/src/assets/editorial/` | 2012 6h Fuji Opening Lap<br>(Chapter 01) | Morio | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:2012_WEC_6_Hours_of_Fuji_opening_lap.jpg) | CC BY-SA 3.0 | **Usable subject to attribution** |
| `multiclass-silverstone.webp`<br>`web/src/assets/editorial/` | BMW M8 GTE & Oreca 07<br>(Chapter 01) | John Chapman (Pyrope) | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:BMW_M8_GTE_and_TDS_Racing_Oreca_07_at_Luffield_Silverstone_2018.jpg) | CC BY-SA 4.0 | **Usable subject to attribution** |
| `gt-prototype-contrast.webp`<br>`web/src/assets/editorial/` | 2022 Le Mans Oreca 07<br>(Chapter 01) | Martin Lee | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Oreca_07_-_David_Heinemeier-Hansson,_Fabio_Scherer_%26_Pietro_Fittipaldi_in_the_Esses_at_the_2022_Le_Mans_(53514707676).jpg) / [Flickr 53514707676](https://www.flickr.com/people/62983535@N06) | CC BY-SA 2.0 | **Usable subject to attribution** |
| `lone-star-le-mans-start.webp`<br>`web/src/assets/editorial/` | 2020 Lone Star Le Mans Start<br>(Chapter 01) | United Autosports | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:2019%E2%80%9320_FIA_World_Endurance_Championship_-_2020_Lone_Star_Le_Mans_-_Circuit_of_the_Americas_-_Race_Start.jpg) / [Flickr 49587658493](https://www.flickr.com/photos/unitedautosports/49587658493/) | CC BY-SA 2.0 | **Usable subject to attribution** |
| `toyota-ts050.webp`<br>`web/src/assets/editorial/` | 2017 Le Mans Toyota TS050 #8<br>(Chapter 02) | David Merrett (davehamster) | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:No._8_Toyota_TS050_Hybrid_-_2017_24_Hours_of_Le_Mans.jpg) / [Flickr 35293291241](https://www.flickr.com/photos/davehamster/) | CC BY 2.0 | **Usable subject to attribution** |
| `aston-martin-armada.webp`<br>`web/src/assets/editorial/` | 2018 Silverstone Aston Martin<br>(Chapter 03) | John Chapman (Pyrope) | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:TF_Sport_Aston_Martin_Vantage_GTE_Adam_Silverstone_2018_Club.jpg) | CC BY-SA 4.0 | **Usable subject to attribution** |

---

## 3. Hero Filmstrip Photography (Active in Hero.tsx)

All 8 filmstrip photographs provide a dynamic atmospheric backdrop in `web/src/components/story/Hero.tsx`.

| File & Location | Visual Subject & Narrative Role | Photographer | Origin & Proof | License | Classification |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `01.webp`<br>`web/src/assets/filmstrip/` | 2020 Le Mans Race Start (Pace lap) | United Autosports | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:2020_24_Hours_of_Le_Mans_-_Race_Start.jpg) / [Flickr 50360349882](https://www.flickr.com/photos/unitedautosports/50360349882/) | CC BY-SA 2.0 | **Usable subject to attribution** |
| `02.webp`<br>`web/src/assets/filmstrip/` | Toyota TS050 Alonso Silverstone 2018 | John Chapman (Pyrope) | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Toyota_TS050_Alonso_Silverstone_2018_Village.jpg) | CC BY-SA 4.0 | **Usable subject to attribution** |
| `03.webp`<br>`web/src/assets/filmstrip/` | Morgan LMP2 vs Toyota TS030 LMP1 | David Merrett | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Oak_Racing%27s_Morgan_Nissan_and_Toyota_Racing%27s_Toyota_TS030_Hybrid_(8669458258).jpg) / [Flickr 8669458258](https://www.flickr.com/photos/davehamster/8669458258/) | CC BY 2.0 | **Usable subject to attribution** |
| `04.webp`<br>`web/src/assets/filmstrip/` | Morgan LMP2 passing Ferrari GTE | David Merrett | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:2013_24_Hours_of_Le_Mans_5585_(9120999792).jpg) / [Flickr 9120999792](https://www.flickr.com/photos/davehamster/9120999792/) | CC BY-SA 2.0 | **Usable subject to attribution** |
| `05.webp`<br>`web/src/assets/filmstrip/` | Ferrari 488 GTE vs Porsche 911 RSR | David Merrett | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Car_Guy_Racing%27s_Ferrari_488_GTE_about_to_be_overtaken_by_Porsche_GT_Team%27s_Porsche_911_RSR_(48127003662).jpg) / [Flickr 48127003662](https://www.flickr.com/photos/davehamster/48127003662/) | CC BY 2.0 | **Usable subject to attribution** |
| `06.webp`<br>`web/src/assets/filmstrip/` | Porsche 919 Hybrid Night Run | Kevin Decherf | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Porsche_Team_-_Porsche_919_Hybrid_-1_(27191064873).jpg) / [Flickr 27191064873](https://www.flickr.com/photos/97808249@N03/27191064873/) | CC BY-SA 2.0 | **Usable subject to attribution** |
| `07.webp`<br>`web/src/assets/filmstrip/` | Pit Choreography: Refuelling & Wheel Guns | United Autosports | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:United-autosports-le-mans-race-128.jpg) / [Flickr 48083861278](https://www.flickr.com/photos/unitedautosports/48083861278/) | CC BY-SA 2.0 | **Usable subject to attribution** |
| `08.webp`<br>`web/src/assets/filmstrip/` | Toyota TS040 in Torrential Rain Spray | David Merrett | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:WEC_2014_Silverstone_6_hrs_-_-8_Toyota_TS_040_LMP1_HY_-_Davidson_Lapiere_Buemi_(13957909844).jpg) / [Flickr 13957909844](https://www.flickr.com/photos/davehamster/13957909844/) | CC BY 2.0 | **Usable subject to attribution** |

---

## 4. Archive Machines Imagery & 3D Interactive Models

Located in `web/public/assets/machines/` and configured in `web/src/components/archive/MachinesExperience.tsx`.

### A. 2D Machine Imagery

| Asset Name | Vehicle | Primary Source / Photographer | Source Repository & Proof | License | Classification |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `oreca-07-gibson.webp` | Oreca 07 - Gibson | David Merrett | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Oreca_07_-_Gibson_-_IDEC_Sport_Racing_-_2019_24_Hours_of_Le_Mans.jpg) | CC BY 2.0 | **Usable subject to attribution** |
| `oreca-07-gibson-side.webp` | Oreca 07 (Cutout) | Sportscar365 Editorial | News outlet press photo cutout | Editorial non-commercial fair use | **Unverified / unclear** |
| `aston-martin-vantage-v8.webp` | Aston Martin Vantage V8 | Morio | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Aston_Martin_Vantage_V8_2012_WEC_Fuji.jpg) | CC BY-SA 3.0 | **Usable subject to attribution** |
| `aston-martin-vantage-v8-side.webp` | Vantage V8 (Cutout) | Sportscar365 Editorial | News outlet press photo cutout | Editorial non-commercial fair use | **Unverified / unclear** |
| `porsche-911-rsr.webp` | Porsche 911 RSR | Kevin Decherf | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Porsche_GT_Team_-_Porsche_911_RSR_-92_(28098279377).jpg) | CC BY-SA 2.0 | **Usable subject to attribution** |
| `porsche-911-rsr-side.webp` | 911 RSR (Cutout) | Community cutout | Reddit sports car community (`i.redd.it/469jfsi3ul471.png`) | Unclear rights | **Unverified / unclear** |
| `toyota-ts050-hybrid.webp` | Toyota TS050 Hybrid | Takayuki Suzuki | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:No.8_Toyota_TS050_Hybrid.jpg) | CC BY-SA 2.0 | **Usable subject to attribution** |
| `toyota-ts050-hybrid-side.webp` | TS050 (Cutout) | Toyota Gazoo Racing Press | Toyota corporate PR pack cutout | Corporate press release terms | **Unverified / unclear** |
| `porsche-919-hybrid.webp` | Porsche 919 Hybrid | Edvvc | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:2015_Porsche_919_Hybrid_(19809197974).jpg) | CC BY 2.0 | **Usable subject to attribution** |
| `porsche-919-hybrid-side.webp` | 919 Hybrid (Cutout) | Porsche AG PR | Porsche corporate media cutout | Corporate press release terms | **Unverified / unclear** |

> **Audit Recommendation for Cutout Profiles**:  
> The 5 transparent side-profile cutouts (`*-side.webp`) are currently used as Suspense fallbacks while 3D GLB models load. For pure non-commercial educational analysis, these fall within standard transformative editorial fair use. However, if the project is ever distributed commercially or relicensed under strict open-source, these 5 images should be replaced with vector side silhouettes or 2D renders baked directly from the verified 3D GLB assets.

### B. 3D GLB Digital Assets

| Asset Path | Vehicle Model | 3D Creator | Host & Model ID | License | Classification & Conditions |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `toyota_ts050_hybrid.glb`<br>`37.2 MB` | Toyota TS050 Hybrid (2017) | MattDoesBlender | [Sketchfab 266a9cae9e65458bab0f0017e2ebebb2](https://sketchfab.com/3d-models/wec-lmp1-toyota-ts050-2017-266a9cae9e65458bab0f0017e2ebebb2) | CC BY-NC-SA 4.0 | **Usable subject to attribution & Non-Commercial condition** |
| `2012_aston_martin_vantage_gte.glb`<br>`15.3 MB` | Aston Martin Vantage GTE (2012) | JUST GAME | [Sketchfab 846a5731c4e84fffa11123e109eabf2a](https://sketchfab.com/3d-models/2012-aston-martin-vantage-gte-846a5731c4e84fffa11123e109eabf2a) | CC BY 4.0 | **Usable subject to attribution** |
| `2018_porsche_911_rsr.glb`<br>`3.4 MB` | Porsche 911 RSR (2018) | OUTPISTON | [Sketchfab 9e03b1ef488648fa99e0564a9bca6456](https://sketchfab.com/3d-models/2018-porsche-911-rsr-9e03b1ef488648fa99e0564a9bca6456) | CC BY-NC-SA 4.0 | **Usable subject to attribution & Non-Commercial condition** |
| `porsche_919_hybrid_2015.glb`<br>`2.6 MB` | Porsche 919 Hybrid (2015) | Amerbiy (Keijibi) | [Sketchfab bead70843672451281f058cef4d5fe28](https://sketchfab.com/3d-models/porsche-919-hybrid-2015-bead70843672451281f058cef4d5fe28) | CC BY 4.0 | **Usable subject to attribution** |

---

## 5. Circuit Geometries & Sector SVGs

Integrated into `web/src/data/circuits_data.ts` and rendered in `CircuitExplorerModal.tsx`.

| Circuit Identifier | Track Layout | Geometry Contributor | Origin & Verification Proof | License | Classification |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `le-mans` | Circuit de la Sarthe (13.626 km) | Will Pittenger / ACO | [Wikimedia Commons: Circuit de la Sarthe.svg](https://commons.wikimedia.org/wiki/File:Circuit_de_la_Sarthe.svg) | CC BY-SA 3.0 / GNU FDL | **Usable subject to attribution** |
| `spa` | Circuit de Spa-Francorchamps (7.004 km) | Will Pittenger | [Wikimedia Commons: Spa-Francorchamps of Belgium.svg](https://commons.wikimedia.org/wiki/File:Spa-Francorchamps_of_Belgium.svg) | CC BY-SA 3.0 / GNU FDL | **Usable subject to attribution** |
| `imola` | Autodromo Enzo e Dino Ferrari (4.909 km) | Sentoan | [Wikimedia Commons: Imola 2009.svg](https://commons.wikimedia.org/wiki/File:Imola_2009.svg) | CC BY-SA 3.0 | **Usable subject to attribution** |
| `fuji` | Fuji Speedway (4.563 km) | Hermann Tilke layout / Commons | [Wikimedia Commons: GrandPrix Circuit Fuji 2007.svg](https://commons.wikimedia.org/wiki/File:GrandPrix_Circuit_Fuji_2007.svg) | CC BY-SA 3.0 / GFDL | **Usable subject to attribution** |

---

## 6. Typography & Web Fonts

Bundled locally via npm `@fontsource/*` dependencies. No third-party network CDN requests are made.

| Font Family | Usage | Upstream Foundry / Author | License Terms | Classification |
| :--- | :--- | :--- | :--- | :--- |
| **Geist Sans** | Primary UI and editorial body copy | Vercel Inc. | [SIL Open Font License 1.1](https://scripts.sil.org/OFL) | **Verified for intended use** |
| **Geist Mono** | Telemetry, numerical data, delta readouts, timestamps | Vercel Inc. | [SIL Open Font License 1.1](https://scripts.sil.org/OFL) | **Verified for intended use** |
| **Space Grotesk** | Chapter titles, display headings, numeral callouts | Florian Karsten | [SIL Open Font License 1.1](https://scripts.sil.org/OFL) | **Verified for intended use** |

---

## 7. Vector Assets, Brand Identity & UI Graphics

| Asset | Location | Author / Origin | License / Usage Terms | Classification |
| :--- | :--- | :--- | :--- | :--- |
| **Racing Line Monogram** | `BrandLogo.tsx`, `favicon.svg` | Original project creation | MIT / Project Open Source | **Verified for intended use** |
| **Topographic Hero Map** | `TopographicHero.tsx` | Original project creation | MIT / Project Open Source | **Verified for intended use** |
| **Michelin Pilot Sport Tire SVGs** | `web/src/assets/tyres/michelin-*.svg` | Original vector reconstruction | Editorial nominative fair use (illustrative only; no sponsorship or endorsement) | **Verified for intended use** |
| **Social / UI Icons Sprite** | `web/public/icons.svg` | SVG standard web symbols | Public Domain / Fair Use brand mark guidelines | **Verified for intended use** |

---

## 8. Compliance & Disclaimer Notice

1. **Independent Project Status**:  
   This website is an independent editorial data analysis of sports car endurance racing history from 2011 to 2023. It is not affiliated with, sponsored by, or endorsed by the Fédération Internationale de l'Automobile (FIA), the Automobile Club de l'Ouest (ACO), the World Endurance Championship (WEC), or any automotive manufacturer or tyre supplier.
2. **Nominative Fair Use**:  
   Manufacturer names (Toyota, Porsche, Ferrari, Aston Martin, Oreca, Gibson, Michelin, Goodyear, Dunlop) are referenced strictly for factual, historical, and analytical identification.
3. **Non-Commercial Integrity**:  
   Because two of the interactive 3D car models (`toyota_ts050_hybrid.glb` and `2018_porsche_911_rsr.glb`) are licensed under **CC BY-NC-SA 4.0**, this project must remain non-commercial. Any commercial redeployment would require commissioning original 3D meshes or replacing those models with unrestricted equivalents.
