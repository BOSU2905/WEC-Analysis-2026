import csv
import json

with open('data/raw/wec_data.csv', 'r', encoding='utf-8') as f:
    rows = list(csv.DictReader(f))

# Helper to clean driver names
def get_drivers(r):
    return [d.strip() for d in [r.get('driver_1'), r.get('driver_2'), r.get('driver_3')] if d and d.strip()]

seasons = sorted(list(dict.fromkeys(r['season'] for r in rows)))

season_races = {}
for s in seasons:
    s_rows = [r for r in rows if r['season'] == s]
    races = list(dict.fromkeys(r['race'] for r in s_rows))
    race_list = []
    for race in races:
        race_rows = [r for r in s_rows if r['race'] == race]
        overall_w = next((r for r in race_rows if r.get('overall_position') == '1'), None)
        
        # class winners
        classes = list(dict.fromkeys(r['class'] for r in race_rows if r.get('class')))
        class_winners = []
        for c in classes:
            # find first classified or class_position == 1
            cw = next((r for r in race_rows if r.get('class') == c and r.get('class_position') == '1'), None)
            if not cw:
                # fallback lowest class_position
                c_rows = [r for r in race_rows if r.get('class') == c and r.get('class_position')]
                if c_rows:
                    c_rows.sort(key=lambda x: int(x['class_position']) if x['class_position'].isdigit() else 999)
                    cw = c_rows[0]
            if cw:
                class_winners.append({
                    "category": c,
                    "car": cw['car'],
                    "team": cw['team'],
                    "vehicle": cw['vehicle'],
                    "drivers": get_drivers(cw)
                })

        overall_info = {
            "car": overall_w['car'] if overall_w else "N/A",
            "team": overall_w['team'] if overall_w else "N/A",
            "vehicle": overall_w['vehicle'] if overall_w else "N/A",
            "drivers": get_drivers(overall_w) if overall_w else []
        }

        race_list.append({
            "race": race,
            "overallWinner": overall_info,
            "classWinners": class_winners
        })
    season_races[s] = race_list

print(f"Processed races for {len(season_races)} seasons.")
with open('scratch/season_races.json', 'w', encoding='utf-8') as f:
    json.dump(season_races, f, indent=2)
print("Saved scratch/season_races.json")
