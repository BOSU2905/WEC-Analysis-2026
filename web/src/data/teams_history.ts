// Historical Verification Matrix and Season Provenance for Teams
// Verified against analysis/notebooks/wec_analytical_foundation.ipynb,
// data/raw/wec_data.csv, official FIA WEC, and ACO archives.
// Constraints verified:
// - 2011 is strictly labelled as Pre-WEC: Intercontinental Le Mans Cup (ILMC).
// - Hypercar began in 2021.
// - LMGTE Pro ended after 2022.
// - LMGTE Am ended after 2023 (LMGT3 began in 2024, not in 2023).
// - Season champions are separated from race winners.
// - Overall race winners are distinguished from class race winners.

export interface ChampionEntry {
  category: "Overall / Top Class" | "LMP2" | "LMGTE Pro" | "LMGTE Am";
  team: string;
  manufacturer: string;
  car: string;
  drivers: string[];
  note?: string;
}

export interface FeaturedTeam {
  id: string;
  name: string;
  manufacturer: string;
  category: string;
  carNumber: string;
  carModel: string;
  drivers: string[];
  historicalSignificance: string;
  keyStat: string;
  accentColor: string;
}

export interface RaceWinner {
  race: string;
  overallWinner: {
    car: string;
    team: string;
    vehicle: string;
    drivers: string[];
  };
  classWinners: Array<{
    category: string;
    car: string;
    team: string;
    vehicle: string;
    drivers: string[];
  }>;
}

export interface SeasonHistory {
  season: string;
  label: string;
  seriesContext: string;
  era: "ILMC Era" | "LMP1 Golden Hybrid Era" | "LMP1 Twilight Era" | "Hypercar Era";
  dominantManufacturer: string;
  summary: string;
  champions: ChampionEntry[];
  featuredTeams: FeaturedTeam[];
  races: RaceWinner[];
  sourceProvenance: string;
}

export const TEAMS_HISTORY: SeasonHistory[] = [
  {
    "season": "2011",
    "label": "2011",
    "seriesContext": "Pre-WEC: Intercontinental Le Mans Cup (ILMC) & 79th 24 Hours of Le Mans",
    "era": "ILMC Era",
    "dominantManufacturer": "Audi & Peugeot",
    "summary": "Prior to the establishment of the FIA World Endurance Championship in 2012, top-level sports car competition was organized under the Intercontinental Le Mans Cup. At the 2011 24 Hours of Le Mans, Audi's sole remaining factory R18 TDI held off three Peugeot 908 entries to win by 13.854 seconds.",
    "champions": [
      {
        "category": "Overall / Top Class",
        "team": "Peugeot Sport Total (ILMC LMP1 Team Title) / Audi Sport Team Joest (Le Mans Winners)",
        "manufacturer": "Peugeot / Audi",
        "car": "Peugeot 908 & Audi R18 TDI",
        "drivers": [
          "Marcel F\u00e4ssler",
          "Andr\u00e9 Lotterer",
          "Beno\u00eet Tr\u00e9luyer (Le Mans)"
        ],
        "note": "FIA WEC was inaugurated in 2012, and 2011 records reflect the predecessor Intercontinental Le Mans Cup."
      },
      {
        "category": "LMP2",
        "team": "Oak Racing",
        "manufacturer": "Pescarolo-Judd",
        "car": "Pescarolo 01",
        "drivers": [
          "Alexandre Pr\u00e9mat",
          "Matthieu Lahaye"
        ],
        "note": "ILMC LMP2 Team Cup winner"
      },
      {
        "category": "LMGTE Pro",
        "team": "AF Corse",
        "manufacturer": "Ferrari",
        "car": "Ferrari 458 Italia GT2",
        "drivers": [
          "Giancarlo Fisichella",
          "Gianmaria Bruni"
        ],
        "note": "ILMC GTE Pro Team Cup winner"
      }
    ],
    "featuredTeams": [
      {
        "id": "audi-joest-2011",
        "name": "Audi Sport Team Joest",
        "manufacturer": "Audi",
        "category": "LMP1",
        "carNumber": "#2",
        "carModel": "Audi R18 TDI",
        "drivers": [
          "Marcel F\u00e4ssler",
          "Andr\u00e9 Lotterer",
          "Beno\u00eet Tr\u00e9luyer"
        ],
        "historicalSignificance": "Following heavy accidents that eliminated the #1 and #3 entries, the sole remaining #2 R18 TDI held off the three-car Peugeot team to win Le Mans by under 14 seconds.",
        "keyStat": "13.854s margin of victory at Le Mans",
        "accentColor": "#b8493e"
      },
      {
        "id": "peugeot-sport-2011",
        "name": "Peugeot Sport Total",
        "manufacturer": "Peugeot",
        "category": "LMP1",
        "carNumber": "#9",
        "carModel": "Peugeot 908",
        "drivers": [
          "S\u00e9bastien Bourdais",
          "Simon Pagenaud",
          "Pedro Lamy"
        ],
        "historicalSignificance": "Peugeot claimed the 2011 ILMC LMP1 team championship with five race victories before closing its prototype programme ahead of the 2012 season.",
        "keyStat": "5 ILMC race victories in 2011",
        "accentColor": "#002c6c"
      }
    ],
    "sourceProvenance": "Official ACO 2011 Le Mans Results & 2011 Intercontinental Le Mans Cup Sporting Classification.",
    "races": [
      {
        "race": "LeMans",
        "overallWinner": {
          "car": "Audi Sport Team Joest #2",
          "team": "Audi Sport Team Joest",
          "vehicle": "Audi R18 TDI",
          "drivers": [
            "Marcel Fassler",
            "Andr\u00e9 Lotterer",
            "Benoit Treluyer"
          ]
        },
        "classWinners": [
          {
            "category": "LM P1",
            "car": "Audi Sport Team Joest #2",
            "team": "Audi Sport Team Joest",
            "vehicle": "Audi R18 TDI",
            "drivers": [
              "Marcel Fassler",
              "Andr\u00e9 Lotterer",
              "Benoit Treluyer"
            ]
          },
          {
            "category": "LM P2",
            "car": "Greaves Motorsport #41",
            "team": "Greaves Motorsport",
            "vehicle": "Zytek Nissan",
            "drivers": [
              "Karim Ojjeh",
              "Olivier Lombard",
              "Thomas Kimber-Smith"
            ]
          },
          {
            "category": "LM GTE Pro",
            "car": "Corvette Racing #73",
            "team": "Corvette Racing",
            "vehicle": "Chevrolet Corvette C6 ZR1",
            "drivers": [
              "Antonio Garcia",
              "Tommy Milner",
              "Olivier Beretta"
            ]
          },
          {
            "category": "LM GTE Am",
            "car": "Larbre Competition #50",
            "team": "Larbre Competition",
            "vehicle": "Chevrolet Corvette C6 ZR1",
            "drivers": [
              "Patrick Bornhauser",
              "Julien Canal",
              "Gabriele Gardel"
            ]
          }
        ]
      }
    ]
  },
  {
    "season": "2012",
    "label": "2012",
    "seriesContext": "Inaugural FIA World Endurance Championship Season",
    "era": "LMP1 Golden Hybrid Era",
    "dominantManufacturer": "Audi",
    "summary": "The FIA World Championship status returned to endurance racing for the first time since 1992. Audi introduced hybrid all-wheel drive with the R18 e-tron quattro, claiming the inaugural championship and the first hybrid overall victory at Le Mans, while Toyota entered the series mid-season.",
    "champions": [
      {
        "category": "Overall / Top Class",
        "team": "Audi Sport Team Joest",
        "manufacturer": "Audi",
        "car": "Audi R18 e-tron quattro / Ultra",
        "drivers": [
          "Marcel F\u00e4ssler",
          "Andr\u00e9 Lotterer",
          "Beno\u00eet Tr\u00e9luyer"
        ],
        "note": "Inaugural FIA World Endurance Drivers' & Manufacturers' Champions"
      },
      {
        "category": "LMP2",
        "team": "Starworks Motorsport",
        "manufacturer": "HPD",
        "car": "HPD ARX-03b",
        "drivers": [
          "Ryan Dalziel",
          "St\u00e9phane Sarrazin",
          "Vicente Potolicchio"
        ],
        "note": "FIA Endurance Trophy for LMP2 Teams"
      },
      {
        "category": "LMGTE Pro",
        "team": "AF Corse",
        "manufacturer": "Ferrari",
        "car": "Ferrari 458 Italia GT2",
        "drivers": [
          "Gianmaria Bruni",
          "Giancarlo Fisichella"
        ],
        "note": "FIA World Cup for GT Manufacturers (Ferrari) & GTE Pro Trophy"
      }
    ],
    "featuredTeams": [
      {
        "id": "audi-joest-2012",
        "name": "Audi Sport Team Joest",
        "manufacturer": "Audi",
        "category": "LMP1",
        "carNumber": "#1",
        "carModel": "Audi R18 e-tron quattro",
        "drivers": [
          "Marcel F\u00e4ssler",
          "Andr\u00e9 Lotterer",
          "Beno\u00eet Tr\u00e9luyer"
        ],
        "historicalSignificance": "Introduced hybrid all-wheel drive to prototype competition, scoring victories at Sebring, Spa, Le Mans, and Silverstone to become the inaugural WEC World Champions.",
        "keyStat": "Inaugural FIA WEC World Champions",
        "accentColor": "#b8493e"
      },
      {
        "id": "toyota-racing-2012",
        "name": "Toyota Racing",
        "manufacturer": "Toyota",
        "category": "LMP1",
        "carNumber": "#7",
        "carModel": "Toyota TS030 Hybrid",
        "drivers": [
          "Alexander Wurz",
          "Nicolas Lapierre",
          "Kazuki Nakajima"
        ],
        "historicalSignificance": "Introduced supercapacitor energy storage to the WEC, capturing three victories in its partial debut season (S\u00e3o Paulo, Fuji, Shanghai) against Audi.",
        "keyStat": "3 victories in 6 starts",
        "accentColor": "#d32f2f"
      }
    ],
    "sourceProvenance": "Official FIA WEC 2012 Sporting Classifications & ACO Archive.",
    "races": [
      {
        "race": "Silverstone",
        "overallWinner": {
          "car": "Audi Sport Team Joest #1",
          "team": "Audi Sport Team Joest",
          "vehicle": "Audi R18 e-tron quattro",
          "drivers": [
            "Marcel F\u00e4ssler",
            "Andr\u00e9 Lotterer",
            "Benoit Tr\u00e9luyer"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Audi Sport Team Joest #1",
            "team": "Audi Sport Team Joest",
            "vehicle": "Audi R18 e-tron quattro",
            "drivers": [
              "Marcel F\u00e4ssler",
              "Andr\u00e9 Lotterer",
              "Benoit Tr\u00e9luyer"
            ]
          },
          {
            "category": "LMP2",
            "car": "ADR-Delta #25",
            "team": "ADR-Delta",
            "vehicle": "Oreca 03 - Nissan",
            "drivers": [
              "John Martin",
              "Jan Charouz",
              "Tor Graves"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "AF Corse #51",
            "team": "AF Corse",
            "vehicle": "Ferrari F458 Italia",
            "drivers": [
              "Giancarlo Fisichella",
              "Gianmaria Bruni"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "AF Corse-Waltrip #61",
            "team": "AF Corse-Waltrip",
            "vehicle": "Ferrari F458 Italia",
            "drivers": [
              "Piergiuseppe Perazzini",
              "Marco Cioci",
              "Matt Griffin"
            ]
          }
        ]
      },
      {
        "race": "Spa",
        "overallWinner": {
          "car": "Audi Sport Team Joest #3",
          "team": "Audi Sport Team Joest",
          "vehicle": "Audi R18 Ultra",
          "drivers": [
            "Romain Dumas",
            "Loic Duval",
            "Marc Gen\u00e9"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Audi Sport Team Joest #3",
            "team": "Audi Sport Team Joest",
            "vehicle": "Audi R18 Ultra",
            "drivers": [
              "Romain Dumas",
              "Loic Duval",
              "Marc Gen\u00e9"
            ]
          },
          {
            "category": "LMP2",
            "car": "Jota #38",
            "team": "Jota",
            "vehicle": "Zytek Z11SN - Nissan",
            "drivers": [
              "Simon Dolan",
              "Sam Hancock"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Team Felbermayr-Proton #77",
            "team": "Team Felbermayr-Proton",
            "vehicle": "Porsche 911 RSR (997)",
            "drivers": [
              "Marc Lieb",
              "Richard Lietz"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Imsa Performance Matmut #67",
            "team": "Imsa Performance Matmut",
            "vehicle": "Porsche 911 RSR (997)",
            "drivers": [
              "Nicolas Armindo",
              "Raymond Narac",
              "Anthony Pons"
            ]
          }
        ]
      },
      {
        "race": "Bahrain",
        "overallWinner": {
          "car": "Audi Sport Team Joest #1",
          "team": "Audi Sport Team Joest",
          "vehicle": "Audi R18 e-tron quattro",
          "drivers": [
            "Marcel F\u00e4ssler",
            "Andr\u00e9 Lotterer",
            "Benoit Tr\u00e9luyer"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Audi Sport Team Joest #1",
            "team": "Audi Sport Team Joest",
            "vehicle": "Audi R18 e-tron quattro",
            "drivers": [
              "Marcel F\u00e4ssler",
              "Andr\u00e9 Lotterer",
              "Benoit Tr\u00e9luyer"
            ]
          },
          {
            "category": "LMP2",
            "car": "Pecom Racing #49",
            "team": "Pecom Racing",
            "vehicle": "Oreca 03 - Nissan",
            "drivers": [
              "Luis Perez Companc",
              "Nicolas Minassian",
              "Pierre Kaffer"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "AF Corse #51",
            "team": "AF Corse",
            "vehicle": "Ferrari F458 Italia",
            "drivers": [
              "Giancarlo Fisichella",
              "Toni Vilander"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Team Felbermayr-Proton #88",
            "team": "Team Felbermayr-Proton",
            "vehicle": "Porsche 911 RSR (997)",
            "drivers": [
              "Christian Ried",
              "Gianluca Roda",
              "Paolo Ruberti"
            ]
          }
        ]
      },
      {
        "race": "Shanghai",
        "overallWinner": {
          "car": "Toyota Racing #7",
          "team": "Toyota Racing",
          "vehicle": "Toyota TS030 - Hybrid",
          "drivers": [
            "Alexander Wurz",
            "Nicolas Lapierre"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Toyota Racing #7",
            "team": "Toyota Racing",
            "vehicle": "Toyota TS030 - Hybrid",
            "drivers": [
              "Alexander Wurz",
              "Nicolas Lapierre"
            ]
          },
          {
            "category": "LMP2",
            "car": "ADR-Delta #25",
            "team": "ADR-Delta",
            "vehicle": "Oreca 03 - Nissan",
            "drivers": [
              "John Martin",
              "Tor Graves",
              "Mathias Beche"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Aston Martin Racing #97",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin Vantage V8",
            "drivers": [
              "Stefan M\u00fccke",
              "Darren Turner"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Larbre Competition #50",
            "team": "Larbre Competition",
            "vehicle": "Chevrolet Corvette C6-ZR1",
            "drivers": [
              "Patrick Bornhauser",
              "Julien Canal",
              "Pedro Lamy"
            ]
          }
        ]
      },
      {
        "race": "Fuji",
        "overallWinner": {
          "car": "Toyota Racing #7",
          "team": "Toyota Racing",
          "vehicle": "Toyota TS030 - Hybrid",
          "drivers": [
            "Alexander Wurz",
            "Nicolas Lapierre",
            "Kazuki Nakajima"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Toyota Racing #7",
            "team": "Toyota Racing",
            "vehicle": "Toyota TS030 - Hybrid",
            "drivers": [
              "Alexander Wurz",
              "Nicolas Lapierre",
              "Kazuki Nakajima"
            ]
          },
          {
            "category": "LMP2",
            "car": "ADR-Delta #25",
            "team": "ADR-Delta",
            "vehicle": "Oreca 03 - Nissan",
            "drivers": [
              "John Martin",
              "Tor Graves",
              "Shinji Nakano"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Team Felbermayr-Proton #77",
            "team": "Team Felbermayr-Proton",
            "vehicle": "Porsche 911 RSR (997)",
            "drivers": [
              "Marc Lieb",
              "Richard Lietz"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Larbre Competition #50",
            "team": "Larbre Competition",
            "vehicle": "Chevrolet Corvette C6-ZR1",
            "drivers": [
              "Patrick Bornhauser",
              "Julien Canal",
              "Pedro Lamy"
            ]
          }
        ]
      },
      {
        "race": "Interlagos",
        "overallWinner": {
          "car": "Toyota Racing #7",
          "team": "Toyota Racing",
          "vehicle": "Toyota TS030 - Hybrid",
          "drivers": [
            "Alexander Wurz",
            "Nicolas Lapierre"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Toyota Racing #7",
            "team": "Toyota Racing",
            "vehicle": "Toyota TS030 - Hybrid",
            "drivers": [
              "Alexander Wurz",
              "Nicolas Lapierre"
            ]
          },
          {
            "category": "LMP2",
            "car": "Starworks Motorsports #44",
            "team": "Starworks Motorsports",
            "vehicle": "HPD ARX 03b - Honda",
            "drivers": [
              "Vicente Potolicchio",
              "Ryan Dalziel",
              "St\u00e9phane Sarrazin"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "AF Corse #51",
            "team": "AF Corse",
            "vehicle": "Ferrari F458 Italia",
            "drivers": [
              "Giancarlo Fisichella",
              "Gianmaria Bruni"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Team Felbermayr-Proton #88",
            "team": "Team Felbermayr-Proton",
            "vehicle": "Porsche 911 RSR (997)",
            "drivers": [
              "Christian Ried",
              "Gianluca Roda",
              "Paolo Ruberti"
            ]
          }
        ]
      },
      {
        "race": "LeMans",
        "overallWinner": {
          "car": "Audi Sport Team Joest #1",
          "team": "Audi Sport Team Joest",
          "vehicle": "Audi R18 e-tron quattro",
          "drivers": [
            "Marcel F\u00e4ssler",
            "Andr\u00e9 Lotterer",
            "Benoit Tr\u00e9luyer"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Audi Sport Team Joest #1",
            "team": "Audi Sport Team Joest",
            "vehicle": "Audi R18 e-tron quattro",
            "drivers": [
              "Marcel F\u00e4ssler",
              "Andr\u00e9 Lotterer",
              "Benoit Tr\u00e9luyer"
            ]
          },
          {
            "category": "LMP2",
            "car": "Starworks Motorsports #44",
            "team": "Starworks Motorsports",
            "vehicle": "HPD ARX 03b - Honda",
            "drivers": [
              "Vicente Potolicchio",
              "Ryan Dalziel",
              "Thomas Kimber-Smith"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "AF Corse #51",
            "team": "AF Corse",
            "vehicle": "Ferrari 458 Italia",
            "drivers": [
              "Giancarlo Fisichella",
              "Gianmaria Bruni",
              "Toni Vilander"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Larbre Competition #50",
            "team": "Larbre Competition",
            "vehicle": "Chevrolet Corvette C6 ZR1",
            "drivers": [
              "Patrick Bornhauser",
              "Julien Canal",
              "Pedro Lamy"
            ]
          },
          {
            "category": "CDNT",
            "car": "Highcroft Racing #0",
            "team": "Highcroft Racing",
            "vehicle": "Delta Wing Nissan",
            "drivers": [
              "Marino Franchitti",
              "Michael Krumm",
              "Satoshi Motoyama"
            ]
          }
        ]
      },
      {
        "race": "Sebring",
        "overallWinner": {
          "car": "Audi Sport Team Joest #2",
          "team": "Audi Sport Team Joest",
          "vehicle": "Audi R18",
          "drivers": [
            "Dindo Capello",
            "Tom Kristensen",
            "Allan McNish"
          ]
        },
        "classWinners": [
          {
            "category": "LM P1",
            "car": "Audi Sport Team Joest #2",
            "team": "Audi Sport Team Joest",
            "vehicle": "Audi R18",
            "drivers": [
              "Dindo Capello",
              "Tom Kristensen",
              "Allan McNish"
            ]
          },
          {
            "category": "LM P2",
            "car": "Starworks Motorsports #44",
            "team": "Starworks Motorsports",
            "vehicle": "HPD ARX 03b - Honda",
            "drivers": [
              "Vicente Potolicchio",
              "Ryan Dalziel",
              "St\u00e9phane Sarrazin"
            ]
          },
          {
            "category": "LM GTE Pro",
            "car": "AF Corse #71",
            "team": "AF Corse",
            "vehicle": "Ferrari F458 Italia",
            "drivers": [
              "Andrea Bertolini",
              "Olivier Beretta",
              "Marco Cioci"
            ]
          },
          {
            "category": "LM GTE Am",
            "car": "Team Felbermayr-Proton #88",
            "team": "Team Felbermayr-Proton",
            "vehicle": "Porsche 911 RSR (997)",
            "drivers": [
              "Christian Ried",
              "Gianluca Roda",
              "Paolo Ruberti"
            ]
          }
        ]
      }
    ]
  },
  {
    "season": "2013",
    "label": "2013",
    "seriesContext": "2nd FIA World Endurance Championship Season",
    "era": "LMP1 Golden Hybrid Era",
    "dominantManufacturer": "Audi",
    "summary": "Audi retained the World Championship against a full-season campaign from Toyota. Tom Kristensen took a record ninth 24 Hours of Le Mans victory, securing the World Championship alongside Lo\u00efc Duval and Allan McNish.",
    "champions": [
      {
        "category": "Overall / Top Class",
        "team": "Audi Sport Team Joest",
        "manufacturer": "Audi",
        "car": "Audi R18 e-tron quattro",
        "drivers": [
          "Tom Kristensen",
          "Lo\u00efc Duval",
          "Allan McNish"
        ],
        "note": "World Endurance Drivers' & Manufacturers' Champions"
      },
      {
        "category": "LMP2",
        "team": "OAK Racing",
        "manufacturer": "Morgan-Nissan",
        "car": "Morgan LMP2",
        "drivers": [
          "Bertrand Baguette",
          "Martin Plowman",
          "Ricardo Gonz\u00e1lez"
        ],
        "note": "FIA Endurance Trophy for LMP2 Teams & Drivers"
      },
      {
        "category": "LMGTE Pro",
        "team": "AF Corse",
        "manufacturer": "Ferrari",
        "car": "Ferrari 458 Italia GT2",
        "drivers": [
          "Gianmaria Bruni"
        ],
        "note": "World Endurance Cup for GT Drivers & Manufacturers"
      }
    ],
    "featuredTeams": [
      {
        "id": "audi-joest-2013",
        "name": "Audi Sport Team Joest",
        "manufacturer": "Audi",
        "category": "LMP1",
        "carNumber": "#2",
        "carModel": "Audi R18 e-tron quattro",
        "drivers": [
          "Tom Kristensen",
          "Lo\u00efc Duval",
          "Allan McNish"
        ],
        "historicalSignificance": "Navigated variable wet-and-dry conditions to win the 24 Hours of Le Mans and three WEC rounds, securing the World Championship for Allan McNish, Tom Kristensen, and Lo\u00efc Duval.",
        "keyStat": "Kristensen's 9th Le Mans win & World Title",
        "accentColor": "#b8493e"
      },
      {
        "id": "oak-racing-2013",
        "name": "OAK Racing",
        "manufacturer": "Morgan",
        "category": "LMP2",
        "carNumber": "#35",
        "carModel": "Morgan LMP2 - Nissan",
        "drivers": [
          "Bertrand Baguette",
          "Martin Plowman",
          "Ricardo Gonz\u00e1lez"
        ],
        "historicalSignificance": "Recorded a 1-2 class finish at Le Mans and secured the LMP2 Drivers' and Teams' trophies through consistent podium finishes across the season.",
        "keyStat": "LMP2 Class 1-2 sweep at Le Mans",
        "accentColor": "#e69d45"
      }
    ],
    "sourceProvenance": "Official FIA WEC 2013 Sporting Regulations & Classifications.",
    "races": [
      {
        "race": "Silverstone",
        "overallWinner": {
          "car": "Audi Sport Team Joest #2",
          "team": "Audi Sport Team Joest",
          "vehicle": "Audi R18 e-tron quattro",
          "drivers": [
            "Tom KRISTENSEN",
            "Lo\u00efc DUVAL",
            "Allan McNISH"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Audi Sport Team Joest #2",
            "team": "Audi Sport Team Joest",
            "vehicle": "Audi R18 e-tron quattro",
            "drivers": [
              "Tom KRISTENSEN",
              "Lo\u00efc DUVAL",
              "Allan McNISH"
            ]
          },
          {
            "category": "LMP2",
            "car": "Delta-ADR #25",
            "team": "Delta-ADR",
            "vehicle": "Oreca 03 - Nissan",
            "drivers": [
              "Tor GRAVES",
              "Antonio PIZZONIA",
              "James WALKER"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Aston Martin Racing #97",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin Vantage V8",
            "drivers": [
              "Darren TURNER",
              "Stefan M\u00dcCKE",
              "Bruno SENNA"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Aston Martin Racing #95",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin Vantage V8",
            "drivers": [
              "Christoffer NYGAARD",
              "Kristian POULSEN",
              "Allan SIMONSEN"
            ]
          }
        ]
      },
      {
        "race": "Spa",
        "overallWinner": {
          "car": "Audi Sport Team Joest #1",
          "team": "Audi Sport Team Joest",
          "vehicle": "Audi R18 e-tron quattro",
          "drivers": [
            "Andr\u00e9 LOTTERER",
            "Benoit TR\u00c9LUYER",
            "Marcel F\u00c4SSLER"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Audi Sport Team Joest #1",
            "team": "Audi Sport Team Joest",
            "vehicle": "Audi R18 e-tron quattro",
            "drivers": [
              "Andr\u00e9 LOTTERER",
              "Benoit TR\u00c9LUYER",
              "Marcel F\u00c4SSLER"
            ]
          },
          {
            "category": "LMP2",
            "car": "Pecom Racing #49",
            "team": "Pecom Racing",
            "vehicle": "Oreca 03 - Nissan",
            "drivers": [
              "Luis PEREZ COMPANC",
              "Nicolas MINASSIAN",
              "Pierre KAFFER"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "AF Corse #51",
            "team": "AF Corse",
            "vehicle": "Ferrari F458 Italia",
            "drivers": [
              "Gianmaria BRUNI",
              "Giancarlo FISICHELLA"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "8 Star Motorsports #81",
            "team": "8 Star Motorsports",
            "vehicle": "Ferrari F458 Italia",
            "drivers": [
              "Vicente POTOLICCHIO",
              "Rui AGUAS",
              "Matteo MALUCELLI"
            ]
          }
        ]
      },
      {
        "race": "Bahrain",
        "overallWinner": {
          "car": "Toyota Racing #8",
          "team": "Toyota Racing",
          "vehicle": "Toyota TS030 - Hybrid",
          "drivers": [
            "Anthony DAVIDSON",
            "S\u00e9bastien BUEMI",
            "St\u00e9phane SARRAZIN"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Toyota Racing #8",
            "team": "Toyota Racing",
            "vehicle": "Toyota TS030 - Hybrid",
            "drivers": [
              "Anthony DAVIDSON",
              "S\u00e9bastien BUEMI",
              "St\u00e9phane SARRAZIN"
            ]
          },
          {
            "category": "LMP2",
            "car": "G-Drive Racing #26",
            "team": "G-Drive Racing",
            "vehicle": "Oreca 03 - Nissan",
            "drivers": [
              "Roman RUSINOV",
              "John MARTIN",
              "Mike CONWAY"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "AF Corse #51",
            "team": "AF Corse",
            "vehicle": "Ferrari F458 Italia",
            "drivers": [
              "Gianmaria BRUNI",
              "Toni VILANDER"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Aston Martin Racing #95",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin Vantage V8",
            "drivers": [
              "Christoffer NYGAARD",
              "Kristian POULSEN",
              "Nicki THIIM"
            ]
          }
        ]
      },
      {
        "race": "Shanghai",
        "overallWinner": {
          "car": "Audi Sport Team Joest #1",
          "team": "Audi Sport Team Joest",
          "vehicle": "Audi R18 e-tron quattro",
          "drivers": [
            "Andr\u00e9 LOTTERER",
            "Benoit TR\u00c9LUYER",
            "Marcel F\u00c4SSLER"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Audi Sport Team Joest #1",
            "team": "Audi Sport Team Joest",
            "vehicle": "Audi R18 e-tron quattro",
            "drivers": [
              "Andr\u00e9 LOTTERER",
              "Benoit TR\u00c9LUYER",
              "Marcel F\u00c4SSLER"
            ]
          },
          {
            "category": "LMP2",
            "car": "G-Drive Racing #26",
            "team": "G-Drive Racing",
            "vehicle": "Oreca 03 - Nissan",
            "drivers": [
              "Roman RUSINOV",
              "John MARTIN",
              "Mike CONWAY"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Aston Martin Racing #97",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin Vantage V8",
            "drivers": [
              "Darren TURNER",
              "Stefan M\u00dcCKE"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "8 Star Motorsports #81",
            "team": "8 Star Motorsports",
            "vehicle": "Ferrari F458 Italia",
            "drivers": [
              "Vicente POTOLICCHIO",
              "Rui AGUAS",
              "Davide RIGON"
            ]
          }
        ]
      },
      {
        "race": "Fuji",
        "overallWinner": {
          "car": "Toyota Racing #7",
          "team": "Toyota Racing",
          "vehicle": "Toyota TS030 - Hybrid",
          "drivers": [
            "Alexander WURZ",
            "Nicolas LAPIERRE",
            "Kazuki NAKAJIMA"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Toyota Racing #7",
            "team": "Toyota Racing",
            "vehicle": "Toyota TS030 - Hybrid",
            "drivers": [
              "Alexander WURZ",
              "Nicolas LAPIERRE",
              "Kazuki NAKAJIMA"
            ]
          },
          {
            "category": "LMP2",
            "car": "OAK Racing #35",
            "team": "OAK Racing",
            "vehicle": "Morgan - Nissan",
            "drivers": [
              "Bertrand BAGUETTE",
              "Ricardo GONZALEZ",
              "Martin PLOWMAN"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Aston Martin Racing #97",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin Vantage V8",
            "drivers": [
              "Darren TURNER",
              "Stefan M\u00dcCKE",
              "Fr\u00e9d\u00e9ric MAKOWIECKI"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Aston Martin Racing #95",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin Vantage V8",
            "drivers": [
              "Christoffer NYGAARD",
              "Kristian POULSEN",
              "Bruno SENNA"
            ]
          }
        ]
      },
      {
        "race": "Interlagos",
        "overallWinner": {
          "car": "Audi Sport Team Joest #1",
          "team": "Audi Sport Team Joest",
          "vehicle": "Audi R18 e-tron quattro",
          "drivers": [
            "Andr\u00e9 LOTTERER",
            "Benoit TR\u00c9LUYER",
            "Marcel F\u00c4SSLER"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Audi Sport Team Joest #1",
            "team": "Audi Sport Team Joest",
            "vehicle": "Audi R18 e-tron quattro",
            "drivers": [
              "Andr\u00e9 LOTTERER",
              "Benoit TR\u00c9LUYER",
              "Marcel F\u00c4SSLER"
            ]
          },
          {
            "category": "LMP2",
            "car": "G-Drive Racing #26",
            "team": "G-Drive Racing",
            "vehicle": "Oreca 03 - Nissan",
            "drivers": [
              "Roman RUSINOV",
              "John MARTIN",
              "Mike CONWAY"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "AF Corse #51",
            "team": "AF Corse",
            "vehicle": "Ferrari F458 Italia",
            "drivers": [
              "Gianmaria BRUNI",
              "Giancarlo FISICHELLA"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Aston Martin Racing #96",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin Vantage V8",
            "drivers": [
              "Stuart HALL",
              "Jamie CAMPBELL-WALTER"
            ]
          }
        ]
      },
      {
        "race": "LeMans",
        "overallWinner": {
          "car": "Audi Sport Team Joest #2",
          "team": "Audi Sport Team Joest",
          "vehicle": "Audi R18 e-tron quattro",
          "drivers": [
            "Tom KRISTENSEN",
            "Lo\u00efc DUVAL",
            "Allan McNISH"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Audi Sport Team Joest #2",
            "team": "Audi Sport Team Joest",
            "vehicle": "Audi R18 e-tron quattro",
            "drivers": [
              "Tom KRISTENSEN",
              "Lo\u00efc DUVAL",
              "Allan McNISH"
            ]
          },
          {
            "category": "LMP2",
            "car": "OAK Racing #35",
            "team": "OAK Racing",
            "vehicle": "Morgan - Nissan",
            "drivers": [
              "Bertrand BAGUETTE",
              "Ricardo GONZALEZ",
              "Martin PLOWMAN"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Porsche AG Team Manthey #92",
            "team": "Porsche AG Team Manthey",
            "vehicle": "Porsche 911 RSR",
            "drivers": [
              "Marc LIEB",
              "Richard LIETZ",
              "Romain DUMAS"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "IMSA Performance Matmut #76",
            "team": "IMSA Performance Matmut",
            "vehicle": "Porsche 911 GT3 RSR",
            "drivers": [
              "Raymond NARAC",
              "Christophe BOURRET",
              "Jean-Karl VERNAY"
            ]
          }
        ]
      },
      {
        "race": "Cota",
        "overallWinner": {
          "car": "Audi Sport Team Joest #2",
          "team": "Audi Sport Team Joest",
          "vehicle": "Audi R18 e-tron quattro",
          "drivers": [
            "Tom KRISTENSEN",
            "Lo\u00efc DUVAL",
            "Allan McNISH"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Audi Sport Team Joest #2",
            "team": "Audi Sport Team Joest",
            "vehicle": "Audi R18 e-tron quattro",
            "drivers": [
              "Tom KRISTENSEN",
              "Lo\u00efc DUVAL",
              "Allan McNISH"
            ]
          },
          {
            "category": "LMP2",
            "car": "G-Drive Racing #26",
            "team": "G-Drive Racing",
            "vehicle": "Oreca 03 - Nissan",
            "drivers": [
              "Roman RUSINOV",
              "John MARTIN",
              "Mike CONWAY"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Aston Martin Racing #99",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin Vantage V8",
            "drivers": [
              "Bruno SENNA",
              "Fr\u00e9d\u00e9ric MAKOWIECKI"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Aston Martin Racing #96",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin Vantage V8",
            "drivers": [
              "Stuart HALL",
              "Jamie CAMPBELL-WALTER"
            ]
          }
        ]
      }
    ]
  },
  {
    "season": "2014",
    "label": "2014",
    "seriesContext": "3rd FIA World Endurance Championship Season",
    "era": "LMP1 Golden Hybrid Era",
    "dominantManufacturer": "Toyota",
    "summary": "New fuel-flow regulations marked Porsche's return to top-level prototype racing alongside Audi and Toyota. Toyota Racing secured its first World Championship with the TS040 Hybrid, winning five of the eight rounds.",
    "champions": [
      {
        "category": "Overall / Top Class",
        "team": "Toyota Racing",
        "manufacturer": "Toyota",
        "car": "Toyota TS040 Hybrid",
        "drivers": [
          "Anthony Davidson",
          "S\u00e9bastien Buemi"
        ],
        "note": "Toyota's first World Endurance Drivers' & Manufacturers' Championships"
      },
      {
        "category": "LMP2",
        "team": "SMP Racing",
        "manufacturer": "Oreca-Nissan",
        "car": "Oreca 03R - Nissan",
        "drivers": [
          "Sergey Zlobin"
        ],
        "note": "FIA Endurance Trophy for LMP2"
      },
      {
        "category": "LMGTE Pro",
        "team": "AF Corse",
        "manufacturer": "Ferrari",
        "car": "Ferrari 458 Italia GT2",
        "drivers": [
          "Gianmaria Bruni",
          "Toni Vilander"
        ],
        "note": "GT World Cup Drivers' & Manufacturers' Champions"
      }
    ],
    "featuredTeams": [
      {
        "id": "toyota-racing-2014",
        "name": "Toyota Racing",
        "manufacturer": "Toyota",
        "category": "LMP1",
        "carNumber": "#8",
        "carModel": "Toyota TS040 Hybrid",
        "drivers": [
          "Anthony Davidson",
          "S\u00e9bastien Buemi",
          "Nicolas Lapierre"
        ],
        "historicalSignificance": "Delivered Japan's first top-class World Championship in endurance racing since 1991, winning 5 of 8 championship rounds.",
        "keyStat": "5 victories in 8 rounds (World Champions)",
        "accentColor": "#d32f2f"
      },
      {
        "id": "porsche-team-2014",
        "name": "Porsche Team",
        "manufacturer": "Porsche",
        "category": "LMP1",
        "carNumber": "#14",
        "carModel": "Porsche 919 Hybrid",
        "drivers": [
          "Romain Dumas",
          "Neel Jani",
          "Marc Lieb"
        ],
        "historicalSignificance": "Marked Porsche's return to top-tier prototype racing, developing the 919 Hybrid across the year before taking its first race win at the S\u00e3o Paulo season finale.",
        "keyStat": "Porsche's 1st modern hybrid victory (Interlagos)",
        "accentColor": "#b6a16f"
      }
    ],
    "sourceProvenance": "Official FIA WEC 2014 Season Archive.",
    "races": [
      {
        "race": "Silverstone",
        "overallWinner": {
          "car": "Toyota Racing #8",
          "team": "Toyota Racing",
          "vehicle": "Toyota TS 040 - Hybrid",
          "drivers": [
            "Anthony DAVIDSON",
            "Nicolas LAPIERRE",
            "S\u00e9bastien BUEMI"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Toyota Racing #8",
            "team": "Toyota Racing",
            "vehicle": "Toyota TS 040 - Hybrid",
            "drivers": [
              "Anthony DAVIDSON",
              "Nicolas LAPIERRE",
              "S\u00e9bastien BUEMI"
            ]
          },
          {
            "category": "LMP2",
            "car": "G-Drive Racing #26",
            "team": "G-Drive Racing",
            "vehicle": "Morgan - Nissan",
            "drivers": [
              "Roman RUSINOV",
              "Olivier PLA",
              "Julien CANAL"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Porsche Team Manthey #92",
            "team": "Porsche Team Manthey",
            "vehicle": "Porsche 911 RSR",
            "drivers": [
              "Marco HOLZER",
              "Fr\u00e9d\u00e9ric MAKOWIECKI",
              "Richard LIETZ"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Aston Martin Racing #95",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin Vantage V8",
            "drivers": [
              "Kristian POULSEN",
              "David HEINEMEIR HANSSON",
              "Nicki THIIM"
            ]
          }
        ]
      },
      {
        "race": "Spa",
        "overallWinner": {
          "car": "Toyota Racing #8",
          "team": "Toyota Racing",
          "vehicle": "Toyota TS 040 - Hybrid",
          "drivers": [
            "Anthony DAVIDSON",
            "Nicolas LAPIERRE",
            "S\u00e9bastien BUEMI"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Toyota Racing #8",
            "team": "Toyota Racing",
            "vehicle": "Toyota TS 040 - Hybrid",
            "drivers": [
              "Anthony DAVIDSON",
              "Nicolas LAPIERRE",
              "S\u00e9bastien BUEMI"
            ]
          },
          {
            "category": "LMP2",
            "car": "G-Drive Racing #26",
            "team": "G-Drive Racing",
            "vehicle": "Morgan - Nissan",
            "drivers": [
              "Roman RUSINOV",
              "Olivier PLA",
              "Julien CANAL"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "AF Corse #51",
            "team": "AF Corse",
            "vehicle": "Ferrari F458 Italia",
            "drivers": [
              "Gianmaria BRUNI",
              "Toni VILANDER"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "AF Corse #61",
            "team": "AF Corse",
            "vehicle": "Ferrari F458 Italia",
            "drivers": [
              "Luis PEREZ-COMPANC",
              "Marco CIOCI",
              "Mirko VENTURI"
            ]
          }
        ]
      },
      {
        "race": "Bahrain",
        "overallWinner": {
          "car": "Toyota Racing #7",
          "team": "Toyota Racing",
          "vehicle": "Toyota TS 040 - Hybrid",
          "drivers": [
            "Alexander WURZ",
            "St\u00e9phane SARRAZIN",
            "Mike CONWAY"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Toyota Racing #7",
            "team": "Toyota Racing",
            "vehicle": "Toyota TS 040 - Hybrid",
            "drivers": [
              "Alexander WURZ",
              "St\u00e9phane SARRAZIN",
              "Mike CONWAY"
            ]
          },
          {
            "category": "LMP2",
            "car": "KCMG #47",
            "team": "KCMG",
            "vehicle": "Oreca 03R - Nissan",
            "drivers": [
              "Matthew HOWSON",
              "Richard BRADLEY",
              "Alexandre IMPERATORI"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "AF Corse #51",
            "team": "AF Corse",
            "vehicle": "Ferrari F458 Italia",
            "drivers": [
              "Gianmaria BRUNI",
              "Toni VILANDER"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Aston Martin Racing #95",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin Vantage V8",
            "drivers": [
              "Kristian POULSEN",
              "David HEINEMEIER-HANSSON",
              "Nicki THIIM"
            ]
          }
        ]
      },
      {
        "race": "Cota",
        "overallWinner": {
          "car": "Audi Sport Team Joest #2",
          "team": "Audi Sport Team Joest",
          "vehicle": "Audi R18 e-tron quattro",
          "drivers": [
            "Marcel F\u00c4SSLER",
            "Andr\u00e9 LOTTERER",
            "Benoit TR\u00c9LUYER"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Audi Sport Team Joest #2",
            "team": "Audi Sport Team Joest",
            "vehicle": "Audi R18 e-tron quattro",
            "drivers": [
              "Marcel F\u00c4SSLER",
              "Andr\u00e9 LOTTERER",
              "Benoit TR\u00c9LUYER"
            ]
          },
          {
            "category": "LMP2",
            "car": "KCMG #47",
            "team": "KCMG",
            "vehicle": "Oreca 03R - Nissan",
            "drivers": [
              "Matthew HOWSON",
              "Richard BRADLEY",
              "Tsugio MATSUDA"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Aston Martin Racing #97",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin Vantage V8",
            "drivers": [
              "Darren TURNER",
              "Stefan M\u00dcCKE"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Aston Martin Racing #98",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin Vantage V8",
            "drivers": [
              "Paul DALLA LANA",
              "Pedro LAMY",
              "Christoffer NYGAARD"
            ]
          }
        ]
      },
      {
        "race": "Fuji",
        "overallWinner": {
          "car": "Toyota Racing #8",
          "team": "Toyota Racing",
          "vehicle": "Toyota TS 040 - Hybrid",
          "drivers": [
            "Anthony DAVIDSON",
            "S\u00e9bastien BUEMI"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Toyota Racing #8",
            "team": "Toyota Racing",
            "vehicle": "Toyota TS 040 - Hybrid",
            "drivers": [
              "Anthony DAVIDSON",
              "S\u00e9bastien BUEMI"
            ]
          },
          {
            "category": "LMP2",
            "car": "G-Drive Racing #26",
            "team": "G-Drive Racing",
            "vehicle": "Ligier JS P2 - Nissan",
            "drivers": [
              "Roman RUSINOV",
              "Olivier PLA",
              "Julien CANAL"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "AF Corse #51",
            "team": "AF Corse",
            "vehicle": "Ferrari F458 Italia",
            "drivers": [
              "Gianmaria BRUNI",
              "Toni VILANDER"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Aston Martin Racing #95",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin Vantage V8",
            "drivers": [
              "Kristian POULSEN",
              "David HEINEMEIER-HANSSON",
              "Nicki THIIM"
            ]
          }
        ]
      },
      {
        "race": "Interlagos",
        "overallWinner": {
          "car": "Porsche Team #14",
          "team": "Porsche Team",
          "vehicle": "Porsche 919 Hybrid",
          "drivers": [
            "Romain DUMAS",
            "Neel JANI",
            "Marc LIEB"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Porsche Team #14",
            "team": "Porsche Team",
            "vehicle": "Porsche 919 Hybrid",
            "drivers": [
              "Romain DUMAS",
              "Neel JANI",
              "Marc LIEB"
            ]
          },
          {
            "category": "LMP2",
            "car": "KCMG #47",
            "team": "KCMG",
            "vehicle": "Oreca 03R - Nissan",
            "drivers": [
              "Matthew HOWSON",
              "Richard BRADLEY",
              "Alexandre IMPERATORI"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Aston Martin Racing #97",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin Vantage V8",
            "drivers": [
              "Darren TURNER",
              "Stefan M\u00dcCKE"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Aston Martin Racing #98",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin Vantage V8",
            "drivers": [
              "Paul DALLA LANA",
              "Pedro LAMY",
              "Christoffer NYGAARD"
            ]
          }
        ]
      },
      {
        "race": "LeMans",
        "overallWinner": {
          "car": "Audi Sport Team Joest #2",
          "team": "Audi Sport Team Joest",
          "vehicle": "Audi R18 e-tron quattro",
          "drivers": [
            "Marcel F\u00c4SSLER",
            "Andr\u00e9 LOTTERER",
            "Benoit TR\u00c9LUYER"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Audi Sport Team Joest #2",
            "team": "Audi Sport Team Joest",
            "vehicle": "Audi R18 e-tron quattro",
            "drivers": [
              "Marcel F\u00c4SSLER",
              "Andr\u00e9 LOTTERER",
              "Benoit TR\u00c9LUYER"
            ]
          },
          {
            "category": "LMP2",
            "car": "Jota Sport #38",
            "team": "Jota Sport",
            "vehicle": "Zytek Z11SN - Nissan",
            "drivers": [
              "Simon DOLAN",
              "Harry TINCKNELL",
              "Oliver TURVEY"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "AF Corse #51",
            "team": "AF Corse",
            "vehicle": "Ferrari 458 Italia",
            "drivers": [
              "Gianmaria BRUNI",
              "Toni VILANDER",
              "Giancarlo FISICHELLA"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Aston Martin Racing #95",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin Vantage V8",
            "drivers": [
              "Kristian POULSEN",
              "David HEINEMEIER-HANSSON",
              "Nicki THIIM"
            ]
          },
          {
            "category": "CDNT",
            "car": "Nissan Motorsports Global #0",
            "team": "Nissan Motorsports Global",
            "vehicle": "Nissan ZEOD RC",
            "drivers": [
              "Lucas ORDO\u00d1EZ",
              "Wolfgang REIP",
              "Satoshi MOTOYAMA"
            ]
          }
        ]
      },
      {
        "race": "Shanghai",
        "overallWinner": {
          "car": "Toyota Racing #8",
          "team": "Toyota Racing",
          "vehicle": "Toyota TS 040 - Hybrid",
          "drivers": [
            "Anthony DAVIDSON",
            "S\u00e9bastien BUEMI"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Toyota Racing #8",
            "team": "Toyota Racing",
            "vehicle": "Toyota TS 040 - Hybrid",
            "drivers": [
              "Anthony DAVIDSON",
              "S\u00e9bastien BUEMI"
            ]
          },
          {
            "category": "LMP2",
            "car": "G-Drive Racing #26",
            "team": "G-Drive Racing",
            "vehicle": "Ligier JS P2 - Nissan",
            "drivers": [
              "Roman RUSINOV",
              "Olivier PLA",
              "Julien CANAL"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Porsche Team Manthey #92",
            "team": "Porsche Team Manthey",
            "vehicle": "Porsche 911 RSR",
            "drivers": [
              "Fr\u00e9d\u00e9ric MAKOWIECKI",
              "Patrick PILET"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Aston Martin Racing #98",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin Vantage V8",
            "drivers": [
              "Paul DALLA LANA",
              "Pedro LAMY",
              "Christoffer NYGAARD"
            ]
          }
        ]
      }
    ]
  },
  {
    "season": "2015",
    "label": "2015",
    "seriesContext": "4th FIA World Endurance Championship Season",
    "era": "LMP1 Golden Hybrid Era",
    "dominantManufacturer": "Porsche",
    "summary": "At the height of the 8-megajoule hybrid regulations, Porsche claimed the manufacturers' title with the 919 Hybrid. Nico H\u00fclkenberg won Le Mans as an active Formula 1 driver, while Mark Webber, Timo Bernhard, and Brendon Hartley secured the World Endurance Drivers' Championship.",
    "champions": [
      {
        "category": "Overall / Top Class",
        "team": "Porsche Team",
        "manufacturer": "Porsche",
        "car": "Porsche 919 Hybrid",
        "drivers": [
          "Timo Bernhard",
          "Mark Webber",
          "Brendon Hartley"
        ],
        "note": "Porsche's first modern WEC World Drivers' & Manufacturers' titles"
      },
      {
        "category": "LMP2",
        "team": "G-Drive Racing",
        "manufacturer": "Ligier-Nissan",
        "car": "Ligier JS P2 - Nissan",
        "drivers": [
          "Roman Rusinov",
          "Julien Canal",
          "Sam Bird"
        ],
        "note": "FIA Endurance Trophy for LMP2"
      },
      {
        "category": "LMGTE Pro",
        "team": "Porsche Team Manthey",
        "manufacturer": "Porsche",
        "car": "Porsche 911 RSR",
        "drivers": [
          "Richard Lietz"
        ],
        "note": "World Endurance Cup for GT Drivers"
      }
    ],
    "featuredTeams": [
      {
        "id": "porsche-team-2015",
        "name": "Porsche Team",
        "manufacturer": "Porsche",
        "category": "LMP1",
        "carNumber": "#17",
        "carModel": "Porsche 919 Hybrid",
        "drivers": [
          "Timo Bernhard",
          "Mark Webber",
          "Brendon Hartley"
        ],
        "historicalSignificance": "Secured four consecutive race wins (N\u00fcrburgring, Circuit of the Americas, Fuji, Shanghai) to win the World Championship for Mark Webber, Brendon Hartley, and Timo Bernhard.",
        "keyStat": "4 consecutive race wins & World Championship",
        "accentColor": "#b6a16f"
      },
      {
        "id": "porsche-team-19-2015",
        "name": "Porsche Team (Le Mans Entry)",
        "manufacturer": "Porsche",
        "category": "LMP1",
        "carNumber": "#19",
        "carModel": "Porsche 919 Hybrid",
        "drivers": [
          "Nico H\u00fclkenberg",
          "Earl Bamber",
          "Nick Tandy"
        ],
        "historicalSignificance": "Entered as a third chassis for Spa and Le Mans, active Formula 1 driver Nico H\u00fclkenberg alongside Earl Bamber and Nick Tandy won the 24 Hours of Le Mans overall on their LMP1 debut.",
        "keyStat": "Active F1 driver overall Le Mans victory",
        "accentColor": "#e8e7e3"
      }
    ],
    "sourceProvenance": "Official FIA WEC 2015 Classifications & 24 Heures du Mans Archive.",
    "races": [
      {
        "race": "Silverstone",
        "overallWinner": {
          "car": "Audi Sport Team Joest #7",
          "team": "Audi Sport Team Joest",
          "vehicle": "Audi R18 e-tron quattro",
          "drivers": [
            "Marcel F\u00c4SSLER",
            "Andr\u00e9 LOTTERER",
            "Beno\u00eet TR\u00c9LUYER"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Audi Sport Team Joest #7",
            "team": "Audi Sport Team Joest",
            "vehicle": "Audi R18 e-tron quattro",
            "drivers": [
              "Marcel F\u00c4SSLER",
              "Andr\u00e9 LOTTERER",
              "Beno\u00eet TR\u00c9LUYER"
            ]
          },
          {
            "category": "LMP2",
            "car": "G-Drive Racing #26",
            "team": "G-Drive Racing",
            "vehicle": "Ligier JS P2 - Nissan",
            "drivers": [
              "Roman RUSINOV",
              "Julien CANAL",
              "Sam BIRD"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "AF Corse #51",
            "team": "AF Corse",
            "vehicle": "Ferrari F458 Italia",
            "drivers": [
              "Gianmaria BRUNI",
              "Toni VILANDER"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Aston Martin Racing #98",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin Vantage V8",
            "drivers": [
              "Paul DALLA LANA",
              "Pedro LAMY",
              "Mathias LAUDA"
            ]
          }
        ]
      },
      {
        "race": "Spa",
        "overallWinner": {
          "car": "Audi Sport Team Joest #7",
          "team": "Audi Sport Team Joest",
          "vehicle": "Audi R18 e-tron quattro",
          "drivers": [
            "Marcel F\u00c4SSLER",
            "Andr\u00e9 LOTTERER",
            "Beno\u00eet TR\u00c9LUYER"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Audi Sport Team Joest #7",
            "team": "Audi Sport Team Joest",
            "vehicle": "Audi R18 e-tron quattro",
            "drivers": [
              "Marcel F\u00c4SSLER",
              "Andr\u00e9 LOTTERER",
              "Beno\u00eet TR\u00c9LUYER"
            ]
          },
          {
            "category": "LMP2",
            "car": "Jota Sport #38",
            "team": "Jota Sport",
            "vehicle": "Gibson 015S - Nissan",
            "drivers": [
              "Simon DOLAN",
              "Mitch EVANS",
              "Harry TINCKNELL"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Aston Martin Racing V8 #99",
            "team": "Aston Martin Racing V8",
            "vehicle": "Aston Martin Vantage V8",
            "drivers": [
              "Alex MACDOWALL",
              "Fernando REES",
              "Richie STANAWAY"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Aston Martin Racing #98",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin Vantage V8",
            "drivers": [
              "Paul DALLA LANA",
              "Pedro LAMY",
              "Mathias LAUDA"
            ]
          }
        ]
      },
      {
        "race": "Bahrain",
        "overallWinner": {
          "car": "Porsche Team #18",
          "team": "Porsche Team",
          "vehicle": "Porsche 919 Hybrid",
          "drivers": [
            "Romain DUMAS",
            "Neel JANI",
            "Marc LIEB"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Porsche Team #18",
            "team": "Porsche Team",
            "vehicle": "Porsche 919 Hybrid",
            "drivers": [
              "Romain DUMAS",
              "Neel JANI",
              "Marc LIEB"
            ]
          },
          {
            "category": "LMP2",
            "car": "G-Drive Racing #26",
            "team": "G-Drive Racing",
            "vehicle": "Ligier JS P2 - Nissan",
            "drivers": [
              "Roman RUSINOV",
              "Julien CANAL",
              "Sam BIRD"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Porsche Team Manthey #92",
            "team": "Porsche Team Manthey",
            "vehicle": "Porsche 911 RSR",
            "drivers": [
              "Patrick PILET",
              "Fr\u00e9d\u00e9ric MAKOWIECKI"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Aston Martin Racing #98",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin Vantage V8",
            "drivers": [
              "Paul DALLA LANA",
              "Pedro LAMY",
              "Mathias LAUDA"
            ]
          }
        ]
      },
      {
        "race": "Cota",
        "overallWinner": {
          "car": "Porsche Team #17",
          "team": "Porsche Team",
          "vehicle": "Porsche 919 Hybrid",
          "drivers": [
            "Timo BERNHARD",
            "Mark WEBBER",
            "Brendon HARTLEY"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Porsche Team #17",
            "team": "Porsche Team",
            "vehicle": "Porsche 919 Hybrid",
            "drivers": [
              "Timo BERNHARD",
              "Mark WEBBER",
              "Brendon HARTLEY"
            ]
          },
          {
            "category": "LMP2",
            "car": "G-Drive Racing #26",
            "team": "G-Drive Racing",
            "vehicle": "Ligier JS P2 - Nissan",
            "drivers": [
              "Roman RUSINOV",
              "Julien CANAL",
              "Sam BIRD"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Porsche Team Manthey #91",
            "team": "Porsche Team Manthey",
            "vehicle": "Porsche 911 RSR",
            "drivers": [
              "Richard LIETZ",
              "Michael CHRISTENSEN"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "SMP Racing #72",
            "team": "SMP Racing",
            "vehicle": "Ferrari F458 Italia",
            "drivers": [
              "Victor SHAYTAR",
              "Andrea BERTOLINI",
              "Aleksey BASOV"
            ]
          }
        ]
      },
      {
        "race": "Fuji",
        "overallWinner": {
          "car": "Porsche Team #17",
          "team": "Porsche Team",
          "vehicle": "Porsche 919 Hybrid",
          "drivers": [
            "Timo BERNHARD",
            "Mark WEBBER",
            "Brendon HARTLEY"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Porsche Team #17",
            "team": "Porsche Team",
            "vehicle": "Porsche 919 Hybrid",
            "drivers": [
              "Timo BERNHARD",
              "Mark WEBBER",
              "Brendon HARTLEY"
            ]
          },
          {
            "category": "LMP2",
            "car": "G-Drive Racing #26",
            "team": "G-Drive Racing",
            "vehicle": "Ligier JS P2 - Nissan",
            "drivers": [
              "Roman RUSINOV",
              "Julien CANAL",
              "Sam BIRD"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "AF Corse #51",
            "team": "AF Corse",
            "vehicle": "Ferrari F458 Italia",
            "drivers": [
              "Gianmaria BRUNI",
              "Toni VILANDER"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Dempsey - Proton Racing #77",
            "team": "Dempsey - Proton Racing",
            "vehicle": "Porsche 911 RSR",
            "drivers": [
              "Patrick DEMPSEY",
              "Patrick LONG",
              "Marco SEEFRIED"
            ]
          }
        ]
      },
      {
        "race": "Nurburgring",
        "overallWinner": {
          "car": "Porsche Team #17",
          "team": "Porsche Team",
          "vehicle": "Porsche 919 Hybrid",
          "drivers": [
            "Timo BERNHARD",
            "Mark WEBBER",
            "Brendon HARTLEY"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Porsche Team #17",
            "team": "Porsche Team",
            "vehicle": "Porsche 919 Hybrid",
            "drivers": [
              "Timo BERNHARD",
              "Mark WEBBER",
              "Brendon HARTLEY"
            ]
          },
          {
            "category": "LMP2",
            "car": "KCMG #47",
            "team": "KCMG",
            "vehicle": "Oreca 05 - Nissan",
            "drivers": [
              "Matthew HOWSON",
              "Richard BRADLEY",
              "Nick TANDY"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Porsche Team Manthey #91",
            "team": "Porsche Team Manthey",
            "vehicle": "Porsche 911 RSR",
            "drivers": [
              "Richard LIETZ",
              "Michael CHRISTENSEN"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "SMP Racing #72",
            "team": "SMP Racing",
            "vehicle": "Ferrari F458 Italia",
            "drivers": [
              "Victor SHAYTAR",
              "Andrea BERTOLINI",
              "Aleksey BASOV"
            ]
          }
        ]
      },
      {
        "race": "LeMans",
        "overallWinner": {
          "car": "Porsche Team #19",
          "team": "Porsche Team",
          "vehicle": "Porsche 919 Hybrid",
          "drivers": [
            "Nico H\u00dcLKENBERG",
            "Earl BAMBER",
            "Nick TANDY"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Porsche Team #19",
            "team": "Porsche Team",
            "vehicle": "Porsche 919 Hybrid",
            "drivers": [
              "Nico H\u00dcLKENBERG",
              "Earl BAMBER",
              "Nick TANDY"
            ]
          },
          {
            "category": "LMP2",
            "car": "KCMG #47",
            "team": "KCMG",
            "vehicle": "Oreca 05 - Nissan",
            "drivers": [
              "Matthew HOWSON",
              "Richard BRADLEY",
              "Nicolas LAPIERRE"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Corvette Racing - GM #64",
            "team": "Corvette Racing - GM",
            "vehicle": "Chevrolet Corvette C7R",
            "drivers": [
              "Oliver GAVIN",
              "Tommy MILNER",
              "Jordan TAYLOR"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "SMP Racing #72",
            "team": "SMP Racing",
            "vehicle": "Ferrari 458 Italia",
            "drivers": [
              "Victor SHAYTAR",
              "Andrea BERTOLINI",
              "Aleksey BASOV"
            ]
          }
        ]
      },
      {
        "race": "Shanghai",
        "overallWinner": {
          "car": "Porsche Team #17",
          "team": "Porsche Team",
          "vehicle": "Porsche 919 Hybrid",
          "drivers": [
            "Timo BERNHARD",
            "Mark WEBBER",
            "Brendon HARTLEY"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Porsche Team #17",
            "team": "Porsche Team",
            "vehicle": "Porsche 919 Hybrid",
            "drivers": [
              "Timo BERNHARD",
              "Mark WEBBER",
              "Brendon HARTLEY"
            ]
          },
          {
            "category": "LMP2",
            "car": "Signatech Alpine #36",
            "team": "Signatech Alpine",
            "vehicle": "Alpine A450b - Nissan",
            "drivers": [
              "Nelson PANCIATICI",
              "Paul Loup CHATIN",
              "Tom DILLMANN"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Porsche Team Manthey #91",
            "team": "Porsche Team Manthey",
            "vehicle": "Porsche 911 RSR",
            "drivers": [
              "Richard LIETZ",
              "Michael CHRISTENSEN"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "AF Corse #83",
            "team": "AF Corse",
            "vehicle": "Ferrari F458 Italia",
            "drivers": [
              "Fran\u00e7ois PERRODO",
              "Emmanuel COLLARD",
              "Rui AGUAS"
            ]
          }
        ]
      }
    ]
  },
  {
    "season": "2016",
    "label": "2016",
    "seriesContext": "5th FIA World Endurance Championship Season",
    "era": "LMP1 Golden Hybrid Era",
    "dominantManufacturer": "Porsche",
    "summary": "A mechanical failure for the leading #5 Toyota with three minutes remaining handed victory to the #2 Porsche at Le Mans. Audi concluded its 18-year prototype programme at the end of the year, finishing with a 1-2 victory in Bahrain.",
    "champions": [
      {
        "category": "Overall / Top Class",
        "team": "Porsche Team",
        "manufacturer": "Porsche",
        "car": "Porsche 919 Hybrid",
        "drivers": [
          "Romain Dumas",
          "Neel Jani",
          "Marc Lieb"
        ],
        "note": "World Drivers' & Manufacturers' Champions (Porsche back-to-back)"
      },
      {
        "category": "LMP2",
        "team": "Signatech Alpine",
        "manufacturer": "Alpine-Nissan",
        "car": "Alpine A460 - Nissan",
        "drivers": [
          "Gustavo Menezes",
          "Nicolas Lapierre",
          "St\u00e9phane Richelmi"
        ],
        "note": "FIA Endurance Trophy for LMP2"
      },
      {
        "category": "LMGTE Pro",
        "team": "Aston Martin Racing",
        "manufacturer": "Aston Martin / Ferrari",
        "car": "Aston Martin Vantage GTE",
        "drivers": [
          "Nicki Thiim",
          "Marco S\u00f8rensen"
        ],
        "note": "World Endurance Cup for GT Drivers, with Ferrari winning GT Manufacturers"
      }
    ],
    "featuredTeams": [
      {
        "id": "porsche-team-2016",
        "name": "Porsche Team",
        "manufacturer": "Porsche",
        "category": "LMP1",
        "carNumber": "#2",
        "carModel": "Porsche 919 Hybrid",
        "drivers": [
          "Romain Dumas",
          "Neel Jani",
          "Marc Lieb"
        ],
        "historicalSignificance": "Took victory at Le Mans following Toyota's late retirement and maintained a steady points tally to secure both World Championships.",
        "keyStat": "Le Mans victory & World Championship double",
        "accentColor": "#b6a16f"
      },
      {
        "id": "audi-joest-2016",
        "name": "Audi Sport Team Joest",
        "manufacturer": "Audi",
        "category": "LMP1",
        "carNumber": "#8",
        "carModel": "Audi R18",
        "drivers": [
          "Lucas di Grassi",
          "Lo\u00efc Duval",
          "Oliver Jarvis"
        ],
        "historicalSignificance": "Concluded an 18-year LMP1 programme that achieved 13 Le Mans victories, finishing with a 1-2 result at the Bahrain season finale.",
        "keyStat": "Audi's final LMP1 race victory (Bahrain)",
        "accentColor": "#b8493e"
      }
    ],
    "sourceProvenance": "Official FIA WEC 2016 Sporting Archive.",
    "races": [
      {
        "race": "Silverstone",
        "overallWinner": {
          "car": "Porsche Team #2",
          "team": "Porsche Team",
          "vehicle": "Porsche 919 Hybrid",
          "drivers": [
            "Romain DUMAS",
            "Neel JANI",
            "Marc LIEB"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Porsche Team #2",
            "team": "Porsche Team",
            "vehicle": "Porsche 919 Hybrid",
            "drivers": [
              "Romain DUMAS",
              "Neel JANI",
              "Marc LIEB"
            ]
          },
          {
            "category": "LMP2",
            "car": "RGR Sport by Morand #43",
            "team": "RGR Sport by Morand",
            "vehicle": "LIGIER JS P2 - Nissan",
            "drivers": [
              "Ricardo GONZALEZ",
              "Filipe ALBUQUERQUE",
              "Bruno SENNA"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "AF Corse #71",
            "team": "AF Corse",
            "vehicle": "Ferrari 488 GTE",
            "drivers": [
              "Davide RIGON",
              "Sam BIRD"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "AF Corse #83",
            "team": "AF Corse",
            "vehicle": "Ferrari F458 Italia",
            "drivers": [
              "Fran\u00e7ois PERRODO",
              "Emmanuel COLLARD",
              "Rui AGUAS"
            ]
          }
        ]
      },
      {
        "race": "Spa",
        "overallWinner": {
          "car": "Audi Sport Team Joest #8",
          "team": "Audi Sport Team Joest",
          "vehicle": "Audi R18",
          "drivers": [
            "Lucas DI GRASSI",
            "Lo\u00efc DUVAL",
            "Oliver JARVIS"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Audi Sport Team Joest #8",
            "team": "Audi Sport Team Joest",
            "vehicle": "Audi R18",
            "drivers": [
              "Lucas DI GRASSI",
              "Lo\u00efc DUVAL",
              "Oliver JARVIS"
            ]
          },
          {
            "category": "LMP2",
            "car": "Signatech Alpine #36",
            "team": "Signatech Alpine",
            "vehicle": "Alpine A460 - Nissan",
            "drivers": [
              "Gustavo MENEZES",
              "Nicolas LAPIERRE",
              "St\u00e9phane RICHELMI"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "AF Corse #71",
            "team": "AF Corse",
            "vehicle": "Ferrari 488 GTE",
            "drivers": [
              "Davide RIGON",
              "Sam BIRD"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Aston Martin Racing #98",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin Vantage V8",
            "drivers": [
              "Paul DALLA LANA",
              "Pedro LAMY",
              "Mathias LAUDA"
            ]
          }
        ]
      },
      {
        "race": "Bahrain",
        "overallWinner": {
          "car": "Audi Sport Team Joest #8",
          "team": "Audi Sport Team Joest",
          "vehicle": "Audi R18",
          "drivers": [
            "Lucas DI GRASSI",
            "Lo\u00efc DUVAL",
            "Oliver JARVIS"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Audi Sport Team Joest #8",
            "team": "Audi Sport Team Joest",
            "vehicle": "Audi R18",
            "drivers": [
              "Lucas DI GRASSI",
              "Lo\u00efc DUVAL",
              "Oliver JARVIS"
            ]
          },
          {
            "category": "LMP2",
            "car": "G-Drive Racing #26",
            "team": "G-Drive Racing",
            "vehicle": "Oreca 05 - Nissan",
            "drivers": [
              "Roman RUSINOV",
              "Ren\u00e9 RAST",
              "Alex BRUNDLE"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Aston Martin Racing #95",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin Vantage V8",
            "drivers": [
              "Nicki THIIM",
              "Marco S\u00d8RENSEN"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Abu Dhabi-Proton Racing #88",
            "team": "Abu Dhabi-Proton Racing",
            "vehicle": "Porsche 911 RSR",
            "drivers": [
              "Khaled AL QUBAISI",
              "David HEINEMEIER HANSSON",
              "Patrick LONG"
            ]
          }
        ]
      },
      {
        "race": "Cota",
        "overallWinner": {
          "car": "Porsche Team #1",
          "team": "Porsche Team",
          "vehicle": "Porsche 919 Hybrid",
          "drivers": [
            "Timo BERNHARD",
            "Mark WEBBER",
            "Brendon HARTLEY"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Porsche Team #1",
            "team": "Porsche Team",
            "vehicle": "Porsche 919 Hybrid",
            "drivers": [
              "Timo BERNHARD",
              "Mark WEBBER",
              "Brendon HARTLEY"
            ]
          },
          {
            "category": "LMP2",
            "car": "Signatech Alpine #36",
            "team": "Signatech Alpine",
            "vehicle": "Alpine A460 - Nissan",
            "drivers": [
              "Gustavo MENEZES",
              "Nicolas LAPIERRE",
              "St\u00e9phane RICHELMI"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Aston Martin Racing #95",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin Vantage V8",
            "drivers": [
              "Nicki THIIM",
              "Marco S\u00d8RENSEN"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Aston Martin Racing #98",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin Vantage V8",
            "drivers": [
              "Paul DALLA LANA",
              "Pedro LAMY",
              "Mathias LAUDA"
            ]
          }
        ]
      },
      {
        "race": "Fuji",
        "overallWinner": {
          "car": "Toyota Gazoo Racing #6",
          "team": "Toyota Gazoo Racing",
          "vehicle": "Toyota TS050 - Hybrid",
          "drivers": [
            "St\u00e9phane SARRAZIN",
            "Mike CONWAY",
            "Kamui KOBAYASHI"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Toyota Gazoo Racing #6",
            "team": "Toyota Gazoo Racing",
            "vehicle": "Toyota TS050 - Hybrid",
            "drivers": [
              "St\u00e9phane SARRAZIN",
              "Mike CONWAY",
              "Kamui KOBAYASHI"
            ]
          },
          {
            "category": "LMP2",
            "car": "G-Drive Racing #26",
            "team": "G-Drive Racing",
            "vehicle": "Oreca 05 - Nissan",
            "drivers": [
              "Roman RUSINOV",
              "Alex BRUNDLE",
              "Will STEVENS"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Ford Chip Ganassi Team UK #67",
            "team": "Ford Chip Ganassi Team UK",
            "vehicle": "Ford GT",
            "drivers": [
              "Andy PRIAULX",
              "Harry TINCKNELL"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Aston Martin Racing #98",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin Vantage V8",
            "drivers": [
              "Paul DALLA LANA",
              "Pedro LAMY",
              "Mathias LAUDA"
            ]
          }
        ]
      },
      {
        "race": "Nurburgring",
        "overallWinner": {
          "car": "Porsche Team #1",
          "team": "Porsche Team",
          "vehicle": "Porsche 919 Hybrid",
          "drivers": [
            "Timo BERNHARD",
            "Mark WEBBER",
            "Brendon HARTLEY"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Porsche Team #1",
            "team": "Porsche Team",
            "vehicle": "Porsche 919 Hybrid",
            "drivers": [
              "Timo BERNHARD",
              "Mark WEBBER",
              "Brendon HARTLEY"
            ]
          },
          {
            "category": "LMP2",
            "car": "Signatech Alpine #36",
            "team": "Signatech Alpine",
            "vehicle": "Alpine A460 - Nissan",
            "drivers": [
              "Gustavo MENEZES",
              "Nicolas LAPIERRE",
              "St\u00e9phane RICHELMI"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "AF Corse #51",
            "team": "AF Corse",
            "vehicle": "Ferrari 488 GTE",
            "drivers": [
              "Gianmaria BRUNI",
              "James CALADO"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Aston Martin Racing #98",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin Vantage V8",
            "drivers": [
              "Paul DALLA LANA",
              "Pedro LAMY",
              "Mathias LAUDA"
            ]
          }
        ]
      },
      {
        "race": "LeMans",
        "overallWinner": {
          "car": "Porsche Team #2",
          "team": "Porsche Team",
          "vehicle": "Porsche 919 Hybrid",
          "drivers": [
            "Romain DUMAS",
            "Neel JANI",
            "Marc LIEB"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Porsche Team #2",
            "team": "Porsche Team",
            "vehicle": "Porsche 919 Hybrid",
            "drivers": [
              "Romain DUMAS",
              "Neel JANI",
              "Marc LIEB"
            ]
          },
          {
            "category": "LMP2",
            "car": "Signatech Alpine #36",
            "team": "Signatech Alpine",
            "vehicle": "Alpine A460 - Nissan",
            "drivers": [
              "Gustavo MENEZES",
              "Nicolas LAPIERRE",
              "St\u00e9phane RICHELMI"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Ford Chip Ganassi Team USA #68",
            "team": "Ford Chip Ganassi Team USA",
            "vehicle": "Ford GT",
            "drivers": [
              "Joey HAND",
              "Dirk M\u00dcLLER",
              "S\u00e9bastien BOURDAIS"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Scuderia Corsa #62",
            "team": "Scuderia Corsa",
            "vehicle": "Ferrari 458 Italia",
            "drivers": [
              "William SWEEDLER",
              "Townsend BELL",
              "Jeffrey SEGAL"
            ]
          },
          {
            "category": "CDNT",
            "car": "SRT41 By OAK Racing #84",
            "team": "SRT41 By OAK Racing",
            "vehicle": "Morgan LMP2 - Nissan",
            "drivers": [
              "Fr\u00e9d\u00e9ric SAUSSET",
              "Christophe TINSEAU",
              "Jean Bernard BOUVET"
            ]
          }
        ]
      },
      {
        "race": "Shanghai",
        "overallWinner": {
          "car": "Porsche Team #1",
          "team": "Porsche Team",
          "vehicle": "Porsche 919 Hybrid",
          "drivers": [
            "Timo BERNHARD",
            "Mark WEBBER",
            "Brendon HARTLEY"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Porsche Team #1",
            "team": "Porsche Team",
            "vehicle": "Porsche 919 Hybrid",
            "drivers": [
              "Timo BERNHARD",
              "Mark WEBBER",
              "Brendon HARTLEY"
            ]
          },
          {
            "category": "LMP2",
            "car": "G-Drive Racing #26",
            "team": "G-Drive Racing",
            "vehicle": "Oreca 05 - Nissan",
            "drivers": [
              "Roman RUSINOV",
              "Will STEVENS",
              "Alex BRUNDLE"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Ford Chip Ganassi Team UK #67",
            "team": "Ford Chip Ganassi Team UK",
            "vehicle": "Ford GT",
            "drivers": [
              "Andy PRIAULX",
              "Harry TINCKNELL"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Aston Martin Racing #98",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin Vantage V8",
            "drivers": [
              "Paul DALLA LANA",
              "Pedro LAMY",
              "Mathias LAUDA"
            ]
          }
        ]
      },
      {
        "race": "Mexico",
        "overallWinner": {
          "car": "Porsche Team #1",
          "team": "Porsche Team",
          "vehicle": "Porsche 919 Hybrid",
          "drivers": [
            "Timo BERNHARD",
            "Mark WEBBER",
            "Brendon HARTLEY"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Porsche Team #1",
            "team": "Porsche Team",
            "vehicle": "Porsche 919 Hybrid",
            "drivers": [
              "Timo BERNHARD",
              "Mark WEBBER",
              "Brendon HARTLEY"
            ]
          },
          {
            "category": "LMP2",
            "car": "RGR Sport by Morand #43",
            "team": "RGR Sport by Morand",
            "vehicle": "LIGIER JS P2 - Nissan",
            "drivers": [
              "Ricardo GONZALEZ",
              "Filipe ALBUQUERQUE",
              "Bruno SENNA"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Aston Martin Racing #97",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin Vantage V8",
            "drivers": [
              "Richie STANAWAY",
              "Darren TURNER"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Abu Dhabi-Proton Racing #88",
            "team": "Abu Dhabi-Proton Racing",
            "vehicle": "Porsche 911 RSR",
            "drivers": [
              "Khaled AL QUBAISI",
              "David HEINEMEIER HANSSON",
              "Patrick LONG"
            ]
          }
        ]
      }
    ]
  },
  {
    "season": "2017",
    "label": "2017",
    "seriesContext": "6th FIA World Endurance Championship Season",
    "era": "LMP1 Golden Hybrid Era",
    "dominantManufacturer": "Porsche",
    "summary": "Porsche and Toyota contested a closely matched season across nine rounds. Severe LMP1 attrition at Le Mans briefly put an LMP2 car in the overall lead before the #2 Porsche recovered to take the win. Porsche secured its third consecutive World Championship before exiting the category.",
    "champions": [
      {
        "category": "Overall / Top Class",
        "team": "Porsche LMP Team",
        "manufacturer": "Porsche",
        "car": "Porsche 919 Hybrid",
        "drivers": [
          "Timo Bernhard",
          "Earl Bamber",
          "Brendon Hartley"
        ],
        "note": "Porsche's 3rd consecutive Drivers' & Manufacturers' World Championship"
      },
      {
        "category": "LMP2",
        "team": "Vaillante Rebellion",
        "manufacturer": "Oreca-Gibson",
        "car": "Oreca 07 - Gibson",
        "drivers": [
          "Bruno Senna",
          "Julien Canal"
        ],
        "note": "FIA Endurance Trophy for LMP2"
      },
      {
        "category": "LMGTE Pro",
        "team": "AF Corse",
        "manufacturer": "Ferrari",
        "car": "Ferrari 488 GTE",
        "drivers": [
          "James Calado",
          "Alessandro Pier Guidi"
        ],
        "note": "World Endurance GT Drivers' & Manufacturers' Champions"
      }
    ],
    "featuredTeams": [
      {
        "id": "porsche-team-2017",
        "name": "Porsche LMP Team",
        "manufacturer": "Porsche",
        "category": "LMP1",
        "carNumber": "#2",
        "carModel": "Porsche 919 Hybrid",
        "drivers": [
          "Timo Bernhard",
          "Earl Bamber",
          "Brendon Hartley"
        ],
        "historicalSignificance": "Recovered from an early pitstop for front axle repairs at Le Mans to take overall victory, closing Porsche's LMP1 factory programme with three consecutive World titles.",
        "keyStat": "3rd consecutive World Title for Porsche 919",
        "accentColor": "#b6a16f"
      },
      {
        "id": "dc-racing-2017",
        "name": "Jackie Chan DC Racing",
        "manufacturer": "Oreca",
        "category": "LMP2",
        "carNumber": "#38",
        "carModel": "Oreca 07 - Gibson",
        "drivers": [
          "Ho-Pin Tung",
          "Thomas Laurent",
          "Oliver Jarvis"
        ],
        "historicalSignificance": "Led the 24 Hours of Le Mans outright in an LMP2 chassis during Sunday morning attrition, ultimately finishing second overall and claiming the LMP2 class victory.",
        "keyStat": "Led Le Mans outright, finished 2nd overall",
        "accentColor": "#e69d45"
      }
    ],
    "sourceProvenance": "Official FIA WEC 2017 Season Archive.",
    "races": [
      {
        "race": "Silverstone",
        "overallWinner": {
          "car": "Toyota Gazoo Racing #8",
          "team": "Toyota Gazoo Racing",
          "vehicle": "Toyota TS050 - Hybrid",
          "drivers": [
            "S\u00e9bastien BUEMI",
            "Anthony DAVIDSON",
            "Kazuki NAKAJIMA"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Toyota Gazoo Racing #8",
            "team": "Toyota Gazoo Racing",
            "vehicle": "Toyota TS050 - Hybrid",
            "drivers": [
              "S\u00e9bastien BUEMI",
              "Anthony DAVIDSON",
              "Kazuki NAKAJIMA"
            ]
          },
          {
            "category": "LMP2",
            "car": "Jackie Chan DC Racing #38",
            "team": "Jackie Chan DC Racing",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "Ho-Pin TUNG",
              "Oliver JARVIS",
              "Thomas LAURENT"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Ford Chip Ganassi Team UK #67",
            "team": "Ford Chip Ganassi Team UK",
            "vehicle": "Ford GT",
            "drivers": [
              "Andy PRIAULX",
              "Harry TINCKNELL",
              "Luis Felipe DERANI"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Clearwater Racing #61",
            "team": "Clearwater Racing",
            "vehicle": "Ferrari 488 GTE",
            "drivers": [
              "Weng Sun MOK",
              "Keita SAWA",
              "Matt GRIFFIN"
            ]
          }
        ]
      },
      {
        "race": "Spa",
        "overallWinner": {
          "car": "Toyota Gazoo Racing #8",
          "team": "Toyota Gazoo Racing",
          "vehicle": "Toyota TS050 - Hybrid",
          "drivers": [
            "S\u00e9bastien BUEMI",
            "Anthony DAVIDSON",
            "Kazuki NAKAJIMA"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Toyota Gazoo Racing #8",
            "team": "Toyota Gazoo Racing",
            "vehicle": "Toyota TS050 - Hybrid",
            "drivers": [
              "S\u00e9bastien BUEMI",
              "Anthony DAVIDSON",
              "Kazuki NAKAJIMA"
            ]
          },
          {
            "category": "LMP2",
            "car": "G-Drive Racing #26",
            "team": "G-Drive Racing",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "Roman RUSINOV",
              "Pierre THIRIET",
              "Alex LYNN"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "AF Corse #71",
            "team": "AF Corse",
            "vehicle": "Ferrari 488 GTE",
            "drivers": [
              "Davide RIGON",
              "Sam BIRD"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Aston Martin Racing #98",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin V8 Vantage",
            "drivers": [
              "Paul DALLA LANA",
              "Pedro LAMY",
              "Mathias LAUDA"
            ]
          }
        ]
      },
      {
        "race": "Bahrain",
        "overallWinner": {
          "car": "Toyota Gazoo Racing #8",
          "team": "Toyota Gazoo Racing",
          "vehicle": "Toyota TS050 - Hybrid",
          "drivers": [
            "S\u00e9bastien BUEMI",
            "Anthony DAVIDSON",
            "Kazuki NAKAJIMA"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Toyota Gazoo Racing #8",
            "team": "Toyota Gazoo Racing",
            "vehicle": "Toyota TS050 - Hybrid",
            "drivers": [
              "S\u00e9bastien BUEMI",
              "Anthony DAVIDSON",
              "Kazuki NAKAJIMA"
            ]
          },
          {
            "category": "LMP2",
            "car": "Vaillante Rebellion #31",
            "team": "Vaillante Rebellion",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "Julien CANAL",
              "Nicolas PROST",
              "Bruno SENNA"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "AF Corse #71",
            "team": "AF Corse",
            "vehicle": "Ferrari 488 GTE",
            "drivers": [
              "Davide RIGON",
              "Sam BIRD"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Aston Martin Racing #98",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin V8 Vantage",
            "drivers": [
              "Paul DALLA LANA",
              "Pedro LAMY",
              "Mathias LAUDA"
            ]
          }
        ]
      },
      {
        "race": "Cota",
        "overallWinner": {
          "car": "Porsche LMP Team #2",
          "team": "Porsche LMP Team",
          "vehicle": "Porsche 919 Hybrid",
          "drivers": [
            "Timo BERNHARD",
            "Earl BAMBER",
            "Brendon HARTLEY"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Porsche LMP Team #2",
            "team": "Porsche LMP Team",
            "vehicle": "Porsche 919 Hybrid",
            "drivers": [
              "Timo BERNHARD",
              "Earl BAMBER",
              "Brendon HARTLEY"
            ]
          },
          {
            "category": "LMP2",
            "car": "Signatech Alpine Matmut #36",
            "team": "Signatech Alpine Matmut",
            "vehicle": "Alpine A470 - Gibson",
            "drivers": [
              "Nicolas LAPIERRE",
              "Gustavo MENEZES",
              "Andr\u00e9 NEGR\u00c3O"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "AF Corse #51",
            "team": "AF Corse",
            "vehicle": "Ferrari 488 GTE",
            "drivers": [
              "James CALADO",
              "Alessandro PIER GUIDI"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Aston Martin Racing #98",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin V8 Vantage",
            "drivers": [
              "Paul DALLA LANA",
              "Pedro LAMY",
              "Mathias LAUDA"
            ]
          }
        ]
      },
      {
        "race": "Fuji",
        "overallWinner": {
          "car": "Toyota Gazoo Racing #8",
          "team": "Toyota Gazoo Racing",
          "vehicle": "Toyota TS050 - Hybrid",
          "drivers": [
            "S\u00e9bastien BUEMI",
            "Anthony DAVIDSON",
            "Kazuki NAKAJIMA"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Toyota Gazoo Racing #8",
            "team": "Toyota Gazoo Racing",
            "vehicle": "Toyota TS050 - Hybrid",
            "drivers": [
              "S\u00e9bastien BUEMI",
              "Anthony DAVIDSON",
              "Kazuki NAKAJIMA"
            ]
          },
          {
            "category": "LMP2",
            "car": "Vaillante Rebellion #31",
            "team": "Vaillante Rebellion",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "Julien CANAL",
              "Nicolas PROST",
              "Bruno SENNA"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "AF Corse #51",
            "team": "AF Corse",
            "vehicle": "Ferrari 488 GTE",
            "drivers": [
              "James CALADO",
              "Alessandro PIER GUIDI"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Spirit of Race #54",
            "team": "Spirit of Race",
            "vehicle": "Ferrari 488 GTE",
            "drivers": [
              "Thomas FLOHR",
              "Francesco CASTELLACCI",
              "Miguel MOLINA"
            ]
          }
        ]
      },
      {
        "race": "Nurburgring",
        "overallWinner": {
          "car": "Porsche LMP Team #2",
          "team": "Porsche LMP Team",
          "vehicle": "Porsche 919 Hybrid",
          "drivers": [
            "Timo BERNHARD",
            "Earl BAMBER",
            "Brendon HARTLEY"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Porsche LMP Team #2",
            "team": "Porsche LMP Team",
            "vehicle": "Porsche 919 Hybrid",
            "drivers": [
              "Timo BERNHARD",
              "Earl BAMBER",
              "Brendon HARTLEY"
            ]
          },
          {
            "category": "LMP2",
            "car": "Jackie Chan DC Racing #38",
            "team": "Jackie Chan DC Racing",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "Ho-Pin TUNG",
              "Oliver JARVIS",
              "Thomas LAURENT"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "AF Corse #51",
            "team": "AF Corse",
            "vehicle": "Ferrari 488 GTE",
            "drivers": [
              "James CALADO",
              "Alessandro PIER GUIDI"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Dempsey - Proton Racing #77",
            "team": "Dempsey - Proton Racing",
            "vehicle": "Porsche 911 RSR (991)",
            "drivers": [
              "Christian RIED",
              "Matteo CAIROLI",
              "Marvin DIENST"
            ]
          }
        ]
      },
      {
        "race": "LeMans",
        "overallWinner": {
          "car": "Porsche LMP Team #2",
          "team": "Porsche LMP Team",
          "vehicle": "Porsche 919 Hybrid",
          "drivers": [
            "Timo BERNHARD",
            "Earl BAMBER",
            "Brendon HARTLEY"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Porsche LMP Team #2",
            "team": "Porsche LMP Team",
            "vehicle": "Porsche 919 Hybrid",
            "drivers": [
              "Timo BERNHARD",
              "Earl BAMBER",
              "Brendon HARTLEY"
            ]
          },
          {
            "category": "LMP2",
            "car": "Jackie Chan DC Racing #38",
            "team": "Jackie Chan DC Racing",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "Ho-Pin TUNG",
              "Thomas LAURENT",
              "Oliver JARVIS"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Aston Martin Racing #97",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin Vantage",
            "drivers": [
              "Darren TURNER",
              "Jonathan ADAM",
              "Daniel SERRA"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "JMW Motorsport #84",
            "team": "JMW Motorsport",
            "vehicle": "Ferrari 488 GTE",
            "drivers": [
              "Robert SMITH",
              "Will STEVENS",
              "Dries VANTHOOR"
            ]
          }
        ]
      },
      {
        "race": "Shanghai",
        "overallWinner": {
          "car": "Toyota Gazoo Racing #8",
          "team": "Toyota Gazoo Racing",
          "vehicle": "Toyota TS050 - Hybrid",
          "drivers": [
            "S\u00e9bastien BUEMI",
            "Anthony DAVIDSON",
            "Kazuki NAKAJIMA"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Toyota Gazoo Racing #8",
            "team": "Toyota Gazoo Racing",
            "vehicle": "Toyota TS050 - Hybrid",
            "drivers": [
              "S\u00e9bastien BUEMI",
              "Anthony DAVIDSON",
              "Kazuki NAKAJIMA"
            ]
          },
          {
            "category": "LMP2",
            "car": "Vaillante Rebellion #31",
            "team": "Vaillante Rebellion",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "Julien CANAL",
              "Nicolas PROST",
              "Bruno SENNA"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Ford Chip Ganassi Team UK #67",
            "team": "Ford Chip Ganassi Team UK",
            "vehicle": "Ford GT",
            "drivers": [
              "Andy PRIAULX",
              "Harry TINCKNELL"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Aston Martin Racing #98",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin V8 Vantage",
            "drivers": [
              "Paul DALLA LANA",
              "Pedro LAMY",
              "Mathias LAUDA"
            ]
          }
        ]
      },
      {
        "race": "Mexico",
        "overallWinner": {
          "car": "Porsche LMP Team #2",
          "team": "Porsche LMP Team",
          "vehicle": "Porsche 919 Hybrid",
          "drivers": [
            "Timo BERNHARD",
            "Earl BAMBER",
            "Brendon HARTLEY"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Porsche LMP Team #2",
            "team": "Porsche LMP Team",
            "vehicle": "Porsche 919 Hybrid",
            "drivers": [
              "Timo BERNHARD",
              "Earl BAMBER",
              "Brendon HARTLEY"
            ]
          },
          {
            "category": "LMP2",
            "car": "Vaillante Rebellion #31",
            "team": "Vaillante Rebellion",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "Julien CANAL",
              "Nicolas PROST",
              "Bruno SENNA"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Aston Martin Racing #95",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin VANTAGE",
            "drivers": [
              "Nicki THIIM",
              "Marco S\u00d8RENSEN"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Dempsey - Proton Racing #77",
            "team": "Dempsey - Proton Racing",
            "vehicle": "Porsche 911 RSR (991)",
            "drivers": [
              "Christian RIED",
              "Matteo CAIROLI",
              "Marvin DIENST"
            ]
          }
        ]
      }
    ]
  },
  {
    "season": "2018-2019",
    "label": "2018\u20132019",
    "seriesContext": "7th FIA World Endurance Championship Season ('Super Season')",
    "era": "LMP1 Twilight Era",
    "dominantManufacturer": "Toyota",
    "summary": "Spanning 14 months and two editions of the 24 Hours of Le Mans, the Super Season transitioned the WEC to a winter calendar structure. Fernando Alonso joined Toyota Gazoo Racing, winning Le Mans twice and securing the World Endurance Drivers' Championship alongside S\u00e9bastien Buemi and Kazuki Nakajima.",
    "champions": [
      {
        "category": "Overall / Top Class",
        "team": "Toyota Gazoo Racing",
        "manufacturer": "Toyota",
        "car": "Toyota TS050 Hybrid",
        "drivers": [
          "Fernando Alonso",
          "S\u00e9bastien Buemi",
          "Kazuki Nakajima"
        ],
        "note": "World Endurance LMP Drivers' & Teams' Champions (Back-to-back Le Mans)"
      },
      {
        "category": "LMP2",
        "team": "Signatech Alpine Matmut",
        "manufacturer": "Alpine-Gibson",
        "car": "Alpine A470 - Gibson",
        "drivers": [
          "Nicolas Lapierre",
          "Pierre Thiriet",
          "Andr\u00e9 Negr\u00e3o"
        ],
        "note": "LMP2 Endurance Trophy Champions"
      },
      {
        "category": "LMGTE Pro",
        "team": "Porsche GT Team",
        "manufacturer": "Porsche",
        "car": "Porsche 911 RSR",
        "drivers": [
          "Michael Christensen",
          "K\u00e9vin Estre"
        ],
        "note": "World Endurance GT Drivers' & Manufacturers' Champions"
      }
    ],
    "featuredTeams": [
      {
        "id": "toyota-gazoo-2018",
        "name": "Toyota Gazoo Racing",
        "manufacturer": "Toyota",
        "category": "LMP1",
        "carNumber": "#8",
        "carModel": "Toyota TS050 Hybrid",
        "drivers": [
          "Fernando Alonso",
          "S\u00e9bastien Buemi",
          "Kazuki Nakajima"
        ],
        "historicalSignificance": "Fernando Alonso joined S\u00e9bastien Buemi and Kazuki Nakajima to win consecutive editions of the 24 Hours of Le Mans in 2018 and 2019, securing the Drivers' World Championship.",
        "keyStat": "Back-to-back Le Mans wins & World Championship",
        "accentColor": "#d32f2f"
      },
      {
        "id": "porsche-gt-2018",
        "name": "Porsche GT Team",
        "manufacturer": "Porsche",
        "category": "LMGTE Pro",
        "carNumber": "#92",
        "carModel": "Porsche 911 RSR",
        "drivers": [
          "Michael Christensen",
          "K\u00e9vin Estre",
          "Laurens Vanthoor"
        ],
        "historicalSignificance": "Carried the retro 'Pink Pig' livery to class victory at the 2018 24 Hours of Le Mans amidst a 17-car factory LMGTE Pro field.",
        "keyStat": "GTE Pro World Championship & Le Mans victory",
        "accentColor": "#b6a16f"
      }
    ],
    "sourceProvenance": "Official FIA WEC 2018-2019 Super Season Archive.",
    "races": [
      {
        "race": "Silverstone",
        "overallWinner": {
          "car": "Rebellion Racing #3",
          "team": "Rebellion Racing",
          "vehicle": "Rebellion R13 - Gibson",
          "drivers": [
            "Mathias BECHE",
            "Thomas LAURENT",
            "Gustavo MENEZES"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Rebellion Racing #3",
            "team": "Rebellion Racing",
            "vehicle": "Rebellion R13 - Gibson",
            "drivers": [
              "Mathias BECHE",
              "Thomas LAURENT",
              "Gustavo MENEZES"
            ]
          },
          {
            "category": "LMP2",
            "car": "Jackie Chan DC Racing #38",
            "team": "Jackie Chan DC Racing",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "Ho-Pin TUNG",
              "Gabriel AUBRY",
              "St\u00e9phane RICHELMI"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "AF Corse #51",
            "team": "AF Corse",
            "vehicle": "Ferrari 488 GTE EVO",
            "drivers": [
              "Alessandro PIER GUIDI",
              "James CALADO"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Dempsey - Proton Racing #77",
            "team": "Dempsey - Proton Racing",
            "vehicle": "Porsche 911 RSR",
            "drivers": [
              "Christian RIED",
              "Julien ANDLAUER",
              "Matt CAMPBELL"
            ]
          }
        ]
      },
      {
        "race": "Spa",
        "overallWinner": {
          "car": "Toyota Gazoo Racing #8",
          "team": "Toyota Gazoo Racing",
          "vehicle": "Toyota TS050 - Hybrid",
          "drivers": [
            "S\u00e9bastien BUEMI",
            "Kazuki NAKAJIMA",
            "Fernando ALONSO"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Toyota Gazoo Racing #8",
            "team": "Toyota Gazoo Racing",
            "vehicle": "Toyota TS050 - Hybrid",
            "drivers": [
              "S\u00e9bastien BUEMI",
              "Kazuki NAKAJIMA",
              "Fernando ALONSO"
            ]
          },
          {
            "category": "LMP2",
            "car": "G-Drive Racing #26",
            "team": "G-Drive Racing",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "Roman RUSINOV",
              "Jean-Eric VERGNE",
              "Andrea PIZZITOLA"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Ford Chip Ganassi Team UK #66",
            "team": "Ford Chip Ganassi Team UK",
            "vehicle": "Ford GT",
            "drivers": [
              "Stefan M\u00dcCKE",
              "Olivier PLA",
              "Billy JOHNSON"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Aston Martin Racing #98",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin Vantage",
            "drivers": [
              "Paul DALLA LANA",
              "Pedro LAMY",
              "Mathias LAUDA"
            ]
          }
        ]
      },
      {
        "race": "Fuji",
        "overallWinner": {
          "car": "Toyota Gazoo Racing #7",
          "team": "Toyota Gazoo Racing",
          "vehicle": "Toyota TS050 - Hybrid",
          "drivers": [
            "Mike CONWAY",
            "Kamui KOBAYASHI",
            "Jose Maria LOPEZ"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Toyota Gazoo Racing #7",
            "team": "Toyota Gazoo Racing",
            "vehicle": "Toyota TS050 - Hybrid",
            "drivers": [
              "Mike CONWAY",
              "Kamui KOBAYASHI",
              "Jose Maria LOPEZ"
            ]
          },
          {
            "category": "LMP2",
            "car": "Jackie Chan DC Racing #37",
            "team": "Jackie Chan DC Racing",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "Jazeman JAAFAR",
              "Weiron TAN",
              "Nabil JEFFRI"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Porsche GT Team #92",
            "team": "Porsche GT Team",
            "vehicle": "Porsche 911 RSR",
            "drivers": [
              "Michael CHRISTENSEN",
              "Kevin ESTRE"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Team Project 1 #56",
            "team": "Team Project 1",
            "vehicle": "Porsche 911 RSR",
            "drivers": [
              "J\u00f6rg BERGMEISTER",
              "Patrick LINDSEY",
              "Egidio PERFETTI"
            ]
          }
        ]
      },
      {
        "race": "LeMans",
        "overallWinner": {
          "car": "Toyota Gazoo Racing #8",
          "team": "Toyota Gazoo Racing",
          "vehicle": "Toyota TS050 - Hybrid",
          "drivers": [
            "S\u00e9bastien BUEMI",
            "Kazuki NAKAJIMA",
            "Fernando ALONSO"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Toyota Gazoo Racing #8",
            "team": "Toyota Gazoo Racing",
            "vehicle": "Toyota TS050 - Hybrid",
            "drivers": [
              "S\u00e9bastien BUEMI",
              "Kazuki NAKAJIMA",
              "Fernando ALONSO"
            ]
          },
          {
            "category": "LMP2",
            "car": "Signatech Alpine Matmut #36",
            "team": "Signatech Alpine Matmut",
            "vehicle": "Alpine A470 - Gibson",
            "drivers": [
              "Nicolas LAPIERRE",
              "Andr\u00e9 NEGR\u00c3O",
              "Pierre THIRIET"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Porsche GT Team #92",
            "team": "Porsche GT Team",
            "vehicle": "Porsche 911 RSR",
            "drivers": [
              "Michael CHRISTENSEN",
              "Kevin ESTRE",
              "Laurens VANTHOOR"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Dempsey - Proton Racing #77",
            "team": "Dempsey - Proton Racing",
            "vehicle": "Porsche 911 RSR",
            "drivers": [
              "Matt CAMPBELL",
              "Christian RIED",
              "Julien ANDLAUER"
            ]
          }
        ]
      },
      {
        "race": "LeMans 2",
        "overallWinner": {
          "car": "Toyota Gazoo Racing #8",
          "team": "Toyota Gazoo Racing",
          "vehicle": "Toyota TS050 - Hybrid",
          "drivers": [
            "S\u00e9bastien BUEMI",
            "Kazuki NAKAJIMA",
            "Fernando ALONSO"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Toyota Gazoo Racing #8",
            "team": "Toyota Gazoo Racing",
            "vehicle": "Toyota TS050 - Hybrid",
            "drivers": [
              "S\u00e9bastien BUEMI",
              "Kazuki NAKAJIMA",
              "Fernando ALONSO"
            ]
          },
          {
            "category": "LMP2",
            "car": "Signatech Alpine Matmut #36",
            "team": "Signatech Alpine Matmut",
            "vehicle": "Alpine A470 - Gibson",
            "drivers": [
              "Nicolas LAPIERRE",
              "Andr\u00e9 NEGR\u00c3O",
              "Pierre THIRIET"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "AF Corse #51",
            "team": "AF Corse",
            "vehicle": "Ferrari 488 GTE EVO",
            "drivers": [
              "Alessandro PIER GUIDI",
              "James CALADO",
              "Daniel SERRA"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Team Project 1 #56",
            "team": "Team Project 1",
            "vehicle": "Porsche 911 RSR",
            "drivers": [
              "J\u00f6rg BERGMEISTER",
              "Patrick LINDSEY",
              "Egidio PERFETTI"
            ]
          }
        ]
      },
      {
        "race": "Shanghai",
        "overallWinner": {
          "car": "Toyota Gazoo Racing #7",
          "team": "Toyota Gazoo Racing",
          "vehicle": "Toyota TS050 - Hybrid",
          "drivers": [
            "Mike CONWAY",
            "Kamui KOBAYASHI",
            "Jose Maria LOPEZ"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Toyota Gazoo Racing #7",
            "team": "Toyota Gazoo Racing",
            "vehicle": "Toyota TS050 - Hybrid",
            "drivers": [
              "Mike CONWAY",
              "Kamui KOBAYASHI",
              "Jose Maria LOPEZ"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Aston Martin Racing #95",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin Vantage AMR",
            "drivers": [
              "Marco S\u00d8RENSEN",
              "Nicki THIIM"
            ]
          },
          {
            "category": "LMP2",
            "car": "Jackie Chan DC Racing #38",
            "team": "Jackie Chan DC Racing",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "Ho-Pin TUNG",
              "Gabriel AUBRY",
              "St\u00e9phane RICHELMI"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Dempsey - Proton Racing #77",
            "team": "Dempsey - Proton Racing",
            "vehicle": "Porsche 911 RSR",
            "drivers": [
              "Christian RIED",
              "Julien ANDLAUER",
              "Matt CAMPBELL"
            ]
          }
        ]
      },
      {
        "race": "Sebring",
        "overallWinner": {
          "car": "Toyota Gazoo Racing #8",
          "team": "Toyota Gazoo Racing",
          "vehicle": "Toyota TS050 - Hybrid",
          "drivers": [
            "S\u00e9bastien BUEMI",
            "Kazuki NAKAJIMA",
            "Fernando ALONSO"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Toyota Gazoo Racing #8",
            "team": "Toyota Gazoo Racing",
            "vehicle": "Toyota TS050 - Hybrid",
            "drivers": [
              "S\u00e9bastien BUEMI",
              "Kazuki NAKAJIMA",
              "Fernando ALONSO"
            ]
          },
          {
            "category": "LMP2",
            "car": "Jackie Chan DC Racing #37",
            "team": "Jackie Chan DC Racing",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "David HEINEMEIER-HANSSON",
              "Jordan KING",
              "William STEVENS"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Porsche GT Team #91",
            "team": "Porsche GT Team",
            "vehicle": "Porsche 911 RSR",
            "drivers": [
              "Richard LIETZ",
              "Gianmaria BRUNI"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Dempsey - Proton Racing #77",
            "team": "Dempsey - Proton Racing",
            "vehicle": "Porsche 911 RSR",
            "drivers": [
              "Christian RIED",
              "Julien ANDLAUER",
              "Matt CAMPBELL"
            ]
          }
        ]
      },
      {
        "race": "Spa 2",
        "overallWinner": {
          "car": "Toyota Gazoo Racing #8",
          "team": "Toyota Gazoo Racing",
          "vehicle": "Toyota TS050 - Hybrid",
          "drivers": [
            "S\u00e9bastien BUEMI",
            "Kazuki NAKAJIMA",
            "Fernando ALONSO"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Toyota Gazoo Racing #8",
            "team": "Toyota Gazoo Racing",
            "vehicle": "Toyota TS050 - Hybrid",
            "drivers": [
              "S\u00e9bastien BUEMI",
              "Kazuki NAKAJIMA",
              "Fernando ALONSO"
            ]
          },
          {
            "category": "LMP2",
            "car": "DragonSpeed #31",
            "team": "DragonSpeed",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "Roberto GONZALEZ",
              "Pastor MALDONADO",
              "Anthony DAVIDSON"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Aston Martin Racing #97",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin Vantage AMR",
            "drivers": [
              "Alexander LYNN",
              "Maxime MARTIN"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Dempsey - Proton Racing #77",
            "team": "Dempsey - Proton Racing",
            "vehicle": "Porsche 911 RSR",
            "drivers": [
              "Christian RIED",
              "Riccardo PERA",
              "Matt CAMPBELL"
            ]
          }
        ]
      }
    ]
  },
  {
    "season": "2019-2020",
    "label": "2019\u20132020",
    "seriesContext": "8th FIA World Endurance Championship Season",
    "era": "LMP1 Twilight Era",
    "dominantManufacturer": "Toyota",
    "summary": "The final season under LMP1 regulations introduced success handicaps to balance factory hybrids with privateer entries. The #7 Toyota crew took victory at Le Mans and captured the World Championship.",
    "champions": [
      {
        "category": "Overall / Top Class",
        "team": "Toyota Gazoo Racing",
        "manufacturer": "Toyota",
        "car": "Toyota TS050 Hybrid",
        "drivers": [
          "Mike Conway",
          "Kamui Kobayashi",
          "Jos\u00e9 Mar\u00eda L\u00f3pez"
        ],
        "note": "World Endurance LMP Drivers' & Teams' Champions"
      },
      {
        "category": "LMP2",
        "team": "United Autosports",
        "manufacturer": "Oreca-Gibson",
        "car": "Oreca 07 - Gibson",
        "drivers": [
          "Filipe Albuquerque",
          "Philip Hanson"
        ],
        "note": "LMP2 Endurance Trophy Champions (4 consecutive wins)"
      },
      {
        "category": "LMGTE Pro",
        "team": "Aston Martin Racing",
        "manufacturer": "Aston Martin",
        "car": "Aston Martin Vantage AMR",
        "drivers": [
          "Marco S\u00f8rensen",
          "Nicki Thiim"
        ],
        "note": "World Endurance GT Drivers' & Manufacturers' Champions"
      }
    ],
    "featuredTeams": [
      {
        "id": "toyota-gazoo-2019",
        "name": "Toyota Gazoo Racing",
        "manufacturer": "Toyota",
        "category": "LMP1",
        "carNumber": "#7",
        "carModel": "Toyota TS050 Hybrid",
        "drivers": [
          "Mike Conway",
          "Kamui Kobayashi",
          "Jos\u00e9 Mar\u00eda L\u00f3pez"
        ],
        "historicalSignificance": "Following several narrow defeats in previous seasons, the #7 crew won four of eight rounds to capture the 2019\u20132020 World Championship.",
        "keyStat": "4 victories & World Championship redemption",
        "accentColor": "#d32f2f"
      },
      {
        "id": "united-autosports-2019",
        "name": "United Autosports",
        "manufacturer": "United Autosports",
        "category": "LMP2",
        "carNumber": "#22",
        "carModel": "Oreca 07 - Gibson",
        "drivers": [
          "Filipe Albuquerque",
          "Philip Hanson",
          "Paul di Resta"
        ],
        "historicalSignificance": "Secured four consecutive class victories across the season, including the 2020 24 Hours of Le Mans, to win the LMP2 title.",
        "keyStat": "4 consecutive class wins including Le Mans",
        "accentColor": "#002c6c"
      }
    ],
    "sourceProvenance": "Official FIA WEC 2019-2020 Season Archive.",
    "races": [
      {
        "race": "Silverstone",
        "overallWinner": {
          "car": "Toyota Gazoo Racing #7",
          "team": "Toyota Gazoo Racing",
          "vehicle": "Toyota TS050 - Hybrid",
          "drivers": [
            "Mike CONWAY",
            "Kamui KOBAYASHI",
            "Jose Maria LOPEZ"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Toyota Gazoo Racing #7",
            "team": "Toyota Gazoo Racing",
            "vehicle": "Toyota TS050 - Hybrid",
            "drivers": [
              "Mike CONWAY",
              "Kamui KOBAYASHI",
              "Jose Maria LOPEZ"
            ]
          },
          {
            "category": "LMP2",
            "car": "Cool Racing #42",
            "team": "Cool Racing",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "Nicolas LAPIERRE",
              "Antonin BORGA"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Porsche GT Team #91",
            "team": "Porsche GT Team",
            "vehicle": "Porsche 911 RSR - 19",
            "drivers": [
              "Gianmaria BRUNI",
              "Richard LIETZ"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "AF Corse #83",
            "team": "AF Corse",
            "vehicle": "Ferrari 488 GTE EVO",
            "drivers": [
              "Fran\u00e7ois PERRODO",
              "Emmanuel COLLARD",
              "Nicklas NIELSEN"
            ]
          }
        ]
      },
      {
        "race": "Fuji",
        "overallWinner": {
          "car": "Toyota Gazoo Racing #8",
          "team": "Toyota Gazoo Racing",
          "vehicle": "Toyota TS050 - Hybrid",
          "drivers": [
            "S\u00e9bastien BUEMI",
            "Kazuki NAKAJIMA",
            "Brendon HARTLEY"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Toyota Gazoo Racing #8",
            "team": "Toyota Gazoo Racing",
            "vehicle": "Toyota TS050 - Hybrid",
            "drivers": [
              "S\u00e9bastien BUEMI",
              "Kazuki NAKAJIMA",
              "Brendon HARTLEY"
            ]
          },
          {
            "category": "LMP2",
            "car": "Racing Team Nederland #29",
            "team": "Racing Team Nederland",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "Frits VAN EERD",
              "Giedo VAN DER GARDE",
              "Nyck DE VRIES"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Aston Martin Racing #95",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin Vantage AMR",
            "drivers": [
              "Marco S\u00d8RENSEN",
              "Nicki THIIM"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "TF Sport #90",
            "team": "TF Sport",
            "vehicle": "Aston Martin Vantage AMR",
            "drivers": [
              "Salih YOLUC",
              "Charles EASTWOOD",
              "Jonathan ADAM"
            ]
          }
        ]
      },
      {
        "race": "Shanghai",
        "overallWinner": {
          "car": "Rebellion Racing #1",
          "team": "Rebellion Racing",
          "vehicle": "Rebellion R13 - Gibson",
          "drivers": [
            "Bruno SENNA",
            "Gustavo MENEZES",
            "Norman NATO"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Rebellion Racing #1",
            "team": "Rebellion Racing",
            "vehicle": "Rebellion R13 - Gibson",
            "drivers": [
              "Bruno SENNA",
              "Gustavo MENEZES",
              "Norman NATO"
            ]
          },
          {
            "category": "LMP2",
            "car": "JOTA #38",
            "team": "JOTA",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "Roberto GONZALEZ",
              "Antonio Felix DA COSTA",
              "Anthony DAVIDSON"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "AF Corse #51",
            "team": "AF Corse",
            "vehicle": "Ferrari F488 GTE EVO",
            "drivers": [
              "James CALADO",
              "Alessandro PIER GUIDI"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "TF Sport #90",
            "team": "TF Sport",
            "vehicle": "Aston Martin Vantage AMR",
            "drivers": [
              "Salih YOLUC",
              "Charles EASTWOOD",
              "Jonathan ADAM"
            ]
          }
        ]
      },
      {
        "race": "Bahrain",
        "overallWinner": {
          "car": "Toyota Gazoo Racing #7",
          "team": "Toyota Gazoo Racing",
          "vehicle": "Toyota TS050 - Hybrid",
          "drivers": [
            "Mike CONWAY",
            "Kamui KOBAYASHI",
            "Jose Maria LOPEZ"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Toyota Gazoo Racing #7",
            "team": "Toyota Gazoo Racing",
            "vehicle": "Toyota TS050 - Hybrid",
            "drivers": [
              "Mike CONWAY",
              "Kamui KOBAYASHI",
              "Jose Maria LOPEZ"
            ]
          },
          {
            "category": "LMP2",
            "car": "Jackie Chan DC Racing #37",
            "team": "Jackie Chan DC Racing",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "Ho-Pin TUNG",
              "Gabriel AUBRY",
              "Will STEVENS"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Porsche GT Team #92",
            "team": "Porsche GT Team",
            "vehicle": "Porsche 911 RSR - 19",
            "drivers": [
              "Michael CHRISTENSEN",
              "Kevin ESTRE"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Team Project 1 #56",
            "team": "Team Project 1",
            "vehicle": "Porsche 911 RSR",
            "drivers": [
              "Egidio PERFETTI",
              "Larry TEN VOORDE",
              "J\u00f6rg BERGMEISTER"
            ]
          }
        ]
      },
      {
        "race": "Cota",
        "overallWinner": {
          "car": "Rebellion Racing #1",
          "team": "Rebellion Racing",
          "vehicle": "Rebellion R13 - Gibson",
          "drivers": [
            "Bruno SENNA",
            "Gustavo MENEZES",
            "Norman NATO"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Rebellion Racing #1",
            "team": "Rebellion Racing",
            "vehicle": "Rebellion R13 - Gibson",
            "drivers": [
              "Bruno SENNA",
              "Gustavo MENEZES",
              "Norman NATO"
            ]
          },
          {
            "category": "LMP2",
            "car": "United Autosports #22",
            "team": "United Autosports",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "Philip HANSON",
              "Filipe ALBUQUERQUE",
              "Paul DI RESTA"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Aston Martin Racing #95",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin Vantage AMR",
            "drivers": [
              "Marco S\u00d8RENSEN",
              "Nicki THIIM"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "TF Sport #90",
            "team": "TF Sport",
            "vehicle": "Aston Martin Vantage AMR",
            "drivers": [
              "Salih YOLUC",
              "Charles EASTWOOD",
              "Jonathan ADAM"
            ]
          }
        ]
      },
      {
        "race": "LeMans",
        "overallWinner": {
          "car": "Toyota Gazoo Racing #8",
          "team": "Toyota Gazoo Racing",
          "vehicle": "Toyota TS050 - Hybrid",
          "drivers": [
            "S\u00e9bastien BUEMI",
            "Kazuki NAKAJIMA",
            "Brendon HARTLEY"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Toyota Gazoo Racing #8",
            "team": "Toyota Gazoo Racing",
            "vehicle": "Toyota TS050 - Hybrid",
            "drivers": [
              "S\u00e9bastien BUEMI",
              "Kazuki NAKAJIMA",
              "Brendon HARTLEY"
            ]
          },
          {
            "category": "LMP2",
            "car": "United Autosports #22",
            "team": "United Autosports",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "Philip HANSON",
              "Filipe ALBUQUERQUE",
              "Paul DI RESTA"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Aston Martin Racing #97",
            "team": "Aston Martin Racing",
            "vehicle": "Aston Martin Vantage AMR",
            "drivers": [
              "Maxime MARTIN",
              "Alexander LYNN",
              "Harry TINCKNELL"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "TF Sport #90",
            "team": "TF Sport",
            "vehicle": "Aston Martin Vantage AMR",
            "drivers": [
              "Salih YOLUC",
              "Charles EASTWOOD",
              "Jonathan ADAM"
            ]
          }
        ]
      },
      {
        "race": "Spa",
        "overallWinner": {
          "car": "Toyota Gazoo Racing #7",
          "team": "Toyota Gazoo Racing",
          "vehicle": "Toyota TS050 - Hybrid",
          "drivers": [
            "Mike CONWAY",
            "Kamui KOBAYASHI",
            "Jose Maria LOPEZ"
          ]
        },
        "classWinners": [
          {
            "category": "LMP1",
            "car": "Toyota Gazoo Racing #7",
            "team": "Toyota Gazoo Racing",
            "vehicle": "Toyota TS050 - Hybrid",
            "drivers": [
              "Mike CONWAY",
              "Kamui KOBAYASHI",
              "Jose Maria LOPEZ"
            ]
          },
          {
            "category": "LMP2",
            "car": "United Autosports #22",
            "team": "United Autosports",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "Philip HANSON",
              "Filipe ALBUQUERQUE",
              "Paul DI RESTA"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Porsche GT Team #92",
            "team": "Porsche GT Team",
            "vehicle": "Porsche 911 RSR - 19",
            "drivers": [
              "Michael CHRISTENSEN",
              "Kevin ESTRE"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "AF Corse #83",
            "team": "AF Corse",
            "vehicle": "Ferrari 488 GTE Evo",
            "drivers": [
              "Fran\u00e7ois PERRODO",
              "Emmanuel COLLARD",
              "Nicklas NIELSEN"
            ]
          }
        ]
      }
    ]
  },
  {
    "season": "2021",
    "label": "2021",
    "seriesContext": "9th FIA World Endurance Championship Season: Dawn of Hypercar",
    "era": "Hypercar Era",
    "dominantManufacturer": "Toyota",
    "summary": "The inaugural season of the Le Mans Hypercar (LMH) formula. Toyota introduced the GR010 Hybrid, winning all six rounds of the championship and recording a 1-2 finish at the 24 Hours of Le Mans.",
    "champions": [
      {
        "category": "Overall / Top Class",
        "team": "Toyota Gazoo Racing",
        "manufacturer": "Toyota",
        "car": "Toyota GR010 Hybrid",
        "drivers": [
          "Mike Conway",
          "Kamui Kobayashi",
          "Jos\u00e9 Mar\u00eda L\u00f3pez"
        ],
        "note": "Inaugural Hypercar World Endurance Drivers' & Manufacturers' Champions"
      },
      {
        "category": "LMP2",
        "team": "Team WRT",
        "manufacturer": "Oreca-Gibson",
        "car": "Oreca 07 - Gibson",
        "drivers": [
          "Robin Frijns",
          "Ferdinand Habsburg",
          "Charles Milesi"
        ],
        "note": "LMP2 Endurance Trophy Champions"
      },
      {
        "category": "LMGTE Pro",
        "team": "AF Corse",
        "manufacturer": "Ferrari",
        "car": "Ferrari 488 GTE Evo",
        "drivers": [
          "James Calado",
          "Alessandro Pier Guidi"
        ],
        "note": "World Endurance GT Drivers' & Manufacturers' Champions"
      }
    ],
    "featuredTeams": [
      {
        "id": "toyota-gazoo-2021",
        "name": "Toyota Gazoo Racing",
        "manufacturer": "Toyota",
        "category": "Hypercar",
        "carNumber": "#7",
        "carModel": "Toyota GR010 Hybrid",
        "drivers": [
          "Mike Conway",
          "Kamui Kobayashi",
          "Jos\u00e9 Mar\u00eda L\u00f3pez"
        ],
        "historicalSignificance": "Won the 24 Hours of Le Mans on the Hypercar platform's debut, completing a sweep of the six 2021 championship rounds.",
        "keyStat": "Inaugural Hypercar Le Mans Champions",
        "accentColor": "#d32f2f"
      },
      {
        "id": "team-wrt-2021",
        "name": "Team WRT",
        "manufacturer": "Team WRT",
        "category": "LMP2",
        "carNumber": "#31",
        "carModel": "Oreca 07 - Gibson",
        "drivers": [
          "Robin Frijns",
          "Ferdinand Habsburg",
          "Charles Milesi"
        ],
        "historicalSignificance": "In its debut prototype season, Team WRT secured the LMP2 title, winning at Le Mans by 0.727 seconds after sister car #41 stopped on the final lap.",
        "keyStat": "Rookie LMP2 Le Mans victory by 0.727s",
        "accentColor": "#0a58ca"
      }
    ],
    "sourceProvenance": "Official FIA WEC 2021 Hypercar Regulations & Sporting Archive.",
    "races": [
      {
        "race": "Algarve",
        "overallWinner": {
          "car": "Toyota Gazoo Racing #8",
          "team": "Toyota Gazoo Racing",
          "vehicle": "Toyota GR010 HYBRID",
          "drivers": [
            "S\u00e9bastien BUEMI",
            "Kazuki NAKAJIMA",
            "Brendon HARTLEY"
          ]
        },
        "classWinners": [
          {
            "category": "HYPERCAR",
            "car": "Toyota Gazoo Racing #8",
            "team": "Toyota Gazoo Racing",
            "vehicle": "Toyota GR010 HYBRID",
            "drivers": [
              "S\u00e9bastien BUEMI",
              "Kazuki NAKAJIMA",
              "Brendon HARTLEY"
            ]
          },
          {
            "category": "LMP2",
            "car": "JOTA #38",
            "team": "JOTA",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "Roberto GONZALEZ",
              "Antonio Felix DA COSTA",
              "Anthony DAVIDSON"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "AF Corse #51",
            "team": "AF Corse",
            "vehicle": "Ferrari 488 GTE Evo",
            "drivers": [
              "Alessandro PIER GUIDI",
              "James CALADO"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Cetilar Racing #47",
            "team": "Cetilar Racing",
            "vehicle": "Ferrari 488 GTE Evo",
            "drivers": [
              "Roberto LACORTE",
              "Giorgio SERNAGIOTTO",
              "Antonio FUOCO"
            ]
          }
        ]
      },
      {
        "race": "LeMans",
        "overallWinner": {
          "car": "Toyota Gazoo Racing #7",
          "team": "Toyota Gazoo Racing",
          "vehicle": "Toyota GR010 HYBRID",
          "drivers": [
            "Mike CONWAY",
            "Kamui KOBAYASHI",
            "Jose Maria LOPEZ"
          ]
        },
        "classWinners": [
          {
            "category": "HYPERCAR",
            "car": "Toyota Gazoo Racing #7",
            "team": "Toyota Gazoo Racing",
            "vehicle": "Toyota GR010 HYBRID",
            "drivers": [
              "Mike CONWAY",
              "Kamui KOBAYASHI",
              "Jose Maria LOPEZ"
            ]
          },
          {
            "category": "LMP2",
            "car": "Team WRT #31",
            "team": "Team WRT",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "Robin FRIJNS",
              "Ferdinand HABSBURG",
              "Charles MILESI"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "AF Corse #51",
            "team": "AF Corse",
            "vehicle": "Ferrari 488 GTE Evo",
            "drivers": [
              "Alessandro PIER GUIDI",
              "James CALADO",
              "C\u00f4me LEDOGAR"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "AF Corse #83",
            "team": "AF Corse",
            "vehicle": "Ferrari 488 GTE Evo",
            "drivers": [
              "Fran\u00e7ois PERRODO",
              "Nicklas NIELSEN",
              "Alessio ROVERA"
            ]
          },
          {
            "category": "INNOVATIVE CAR",
            "car": "Association SRT41 #84",
            "team": "Association SRT41",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "Takuma AOKI",
              "Nigel BAILLY",
              "Matthieu LAHAYE"
            ]
          }
        ]
      },
      {
        "race": "Spa",
        "overallWinner": {
          "car": "Toyota Gazoo Racing #8",
          "team": "Toyota Gazoo Racing",
          "vehicle": "Toyota GR010 HYBRID",
          "drivers": [
            "S\u00e9bastien BUEMI",
            "Kazuki NAKAJIMA",
            "Brendon HARTLEY"
          ]
        },
        "classWinners": [
          {
            "category": "HYPERCAR",
            "car": "Toyota Gazoo Racing #8",
            "team": "Toyota Gazoo Racing",
            "vehicle": "Toyota GR010 HYBRID",
            "drivers": [
              "S\u00e9bastien BUEMI",
              "Kazuki NAKAJIMA",
              "Brendon HARTLEY"
            ]
          },
          {
            "category": "LMP2",
            "car": "United Autosports USA #22",
            "team": "United Autosports USA",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "Philip HANSON",
              "Fabio SCHERER",
              "Filipe ALBUQUERQUE"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Porsche GT Team #92",
            "team": "Porsche GT Team",
            "vehicle": "Porsche 911 RSR - 19",
            "drivers": [
              "Kevin ESTRE",
              "Neel JANI"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "AF Corse #83",
            "team": "AF Corse",
            "vehicle": "Ferrari 488 GTE Evo",
            "drivers": [
              "Fran\u00e7ois PERRODO",
              "Nicklas NIELSEN",
              "Alessio ROVERA"
            ]
          }
        ]
      },
      {
        "race": "Monza",
        "overallWinner": {
          "car": "Toyota Gazoo Racing #7",
          "team": "Toyota Gazoo Racing",
          "vehicle": "Toyota GR010 HYBRID",
          "drivers": [
            "Mike CONWAY",
            "Kamui KOBAYASHI",
            "Jose Maria LOPEZ"
          ]
        },
        "classWinners": [
          {
            "category": "HYPERCAR",
            "car": "Toyota Gazoo Racing #7",
            "team": "Toyota Gazoo Racing",
            "vehicle": "Toyota GR010 HYBRID",
            "drivers": [
              "Mike CONWAY",
              "Kamui KOBAYASHI",
              "Jose Maria LOPEZ"
            ]
          },
          {
            "category": "LMP2",
            "car": "United Autosports USA #22",
            "team": "United Autosports USA",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "Philip HANSON",
              "Fabio SCHERER",
              "Filipe ALBUQUERQUE"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Porsche GT Team #92",
            "team": "Porsche GT Team",
            "vehicle": "Porsche 911 RSR - 19",
            "drivers": [
              "Kevin ESTRE",
              "Neel JANI"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "AF Corse #83",
            "team": "AF Corse",
            "vehicle": "Ferrari 488 GTE Evo",
            "drivers": [
              "Fran\u00e7ois PERRODO",
              "Nicklas NIELSEN",
              "Alessio ROVERA"
            ]
          }
        ]
      },
      {
        "race": "Bahrain",
        "overallWinner": {
          "car": "Toyota Gazoo Racing #8",
          "team": "Toyota Gazoo Racing",
          "vehicle": "Toyota GR010 HYBRID",
          "drivers": [
            "S\u00e9bastien BUEMI",
            "Kazuki NAKAJIMA",
            "Brendon HARTLEY"
          ]
        },
        "classWinners": [
          {
            "category": "HYPERCAR",
            "car": "Toyota Gazoo Racing #8",
            "team": "Toyota Gazoo Racing",
            "vehicle": "Toyota GR010 HYBRID",
            "drivers": [
              "S\u00e9bastien BUEMI",
              "Kazuki NAKAJIMA",
              "Brendon HARTLEY"
            ]
          },
          {
            "category": "LMP2",
            "car": "Team WRT #31",
            "team": "Team WRT",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "Robin FRIJNS",
              "Ferdinand HABSBURG",
              "Charles MILESI"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "AF Corse #51",
            "team": "AF Corse",
            "vehicle": "Ferrari 488 GTE Evo",
            "drivers": [
              "Alessandro PIER GUIDI",
              "James CALADO"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "AF Corse #83",
            "team": "AF Corse",
            "vehicle": "Ferrari 488 GTE Evo",
            "drivers": [
              "Fran\u00e7ois PERRODO",
              "Nicklas NIELSEN",
              "Alessio ROVERA"
            ]
          }
        ]
      },
      {
        "race": "Bahrain 2",
        "overallWinner": {
          "car": "Toyota Gazoo Racing #7",
          "team": "Toyota Gazoo Racing",
          "vehicle": "Toyota GR010 HYBRID",
          "drivers": [
            "Mike CONWAY",
            "Kamui KOBAYASHI",
            "Jose Maria LOPEZ"
          ]
        },
        "classWinners": [
          {
            "category": "HYPERCAR",
            "car": "Toyota Gazoo Racing #7",
            "team": "Toyota Gazoo Racing",
            "vehicle": "Toyota GR010 HYBRID",
            "drivers": [
              "Mike CONWAY",
              "Kamui KOBAYASHI",
              "Jose Maria LOPEZ"
            ]
          },
          {
            "category": "LMP2",
            "car": "Team WRT #31",
            "team": "Team WRT",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "Robin FRIJNS",
              "Ferdinand HABSBURG",
              "Charles MILESI"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Porsche GT Team #92",
            "team": "Porsche GT Team",
            "vehicle": "Porsche 911 RSR - 19",
            "drivers": [
              "Kevin ESTRE",
              "Neel JANI"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "TF Sport #33",
            "team": "TF Sport",
            "vehicle": "Aston Martin Vantage AMR",
            "drivers": [
              "Ben KEATING",
              "Dylan PEREIRA",
              "Felipe FRAGA"
            ]
          }
        ]
      }
    ]
  },
  {
    "season": "2022",
    "label": "2022",
    "seriesContext": "10th FIA World Endurance Championship Season",
    "era": "Hypercar Era",
    "dominantManufacturer": "Toyota",
    "summary": "Toyota competed against grandfathered LMP1 machinery entered by Alpine and the debut of Peugeot's 9X8. The season also concluded factory competition in the LMGTE Pro category.",
    "champions": [
      {
        "category": "Overall / Top Class",
        "team": "Toyota Gazoo Racing",
        "manufacturer": "Toyota",
        "car": "Toyota GR010 Hybrid",
        "drivers": [
          "S\u00e9bastien Buemi",
          "Brendon Hartley",
          "Ryo Hirakawa"
        ],
        "note": "Hypercar World Endurance Drivers' & Manufacturers' Champions"
      },
      {
        "category": "LMP2",
        "team": "JOTA",
        "manufacturer": "Oreca-Gibson",
        "car": "Oreca 07 - Gibson",
        "drivers": [
          "Roberto Gonz\u00e1lez",
          "Ant\u00f3nio F\u00e9lix da Costa",
          "Will Stevens"
        ],
        "note": "LMP2 Endurance Trophy Champions"
      },
      {
        "category": "LMGTE Pro",
        "team": "AF Corse",
        "manufacturer": "Ferrari",
        "car": "Ferrari 488 GTE Evo",
        "drivers": [
          "James Calado",
          "Alessandro Pier Guidi"
        ],
        "note": "Final LMGTE Pro World Champions before class retirement"
      }
    ],
    "featuredTeams": [
      {
        "id": "toyota-gazoo-2022",
        "name": "Toyota Gazoo Racing",
        "manufacturer": "Toyota",
        "category": "Hypercar",
        "carNumber": "#8",
        "carModel": "Toyota GR010 Hybrid",
        "drivers": [
          "S\u00e9bastien Buemi",
          "Brendon Hartley",
          "Ryo Hirakawa"
        ],
        "historicalSignificance": "Brendon Hartley took his fourth overall Le Mans victory alongside S\u00e9bastien Buemi and newcomer Ryo Hirakawa, securing the 2022 World Championship.",
        "keyStat": "5th consecutive Le Mans victory for Toyota",
        "accentColor": "#d32f2f"
      },
      {
        "id": "af-corse-2022",
        "name": "AF Corse",
        "manufacturer": "Ferrari",
        "category": "LMGTE Pro",
        "carNumber": "#51",
        "carModel": "Ferrari 488 GTE Evo",
        "drivers": [
          "James Calado",
          "Alessandro Pier Guidi"
        ],
        "historicalSignificance": "Managed gearbox issues in the Bahrain 8 Hours finale to hold off Porsche and secure the final LMGTE Pro World Championship.",
        "keyStat": "Definitive Final LMGTE Pro World Champions",
        "accentColor": "#b8493e"
      }
    ],
    "sourceProvenance": "Official FIA WEC 2022 Classifications & ACO Archive.",
    "races": [
      {
        "race": "Sebring",
        "overallWinner": {
          "car": "Alpine ELF Team #36",
          "team": "Alpine ELF Team",
          "vehicle": "Alpine A480 - Gibson",
          "drivers": [
            "Andr\u00e9 NEGR\u00c3O",
            "Nicolas LAPIERRE",
            "Matthieu VAXIVIERE"
          ]
        },
        "classWinners": [
          {
            "category": "HYPERCAR",
            "car": "Alpine ELF Team #36",
            "team": "Alpine ELF Team",
            "vehicle": "Alpine A480 - Gibson",
            "drivers": [
              "Andr\u00e9 NEGR\u00c3O",
              "Nicolas LAPIERRE",
              "Matthieu VAXIVIERE"
            ]
          },
          {
            "category": "LMP2",
            "car": "United Autosports USA #23",
            "team": "United Autosports USA",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "Paul DI RESTA",
              "Oliver JARVIS",
              "Joshua PIERSON"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Porsche GT Team #92",
            "team": "Porsche GT Team",
            "vehicle": "Porsche 911 RSR - 19",
            "drivers": [
              "Michael CHRISTENSEN",
              "Kevin ESTRE"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Northwest AMR #98",
            "team": "Northwest AMR",
            "vehicle": "Aston Martin Vantage AMR",
            "drivers": [
              "Paul DALLA LANA",
              "David PITTARD",
              "Nicki THIIM"
            ]
          }
        ]
      },
      {
        "race": "LeMans",
        "overallWinner": {
          "car": "Toyota Gazoo Racing #8",
          "team": "Toyota Gazoo Racing",
          "vehicle": "Toyota GR010 HYBRID",
          "drivers": [
            "S\u00e9bastien BUEMI",
            "Brendon HARTLEY",
            "Ryo HIRAKAWA"
          ]
        },
        "classWinners": [
          {
            "category": "HYPERCAR",
            "car": "Toyota Gazoo Racing #8",
            "team": "Toyota Gazoo Racing",
            "vehicle": "Toyota GR010 HYBRID",
            "drivers": [
              "S\u00e9bastien BUEMI",
              "Brendon HARTLEY",
              "Ryo HIRAKAWA"
            ]
          },
          {
            "category": "LMP2",
            "car": "JOTA #38",
            "team": "JOTA",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "Roberto GONZALEZ",
              "Antonio Felix DA COSTA",
              "William STEVENS"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Porsche GT Team #91",
            "team": "Porsche GT Team",
            "vehicle": "Porsche 911 RSR - 19",
            "drivers": [
              "Gianmaria BRUNI",
              "Richard LIETZ",
              "Fr\u00e9d\u00e9ric MAKOWIECKI"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "TF Sport #33",
            "team": "TF Sport",
            "vehicle": "Aston Martin VANTAGE AMR",
            "drivers": [
              "Ben KEATING",
              "Henrique CHAVES",
              "Marco S\u00d8RENSEN"
            ]
          }
        ]
      },
      {
        "race": "Spa",
        "overallWinner": {
          "car": "Toyota Gazoo Racing #7",
          "team": "Toyota Gazoo Racing",
          "vehicle": "Toyota GR010 HYBRID",
          "drivers": [
            "Mike CONWAY",
            "Kamui KOBAYASHI",
            "Jose Maria LOPEZ"
          ]
        },
        "classWinners": [
          {
            "category": "HYPERCAR",
            "car": "Toyota Gazoo Racing #7",
            "team": "Toyota Gazoo Racing",
            "vehicle": "Toyota GR010 HYBRID",
            "drivers": [
              "Mike CONWAY",
              "Kamui KOBAYASHI",
              "Jose Maria LOPEZ"
            ]
          },
          {
            "category": "LMP2",
            "car": "WRT #31",
            "team": "WRT",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "Sean GELAEL",
              "Robin FRIJNS",
              "Ren\u00e9 RAST"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "AF Corse #51",
            "team": "AF Corse",
            "vehicle": "Ferrari 488 GTE Evo",
            "drivers": [
              "Alessandro PIER GUIDI",
              "James CALADO"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Dempsey - Proton Racing #77",
            "team": "Dempsey - Proton Racing",
            "vehicle": "Porsche 911 RSR - 19",
            "drivers": [
              "Christian RIED",
              "Sebastian PRIAULX",
              "Harry TINCKNELL"
            ]
          }
        ]
      },
      {
        "race": "Monza",
        "overallWinner": {
          "car": "Alpine ELF Team #36",
          "team": "Alpine ELF Team",
          "vehicle": "Alpine A480 - Gibson",
          "drivers": [
            "Andr\u00e9 NEGR\u00c3O",
            "Nicolas LAPIERRE",
            "Matthieu VAXIVIERE"
          ]
        },
        "classWinners": [
          {
            "category": "HYPERCAR",
            "car": "Alpine ELF Team #36",
            "team": "Alpine ELF Team",
            "vehicle": "Alpine A480 - Gibson",
            "drivers": [
              "Andr\u00e9 NEGR\u00c3O",
              "Nicolas LAPIERRE",
              "Matthieu VAXIVIERE"
            ]
          },
          {
            "category": "LMP2",
            "car": "Realteam by WRT #41",
            "team": "Realteam by WRT",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "Rui ANDRADE",
              "Ferdinand HABSBURG",
              "Norman NATO"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "Corvette Racing #64",
            "team": "Corvette Racing",
            "vehicle": "Chevrolet Corvette C8.R",
            "drivers": [
              "Tommy MILNER",
              "Nick TANDY"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Dempsey - Proton Racing #77",
            "team": "Dempsey - Proton Racing",
            "vehicle": "Porsche 911 RSR - 19",
            "drivers": [
              "Christian RIED",
              "Sebastian PRIAULX",
              "Harry TINCKNELL"
            ]
          }
        ]
      },
      {
        "race": "Fuji",
        "overallWinner": {
          "car": "Toyota Gazoo Racing #8",
          "team": "Toyota Gazoo Racing",
          "vehicle": "Toyota GR010 HYBRID",
          "drivers": [
            "S\u00e9bastien BUEMI",
            "Brendon HARTLEY",
            "Ryo HIRAKAWA"
          ]
        },
        "classWinners": [
          {
            "category": "HYPERCAR",
            "car": "Toyota Gazoo Racing #8",
            "team": "Toyota Gazoo Racing",
            "vehicle": "Toyota GR010 HYBRID",
            "drivers": [
              "S\u00e9bastien BUEMI",
              "Brendon HARTLEY",
              "Ryo HIRAKAWA"
            ]
          },
          {
            "category": "LMP2",
            "car": "WRT #31",
            "team": "WRT",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "Sean GELAEL",
              "Robin FRIJNS",
              "Dries VANTHOOR"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "AF Corse #51",
            "team": "AF Corse",
            "vehicle": "Ferrari 488 GTE Evo",
            "drivers": [
              "Alessandro PIER GUIDI",
              "James CALADO"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "TF Sport #33",
            "team": "TF Sport",
            "vehicle": "Aston Martin Vantage AMR",
            "drivers": [
              "Ben KEATING",
              "Henrique CHAVES",
              "Marco S\u00d8RENSEN"
            ]
          }
        ]
      },
      {
        "race": "Bahrain",
        "overallWinner": {
          "car": "Toyota Gazoo Racing #7",
          "team": "Toyota Gazoo Racing",
          "vehicle": "Toyota GR010 HYBRID",
          "drivers": [
            "Mike CONWAY",
            "Kamui KOBAYASHI",
            "Jose Maria LOPEZ"
          ]
        },
        "classWinners": [
          {
            "category": "HYPERCAR",
            "car": "Toyota Gazoo Racing #7",
            "team": "Toyota Gazoo Racing",
            "vehicle": "Toyota GR010 HYBRID",
            "drivers": [
              "Mike CONWAY",
              "Kamui KOBAYASHI",
              "Jose Maria LOPEZ"
            ]
          },
          {
            "category": "LMP2",
            "car": "WRT #31",
            "team": "WRT",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "Sean GELAEL",
              "Robin FRIJNS",
              "Ren\u00e9 RAST"
            ]
          },
          {
            "category": "LMGTE Pro",
            "car": "AF Corse #52",
            "team": "AF Corse",
            "vehicle": "Ferrari 488 GTE Evo",
            "drivers": [
              "Miguel MOLINA",
              "Antonio FUOCO"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Team Project 1 #46",
            "team": "Team Project 1",
            "vehicle": "Porsche 911 RSR - 19",
            "drivers": [
              "Matteo CAIROLI",
              "Mikkel PEDERSEN",
              "Nicolas LEUTWILER"
            ]
          }
        ]
      }
    ]
  },
  {
    "season": "2023",
    "label": "2023",
    "seriesContext": "11th FIA World Endurance Championship Season: Centenary of Le Mans",
    "era": "Hypercar Era",
    "dominantManufacturer": "Toyota & Ferrari",
    "summary": "The Hypercar class expanded to include manufacturer entries from Ferrari, Porsche, Cadillac, Peugeot, and Toyota. In its return to top-class endurance racing after 50 years, Ferrari took overall victory at the centenary edition of the 24 Hours of Le Mans.",
    "champions": [
      {
        "category": "Overall / Top Class",
        "team": "Toyota Gazoo Racing",
        "manufacturer": "Toyota",
        "car": "Toyota GR010 Hybrid",
        "drivers": [
          "S\u00e9bastien Buemi",
          "Brendon Hartley",
          "Ryo Hirakawa"
        ],
        "note": "Hypercar World Endurance Drivers' & Manufacturers' Champions (6 wins in 7 races)"
      },
      {
        "category": "LMP2",
        "team": "Team WRT",
        "manufacturer": "Oreca-Gibson",
        "car": "Oreca 07 - Gibson",
        "drivers": [
          "Rui Andrade",
          "Louis Del\u00e9traz",
          "Robert Kubica"
        ],
        "note": "Final full-season WEC LMP2 Champions (F1 veteran Robert Kubica)"
      },
      {
        "category": "LMGTE Am",
        "team": "Corvette Racing",
        "manufacturer": "Chevrolet",
        "car": "Chevrolet Corvette C8.R",
        "drivers": [
          "Nicky Catsburg",
          "Ben Keating",
          "Nicol\u00e1s Varrone"
        ],
        "note": "Final GTE-era Champions before transition to LMGT3 in 2024"
      }
    ],
    "featuredTeams": [
      {
        "id": "ferrari-af-corse-2023",
        "name": "Ferrari AF Corse",
        "manufacturer": "Ferrari",
        "category": "Hypercar",
        "carNumber": "#51",
        "carModel": "Ferrari 499P",
        "drivers": [
          "Alessandro Pier Guidi",
          "James Calado",
          "Antonio Giovinazzi"
        ],
        "historicalSignificance": "Marked Ferrari's return to the top class after 50 years, starting from pole position and winning the centenary edition of the 24 Hours of Le Mans.",
        "keyStat": "Ferrari overall Le Mans win on factory return",
        "accentColor": "#b8493e"
      },
      {
        "id": "toyota-gazoo-2023",
        "name": "Toyota Gazoo Racing",
        "manufacturer": "Toyota",
        "category": "Hypercar",
        "carNumber": "#8",
        "carModel": "Toyota GR010 Hybrid",
        "drivers": [
          "S\u00e9bastien Buemi",
          "Brendon Hartley",
          "Ryo Hirakawa"
        ],
        "historicalSignificance": "Won six of seven rounds during the season to secure Toyota's fifth consecutive manufacturers' championship in the top class.",
        "keyStat": "6 wins in 7 races & World Championship",
        "accentColor": "#d32f2f"
      },
      {
        "id": "corvette-racing-2023",
        "name": "Corvette Racing",
        "manufacturer": "Chevrolet",
        "category": "LMGTE Am",
        "carNumber": "#33",
        "carModel": "Chevrolet Corvette C8.R",
        "drivers": [
          "Nicky Catsburg",
          "Ben Keating",
          "Nicol\u00e1s Varrone"
        ],
        "historicalSignificance": "Clinched the final LMGTE Am World Championship with two races to spare, taking victories at Sebring, Portim\u00e3o, and Le Mans.",
        "keyStat": "Record early title clinch in final GTE season",
        "accentColor": "#fed100"
      }
    ],
    "sourceProvenance": "Official FIA WEC 2023 Classifications & 100th Anniversary 24 Heures du Mans Archive.",
    "races": [
      {
        "race": "Bahrain",
        "overallWinner": {
          "car": "Toyota Gazoo Racing #8",
          "team": "Toyota Gazoo Racing",
          "vehicle": "Toyota GR010 HYBRID",
          "drivers": [
            "S\u00e9bastien BUEMI",
            "Brendon HARTLEY",
            "Ryo HIRAKAWA"
          ]
        },
        "classWinners": [
          {
            "category": "HYPERCAR",
            "car": "Toyota Gazoo Racing #8",
            "team": "Toyota Gazoo Racing",
            "vehicle": "Toyota GR010 HYBRID",
            "drivers": [
              "S\u00e9bastien BUEMI",
              "Brendon HARTLEY",
              "Ryo HIRAKAWA"
            ]
          },
          {
            "category": "LMP2",
            "car": "Team WRT #41",
            "team": "Team WRT",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "Rui ANDRADE",
              "Robert KUBICA",
              "Louis DEL\u00c9TRAZ"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Iron Dames #85",
            "team": "Iron Dames",
            "vehicle": "Porsche 911 RSR - 19",
            "drivers": [
              "Sarah BOVY",
              "Michelle GATTING",
              "Rahel FREY"
            ]
          }
        ]
      },
      {
        "race": "Algarve",
        "overallWinner": {
          "car": "Toyota Gazoo Racing #8",
          "team": "Toyota Gazoo Racing",
          "vehicle": "Toyota GR010 HYBRID",
          "drivers": [
            "S\u00e9bastien BUEMI",
            "Brendon HARTLEY",
            "Ryo HIRAKAWA"
          ]
        },
        "classWinners": [
          {
            "category": "HYPERCAR",
            "car": "Toyota Gazoo Racing #8",
            "team": "Toyota Gazoo Racing",
            "vehicle": "Toyota GR010 HYBRID",
            "drivers": [
              "S\u00e9bastien BUEMI",
              "Brendon HARTLEY",
              "Ryo HIRAKAWA"
            ]
          },
          {
            "category": "LMP2",
            "car": "United Autosports #23",
            "team": "United Autosports",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "Joshua PIERSON",
              "Giedo VAN DER GARDE",
              "Oliver JARVIS"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Corvette Racing #33",
            "team": "Corvette Racing",
            "vehicle": "Chevrolet Corvette C8.R",
            "drivers": [
              "Ben KEATING",
              "Nicolas VARRONE",
              "Nicky CATSBURG"
            ]
          }
        ]
      },
      {
        "race": "LeMans",
        "overallWinner": {
          "car": "Ferrari AF Corse #51",
          "team": "Ferrari AF Corse",
          "vehicle": "Ferrari 499P",
          "drivers": [
            "Alessandro PIER GUIDI",
            "James CALADO",
            "Antonio GIOVINAZZI"
          ]
        },
        "classWinners": [
          {
            "category": "HYPERCAR",
            "car": "Ferrari AF Corse #51",
            "team": "Ferrari AF Corse",
            "vehicle": "Ferrari 499P",
            "drivers": [
              "Alessandro PIER GUIDI",
              "James CALADO",
              "Antonio GIOVINAZZI"
            ]
          },
          {
            "category": "LMP2",
            "car": "Inter Europol Competition #34",
            "team": "Inter Europol Competition",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "Jakub SMIECHOWSKI",
              "Albert COSTA",
              "Fabio SCHERER"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Corvette Racing #33",
            "team": "Corvette Racing",
            "vehicle": "Chevrolet Corvette C8.R",
            "drivers": [
              "Nicky CATSBURG",
              "Ben KEATING",
              "Nicolas VARRONE"
            ]
          },
          {
            "category": "INNOVATIVE CAR",
            "car": "Hendrick Motorsports #24",
            "team": "Hendrick Motorsports",
            "vehicle": "Chevrolet Camaro ZL1",
            "drivers": [
              "Jimmie JOHNSON",
              "Mike ROCKENFELLER",
              "Jenson BUTTON"
            ]
          }
        ]
      },
      {
        "race": "Spa",
        "overallWinner": {
          "car": "Toyota Gazoo Racing #7",
          "team": "Toyota Gazoo Racing",
          "vehicle": "Toyota GR010 HYBRID",
          "drivers": [
            "Mike CONWAY",
            "Kamui KOBAYASHI",
            "Jose Maria LOPEZ"
          ]
        },
        "classWinners": [
          {
            "category": "HYPERCAR",
            "car": "Toyota Gazoo Racing #7",
            "team": "Toyota Gazoo Racing",
            "vehicle": "Toyota GR010 HYBRID",
            "drivers": [
              "Mike CONWAY",
              "Kamui KOBAYASHI",
              "Jose Maria LOPEZ"
            ]
          },
          {
            "category": "LMP2",
            "car": "Team WRT #41",
            "team": "Team WRT",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "Rui ANDRADE",
              "Robert KUBICA",
              "Louis DEL\u00c9TRAZ"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Richard Mille AF Corse #83",
            "team": "Richard Mille AF Corse",
            "vehicle": "Ferrari 488 GTE Evo",
            "drivers": [
              "Luis PEREZ COMPANC",
              "Lilou WADOUX",
              "Alessio ROVERA"
            ]
          }
        ]
      },
      {
        "race": "Monza",
        "overallWinner": {
          "car": "Toyota Gazoo Racing #7",
          "team": "Toyota Gazoo Racing",
          "vehicle": "Toyota GR010 HYBRID",
          "drivers": [
            "Mike CONWAY",
            "Kamui KOBAYASHI",
            "Jose Maria LOPEZ"
          ]
        },
        "classWinners": [
          {
            "category": "HYPERCAR",
            "car": "Toyota Gazoo Racing #7",
            "team": "Toyota Gazoo Racing",
            "vehicle": "Toyota GR010 HYBRID",
            "drivers": [
              "Mike CONWAY",
              "Kamui KOBAYASHI",
              "Jose Maria LOPEZ"
            ]
          },
          {
            "category": "LMP2",
            "car": "JOTA #28",
            "team": "JOTA",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "David HEINEMEIER-HANSSON",
              "Pietro FITTIPALDI",
              "Oliver RASMUSSEN"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Dempsey - Proton Racing #77",
            "team": "Dempsey - Proton Racing",
            "vehicle": "Porsche 911 RSR - 19",
            "drivers": [
              "Christian RIED",
              "Mikkel PEDERSEN",
              "Julien ANDLAUER"
            ]
          }
        ]
      },
      {
        "race": "Fuji",
        "overallWinner": {
          "car": "Toyota Gazoo Racing #7",
          "team": "Toyota Gazoo Racing",
          "vehicle": "Toyota GR010 HYBRID",
          "drivers": [
            "Mike CONWAY",
            "Kamui KOBAYASHI",
            "Jose Maria LOPEZ"
          ]
        },
        "classWinners": [
          {
            "category": "HYPERCAR",
            "car": "Toyota Gazoo Racing #7",
            "team": "Toyota Gazoo Racing",
            "vehicle": "Toyota GR010 HYBRID",
            "drivers": [
              "Mike CONWAY",
              "Kamui KOBAYASHI",
              "Jose Maria LOPEZ"
            ]
          },
          {
            "category": "LMP2",
            "car": "Team WRT #41",
            "team": "Team WRT",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "Rui ANDRADE",
              "Robert KUBICA",
              "Louis DEL\u00c9TRAZ"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "AF Corse #54",
            "team": "AF Corse",
            "vehicle": "Ferrari 488 GTE Evo",
            "drivers": [
              "Thomas FLOHR",
              "Francesco CASTELLACCI",
              "Davide RIGON"
            ]
          }
        ]
      },
      {
        "race": "Sebring",
        "overallWinner": {
          "car": "Toyota Gazoo Racing #7",
          "team": "Toyota Gazoo Racing",
          "vehicle": "Toyota GR010 HYBRID",
          "drivers": [
            "Mike CONWAY",
            "Kamui KOBAYASHI",
            "Jose Maria LOPEZ"
          ]
        },
        "classWinners": [
          {
            "category": "HYPERCAR",
            "car": "Toyota Gazoo Racing #7",
            "team": "Toyota Gazoo Racing",
            "vehicle": "Toyota GR010 HYBRID",
            "drivers": [
              "Mike CONWAY",
              "Kamui KOBAYASHI",
              "Jose Maria LOPEZ"
            ]
          },
          {
            "category": "LMP2",
            "car": "Hertz Team JOTA #48",
            "team": "Hertz Team JOTA",
            "vehicle": "Oreca 07 - Gibson",
            "drivers": [
              "David BECKMANN",
              "Yifei YE",
              "William STEVENS"
            ]
          },
          {
            "category": "LMGTE Am",
            "car": "Corvette Racing #33",
            "team": "Corvette Racing",
            "vehicle": "Chevrolet Corvette C8.R",
            "drivers": [
              "Ben KEATING",
              "Nicolas VARRONE",
              "Nicky CATSBURG"
            ]
          }
        ]
      }
    ]
  }
];
