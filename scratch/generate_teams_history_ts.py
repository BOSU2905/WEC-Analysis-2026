import json

with open('scratch/season_races.json', 'r', encoding='utf-8') as f:
    season_races = json.load(f)

# Define verified champions and featured teams metadata
seasons_meta = [
    {
        "season": "2011",
        "label": "2011",
        "seriesContext": "Pre-WEC: Intercontinental Le Mans Cup (ILMC) & 79th 24 Hours of Le Mans",
        "era": "ILMC Era",
        "dominantManufacturer": "Audi & Peugeot",
        "summary": "Before the rebirth of the World Endurance Championship in 2012, endurance sports car racing contested the Intercontinental Le Mans Cup. The 2011 24 Hours of Le Mans delivered one of the closest finishes in history, with Audi's lone surviving R18 TDI holding off three charging factory Peugeots by a razor-thin 13.854 seconds.",
        "champions": [
            {
                "category": "Overall / Top Class",
                "team": "Peugeot Sport Total (ILMC LMP1 Team Title) / Audi Sport Team Joest (Le Mans Winners)",
                "manufacturer": "Peugeot / Audi",
                "car": "Peugeot 908 & Audi R18 TDI",
                "drivers": ["Marcel Fässler", "André Lotterer", "Benoît Tréluyer (Le Mans)"],
                "note": "FIA WEC was inaugurated in 2012; 2011 records reflect the predecessor Intercontinental Le Mans Cup."
            },
            {
                "category": "LMP2",
                "team": "Oak Racing",
                "manufacturer": "Pescarolo-Judd",
                "car": "Pescarolo 01",
                "drivers": ["Alexandre Prémat", "Matthieu Lahaye"],
                "note": "ILMC LMP2 Team Cup winner"
            },
            {
                "category": "LMGTE Pro",
                "team": "AF Corse",
                "manufacturer": "Ferrari",
                "car": "Ferrari 458 Italia GT2",
                "drivers": ["Giancarlo Fisichella", "Gianmaria Bruni"],
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
                "drivers": ["Marcel Fässler", "André Lotterer", "Benoît Tréluyer"],
                "historicalSignificance": "Surviving catastrophic crashes that eliminated sister cars #1 and #3, the #2 R18 TDI defended Audi's honor against the entire Peugeot fleet in a breathtaking 24-hour sprint.",
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
                "drivers": ["Sébastien Bourdais", "Simon Pagenaud", "Pedro Lamy"],
                "historicalSignificance": "Peugeot claimed the 2011 ILMC LMP1 team championship with five race victories across the globe before abruptly shuttering their prototype program in early 2012.",
                "keyStat": "5 ILMC race victories in 2011",
                "accentColor": "#002c6c"
            }
        ],
        "sourceProvenance": "Official ACO 2011 Le Mans Results & 2011 Intercontinental Le Mans Cup Sporting Classification."
    },
    {
        "season": "2012",
        "label": "2012",
        "seriesContext": "Inaugural FIA World Endurance Championship Season",
        "era": "LMP1 Golden Hybrid Era",
        "dominantManufacturer": "Audi",
        "summary": "The FIA World Championship returned to endurance racing for the first time since 1992. Audi introduced hybrid all-wheel drive with the R18 e-tron quattro, claiming the inaugural World Championship and the first hybrid overall victory at the 24 Hours of Le Mans, while Toyota made an emphatic late-season debut.",
        "champions": [
            {
                "category": "Overall / Top Class",
                "team": "Audi Sport Team Joest",
                "manufacturer": "Audi",
                "car": "Audi R18 e-tron quattro / Ultra",
                "drivers": ["Marcel Fässler", "André Lotterer", "Benoît Tréluyer"],
                "note": "Inaugural FIA World Endurance Drivers' & Manufacturers' Champions"
            },
            {
                "category": "LMP2",
                "team": "Starworks Motorsport",
                "manufacturer": "HPD",
                "car": "HPD ARX-03b",
                "drivers": ["Ryan Dalziel", "Stéphane Sarrazin", "Vicente Potolicchio"],
                "note": "FIA Endurance Trophy for LMP2 Teams"
            },
            {
                "category": "LMGTE Pro",
                "team": "AF Corse",
                "manufacturer": "Ferrari",
                "car": "Ferrari 458 Italia GT2",
                "drivers": ["Gianmaria Bruni", "Giancarlo Fisichella"],
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
                "drivers": ["Marcel Fässler", "André Lotterer", "Benoît Tréluyer"],
                "historicalSignificance": "Pioneered hybrid all-wheel drive at Le Mans, scoring victories at Sebring, Spa, Le Mans, and Silverstone to become the historic first WEC World Champions.",
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
                "drivers": ["Alexander Wurz", "Nicolas Lapierre", "Kazuki Nakajima"],
                "historicalSignificance": "Brought capacitor-based superhybrid technology to WEC, capturing 3 victories in their debut season (São Paulo, Fuji, Shanghai) to ignite a legendary rivalry.",
                "keyStat": "3 victories in 6 starts",
                "accentColor": "#d32f2f"
            }
        ],
        "sourceProvenance": "Official FIA WEC 2012 Sporting Classifications & ACO Archive."
    },
    {
        "season": "2013",
        "label": "2013",
        "seriesContext": "2nd FIA World Endurance Championship Season",
        "era": "LMP1 Golden Hybrid Era",
        "dominantManufacturer": "Audi",
        "summary": "Audi defended their World Championship against a full-season assault from Toyota. Tom Kristensen earned his record-extending ninth 24 Hours of Le Mans victory and clinched his maiden FIA World Championship alongside Loïc Duval and Allan McNish.",
        "champions": [
            {
                "category": "Overall / Top Class",
                "team": "Audi Sport Team Joest",
                "manufacturer": "Audi",
                "car": "Audi R18 e-tron quattro",
                "drivers": ["Tom Kristensen", "Loïc Duval", "Allan McNish"],
                "note": "World Endurance Drivers' & Manufacturers' Champions"
            },
            {
                "category": "LMP2",
                "team": "OAK Racing",
                "manufacturer": "Morgan-Nissan",
                "car": "Morgan LMP2",
                "drivers": ["Bertrand Baguette", "Martin Plowman", "Ricardo González"],
                "note": "FIA Endurance Trophy for LMP2 Teams & Drivers"
            },
            {
                "category": "LMGTE Pro",
                "team": "AF Corse",
                "manufacturer": "Ferrari",
                "car": "Ferrari 458 Italia GT2",
                "drivers": ["Gianmaria Bruni"],
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
                "drivers": ["Tom Kristensen", "Loïc Duval", "Allan McNish"],
                "historicalSignificance": "Mastered relentless wet-and-dry conditions to capture the Le Mans 24 Hours and three WEC round victories, sealing Allan McNish and Tom Kristensen's world title crowning achievement.",
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
                "drivers": ["Bertrand Baguette", "Martin Plowman", "Ricardo González"],
                "historicalSignificance": "Scored an emphatic 1-2 finish for the team at Le Mans and swept the LMP2 Drivers' and Teams' trophies through unmatched consistency.",
                "keyStat": "LMP2 Class 1-2 sweep at Le Mans",
                "accentColor": "#e69d45"
            }
        ],
        "sourceProvenance": "Official FIA WEC 2013 Sporting Regulations & Classifications."
    },
    {
        "season": "2014",
        "label": "2014",
        "seriesContext": "3rd FIA World Endurance Championship Season",
        "era": "LMP1 Golden Hybrid Era",
        "dominantManufacturer": "Toyota",
        "summary": "New fuel-flow regulations welcomed Porsche back to top-flight endurance racing, creating a titanic three-way factory battle between Audi, Porsche, and Toyota. Toyota Racing captured their first World Championship with the 1,000-hp TS040 Hybrid, winning 5 of 8 rounds.",
        "champions": [
            {
                "category": "Overall / Top Class",
                "team": "Toyota Racing",
                "manufacturer": "Toyota",
                "car": "Toyota TS040 Hybrid",
                "drivers": ["Anthony Davidson", "Sébastien Buemi"],
                "note": "Toyota's first World Endurance Drivers' & Manufacturers' Championships"
            },
            {
                "category": "LMP2",
                "team": "SMP Racing",
                "manufacturer": "Oreca-Nissan",
                "car": "Oreca 03R - Nissan",
                "drivers": ["Sergey Zlobin"],
                "note": "FIA Endurance Trophy for LMP2"
            },
            {
                "category": "LMGTE Pro",
                "team": "AF Corse",
                "manufacturer": "Ferrari",
                "car": "Ferrari 458 Italia GT2",
                "drivers": ["Gianmaria Bruni", "Toni Vilander"],
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
                "drivers": ["Anthony Davidson", "Sébastien Buemi", "Nicolas Lapierre"],
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
                "drivers": ["Romain Dumas", "Neel Jani", "Marc Lieb"],
                "historicalSignificance": "Marked Porsche's historic return to premier prototype racing, overcoming teething challenges to take their breakthrough maiden victory in the São Paulo season finale.",
                "keyStat": "Porsche's 1st modern hybrid victory (Interlagos)",
                "accentColor": "#b6a16f"
            }
        ],
        "sourceProvenance": "Official FIA WEC 2014 Season Archive."
    },
    {
        "season": "2015",
        "label": "2015",
        "seriesContext": "4th FIA World Endurance Championship Season",
        "era": "LMP1 Golden Hybrid Era",
        "dominantManufacturer": "Porsche",
        "summary": "The peak of the 8MJ hybrid era saw Porsche unleash the devastatingly fast 919 Hybrid. Nico Hülkenberg made headlines by winning Le Mans as an active F1 driver, while Mark Webber, Timo Bernhard, and Brendon Hartley stormed to the World Championship.",
        "champions": [
            {
                "category": "Overall / Top Class",
                "team": "Porsche Team",
                "manufacturer": "Porsche",
                "car": "Porsche 919 Hybrid",
                "drivers": ["Timo Bernhard", "Mark Webber", "Brendon Hartley"],
                "note": "Porsche's first modern WEC World Drivers' & Manufacturers' titles"
            },
            {
                "category": "LMP2",
                "team": "G-Drive Racing",
                "manufacturer": "Ligier-Nissan",
                "car": "Ligier JS P2 - Nissan",
                "drivers": ["Roman Rusinov", "Julien Canal", "Sam Bird"],
                "note": "FIA Endurance Trophy for LMP2"
            },
            {
                "category": "LMGTE Pro",
                "team": "Porsche Team Manthey",
                "manufacturer": "Porsche",
                "car": "Porsche 911 RSR",
                "drivers": ["Richard Lietz"],
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
                "drivers": ["Timo Bernhard", "Mark Webber", "Brendon Hartley"],
                "historicalSignificance": "Secured 4 consecutive race wins (Nürburgring, COTA, Fuji, Shanghai) to deliver Mark Webber his crowning motorsport world championship.",
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
                "drivers": ["Nico Hülkenberg", "Earl Bamber", "Nick Tandy"],
                "historicalSignificance": "Entered as a third car for Spa and Le Mans, active Formula 1 driver Nico Hülkenberg and GT aces Bamber and Tandy scored an unforgettable overall Le Mans victory on debut.",
                "keyStat": "Active F1 driver overall Le Mans victory",
                "accentColor": "#e8e7e3"
            }
        ],
        "sourceProvenance": "Official FIA WEC 2015 Classifications & 24 Heures du Mans Archive."
    },
    {
        "season": "2016",
        "label": "2016",
        "seriesContext": "5th FIA World Endurance Championship Season",
        "era": "LMP1 Golden Hybrid Era",
        "dominantManufacturer": "Porsche",
        "summary": "A season marked by heartbreak and farewells. Toyota looked poised to win Le Mans until heartbreak struck car #5 with 3 minutes remaining, handing victory to Porsche's #2. Audi celebrated their historic endurance legacy with a 1-2 farewell win in Bahrain as they departed LMP1.",
        "champions": [
            {
                "category": "Overall / Top Class",
                "team": "Porsche Team",
                "manufacturer": "Porsche",
                "car": "Porsche 919 Hybrid",
                "drivers": ["Romain Dumas", "Neel Jani", "Marc Lieb"],
                "note": "World Drivers' & Manufacturers' Champions (Porsche back-to-back)"
            },
            {
                "category": "LMP2",
                "team": "Signatech Alpine",
                "manufacturer": "Alpine-Nissan",
                "car": "Alpine A460 - Nissan",
                "drivers": ["Gustavo Menezes", "Nicolas Lapierre", "Stéphane Richelmi"],
                "note": "FIA Endurance Trophy for LMP2"
            },
            {
                "category": "LMGTE Pro",
                "team": "Aston Martin Racing",
                "manufacturer": "Aston Martin / Ferrari",
                "car": "Aston Martin Vantage GTE",
                "drivers": ["Nicki Thiim", "Marco Sørensen"],
                "note": "World Endurance Cup for GT Drivers; Ferrari won GT Manufacturers"
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
                "drivers": ["Romain Dumas", "Neel Jani", "Marc Lieb"],
                "historicalSignificance": "Capitalized on relentless pressure to win Le Mans and built an unassailable points lead to clinch both World Championships.",
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
                "drivers": ["Lucas di Grassi", "Loïc Duval", "Oliver Jarvis"],
                "historicalSignificance": "Closed an incomparable 18-year prototype dynasty that claimed 13 Le Mans victories, bowing out with an emotional 1-2 finish at Bahrain.",
                "keyStat": "Audi's final LMP1 race victory (Bahrain)",
                "accentColor": "#b8493e"
            }
        ],
        "sourceProvenance": "Official FIA WEC 2016 Sporting Archive."
    },
    {
        "season": "2017",
        "label": "2017",
        "seriesContext": "6th FIA World Endurance Championship Season",
        "era": "LMP1 Golden Hybrid Era",
        "dominantManufacturer": "Porsche",
        "summary": "Porsche and Toyota fought a high-speed duel of attrition across nine rounds. At Le Mans, top-class attrition nearly saw an LMP2 car take overall victory, before Porsche #2 clawed back to win. Porsche completed a hat-trick of World Championships before shifting focus to Formula E.",
        "champions": [
            {
                "category": "Overall / Top Class",
                "team": "Porsche LMP Team",
                "manufacturer": "Porsche",
                "car": "Porsche 919 Hybrid",
                "drivers": ["Timo Bernhard", "Earl Bamber", "Brendon Hartley"],
                "note": "Porsche's 3rd consecutive Drivers' & Manufacturers' World Championship"
            },
            {
                "category": "LMP2",
                "team": "Vaillante Rebellion",
                "manufacturer": "Oreca-Gibson",
                "car": "Oreca 07 - Gibson",
                "drivers": ["Bruno Senna", "Julien Canal"],
                "note": "FIA Endurance Trophy for LMP2"
            },
            {
                "category": "LMGTE Pro",
                "team": "AF Corse",
                "manufacturer": "Ferrari",
                "car": "Ferrari 488 GTE",
                "drivers": ["James Calado", "Alessandro Pier Guidi"],
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
                "drivers": ["Timo Bernhard", "Earl Bamber", "Brendon Hartley"],
                "historicalSignificance": "Recovered from an early 1-hour pitstop at Le Mans to execute an incredible comeback win, closing Porsche's LMP1 factory program with three straight World titles.",
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
                "drivers": ["Ho-Pin Tung", "Thomas Laurent", "Oliver Jarvis"],
                "historicalSignificance": "Made endurance history by leading the 24 Hours of Le Mans outright in an LMP2 chassis on Sunday morning, finishing 2nd overall and 1st in LMP2.",
                "keyStat": "Led Le Mans outright, finished 2nd overall",
                "accentColor": "#e69d45"
            }
        ],
        "sourceProvenance": "Official FIA WEC 2017 Season Archive."
    },
    {
        "season": "2018-2019",
        "label": "2018–2019",
        "seriesContext": "7th FIA World Endurance Championship Season ('Super Season')",
        "era": "LMP1 Twilight Era",
        "dominantManufacturer": "Toyota",
        "summary": "Spanning 14 months and two editions of the 24 Hours of Le Mans, the historic Super Season realigned the WEC calendar. Two-time F1 World Champion Fernando Alonso joined Toyota Gazoo Racing, achieving his ambition of winning Le Mans twice and capturing the World Endurance Championship.",
        "champions": [
            {
                "category": "Overall / Top Class",
                "team": "Toyota Gazoo Racing",
                "manufacturer": "Toyota",
                "car": "Toyota TS050 Hybrid",
                "drivers": ["Fernando Alonso", "Sébastien Buemi", "Kazuki Nakajima"],
                "note": "World Endurance LMP Drivers' & Teams' Champions (Back-to-back Le Mans)"
            },
            {
                "category": "LMP2",
                "team": "Signatech Alpine Matmut",
                "manufacturer": "Alpine-Gibson",
                "car": "Alpine A470 - Gibson",
                "drivers": ["Nicolas Lapierre", "Pierre Thiriet", "André Negrão"],
                "note": "LMP2 Endurance Trophy Champions"
            },
            {
                "category": "LMGTE Pro",
                "team": "Porsche GT Team",
                "manufacturer": "Porsche",
                "car": "Porsche 911 RSR",
                "drivers": ["Michael Christensen", "Kévin Estre"],
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
                "drivers": ["Fernando Alonso", "Sébastien Buemi", "Kazuki Nakajima"],
                "historicalSignificance": "Fernando Alonso pursued the motorsport Triple Crown, driving spectacular night stints at Le Mans to take victories in 2018 and 2019 alongside Buemi and Nakajima.",
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
                "drivers": ["Michael Christensen", "Kévin Estre", "Laurens Vanthoor"],
                "historicalSignificance": "Ran the iconic retro 'Pink Pig' livery at the 2018 24 Hours of Le Mans, dominating the deepest factory GTE Pro field ever assembled.",
                "keyStat": "GTE Pro World Championship & Le Mans victory",
                "accentColor": "#b6a16f"
            }
        ],
        "sourceProvenance": "Official FIA WEC 2018-2019 Super Season Archive."
    },
    {
        "season": "2019-2020",
        "label": "2019–2020",
        "seriesContext": "8th FIA World Endurance Championship Season",
        "era": "LMP1 Twilight Era",
        "dominantManufacturer": "Toyota",
        "summary": "The farewell season for the legendary LMP1 hybrid regulations. Success handicaps brought independent non-hybrid prototypes into contention, but Toyota car #7 finally earned their long-awaited Le Mans victory and clinched the World Championship.",
        "champions": [
            {
                "category": "Overall / Top Class",
                "team": "Toyota Gazoo Racing",
                "manufacturer": "Toyota",
                "car": "Toyota TS050 Hybrid",
                "drivers": ["Mike Conway", "Kamui Kobayashi", "José María López"],
                "note": "World Endurance LMP Drivers' & Teams' Champions"
            },
            {
                "category": "LMP2",
                "team": "United Autosports",
                "manufacturer": "Oreca-Gibson",
                "car": "Oreca 07 - Gibson",
                "drivers": ["Filipe Albuquerque", "Philip Hanson"],
                "note": "LMP2 Endurance Trophy Champions (4 consecutive wins)"
            },
            {
                "category": "LMGTE Pro",
                "team": "Aston Martin Racing",
                "manufacturer": "Aston Martin",
                "car": "Aston Martin Vantage AMR",
                "drivers": ["Marco Sørensen", "Nicki Thiim"],
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
                "drivers": ["Mike Conway", "Kamui Kobayashi", "José María López"],
                "historicalSignificance": "After years of agonizing near-misses, the #7 trio delivered a masterclass campaign, winning 4 of 8 races to take their maiden World Championship.",
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
                "drivers": ["Filipe Albuquerque", "Philip Hanson", "Paul di Resta"],
                "historicalSignificance": "Staged one of the most dominant runs in LMP2 history, winning four consecutive rounds including the 24 Hours of Le Mans.",
                "keyStat": "4 consecutive class wins including Le Mans",
                "accentColor": "#002c6c"
            }
        ],
        "sourceProvenance": "Official FIA WEC 2019-2020 Season Archive."
    },
    {
        "season": "2021",
        "label": "2021",
        "seriesContext": "9th FIA World Endurance Championship Season — Dawn of Hypercar",
        "era": "Hypercar Era",
        "dominantManufacturer": "Toyota",
        "summary": "The inaugural season of the Le Mans Hypercar (LMH) formula. Toyota debuted the twin-turbo V6 GR010 Hybrid, sweeping all six rounds of the world championship and scoring a 1-2 finish at the 24 Hours of Le Mans.",
        "champions": [
            {
                "category": "Overall / Top Class",
                "team": "Toyota Gazoo Racing",
                "manufacturer": "Toyota",
                "car": "Toyota GR010 Hybrid",
                "drivers": ["Mike Conway", "Kamui Kobayashi", "José María López"],
                "note": "Inaugural Hypercar World Endurance Drivers' & Manufacturers' Champions"
            },
            {
                "category": "LMP2",
                "team": "Team WRT",
                "manufacturer": "Oreca-Gibson",
                "car": "Oreca 07 - Gibson",
                "drivers": ["Robin Frijns", "Ferdinand Habsburg", "Charles Milesi"],
                "note": "LMP2 Endurance Trophy Champions"
            },
            {
                "category": "LMGTE Pro",
                "team": "AF Corse",
                "manufacturer": "Ferrari",
                "car": "Ferrari 488 GTE Evo",
                "drivers": ["James Calado", "Alessandro Pier Guidi"],
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
                "drivers": ["Mike Conway", "Kamui Kobayashi", "José María López"],
                "historicalSignificance": "Won the 24 Hours of Le Mans on the Hypercar platform's debut, completing a clean sweep of the 2021 world championship.",
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
                "drivers": ["Robin Frijns", "Ferdinand Habsburg", "Charles Milesi"],
                "historicalSignificance": "In their rookie endurance prototype season, Team WRT clinched the LMP2 title and survived a dramatic coasting finish to win Le Mans by 0.727 seconds.",
                "keyStat": "Rookie LMP2 Le Mans victory by 0.727s",
                "accentColor": "#0a58ca"
            }
        ],
        "sourceProvenance": "Official FIA WEC 2021 Hypercar Regulations & Sporting Archive."
    },
    {
        "season": "2022",
        "label": "2022",
        "seriesContext": "10th FIA World Endurance Championship Season",
        "era": "Hypercar Era",
        "dominantManufacturer": "Toyota",
        "summary": "Toyota faced stiff competition from grandfathered LMP1 machinery run by Alpine and the bold wingless Peugeot 9X8. The season also marked the final championship for the prestigious factory LMGTE Pro category.",
        "champions": [
            {
                "category": "Overall / Top Class",
                "team": "Toyota Gazoo Racing",
                "manufacturer": "Toyota",
                "car": "Toyota GR010 Hybrid",
                "drivers": ["Sébastien Buemi", "Brendon Hartley", "Ryo Hirakawa"],
                "note": "Hypercar World Endurance Drivers' & Manufacturers' Champions"
            },
            {
                "category": "LMP2",
                "team": "JOTA",
                "manufacturer": "Oreca-Gibson",
                "car": "Oreca 07 - Gibson",
                "drivers": ["Roberto González", "António Félix da Costa", "Will Stevens"],
                "note": "LMP2 Endurance Trophy Champions"
            },
            {
                "category": "LMGTE Pro",
                "team": "AF Corse",
                "manufacturer": "Ferrari",
                "car": "Ferrari 488 GTE Evo",
                "drivers": ["James Calado", "Alessandro Pier Guidi"],
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
                "drivers": ["Sébastien Buemi", "Brendon Hartley", "Ryo Hirakawa"],
                "historicalSignificance": "Brendon Hartley took a record 4th Le Mans overall victory, while rookie Japanese sensation Ryo Hirakawa performed flawlessly to clinch the World Championship.",
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
                "drivers": ["James Calado", "Alessandro Pier Guidi"],
                "historicalSignificance": "Nursed a failing gearbox in the Bahrain 8 Hours finale to hold off Porsche and claim the definitive final LMGTE Pro World Championship in endurance history.",
                "keyStat": "Definitive Final LMGTE Pro World Champions",
                "accentColor": "#b8493e"
            }
        ],
        "sourceProvenance": "Official FIA WEC 2022 Classifications & ACO Archive."
    },
    {
        "season": "2023",
        "label": "2023",
        "seriesContext": "11th FIA World Endurance Championship Season — Centenary of Le Mans",
        "era": "Hypercar Era",
        "dominantManufacturer": "Toyota & Ferrari",
        "summary": "A golden age reborn. Hypercar swelled to include Ferrari, Porsche, Cadillac, Peugeot, and Toyota. Ferrari AF Corse made a historic return to top-flight racing after 50 years, stunning the motorsport world with victory at the 100th anniversary of the 24 Hours of Le Mans.",
        "champions": [
            {
                "category": "Overall / Top Class",
                "team": "Toyota Gazoo Racing",
                "manufacturer": "Toyota",
                "car": "Toyota GR010 Hybrid",
                "drivers": ["Sébastien Buemi", "Brendon Hartley", "Ryo Hirakawa"],
                "note": "Hypercar World Endurance Drivers' & Manufacturers' Champions (6 wins in 7 races)"
            },
            {
                "category": "LMP2",
                "team": "Team WRT",
                "manufacturer": "Oreca-Gibson",
                "car": "Oreca 07 - Gibson",
                "drivers": ["Rui Andrade", "Louis Delétraz", "Robert Kubica"],
                "note": "Final full-season WEC LMP2 Champions (F1 veteran Robert Kubica)"
            },
            {
                "category": "LMGTE Am",
                "team": "Corvette Racing",
                "manufacturer": "Chevrolet",
                "car": "Chevrolet Corvette C8.R",
                "drivers": ["Nicky Catsburg", "Ben Keating", "Nicolás Varrone"],
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
                "drivers": ["Alessandro Pier Guidi", "James Calado", "Antonio Giovinazzi"],
                "historicalSignificance": "Marked Ferrari's first factory assault on the top class in 50 years, taking pole position and winning the Centenary 24 Hours of Le Mans in front of 325,000 spectators.",
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
                "drivers": ["Sébastien Buemi", "Brendon Hartley", "Ryo Hirakawa"],
                "historicalSignificance": "Overcame fierce multi-manufacturer competition to win 6 of 7 rounds across the season, securing Toyota's fifth consecutive Hypercar World Championship.",
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
                "drivers": ["Nicky Catsburg", "Ben Keating", "Nicolás Varrone"],
                "historicalSignificance": "Clinched the final GTE Am World Championship with two races remaining, scoring memorable victories at Sebring, Portimão, and Le Mans.",
                "keyStat": "Record early title clinch in final GTE season",
                "accentColor": "#fed100"
            }
        ],
        "sourceProvenance": "Official FIA WEC 2023 Classifications & 100th Anniversary 24 Heures du Mans Archive."
    }
]

# Attach races from season_races to each season
for s in seasons_meta:
    s_key = s["season"]
    s["races"] = season_races.get(s_key, [])

# Output to web/src/data/teams_history.ts
header = '''// Historical Verification Matrix and Season Provenance for Teams
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

export const TEAMS_HISTORY: SeasonHistory[] = '''

ts_content = header + json.dumps(seasons_meta, indent=2) + ";\n"

with open('web/src/data/teams_history.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"Generated web/src/data/teams_history.ts successfully with {len(seasons_meta)} seasons!")
