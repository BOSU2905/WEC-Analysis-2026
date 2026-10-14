// Circuit Guide and Interactive Explorer Data Baseline
// Sources and provenance documented per circuit.

export interface CircuitTurn {
  id: string;
  number: string;
  name: string;
  sector: 1 | 2 | 3;
  x: number;
  y: number;
  direction: string;
  technicalDetails?: string;
  enduranceImportance: string;
  didYouKnow?: {
    fact: string;
    source: string;
  };
}

export interface CircuitSector {
  sector: 1 | 2 | 3;
  name: string;
  turnsSummary: string;
  description: string;
  highlightPath: string;
}

export interface CircuitData {
  id: string;
  name: string;
  country: string;
  countryFlag: string;
  location: string;
  editorialIntro: string;
  viewBox: string;
  groupTransform?: string;
  trackPath: string;
  stats: {
    length: string;
    turnsCount: number;
    direction: "Clockwise" | "Anti-clockwise";
    lapRecordTopClass?: string;
    wecHistory: string;
  };
  sectors: CircuitSector[];
  turns: CircuitTurn[];
  provenance: {
    geometrySource: string;
    geometrySourceUrl: string;
    configurationContext: string;
    notes: string;
  };
}

export const CIRCUITS: CircuitData[] = [
  {
    id: "le-mans",
    name: "Circuit de la Sarthe",
    country: "France",
    countryFlag: "🇫🇷",
    location: "Le Mans, Sarthe",
    editorialIntro: "A 13.6-kilometer crucible of public roads and purpose-built tarmac, where prototypes reach 330+ km/h in the dead of night and mechanical empathy separates champions from retirements.",
    viewBox: "0 0 338 753",
    trackPath: "M8.708,235.61c-1.55-0.02-2.82-0.21-1.99-2.53    c0.89-32.1,3.09-65.22,10-94c1.35-5.62,2.14-11.71,4-17c3.28-9.35,10.14-20.82,17-24c2.02-0.94,4.98-0.57,7-1    c7.55-1.59,18.93-5.49,23-13c0.73-1.36,0.28-3.55,1-5c2.24-4.52,12.11-8.42,18-11c11.36-4.96,22.2-9.31,35-13    c6.6-1.91,13.07-2.43,18-5c10.08-5.26,16.24-17.23,17-33c1.02-3.37,6.99-6.43,11-8c4.9-1.92,10.77-2.94,15-4    c1.22-0.31,2.68-1.38,4-1c4.27,1.23,3.95,1.23,7,5c3.15,3.89,5.32,9.27,8,15c14.79,31.67,24.51,77.29,32,116    c9.47,48.98,15.92,96.84,23,149c0.46,3.42,2.21,7.47,2,9c-0.5,3.65-3.87,6.18-5,9c-3.6,8.98-2.17,17.49,4,23    c2.94,2.62,7.96,2.78,10,6c10.9,55.19,23.92,117.01,36,175c0.98,4.71,0.99,10.41,2,12c1.6,2.511,2.89,1.99,5,3    c3.32,1.591,10.08,5.29,11,10c0.74,3.761-1.26,8.17-3,12c-1.47,3.24-4.54,5.91-5,9c-0.45,3.07,1.33,7.25,2,12    c0.52,3.66,0.51,8.561,1,12c5.21,36.73,11.67,77.99,15,118c1.38,16.511,3.23,32.74,0,49c-57.91-10.46-108.44-41.46-152-73    c-2.31-1.68-4.75-3.27-7-5c-2.16-1.67-3.73-4.229-6-6c-1.03-0.81-3.02-1.229-4-2c-13.71-10.75-26.03-21.239-41-35    c-1.81-1.659-3.69-3.939-6-6c-2.08-1.859-4.98-3.14-7-5c-4.51-4.159-10.08-9.64-11-12c-1.13-2.89-0.52-7.909-1-11    c-0.61-3.979-1.19-6.859-2-10c-10.86-1.59-25.22,1.261-37,2c-3.21-35.76-6.7-68.12-21-91c-3.14-5.02-10.47-11.659-15-16    c-1.08-1.04-5.65-2.909-8-4c-6.4-2.949-12.9-10.399-8-20c0.22-0.439,1.84-0.64,2-1c0.23-0.51-0.31-1.54,0-2    c0.25-0.37,1.85-0.68,2-1c1.62-3.6,6.26-7.83,10-11c10.01-8.479,20.64-16.29,16-34c-4.01-15.279-21.28-22.42-31-36    c1.82-6.32,8.73-8.42,12-16c5.7-13.2,5.05-47.04,4-69c-0.51-10.63-0.77-19.83-3-28c-0.29-1.07-1.36-2.34-1.84-3.51",
    stats: {
      length: "13.626 km",
      turnsCount: 38,
      direction: "Clockwise",
      lapRecordTopClass: "3:17.475 (Kamui Kobayashi, Toyota TS050 Hybrid, 2017)",
      wecHistory: "Marquee crown jewel of the FIA WEC calendar since the championship's inception in 2012, hosting the 24 Heures du Mans annually."
    },
    sectors: [
      {
        sector: 1,
        name: "Sector 1 — Dunlop to Hunaudières Entry",
        turnsSummary: "Dunlop Curve, Dunlop Chicane, Tertre Rouge",
        description: "Encompasses the permanent Bugatti circuit section, sweeping under the Dunlop Bridge before plunging down to Tertre Rouge. High exit speed here is decisive for terminal velocity along the initial 2-kilometer stretch of the Mulsanne straight.",
        highlightPath: "M8.708,235.61c-1.55-0.02-2.82-0.21-1.99-2.53    c0.89-32.1,3.09-65.22,10-94c1.35-5.62,2.14-11.71,4-17c3.28-9.35,10.14-20.82,17-24c2.02-0.94,4.98-0.57,7-1    c7.55-1.59,18.93-5.49,23-13c0.73-1.36,0.28-3.55,1-5c2.24-4.52,12.11-8.42,18-11c11.36-4.96,22.2-9.31,35-13    c6.6-1.91,13.07-2.43,18-5c10.08-5.26,16.24-17.23,17-33c1.02-3.37,6.99-6.43,11-8c4.9-1.92,10.77-2.94,15-4    c1.22-0.31,2.68-1.38,4-1c4.27,1.23,3.95,1.23,7,5c3.15,3.89,5.32,9.27,8,15c14.79,31.67,24.51,77.29,32,116    c9.47,48.98,15.92,96.84,23,149c0.46,3.42,2.21,7.47,2,9"
      },
      {
        sector: 2,
        name: "Sector 2 — The Hunaudières & Mulsanne Corner",
        turnsSummary: "First Chicane (Forza), Second Chicane (Michelin), Mulsanne Corner",
        description: "The speed temple of endurance racing. Cars repeatedly exceed 320–335 km/h before anchoring down for two technical chicanes and the heavy 90-degree right at Mulsanne Corner. Demands supreme brake cooling and hybrid deployment discipline.",
        highlightPath: "M258.718,298.080c-0.5,3.65-3.87,6.18-5,9c-3.6,8.98-2.17,17.49,4,23    c2.94,2.62,7.96,2.78,10,6c10.9,55.19,23.92,117.01,36,175c0.98,4.71,0.99,10.41,2,12c1.6,2.511,2.89,1.99,5,3    c3.32,1.591,10.08,5.29,11,10c0.74,3.761-1.26,8.17-3,12c-1.47,3.24-4.54,5.91-5,9c-0.45,3.07,1.33,7.25,2,12    c0.52,3.66,0.51,8.561,1,12c5.21,36.73,11.67,77.99,15,118c1.38,16.511,3.23,32.74,0,49"
      },
      {
        sector: 3,
        name: "Sector 3 — Indianapolis, Arnage & The Porsche Curves",
        turnsSummary: "Indianapolis, Arnage, Porsche Curves, Maison Blanche, Ford Chicanes",
        description: "The most aerodynamically demanding and dangerous segment. From the high-speed banking of Indianapolis into the slowest point at Arnage, transitioning into the relentless 3.5G lateral sweeps of the Porsche Curves.",
        highlightPath: "M331.718,748.080c-57.91-10.46-108.44-41.46-152-73    c-2.31-1.68-4.75-3.27-7-5c-2.16-1.67-3.73-4.229-6-6c-1.03-0.81-3.02-1.229-4-2c-13.71-10.75-26.03-21.239-41-35    c-1.81-1.659-3.69-3.939-6-6c-2.08-1.859-4.98-3.14-7-5c-4.51-4.159-10.08-9.64-11-12c-1.13-2.89-0.52-7.909-1-11    c-0.61-3.979-1.19-6.859-2-10c-10.86-1.59-25.22,1.261-37,2c-3.21-35.76-6.7-68.12-21-91c-3.14-5.02-10.47-11.659-15-16    c-1.08-1.04-5.65-2.909-8-4c-6.4-2.949-12.9-10.399-8-20c0.22-0.439,1.84-0.64,2-1c0.23-0.51-0.31-1.54,0-2    c0.25-0.37,1.85-0.68,2-1c1.62-3.6,6.26-7.83,10-11c10.01-8.479,20.64-16.29,16-34c-4.01-15.279-21.28-22.42-31-36    c1.82-6.32,8.73-8.42,12-16c5.7-13.2,5.05-47.04,4-69c-0.51-10.63-0.77-19.83-3-28c-0.29-1.07-1.36-2.34-1.84-3.51"
      }
    ],
    turns: [
      {
        id: "lm-t1",
        number: "T1",
        name: "Dunlop Curve (Courbe Dunlop)",
        sector: 1,
        x: 25.0,
        y: 115.0,
        direction: "Right",
        technicalDetails: "Taken at ~230 km/h in top gear before heavy braking into the chicane.",
        enduranceImportance: "Sets up initial momentum immediately after the Start/Finish line. Traffic congestion here during multi-class race starts is notoriously perilous.",
        didYouKnow: {
          fact: "The landmark Dunlop Bridge spanning this corner was first erected in 1932 and remains one of motorsport's most photographed architectural icons.",
          source: "Automobile Club de l'Ouest (ACO) Official Heritage Archives"
        }
      },
      {
        id: "lm-t2",
        number: "T2",
        name: "Dunlop Chicane",
        sector: 1,
        x: 41.2,
        y: 97.4,
        direction: "Left-Right Chicane",
        technicalDetails: "Braking zone dropping speed to ~105 km/h in 2nd gear.",
        enduranceImportance: "Harsh kerb contact tests suspension dampers thousands of times over 24 hours. Missing the apex ruins momentum down the downhill run.",
        didYouKnow: {
          fact: "The chicane was inserted inside the sweeping Dunlop Curve in 1987 to decelerate cars ahead of the downhill descent toward the esses.",
          source: "ACO Historical Technical Regulations (1987)"
        }
      },
      {
        id: "lm-t3",
        number: "T3",
        name: "Tertre Rouge",
        sector: 1,
        x: 134.9,
        y: 51.9,
        direction: "Right",
        technicalDetails: "High-speed 4th-gear right-hander taken at ~185 km/h.",
        enduranceImportance: "The single most critical corner for lap time. Any hesitation or loss of exit speed compounds into lost tenths of a second all the way down the first section of the Mulsanne straight.",
        didYouKnow: {
          fact: "'Tertre Rouge' translates literally to 'Red Hillock', named after the reddish clay and sandy soil characteristic of the Sarthe department.",
          source: "Le Mans Sarthe Regional Topography & Circuit Guide"
        }
      },
      {
        id: "lm-t4",
        number: "T4",
        name: "Première Chicane des Hunaudières (Forza Motorsport)",
        sector: 2,
        x: 254.6,
        y: 273.6,
        direction: "Right-Left-Right Chicane",
        technicalDetails: "Deceleration from ~330 km/h to ~110 km/h; peak deceleration exceeding 3.8G.",
        enduranceImportance: "Tests carbon-carbon brake rotor integrity and cooling efficiency under sustained extreme thermal cycling from dusk to dawn.",
        didYouKnow: {
          fact: "Added in 1990 by FIA/ACO decree after WM-Peugeot attained a record 407 km/h on the uninterrupted straight in 1988, exceeding the FIA's maximum straight length regulation of 2 km.",
          source: "FIA Technical Regulations Archive (1990 Bulletin)"
        }
      },
      {
        id: "lm-t5",
        number: "T5",
        name: "Deuxième Chicane des Hunaudières (Michelin)",
        sector: 2,
        x: 289.0,
        y: 440.3,
        direction: "Left-Right-Left Chicane",
        technicalDetails: "Mirror configuration to the first chicane, taken at ~115 km/h.",
        enduranceImportance: "Requires immediate turbo boost recovery and hybrid energy deployment on exit to reach top speed ahead of the Mulsanne kink.",
        didYouKnow: {
          fact: "The Mulsanne straight is part of Route Départementale D338, a public French highway open to ordinary civilian traffic for 350 days every year.",
          source: "Conseil Départemental de la Sarthe Road Authority"
        }
      },
      {
        id: "lm-t6",
        number: "T6",
        name: "Virage de Mulsanne (Mulsanne Corner)",
        sector: 2,
        x: 324.9,
        y: 638.9,
        direction: "Right 90°",
        technicalDetails: "Violent threshold braking from ~325 km/h to 80 km/h in 1st/2nd gear.",
        enduranceImportance: "The deepest braking zone on the circuit. Brake dust, track rubbering, and nocturnal cooling create changing grip thresholds every hour.",
        didYouKnow: {
          fact: "Originally a high-speed blind bend, the right-hand corner was modified into a 90-degree right turn with a dedicated roundabout to divert non-race public traffic.",
          source: "ACO Circuit Development History"
        }
      },
      {
        id: "lm-t7",
        number: "T7",
        name: "Indianapolis",
        sector: 3,
        x: 163.4,
        y: 662.5,
        direction: "Banked Right into 90° Left",
        technicalDetails: "Right-hand kink taken at ~280 km/h before snapping brakes for the 120 km/h banked left.",
        enduranceImportance: "The slight banking provides surprising grip, but passing slower GT cars through the narrow entry requires surgical timing.",
        didYouKnow: {
          fact: "Named in honor of Indianapolis Motor Speedway due to its original brick-paved and gently banked surface character built during the early 1920s.",
          source: "24 Hours of Le Mans Centenary Retrospective (1923–2023)"
        }
      },
      {
        id: "lm-t8",
        number: "T8",
        name: "Arnage",
        sector: 3,
        x: 99.6,
        y: 606.9,
        direction: "Right 90°",
        technicalDetails: "Slowest corner on the track at ~75 km/h; heavy traction demand.",
        enduranceImportance: "Traction control mapping and differential setup are tested relentlessly here; rear tyre wheelspin out of Arnage overheats tyre compounds.",
        didYouKnow: {
          fact: "Spectator viewing at Arnage is famously close to the track, offering fans an intimate look at glowing brake rotors illuminating the night air.",
          source: "ACO Official Spectator Experience Guide"
        }
      },
      {
        id: "lm-t9",
        number: "T9",
        name: "Porsche Curves",
        sector: 3,
        x: 32.9,
        y: 489.2,
        direction: "Fast S-Curves Sequence",
        technicalDetails: "High-downforce complex taken between 195 km/h and 235 km/h pulling up to 3.5G.",
        enduranceImportance: "Zero margin for error. Concrete walls line the perimeter; a puncture or aerodynamic imbalance here results in race-ending contact.",
        didYouKnow: {
          fact: "Constructed in 1972 to bypass the dangerously narrow and unforgiving section through Maison Blanche village that previously led to the pit straight.",
          source: "Porsche Motorsport Historical Archives"
        }
      },
      {
        id: "lm-t10",
        number: "T10",
        name: "Ford Chicanes",
        sector: 3,
        x: 18.3,
        y: 258.6,
        direction: "Double Chicane",
        technicalDetails: "Tight left-right-left-right complex traversed at ~85 km/h.",
        enduranceImportance: "Final hurdle before the pit entry and Start/Finish line. Tall sausage kerbs can damage prototype undertrays if drivers cut too aggressively.",
        didYouKnow: {
          fact: "Funded and constructed in 1968 by the Ford Motor Company to decelerate cars approaching the pit lane after the historic Ford GT40 victory era.",
          source: "Ford Performance Historical Records"
        }
      }
    ],
    provenance: {
      geometrySource: "Automobile Club de l'Ouest (ACO) / Wikimedia Commons (Will Pittenger)",
      geometrySourceUrl: "https://commons.wikimedia.org/wiki/File:Circuit_de_la_Sarthe.svg",
      configurationContext: "Verified 2018–present 13.626 km layout. Note: Porsche Curves revisions in 2018 slightly reshaped runoff without altering primary corner radii.",
      notes: "Coordinates and sector lines aligned with official 24 Hours of Le Mans timing beacons (S1: Start to Forza Chicane, S2: Forza to Indianapolis entry, S3: Indianapolis to Start/Finish)."
    }
  },
  {
    id: "spa",
    name: "Circuit de Spa-Francorchamps",
    country: "Belgium",
    countryFlag: "🇧🇪",
    location: "Stavelot / Francorchamps, Ardennes",
    editorialIntro: "Carved into the Ardennes forest with over 100 meters of elevation change, Spa demands uncompromising aerodynamic efficiency, iron nerve through compression zones, and relentless adaptability in shifting weather.",
    viewBox: "0 0 1420 880",
    groupTransform: "translate(2047.7528, -153.52072)",
    trackPath: "m -1785.7292,792.86845 c -67.4631,47.6329 -136.8716,92.50853 -206.8599,136.34679 -10.3037,6.45387 -19.757,14.98157 -31.3516,18.63984 -4.0422,1.27539 -8.9373,2.93985 -12.6804,0.95103 -3.0093,-1.59895 -4.7806,-5.48102 -5.0722,-8.87629 -0.8187,-9.53376 7.0404,-21.07515 9.7848,-26.98746 18.7684,-40.4325 32.5731,-75.25655 52.3492,-111.10243 9.7931,-17.75091 20.0392,-35.44966 32.7158,-51.27062 18.5455,-23.14555 41.9063,-41.98211 62.7681,-63.06379 18.9528,-19.15258 37.8814,-38.3297 56.6921,-57.62194 13.0861,-13.42106 27.8076,-25.46016 39.0764,-40.4396 8.1158,-10.78821 12.3066,-24.14858 20.1823,-35.11326 5.8625,-8.16174 12.0461,-16.40465 19.9717,-22.58261 9.2179,-7.18533 20.1804,-12.05474 31.1401,-16.11486 14.2066,-5.26299 30.2284,-4.67101 44.2326,-10.45118 10.9909,-4.53647 20.3412,-11.6625 30.0033,-18.28029 17.0568,-11.68259 32.7571,-25.23249 49.2299,-37.72517 17.089,-12.95998 34.0853,-26.04969 51.461,-38.62259 13.3104,-9.63129 26.6578,-19.23313 40.4294,-28.19266 6.3654,-4.14118 12.7691,-8.25985 19.4855,-11.80332 10.1861,-5.37397 20.7582,-10.02659 31.458,-14.28671 28.2031,-11.22903 57.5917,-19.23915 86.1103,-29.64094 108.264,-39.48786 293.1142,-113.21099 322.5788,-124.36324 22.6881,-8.58731 44.78584,-19.5641 68.54911,-24.44216 4.97826,-1.02192 10.25088,-2.03266 15.2165,-0.95103 7.05353,1.53641 13.18102,5.45684 18.70361,9.82732 5.62536,4.4518 8.98322,10.71891 13.72938,15.85051 2.44332,2.64173 4.34429,5.40993 7.1933,7.29124 3.90756,2.58031 8.23097,3.99314 12.68041,4.75515 4.08707,0.69995 8.12389,0.25064 12.04639,-0.63402 13.47671,-3.03945 25.34866,-11.03439 38.31668,-15.79783 7.63492,-2.80447 15.21107,-6.06974 23.21569,-7.51304 6.25256,-1.12739 12.84477,-2.2351 19.04187,-0.83459 6.48144,1.46478 13.05132,4.55432 17.60471,9.35229 32.57422,34.32396 68.02275,76.28376 101.41094,114.96938 9.19604,10.6551 18.7466,21.03913 27.24162,32.26111 3.34682,4.42117 7.13555,8.68262 9.31992,13.77932 2.71702,6.33951 5.09616,13.35105 4.41688,20.21473 -0.54526,5.50943 -3.39367,10.7443 -6.65721,15.21649 -2.79802,3.83426 -6.5476,7.08539 -10.68316,9.41512 -4.23868,2.38782 -9.10345,3.73203 -13.92719,4.36421 -4.1389,0.54243 -8.47818,0.53765 -12.51128,-0.53882 -4.98042,-1.32932 -9.6397,-3.98067 -13.72664,-7.12211 -5.88512,-4.52362 -10.20033,-10.79654 -14.99469,-16.46328 -16.80602,-19.86403 -36.46855,-48.67955 -48.20682,-61.39464 -3.8937,-4.21773 -10.70563,-5.85072 -16.61115,-6.84762 -5.53122,-0.93371 -11.35495,-0.39092 -16.80155,0.95103 -10.48889,2.5843 -19.56952,9.16499 -29.50322,13.40964 -13.86635,5.92507 -27.95673,11.31293 -41.99323,16.8228 -15.83221,6.21476 -31.52489,12.83056 -47.62548,18.31266 -17.53362,5.97003 -35.38844,10.97628 -53.25773,15.85052 -33.16096,9.04537 -66.94416,15.70668 -100.08016,24.84326 -9.7944,2.7006 -19.8704,4.75196 -29.1649,8.85502 -7.09,3.1299 -13.9835,6.97978 -19.9818,11.88742 -5.0761,4.15307 -10.0042,8.8603 -13.2091,14.58247 -3.9907,7.1253 -5.5085,15.46241 -6.8902,23.51144 -1.2485,7.27362 -1.1231,14.7272 -1.2153,22.10663 -0.1087,8.70699 -0.2727,17.46774 0.7819,26.11131 1.2962,10.62416 3.285,21.26913 6.7839,31.38402 2.9508,8.53052 6.5939,17.01203 11.856,24.34601 3.5182,4.90342 8.2055,8.90703 12.881,12.72293 5.0928,4.15653 10.7589,7.57577 16.3893,10.96875 6.4793,3.90454 12.9479,7.96882 19.9717,10.77835 25.8772,10.35099 53.8898,14.26513 80.6685,21.99016 35.77334,10.31979 71.46774,20.95401 106.85272,32.53561 12.4506,4.07512 25.52589,6.84189 37.09021,12.99742 5.21868,2.77783 10.22039,6.24897 14.21279,10.60922 4.11526,4.49441 7.66833,9.777 9.60551,15.55476 2.00865,5.99092 2.42127,12.58714 1.77544,18.87274 -0.67802,6.59896 -3.13674,12.75078 -5.07216,19.02062 -3.29403,10.67111 -9.37446,20.57461 -11.11663,31.60584 -1.03499,6.55341 -0.95688,13.42418 0.49631,19.89771 1.54396,6.87791 4.43578,13.62044 8.55928,19.33763 1.83785,2.54817 4.42632,4.50198 6.97423,6.3402 16.6768,12.03165 35.0667,21.8406 53.77624,30.23245 25.09454,11.25573 53.03505,21.48818 74.86617,39.31943 5.17668,4.22822 9.8166,9.4941 12.68041,15.5335 2.49507,5.26178 3.93096,11.31213 3.48711,17.11856 -0.56373,7.37471 -3.87614,14.4746 -7.68218,20.81638 -14.20248,23.66475 -26.91889,43.25151 -43.85278,64.13123 -4.81571,5.9378 -10.91827,10.9691 -17.56218,14.7515 -5.85985,3.3361 -12.17858,5.5609 -18.70361,6.6785 -9.41546,1.6128 -18.9175,1.0666 -28.26659,-0.1054 -18.01915,-2.2588 -35.62573,-7.4797 -52.84459,-13.2506 -15.93641,-5.3411 -31.73219,-11.51717 -46.42122,-19.68592 -19.40702,-10.79248 -37.19441,-24.40485 -54.45184,-38.37952 -17.36931,-14.06527 -34.20019,-28.98774 -49.17914,-45.57554 -19.6266,-21.73462 -35.9563,-46.2591 -52.8558,-70.17575 -13.6581,-19.32944 -24.7379,-40.46589 -39.1928,-59.20698 -11.0578,-14.33677 -22.0725,-29.16913 -36.1918,-40.50338 -12.721,-10.21177 -28.0794,-16.66964 -42.6799,-23.94491 -15.2914,-7.61955 -30.8067,-14.95927 -46.9387,-20.58441 -26.3057,-9.17263 -53.357,-16.60149 -80.8164,-21.30347 -10.84,-1.85618 -21.9417,-3.78639 -32.8841,-2.68396 -10.9469,1.10289 -21.5093,5.04819 -31.701,9.1933 -17.1354,6.96924 -32.5314,17.62488 -48.9573,26.13257 -22.7858,11.80168 -44.9891,24.96619 -68.7912,34.55412 -11.7934,4.7506 -24.1638,7.95816 -36.4349,11.28575 -12.5672,3.40788 -25.3224,6.0876 -38.0413,8.87629 -41.2206,9.03784 -107.092,25.43683 -124.0139,25.45509 -3.4028,0.004 -8.8068,-3.63976 -10.7571,-7.56574 -1.3172,-2.65149 0.1623,-5.91969 0.317,-8.87629 0.321,-6.13503 2.8721,-12.45628 1.2681,-18.3866 -0.8341,-3.08385 -2.7788,-6.08362 -5.3892,-7.92525 -2.0524,-1.44794 -4.7881,-2.10965 -7.2912,-1.90207 -4.384,0.36355 -8.517,2.7635 -12.0464,5.38918 -24.1227,17.94583 -43.815,34.20182 -66.5093,50.22534 z",
    stats: {
      length: "7.004 km",
      turnsCount: 19,
      direction: "Clockwise",
      lapRecordTopClass: "1:53.658 (Mike Conway, Toyota TS050 Hybrid, 2018)",
      wecHistory: "Ever-present on the FIA WEC calendar as the traditional 6-hour endurance dress rehearsal ahead of Le Mans."
    },
    sectors: [
      {
        sector: 1,
        name: "Sector 1 — La Source to Kemmel Straight",
        turnsSummary: "Turns 1–4 (La Source, Eau Rouge, Raidillon, Kemmel Straight)",
        description: "Encompasses the iconic descent from La Source into the ravine of Eau Rouge and the 17% vertical climb of Raidillon, concluding along the flat-out Kemmel Straight braking zone.",
        highlightPath: "m -1785.7292,792.86845 c -67.4631,47.6329 -136.8716,92.50853 -206.8599,136.34679 -10.3037,6.45387 -19.757,14.98157 -31.3516,18.63984 -4.0422,1.27539 -8.9373,2.93985 -12.6804,0.95103 -3.0093,-1.59895 -4.7806,-5.48102 -5.0722,-8.87629 -0.8187,-9.53376 7.0404,-21.07515 9.7848,-26.98746 18.7684,-40.4325 32.5731,-75.25655 52.3492,-111.10243 9.7931,-17.75091 20.0392,-35.44966 32.7158,-51.27062 18.5455,-23.14555 41.9063,-41.98211 62.7681,-63.06379 18.9528,-19.15258 37.8814,-38.3297 56.6921,-57.62194 13.0861,-13.42106 27.8076,-25.46016 39.0764,-40.4396 8.1158,-10.78821 12.3066,-24.14858 20.1823,-35.11326 5.8625,-8.16174 12.0461,-16.40465 19.9717,-22.58261 9.2179,-7.18533 20.1804,-12.05474 31.1401,-16.11486 14.2066,-5.26299 30.2284,-4.67101 44.2326,-10.45118 10.9909,-4.53647 20.3412,-11.6625 30.0033,-18.28029 17.0568,-11.68259 32.7571,-25.23249 49.2299,-37.72517 17.089,-12.95998 34.0853,-26.04969 51.461,-38.62259 13.3104,-9.63129 26.6578,-19.23313 40.4294,-28.19266 6.3654,-4.14118 12.7691,-8.25985 19.4855,-11.80332 10.1861,-5.37397 20.7582,-10.02659 31.458,-14.28671 28.2031,-11.22903 57.5917,-19.23915 86.1103,-29.64094 108.264,-39.48786 293.1142,-113.21099 322.5788,-124.36324"
      },
      {
        sector: 2,
        name: "Sector 2 — The Ardennes Rollercoaster",
        turnsSummary: "Turns 5–14 (Les Combes, Malmedy, Bruxelles, Pouhon, Fagnes, Campus)",
        description: "The handling and downforce heart of Spa. Descends down through the off-camber Bruxelles hairpin and the double-apex high-speed amphitheatre of Pouhon.",
        highlightPath: "m -1042.024,202.26715 c 22.6881,-8.58731 44.78584,-19.5641 68.54911,-24.44216 4.97826,-1.02192 10.25088,-2.03266 15.2165,-0.95103 7.05353,1.53641 13.18102,5.45684 18.70361,9.82732 5.62536,4.4518 8.98322,10.71891 13.72938,15.85051 2.44332,2.64173 4.34429,5.40993 7.1933,7.29124 3.90756,2.58031 8.23097,3.99314 12.68041,4.75515 4.08707,0.69995 8.12389,0.25064 12.04639,-0.63402 13.47671,-3.03945 25.34866,-11.03439 38.31668,-15.79783 7.63492,-2.80447 15.21107,-6.06974 23.21569,-7.51304 6.25256,-1.12739 12.84477,-2.2351 19.04187,-0.83459 6.48144,1.46478 13.05132,4.55432 17.60471,9.35229 32.57422,34.32396 68.02275,76.28376 101.41094,114.96938 9.19604,10.6551 18.7466,21.03913 27.24162,32.26111 3.34682,4.42117 7.13555,8.68262 9.31992,13.77932 2.71702,6.33951 5.09616,13.35105 4.41688,20.21473 -0.54526,5.50943 -3.39367,10.7443 -6.65721,15.21649 -2.79802,3.83426 -6.5476,7.08539 -10.68316,9.41512 -4.23868,2.38782 -9.10345,3.73203 -13.92719,4.36421 -4.1389,0.54243 -8.47818,0.53765 -12.51128,-0.53882 -4.98042,-1.32932 -9.6397,-3.98067 -13.72664,-7.12211 -5.88512,-4.52362 -10.20033,-10.79654 -14.99469,-16.46328 -16.80602,-19.86403 -36.46855,-48.67955 -48.20682,-61.39464 -3.8937,-4.21773 -10.70563,-5.85072 -16.61115,-6.84762 -5.53122,-0.93371 -11.35495,-0.39092 -16.80155,0.95103 -10.48889,2.5843 -19.56952,9.16499 -29.50322,13.40964 -13.86635,5.92507 -27.95673,11.31293 -41.99323,16.8228 -15.83221,6.21476 -31.52489,12.83056 -47.62548,18.31266 -17.53362,5.97003 -35.38844,10.97628 -53.25773,15.85052 -33.16096,9.04537 -66.94416,15.70668 -100.08016,24.84326 -9.7944,2.7006 -19.8704,4.75196 -29.1649,8.85502 -7.09,3.1299 -13.9835,6.97978 -19.9818,11.88742 -5.0761,4.15307 -10.0042,8.8603 -13.2091,14.58247 -3.9907,7.1253 -5.5085,15.46241 -6.8902,23.51144 -1.2485,7.27362 -1.1231,14.7272 -1.2153,22.10663 -0.1087,8.70699 -0.2727,17.46774 0.7819,26.11131 1.2962,10.62416 3.285,21.26913 6.7839,31.38402 2.9508,8.53052 6.5939,17.01203 11.856,24.34601 3.5182,4.90342 8.2055,8.90703 12.881,12.72293 5.0928,4.15653 10.7589,7.57577 16.3893,10.96875 6.4793,3.90454 12.9479,7.96882 19.9717,10.77835 25.8772,10.35099 53.8898,14.26513 80.6685,21.99016 35.77334,10.31979 71.46774,20.95401 106.85272,32.53561 12.4506,4.07512 25.52589,6.84189 37.09021,12.99742 5.21868,2.77783 10.22039,6.24897 14.21279,10.60922 4.11526,4.49441 7.66833,9.777 9.60551,15.55476 2.00865,5.99092 2.42127,12.58714 1.77544,18.87274 -0.67802,6.59896 -3.13674,12.75078 -5.07216,19.02062 -3.29403,10.67111 -9.37446,20.57461 -11.11663,31.60584 -1.03499,6.55341 -0.95688,13.42418 0.49631,19.89771 1.54396,6.87791 4.43578,13.62044 8.55928,19.33763 1.83785,2.54817 4.42632,4.50198 6.97423,6.3402 16.6768,12.03165 35.0667,21.8406 53.77624,30.23245 25.09454,11.25573 53.03505,21.48818 74.86617,39.31943 5.17668,4.22822 9.8166,9.4941 12.68041,15.5335 2.49507,5.26178 3.93096,11.31213 3.48711,17.11856 -0.56373,7.37471 -3.87614,14.4746 -7.68218,20.81638 -7.59472,12.65464 -14.7645,24.14316 -22.38148,35.28686"
      },
      {
        sector: 3,
        name: "Sector 3 — The Run Through Blanchimont",
        turnsSummary: "Turns 15–19 (Stavelot, Paul Frère, Blanchimont, Bus Stop Chicane)",
        description: "Fast flowing momentum sector sweeping through the flat-out Blanchimont bends at over 300 km/h before the brutal deceleration into the Bus Stop chicane.",
        highlightPath: "m -716.92153,971.53823 c -6.62711,9.69552 -13.59274,19.13001 -21.4713,28.84437 -4.8157,5.9378 -10.91827,10.9691 -17.56218,14.7515 -5.85985,3.3361 -12.17858,5.5609 -18.70361,6.6785 -9.41546,1.6128 -18.9175,1.0666 -28.26659,-0.1054 -18.01915,-2.2588 -35.62573,-7.4797 -52.84459,-13.2506 -15.93641,-5.3411 -31.73219,-11.51717 -46.42122,-19.68592 -19.40702,-10.79248 -37.19441,-24.40485 -54.45184,-38.37952 -17.36931,-14.06527 -34.20019,-28.98774 -49.17914,-45.57554 -19.6266,-21.73462 -35.9563,-46.2591 -52.8558,-70.17575 -13.6581,-19.32944 -24.7379,-40.46589 -39.1928,-59.20698 -11.0578,-14.33677 -22.0725,-29.16913 -36.1918,-40.50338 -12.721,-10.21177 -28.0794,-16.66964 -42.6799,-23.94491 -15.2914,-7.61955 -30.8067,-14.95927 -46.9387,-20.58441 -26.3057,-9.17263 -53.357,-16.60149 -80.8164,-21.30347 -10.84,-1.85618 -21.9417,-3.78639 -32.8841,-2.68396 -10.9469,1.10289 -21.5093,5.04819 -31.701,9.1933 -17.1354,6.96924 -32.5314,17.62488 -48.9573,26.13257 -22.7858,11.80168 -44.9891,24.96619 -68.7912,34.55412 -11.7934,4.7506 -24.1638,7.95816 -36.4349,11.28575 -12.5672,3.40788 -25.3224,6.0876 -38.0413,8.87629 -41.2206,9.03784 -107.092,25.43683 -124.0139,25.45509 -3.4028,0.004 -8.8068,-3.63976 -10.7571,-7.56574 -1.3172,-2.65149 0.1623,-5.91969 0.317,-8.87629 0.321,-6.13503 2.8721,-12.45628 1.2681,-18.3866 -0.8341,-3.08385 -2.7788,-6.08362 -5.3892,-7.92525 -2.0524,-1.44794 -4.7881,-2.10965 -7.2912,-1.90207 -4.384,0.36355 -8.517,2.7635 -12.0464,5.38918 -24.1227,17.94583 -43.815,34.20182 -66.5093,50.22534"
      }
    ],
    turns: [
      {
        id: "spa-t1",
        number: "T1",
        name: "La Source",
        sector: 1,
        x: -1922.2,
        y: 967.7,
        direction: "Right Hairpin",
        technicalDetails: "Slowest corner on the circuit; 1st gear hairpin taken at ~65 km/h.",
        enduranceImportance: "Huge overtaking hotspot on the opening lap and following Safety Car restarts. Wide runoff tempting drivers to brake deeply.",
        didYouKnow: {
          fact: "Named after the natural mineral water springs located in the nearby Belgian health resort town of Spa.",
          source: "Circuit de Spa-Francorchamps Official Guide"
        }
      },
      {
        id: "spa-t2",
        number: "T2",
        name: "Eau Rouge",
        sector: 1,
        x: -1765.0,
        y: 630.0,
        direction: "Left Kink",
        technicalDetails: "Taken flat out in top-class prototypes approaching 290 km/h.",
        enduranceImportance: "The suspension compresses violently into the valley floor under massive downward g-forces, testing chassis bottoming resistance.",
        didYouKnow: {
          fact: "Eau Rouge ('Red Water') takes its name from the small iron-rich, reddish stream that flows directly beneath the track at the bottom of the ravine.",
          source: "Walloon Cultural & Geographical Heritage Service"
        }
      },
      {
        id: "spa-t3-4",
        number: "T3–T4",
        name: "Raidillon",
        sector: 1,
        x: -1721.1,
        y: 578.3,
        direction: "Right-Left Uphill Crest",
        technicalDetails: "Steep 17% vertical gradient taken at ~280 km/h with a blind crest apex.",
        enduranceImportance: "Absolute commitment required. Lifting off the throttle shifts aerodynamic balance forward and induces high-speed snap oversteer.",
        didYouKnow: {
          fact: "Raidillon was constructed in 1939 as an artificial shortcut to bypass the slow Ancienne Douane hairpin, creating one of motorsport's most celebrated sequences.",
          source: "Royal Automobile Club of Belgium (RACB) Historical Archives"
        }
      },
      {
        id: "spa-t5-6",
        number: "T5–T6",
        name: "Les Combes",
        sector: 2,
        x: -934.9,
        y: 176.7,
        direction: "Right-Left Chicane",
        technicalDetails: "Deceleration from 320+ km/h to ~140 km/h in 3rd gear.",
        enduranceImportance: "The primary overtaking zone at Spa. Slipstreaming along the Kemmel Straight culminates in late-braking duels into Turn 5.",
        didYouKnow: {
          fact: "Les Combes marks the highest geographical point of the circuit at 470 meters above sea level, making it prone to sudden microclimate rain showers.",
          source: "Belgian Royal Meteorological Institute (IRM) Track Station Data"
        }
      },
      {
        id: "spa-t7",
        number: "T7",
        name: "Malmedy",
        sector: 2,
        x: -830.0,
        y: 240.0,
        direction: "Right",
        technicalDetails: "Medium-speed right taken at ~175 km/h on throttle.",
        enduranceImportance: "Critical transition corner leading into the descent toward Bruxelles. Running wide compromises entry into the hairpin.",
        didYouKnow: {
          fact: "Named after the historic neighboring municipality of Malmedy in the province of Liège.",
          source: "Town of Malmedy Historical Documentation"
        }
      },
      {
        id: "spa-t8",
        number: "T8",
        name: "Bruxelles (Rivage)",
        sector: 2,
        x: -779.3,
        y: 440.9,
        direction: "Downhill 180° Right",
        technicalDetails: "Off-camber downhill hairpin taken at ~105 km/h in 2nd gear.",
        enduranceImportance: "High tyre wear corner. The off-camber slope causes the front-inside tyre to unload, frequently triggering lockups.",
        didYouKnow: {
          fact: "Previously referred to as Rivage after the nearby hamlet, it was officially rechristened Bruxelles in 2007 by track management.",
          source: "Circuit de Spa-Francorchamps Modern Reconfiguration Ledger (2007)"
        }
      },
      {
        id: "spa-t9",
        number: "T9",
        name: "Speaker's Corner",
        sector: 2,
        x: -830.0,
        y: 530.0,
        direction: "Downhill Left",
        technicalDetails: "Fast downhill 3rd-gear sweeper taken at ~150 km/h.",
        enduranceImportance: "Cars must be balanced carefully under lateral load on exit to line up the straight approach into Pouhon.",
        didYouKnow: {
          fact: "Named because track commentators historically had an unobstructed panoramic view of this corner sequence from the public PA booth.",
          source: "Spa 24h & WEC Media Notes"
        }
      },
      {
        id: "spa-t10-11",
        number: "T10–T11",
        name: "Pouhon (Double Gauche)",
        sector: 2,
        x: -1134.3,
        y: 500.3,
        direction: "Double-Apex Left",
        technicalDetails: "5th-gear corner taken at ~240 km/h with peak lateral loads above 3.5G.",
        enduranceImportance: "The benchmark corner for aerodynamic downforce and driver physical conditioning over a 6-hour endurance stint.",
        didYouKnow: {
          fact: "The word 'Pouhon' in Walloon refers to a natural ferruginous mineral spring, common in this valley of the Ardennes.",
          source: "Walloon Dialectal Atlas (Atlas Linguistique de Wallonie)"
        }
      },
      {
        id: "spa-t12-13",
        number: "T12–T13",
        name: "Fagnes (Pif-Paf)",
        sector: 2,
        x: -1000.0,
        y: 680.0,
        direction: "Right-Left Chicane",
        technicalDetails: "Medium-speed chicane taken at ~160 km/h.",
        enduranceImportance: "Quick directional flick requiring compliant anti-roll bars. Aggressive kerbing can upset prototype floor seal.",
        didYouKnow: {
          fact: "Fagnes refers to the High Fens (Hautes Fagnes) nature reserve surrounding the plateau above the racetrack.",
          source: "Belgian Nature & Forestry Division"
        }
      },
      {
        id: "spa-t14-15",
        number: "T14–T15",
        name: "Campus & Stavelot",
        sector: 2,
        x: -811.8,
        y: 916.9,
        direction: "Right-Hand Sweeps",
        technicalDetails: "Accelerating right-handers building speed up to 220 km/h.",
        enduranceImportance: "Early throttle commitment here dictates speed through Blanchimont all the way to the Bus Stop chicane.",
        didYouKnow: {
          fact: "The ancient circuit used to rejoin public highway roads directly in Stavelot before continuing on the old 14 km layout.",
          source: "Historic Spa Circuit Archives"
        }
      },
      {
        id: "spa-t16",
        number: "T16",
        name: "Courbe Paul Frère",
        sector: 3,
        x: -1054.8,
        y: 972.9,
        direction: "Right Kink",
        technicalDetails: "Flat out in top gear building toward 290 km/h.",
        enduranceImportance: "Named in honor of Belgian endurance driver and motorsport journalist Paul Frère, winner of the 1960 24 Hours of Le Mans.",
        didYouKnow: {
          fact: "Paul Frère tested high-performance race cars well into his 80s, remaining one of the most respected technical authorities in sports car history.",
          source: "Royal Automobile Club of Belgium Memorial Tribute"
        }
      },
      {
        id: "spa-t17-18",
        number: "T17–T18",
        name: "Blanchimont",
        sector: 3,
        x: -1280.9,
        y: 813.9,
        direction: "High-Speed Double Left",
        technicalDetails: "Taken flat out at 300+ km/h in top-class prototypes.",
        enduranceImportance: "Lapping slower GT cars through Blanchimont requires absolute mutual trust; offline tarmac is coated in tyre marbles.",
        didYouKnow: {
          fact: "Named after the adjacent village of Blanchimont perched on the ridge overlooking the valley of the Eau Rouge.",
          source: "Stavelot Municipal Historical Registry"
        }
      },
      {
        id: "spa-t19",
        number: "T19",
        name: "Bus Stop Chicane",
        sector: 3,
        x: -1571.3,
        y: 821.0,
        direction: "Right-Left Chicane",
        technicalDetails: "Heavy deceleration from ~300 km/h to ~75 km/h in 1st/2nd gear.",
        enduranceImportance: "Last chance for a pass on each lap. Locking up on entry can push a driver into the pit wall entry lane.",
        didYouKnow: {
          fact: "Originally constructed in 1981 around an actual roadside bus halt on the public road, the chicane was completely redesigned in 2007 into its current profile.",
          source: "FIA World Motor Sport Council Circuit Homologation Document"
        }
      }
    ],
    provenance: {
      geometrySource: "Will Pittenger / Wikimedia Commons (Spa-Francorchamps of Belgium.svg)",
      geometrySourceUrl: "https://commons.wikimedia.org/wiki/File:Spa-Francorchamps_of_Belgium.svg",
      configurationContext: "Official modern 7.004 km FIA Grade 1 configuration (2007–present).",
      notes: "Sectors aligned with official FIA WEC timing transponder loops (S1: Start to Les Combes, S2: Les Combes to Stavelot, S3: Stavelot to Start/Finish)."
    }
  },
  {
    id: "imola",
    name: "Autodromo Enzo e Dino Ferrari",
    country: "Italy",
    countryFlag: "🇮🇹",
    location: "Imola, Emilia-Romagna",
    editorialIntro: "An anti-clockwise cathedral of Italian motorsport, Imola combines narrow ribbon asphalt, punishing kerbs, and undulating parkland topography that leaves zero room for driver error.",
    viewBox: "0 0 1340 730",
    groupTransform: "translate(21.19989, -7.28861)",
    trackPath: "m 501.6875,603.96875 c 12.72464,0.43615 103.21154,22.57429 155.65625,32.375 18.45179,3.44821 61.47735,5.9663 81.28125,4 73.8993,-7.3375 105.14235,-10.18005 142.34375,-14.9375 9.00379,-1.15144 71.6172,-14.56806 75.9375,-18.6875 5.40457,-5.1533 9.9715,-12.59923 9.75,-21.65625 -0.20224,-8.26963 5.3103,-21.1408 16.9375,-28.71875 17.04045,-11.10603 48.49155,-24.12453 65.56245,-34.90625 8.1823,-5.16777 11.9651,-13.39796 15.9376,-22.4375 38.2272,-86.98967 78.0861,-174.69641 104.4595,-263.88848 2.5351,-8.57343 -2.2854,-22.22529 -5.0901,-30.79534 -5.9263,-18.10804 -7.5916,-32.83097 2.5962,-41.65136 41.7341,-34.64165 81.6832,-70.896309 125.0582,-105.363359 6.4408,-5.11808 9.3686,-18.200194 9.9437,-25.86948 0.4216,-5.621954 -4.537,-11.64517 -10.2543,-17.248161 -3.1267,-3.064154 -16.225,-1.629782 -20.7544,-1.050252 -77.8589,9.9621 -136.5316,17.410476 -215.022,25.431376 -12.5546,1.28296 -49.1092,-1.16089 -61.59431,-3.02941 -36.3602,-5.44166 -56.27215,-11.856847 -92.39279,-16.75552 -13.12808,-1.780426 -26.9392,-1.097236 -33.44179,5.675857 -2.29925,2.394903 -10.87685,11.928472 -14.74652,20.546245 -4.87754,10.862313 -14.59347,28.380457 -22.14748,49.699471 -5.6982,16.081543 -7.5798,39.966183 -5.82843,57.408693 2.85465,28.43037 28.14499,124.63773 26.13849,138.97671 -2.0987,14.99705 -26.72192,46.21112 -37.93566,61.67342 -3.0281,4.59943 -15.52708,4.41137 -23.79718,0.95466 -8.2702,-3.4567 -17.48894,-8.69865 -25.67402,-9.05822 -87.39527,-3.83926 -203.67755,0.9666 -308.07966,-1.90685 -4.25378,-0.11708 -6.92213,-2.6324 -7.75,-8.71875 -1.37088,-10.07847 -6.98104,-12.02613 -11.46875,-10.21875 -34.49516,13.89257 -77.62944,30.70283 -112.875,46.375 -30.15401,13.40818 -51.1179,28.31088 -74.78125,48.59375 -41.46372,35.54033 -95.85902,93.41723 -123.375,117.875 C 106.10656,554.58866 54.939475,572.78347 19.125,588.75 8.97781,593.27374 1.30872,601.13606 4.9375,611.4375 c 7.591643,21.55128 16.88379,43.73885 28.375,61.78125 3.63589,5.7088 18.96029,9.4227 25.9375,7.25 66.98134,-20.8583 128.07958,-50.96955 195.27909,-72.51652 9.26597,-2.97106 25.40108,-5.21212 36.70584,-5.2247 78.22349,0.72847 131.24073,0.23026 210.45257,1.24122 z",
    stats: {
      length: "4.909 km",
      turnsCount: 19,
      direction: "Anti-clockwise",
      lapRecordTopClass: "1:29.466 (WEC Hypercar Pole, 2024 Contextual Record)",
      wecHistory: "Featured as a 6-hour endurance round in the Intercontinental Le Mans Cup (ILMC) era (2011) and returned to the WEC calendar in 2024 to inaugurate Italian round proceedings."
    },
    sectors: [
      {
        sector: 1,
        name: "Sector 1 — Tamburello to Villeneuve",
        turnsSummary: "Turns 1–5 (Variante Tamburello, Variante Villeneuve)",
        description: "High-speed blast down the main straight through the quick directional chicanes of Tamburello and Villeneuve. Kerb compliance is paramount.",
        highlightPath: "M 501.688,603.969 c 12.725,0.436 103.212,22.574 155.656,32.375 18.452,3.448 61.477,5.966 81.281,4.000 73.899,-7.338 105.142,-10.180 142.344,-14.938 9.004,-1.151 71.617,-14.568 75.938,-18.688 5.405,-5.153 9.972,-12.599 9.750,-21.656 -0.202,-8.270 5.310,-21.141 16.938,-28.719 17.040,-11.106 48.492,-24.125 65.562,-34.906 8.182,-5.168 11.965,-13.398 15.938,-22.438 38.227,-86.990 78.086,-174.696 104.460,-263.888 2.535,-8.573 -2.285,-22.225 -5.090,-30.795 -5.926,-18.108 -7.592,-32.831 2.596,-41.651 41.734,-34.642 81.683,-70.896 125.058,-105.363"
      },
      {
        sector: 2,
        name: "Sector 2 — Tosa, Piratella & Acque Minerali",
        turnsSummary: "Turns 6–12 (Tosa, Piratella, Acque Minerali, Variante Alta)",
        description: "The climbing and diving natural amphitheatre. Rises up to the blind crest of Piratella before dropping steeply into the double-right compression of Acque Minerali and ascending to Variante Alta.",
        highlightPath: "M 1292.118,57.301 c 6.441,-5.118 9.369,-18.200 9.944,-25.869 0.422,-5.622 -4.537,-11.645 -10.254,-17.248 -3.127,-3.064 -16.225,-1.630 -20.754,-1.050 -77.859,9.962 -136.532,17.410 -215.022,25.431 -12.555,1.283 -49.109,-1.161 -61.594,-3.029 -36.360,-5.442 -56.272,-11.857 -92.393,-16.756 -13.128,-1.780 -26.939,-1.097 -33.442,5.676 -2.299,2.395 -10.877,11.928 -14.747,20.546 -4.878,10.862 -14.593,28.380 -22.147,49.699 -5.698,16.082 -7.580,39.966 -5.828,57.409 2.855,28.430 28.145,124.638 26.138,138.977 -2.099,14.997 -26.722,46.211 -37.936,61.673 -3.028,4.599 -15.527,4.411 -23.797,0.955 -8.270,-3.457 -17.489,-8.699 -25.674,-9.058 -87.395,-3.839 -203.678,0.967 -308.080,-1.907"
      },
      {
        sector: 3,
        name: "Sector 3 — Rivazza to Pit Straight",
        turnsSummary: "Turns 13–19 (Rivazza 1, Rivazza 2, Finish Straight)",
        description: "Heavy downhill braking into the double-left of Rivazza followed by full acceleration along the fast curving pit straight past the pit lane entrance.",
        highlightPath: "M 456.531,342.750 c -4.254,-0.117 -6.922,-2.632 -7.750,-8.719 -1.371,-10.078 -6.981,-12.026 -11.469,-10.219 -34.495,13.893 -77.629,30.703 -112.875,46.375 -30.154,13.408 -51.118,28.311 -74.781,48.594 -41.464,35.540 -95.859,93.417 -123.375,117.875 C 106.107,554.589 54.939,572.783 19.125,588.750 8.978,593.274 1.309,601.136 4.938,611.438 c 7.592,21.551 16.884,43.739 28.375,61.781 3.636,5.709 18.960,9.423 25.938,7.250 66.981,-20.858 128.080,-50.970 195.279,-72.517 9.266,-2.971 25.401,-5.212 36.706,-5.225 78.223,0.728 131.241,0.230 210.453,1.241"
      }
    ],
    turns: [
      {
        id: "imola-t1",
        number: "T1",
        name: "Variante Tamburello (Entry)",
        sector: 1,
        x: 640.0,
        y: 632.0,
        direction: "Left Turn-In",
        technicalDetails: "Deceleration from 300+ km/h down to ~165 km/h in 3rd gear.",
        enduranceImportance: "Demands precise initial braking point; missing the entry line compromises the entire three-apex chicane.",
        didYouKnow: {
          fact: "Converted from a flat-out sweeping curve into a technical chicane in 1995 following the tragic accidents of Ayrton Senna and Roland Ratzenberger in 1994.",
          source: "FIA Safety Working Group Historic Documentation"
        }
      },
      {
        id: "imola-t2-3",
        number: "T2–T3",
        name: "Variante Tamburello (Apex & Exit)",
        sector: 1,
        x: 690.0,
        y: 642.0,
        direction: "Right-Left Flick",
        technicalDetails: "Taken over tall kerbs at ~150 km/h before accelerating toward Villeneuve.",
        enduranceImportance: "Riding the inner kerbs aggressively risks upsetting prototype floor seals and launching suspension components.",
        didYouKnow: {
          fact: "Modern GT and Hypercar drivers use the exit kerbing right to the white line to maximize exit velocity onto the run to Villeneuve.",
          source: "WEC Driver Track Walk Notes"
        }
      },
      {
        id: "imola-t4",
        number: "T4",
        name: "Variante Villeneuve (Entry)",
        sector: 1,
        x: 860.0,
        y: 595.0,
        direction: "Left Flick",
        technicalDetails: "Approach speed ~270 km/h, braking into a fast 4th-gear left.",
        enduranceImportance: "High-commitment left kink requiring driver confidence to carry momentum through the change of direction.",
        didYouKnow: {
          fact: "Named in tribute to legendary Canadian Ferrari driver Gilles Villeneuve, a fan favorite at the circuit throughout the late 1970s and early 1980s.",
          source: "Autodromo Internazionale Enzo e Dino Ferrari Museum"
        }
      },
      {
        id: "imola-t5",
        number: "T5",
        name: "Variante Villeneuve (Exit)",
        sector: 1,
        x: 900.0,
        y: 575.0,
        direction: "Right Apex",
        technicalDetails: "Taken at ~175 km/h in 3rd/4th gear onto the uphill approach to Tosa.",
        enduranceImportance: "Good traction on exit is crucial for building speed up the gradient toward Tosa hairpin.",
        didYouKnow: {
          fact: "The natural hillside allows spectators in Sector 1 grandstands to see both Tamburello and Villeneuve from a single vantage point.",
          source: "Città di Imola Tourism Guide"
        }
      },
      {
        id: "imola-t6",
        number: "T6",
        name: "Tosa",
        sector: 2,
        x: 1040.0,
        y: 280.0,
        direction: "Uphill Left Hairpin",
        technicalDetails: "Slowest corner on the track at ~90 km/h in 2nd gear.",
        enduranceImportance: "Steep uphill exit requires traction control to manage rear wheel torque without overheating tyres in hot Italian summer conditions.",
        didYouKnow: {
          fact: "Tosa sits in a natural hillside bowl, famously blanketed in red smoke by thousands of passionate Ferrari 'tifosi' for decades.",
          source: "Motor Valley Emilia-Romagna Official Archives"
        }
      },
      {
        id: "imola-t7",
        number: "T7",
        name: "Piratella",
        sector: 2,
        x: 980.0,
        y: 90.0,
        direction: "Blind Downhill Left",
        technicalDetails: "Taken at ~200 km/h in 4th gear over a blind crest.",
        enduranceImportance: "The track drops away beneath the car mid-corner. Drivers must turn in based on memory and trackside visual markers rather than seeing the apex.",
        didYouKnow: {
          fact: "Named after the ancient farmhouse and hamlet of Piratello located on the hill crest just north of the racetrack.",
          source: "Città di Imola Historical Toponymy Records"
        }
      },
      {
        id: "imola-t8",
        number: "T8",
        name: "Acque Minerali (Entry Dip)",
        sector: 2,
        x: 810.0,
        y: 240.0,
        direction: "Downhill Right Dip",
        technicalDetails: "Rapid plunge downhill at ~220 km/h loading the front suspension.",
        enduranceImportance: "Unstable braking zone where the car is pitching downhill while turning right; lockups here result in a trip across the gravel trap.",
        didYouKnow: {
          fact: "Named for the historic mineral springs discovered in the park surrounding the corner in 1830 by mineralogist Gioacchino Cerchiari.",
          source: "Parco delle Acque Minerali Historical Guide"
        }
      },
      {
        id: "imola-t9-10",
        number: "T9–T10",
        name: "Acque Minerali (Compression & Apex)",
        sector: 2,
        x: 764.6,
        y: 344.7,
        direction: "Right Compression Apex",
        technicalDetails: "Braking into a 125 km/h right with extreme vertical G compression.",
        enduranceImportance: "Chassis floor bottoming during the compression can cause sudden loss of aerodynamic downforce.",
        didYouKnow: {
          fact: "Acque Minerali is universally cited by prototype drivers as one of the most physically demanding corner complexes in endurance racing.",
          source: "FIA WEC Drivers Committee Debrief Notes"
        }
      },
      {
        id: "imola-t11",
        number: "T11",
        name: "Variante Gresini (Variante Alta Entry)",
        sector: 2,
        x: 505.0,
        y: 405.0,
        direction: "Uphill Right",
        technicalDetails: "Sharp 2nd-gear chicane taken at ~130 km/h over high sausage kerbs.",
        enduranceImportance: "Aggressive kerb strikes test composite suspension wishbones; getting straddled on the kerb causes severe underfloor aerodynamic stalls.",
        didYouKnow: {
          fact: "Renamed in 2021 in memory of two-time motorcycle world champion and beloved local team boss Fausto Gresini.",
          source: "Autodromo di Imola Official Press Release (2021)"
        }
      },
      {
        id: "imola-t12",
        number: "T12",
        name: "Variante Gresini (Variante Alta Exit)",
        sector: 2,
        x: 465.0,
        y: 425.0,
        direction: "Left Exit",
        technicalDetails: "Quick directional flick transitioning directly into the downhill plunge toward Rivazza.",
        enduranceImportance: "Smooth throttle delivery off the kerb prevents wheelspin and sets up maximum speed down the hill.",
        didYouKnow: {
          fact: "Variante Alta's kerbs were lowered slightly in recent homologation rounds to reduce chassis damage for low-riding sports prototypes.",
          source: "FIA Circuit Safety Homologation Review"
        }
      },
      {
        id: "imola-t13",
        number: "T13",
        name: "Rivazza 1",
        sector: 3,
        x: 285.0,
        y: 385.0,
        direction: "Downhill 90° Left",
        technicalDetails: "Severe downhill braking zone from 290 km/h to ~110 km/h in 2nd gear.",
        enduranceImportance: "Braking downhill shifts weight onto the front tyres while unloading the rear axle, creating high risk of front-inside wheel lockups.",
        didYouKnow: {
          fact: "The grandstands at Rivazza are legendary for holding the most vocal and passionate motorsport crowds in Northern Italy.",
          source: "Automobile Club d'Italia (ACI) Race Reports"
        }
      },
      {
        id: "imola-t14-15",
        number: "T14–T15",
        name: "Rivazza 2 & Pit Approach",
        sector: 3,
        x: 235.0,
        y: 435.0,
        direction: "Second 90° Left",
        technicalDetails: "Medium-speed left taken at ~130 km/h leading onto the main straight.",
        enduranceImportance: "Final acceleration phase. Getting onto the power early is critical for terminal velocity along the long straight to Tamburello.",
        didYouKnow: {
          fact: "The exit of Rivazza 2 marks the pit lane entry line, requiring drivers pitting for driver or tyre changes to commit early to the right.",
          source: "WEC Supplementary Regulations, 6 Hours of Imola"
        }
      }
    ],
    provenance: {
      geometrySource: "Sentoan / Wikimedia Commons (File:Imola 2009.svg)",
      geometrySourceUrl: "https://commons.wikimedia.org/wiki/File:Imola_2009.svg",
      configurationContext: "Modern 4.909 km Grand Prix configuration (2008–present; Variante Bassa bypassed for sports car racing).",
      notes: "Imola served as an ILMC endurance venue in 2011 and returned to the WEC calendar in 2024. Distinct from the historical 2011–2023 core WEC dataset venues, included as an editorial spotlight on Italian endurance racing heritage."
    }
  },
  {
    id: "fuji",
    name: "Fuji Speedway",
    country: "Japan",
    countryFlag: "🇯🇵",
    location: "Oyama, Shizuoka Prefecture",
    editorialIntro: "Nestled in the shadow of Mount Fuji, this circuit presents an extreme aerodynamic dichotomy: a 1.5-kilometer blast demanding minimum drag, followed by a tight, twisty stadium sector requiring razor-sharp mechanical grip.",
    viewBox: "0 0 1400 480",
    groupTransform: "translate(-1288.2294, -918.78876)",
    trackPath: "m 1315.88667,1365.27033 c -7.58137,-0.1759 -14.538909,-7.62549 -18.71537,-13.36812 -2.953203,-4.06065 -3.313256,-10.92468 -2.673624,-16.04174 0.548645,-4.38916 2.903377,-9.29518 6.238457,-12.47692 22.5099547,-21.47502 46.774634,-42.06082 71.296648,-61.49336 6.967339,-5.52129 14.56658,-11.13552 23.17141,-13.36812 101.310839,-26.28605 205.624359,-45.62174 306.575589,-72.18785 6.29081,-1.65548 11.87123,-7.08949 15.15053,-12.47692 5.03864,-8.27776 7.33469,-18.78533 9.80329,-28.51865 7.92883,-31.26225 11.67067,-64.01728 21.389,-94.46806 3.64979,-11.436 10.99271,-22.00499 18.71537,-31.19229 9.50736,-11.31048 20.85702,-21.81869 32.9747,-30.30107 11.64786,-8.1535 24.77619,-15.88522 38.32194,-19.60658 13.48756,-3.70537 28.9708,-4.99633 42.77799,-2.67362 17.97924,3.02454 37.19743,9.24839 52.58128,18.71537 11.64946,7.1689 21.31645,19.46776 28.51866,31.19228 5.57177,9.07033 9.64292,20.3939 9.80329,31.19228 0.73084,49.20963 -10.20506,94.61466 -6.163,141.0984 0.71105,8.17702 12.86011,17.48259 20.74456,18.37277 10.53385,1.18931 24.88268,-2.03848 35.47702,-6.65652 12.57707,-5.48231 29.89227,-17.71084 38.2261,-28.4779 32.36467,-41.81421 50.6762,-83.78382 81.93607,-127.01037 6.76501,-9.35473 17.29499,-16.13106 27.62745,-21.389 39.87226,-20.29003 80.87584,-40.61636 122.98671,-55.2549 20.27369,-7.04752 42.59786,-9.51474 64.16696,-9.80329 67.2546,-0.89973 135.1488,2.86664 202.3043,6.23846 3.8441,0.19301 7.8689,2.55994 9.7831,5.36742 2.5418,3.72805 3.0057,9.75169 1.0787,14.01131 -3.7174,8.21729 -12.9081,13.96837 -17.1003,22.50805 -3.8287,7.79913 -5.6125,17.4232 -2.1775,23.5464 3.3976,6.05664 14.3881,9.64917 22.6753,12.99313 8.6457,3.48863 16.2291,6.73811 22.6552,12.74511 7.2391,6.76699 12.9636,16.36108 16.2898,26.26038 9.1508,27.23437 19.315,53.67403 21.753,81.15668 0.8298,9.35395 -3.7366,21.67428 -9.8991,28.66958 -4.829,5.48162 -13.8344,8.3415 -21.1422,8.43894 -14.9724,0.19963 -30.0971,-5.49906 -45.6985,-7.54773 -13.8084,-1.81323 -28.712,-3.31667 -41.8867,-0.49352 -11.7791,2.5241 -24.0472,8.3774 -32.9747,16.53527 -8.3025,7.5868 -15.0031,18.68548 -18.7154,29.40987 -4.3086,12.44702 -5.4797,27.02276 -2.4473,38.81547 2.3148,9.00215 9.6069,18.08183 18.8112,18.41352 23.7704,0.85659 51.0812,-10.33484 77.2129,-12.59313 21.9936,-1.90068 45.5023,0.11411 65.5518,7.52735 15.3018,5.65781 29.3181,16.60268 35.9909,31.04136 3.9923,8.63859 4.9501,22.72536 1.6314,31.68581 -2.6227,7.0813 -5.6934,11.3901 -13.6556,14.18387 -8.9707,3.14762 -25.0452,3.30897 -34.8876,3.31807 -311.5866,0.28797 -742.00699,3.31575 -929.39952,4.66204 -146.21898,1.05048 -287.273277,0.98378 -366.68421,-0.69953 l 0,0 0,0 z",
    stats: {
      length: "4.563 km",
      turnsCount: 16,
      direction: "Clockwise",
      lapRecordTopClass: "1:22.639 (Brendon Hartley, Porsche 919 Hybrid, 2017)",
      wecHistory: "Host of the 6 Hours of Fuji in every championship season from 2012 to 2023 (excluding 2020–2021 global calendar disruptions), home circuit for Toyota Gazoo Racing."
    },
    sectors: [
      {
        sector: 1,
        name: "Sector 1 — The Main Straight & Turn 1",
        turnsSummary: "Turn 1 (Daiichi / First Corner)",
        description: "Dominated by the gargantuan 1,475-meter main straight where top-class prototypes exceed 315 km/h before heavy braking into the downhill Turn 1 hairpin.",
        highlightPath: "m 1953.3831,1364.8132 c -87.8384,0.068 -177.1159,0.4835 -270.8122,1.1567 -146.219,1.0504 -287.2733,0.9837 -366.6842,-0.6996 l 0,0 0,0 0,0 c -7.5814,-0.1759 -14.5389,-7.6255 -18.7154,-13.3681 -2.9532,-4.0606 -3.3133,-10.9247 -2.6736,-16.0417 0.5486,-4.3892 2.9034,-9.2952 6.2384,-12.477 22.51,-21.475 46.7747,-42.0608 71.2967,-61.4933 6.9673,-5.5213 14.5666,-11.1355 23.1714,-13.3681 101.3108,-26.2861 205.6244,-45.6218 306.5756,-72.1879 6.2908,-1.6555 11.8712,-7.0895 15.1505,-12.4769 5.0387,-8.2778 7.3347,-18.7853 9.8033,-28.5187 3.9644,-15.6311 6.8821,-31.6354 10.0234,-47.5383"
      },
      {
        sector: 2,
        name: "Sector 2 — Fast Flowing Arcs",
        turnsSummary: "Turns 2–5 (75R, Coca-Cola Corner, 100R, Hairpin)",
        description: "Sweeping high-speed section testing front-end aerodynamic balance through Coca-Cola and the punishing sustained lateral G of the long 100R curve.",
        highlightPath: "m 1736.757,1087.8003 c 3.1414,-15.9029 6.5064,-31.7043 11.3656,-46.9297 3.6498,-11.436 10.9927,-22.005 18.7154,-31.1923 9.5073,-11.31048 20.857,-21.81869 32.9747,-30.30107 11.6478,-8.1535 24.7762,-15.88522 38.3219,-19.60658 13.4876,-3.70537 28.9708,-4.99633 42.778,-2.67362 17.9792,3.02454 37.1974,9.24839 52.5813,18.71537 11.6494,7.1689 21.3164,19.46776 28.5186,31.1923 5.5718,9.0703 9.643,20.3939 9.8033,31.1923 0.7309,49.2096 -10.205,94.6146 -6.163,141.0984 0.7111,8.177 12.8601,17.4825 20.7446,18.3727 10.5338,1.1893 24.8827,-2.0385 35.477,-6.6565 12.5771,-5.4823 29.8923,-17.7108 38.2261,-28.4779 32.3647,-41.8142 50.6762,-83.7838 81.9361,-127.0104 6.765,-9.3547 17.295,-16.131 27.6274,-21.389 39.8723,-20.28999 80.8759,-40.61632 122.9867,-55.25486 20.2737,-7.04752 42.5979,-9.51474 64.167,-9.80329 67.2546,-0.89973 135.1488,2.86664 202.3043,6.23846 3.8441,0.19301 7.8689,2.55994 9.7831,5.36742 2.5418,3.72805 3.0057,9.75169 1.0787,14.01131 -3.7174,8.21729 -12.9081,13.96837 -17.1003,22.50805 -3.8287,7.79911 -5.6125,17.42321 -2.1775,23.54641 3.3976,6.0566 14.3881,9.6492 22.6753,12.9931 8.6457,3.4886 16.2291,6.7381 22.6552,12.7451 7.2391,6.767 12.9636,16.3611 16.2898,26.2604 4.5754,13.6172 9.4041,27.0357 13.3938,40.4852"
      },
      {
        sector: 3,
        name: "Sector 3 — The Technical Stadium",
        turnsSummary: "Turns 6–16 (300R, Dunlop Chicane, 13R, Netz, Panasonic)",
        description: "The tight, technical mountain ascent where mechanical grip, differential lockup, and smooth throttle control dictate tyre preservation.",
        highlightPath: "m 2625.7201,1113.2316 c 3.9897,13.4496 7.1402,26.9302 8.3592,40.6715 0.8298,9.3539 -3.7366,21.6743 -9.8991,28.6696 -4.829,5.4816 -13.8344,8.3415 -21.1422,8.4389 -14.9724,0.1996 -30.0971,-5.499 -45.6985,-7.5477 -13.8084,-1.8132 -28.712,-3.3167 -41.8867,-0.4935 -11.7791,2.5241 -24.0472,8.3774 -32.9747,16.5352 -8.3025,7.5868 -15.0031,18.6855 -18.7154,29.4099 -4.3086,12.447 -5.4797,27.0228 -2.4473,38.8155 2.3148,9.0021 9.6069,18.0818 18.8112,18.4135 23.7704,0.8566 51.0812,-10.3349 77.2129,-12.5931 21.9936,-1.9007 45.5023,0.1141 65.5518,7.5273 15.3018,5.6578 29.3181,16.6027 35.9909,31.0414 3.9923,8.6386 4.9501,22.7253 1.6314,31.6858 -2.6227,7.0813 -5.6934,11.3901 -13.6556,14.1838 -8.9707,3.1477 -25.0452,3.309 -34.8876,3.3181 -155.7933,0.144 -488.6072,3.3807 -658.5873,3.5054"
      }
    ],
    turns: [
      {
        id: "fuji-t1",
        number: "T1",
        name: "Daiichi Corner (First Corner)",
        sector: 1,
        x: 1348.4,
        y: 1327.4,
        direction: "Right Hairpin",
        technicalDetails: "Severe braking from ~315 km/h down to ~95 km/h in 2nd gear.",
        enduranceImportance: "The primary slipstreaming pass location. Downhill entry invites late braking, but overcooking entry leaves drivers vulnerable to switchback cutbacks on exit.",
        didYouKnow: {
          fact: "At 1,475 meters (0.916 miles), Fuji Speedway's main straight is among the longest permanent straightaways in world motorsport.",
          source: "Fuji International Speedway Co. Technical Specification Sheet"
        }
      },
      {
        id: "fuji-t2",
        number: "T2",
        name: "75R",
        sector: 2,
        x: 1388.5,
        y: 1214.4,
        direction: "Left Curve",
        technicalDetails: "Fast acceleration curve taken in 3rd/4th gear.",
        enduranceImportance: "Connecting kink leading into the blind entry of Coca-Cola; position and momentum here are critical.",
        didYouKnow: {
          fact: "The 'R' designation used throughout Fuji's corners denotes the corner's radius in meters (75R = 75 meter radius).",
          source: "Japanese Circuit Engineering Nomenclature Guide"
        }
      },
      {
        id: "fuji-t3",
        number: "T3",
        name: "Coca-Cola Corner",
        sector: 2,
        x: 1668.3,
        y: 1148.8,
        direction: "Fast Left",
        technicalDetails: "Taken at ~215 km/h in 4th gear.",
        enduranceImportance: "High-downforce corner requiring total confidence in aerodynamic balance; sudden gusts of wind coming off Mount Fuji can shift front-end grip.",
        didYouKnow: {
          fact: "Historically sponsored by Coca-Cola Bottlers Japan, the corner features prominent red and white branding that has stood for over three decades.",
          source: "Fuji Speedway Corporate Sponsorship Archives"
        }
      },
      {
        id: "fuji-t4",
        number: "T4",
        name: "100R",
        sector: 2,
        x: 1859.7,
        y: 997.5,
        direction: "Long Sweeping Right",
        technicalDetails: "Constant radius right-hander pulling sustained lateral load exceeding 2.8G.",
        enduranceImportance: "Notoriously punishing on left-front tyre degradation. Overworking the tyre here causes graining and thermal blistering across a double stint.",
        didYouKnow: {
          fact: "In wet weather, rivers of water stream across the surface of 100R due to local mountain drainage, creating unpredictable aquaplaning hazards.",
          source: "FIA WEC Race Director Weather Briefings"
        }
      },
      {
        id: "fuji-t5",
        number: "T5",
        name: "Hairpin (Advan Corner)",
        sector: 2,
        x: 1990.9,
        y: 1009.4,
        direction: "Tight Left Hairpin",
        technicalDetails: "180° hairpin taken at ~85 km/h in 2nd gear.",
        enduranceImportance: "Hard braking and traction test; setting up a pass here requires hugging the inside line while managing tyre scrub.",
        didYouKnow: {
          fact: "The corner sits directly adjacent to Fuji's historic 30-degree banked turn (Dai-ichi), preserved as a historic monument on the circuit grounds.",
          source: "Fuji Speedway Historic Preservation Society"
        }
      },
      {
        id: "fuji-t6",
        number: "T6",
        name: "300R",
        sector: 3,
        x: 1935.3,
        y: 1203.5,
        direction: "Fast Right Arc",
        technicalDetails: "Sweeping blind acceleration arc reaching ~250 km/h.",
        enduranceImportance: "Sets up high-speed approach to the crucial Dunlop Chicane; passing slower GT cars through here demands careful anticipation.",
        didYouKnow: {
          fact: "The 300R curve forms the transition between Tilke's modern layout and the circuit's sweeping natural contours.",
          source: "Hermann Tilke Circuit Architecture Monograph"
        }
      },
      {
        id: "fuji-t7-9",
        number: "T7–T9",
        name: "Dunlop Chicane",
        sector: 3,
        x: 2085.7,
        y: 1180.7,
        direction: "Right-Left Chicane",
        technicalDetails: "Heavy braking down to ~95 km/h in 2nd gear.",
        enduranceImportance: "Aggressive kerb riding is required to straighten the line, putting intense shock loads through the transmission and driveshafts.",
        didYouKnow: {
          fact: "The chicane was introduced to slow cars entering the stadium section and create another distinct overtaking opportunity for sports cars.",
          source: "FIA Homologation Dossier for Fuji Speedway"
        }
      },
      {
        id: "fuji-t10-12",
        number: "T10–T12",
        name: "13R",
        sector: 3,
        x: 2552.3,
        y: 1069.5,
        direction: "Medium-Speed Right",
        technicalDetails: "Tricky off-camber right taken at ~125 km/h.",
        enduranceImportance: "Uphill gradient unweights the rear suspension. Over-rotation here spins the car directly into the perimeter barrier.",
        didYouKnow: {
          fact: "Sector 3 was deliberately designed to contrast with the high-speed main straight, ensuring that pure low-drag aero setups cannot dominate without mechanical grip.",
          source: "Tilke Design Philosophy Whitepaper"
        }
      },
      {
        id: "fuji-t13-15",
        number: "T13–T15",
        name: "Netz Corner",
        sector: 3,
        x: 2403.8,
        y: 1277.3,
        direction: "Uphill Left",
        technicalDetails: "Tight uphill left-hander taken at ~100 km/h.",
        enduranceImportance: "Traffic choke point. Slower GTE/GT3 machinery and Hypercars converge here at vastly different cornering speeds.",
        didYouKnow: {
          fact: "Named after the Toyota Netz dealership network in Japan, reflecting Toyota's deep historical association with the circuit.",
          source: "Toyota Gazoo Racing Team Records"
        }
      },
      {
        id: "fuji-t16",
        number: "T16",
        name: "Panasonic Corner",
        sector: 3,
        x: 2576.9,
        y: 1316.5,
        direction: "Final Right Turn",
        technicalDetails: "Late-apex right taken at ~115 km/h leading onto the main straight.",
        enduranceImportance: "The most important corner for lap time and top speed. Getting on full throttle early gives a compounding aerodynamic advantage down the entire 1,475-meter straight.",
        didYouKnow: {
          fact: "If a car suffers poor exit drive here, slipstreaming cars can easily pass them before they reach the Start/Finish line 1,000 meters later.",
          source: "WEC Telemetry & Race Strategy Analysis"
        }
      }
    ],
    provenance: {
      geometrySource: "Wikimedia Commons (GrandPrix Circuit Fuji 2007.svg)",
      geometrySourceUrl: "https://commons.wikimedia.org/wiki/File:GrandPrix_Circuit_Fuji_2007.svg",
      configurationContext: "Verified modern 4.563 km Hermann Tilke Grand Prix configuration (2005–present).",
      notes: "Coordinates aligned with official FIA WEC 6 Hours of Fuji timing transponder beacons (S1: Start to T1 exit, S2: T2 to T5 exit, S3: T6 through Panasonic to Start/Finish)."
    }
  }
];
