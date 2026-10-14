import csv
from collections import defaultdict

with open('data/raw/wec_data.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

print(f"Total rows: {len(rows)}")

seasons = sorted(list(set(r['season'] for r in rows)))
print("Seasons found:", seasons)

# Map each season to its races and winners
for season in seasons:
    s_rows = [r for r in rows if r['season'] == season]
    classes = sorted(list(set(r['class'] for r in s_rows if r['class'])))
    races = list(dict.fromkeys(r['race'] for r in s_rows))
    print(f"\n=== Season: {season} ({len(races)} races) ===")
    print(f"Classes: {classes}")
    
    # Overall winners (overall_position == '1')
    overall_winners = [r for r in s_rows if r.get('overall_position') == '1']
    print(f"Overall Race Winners ({len(overall_winners)}):")
    for w in overall_winners:
        drivers = " / ".join(filter(None, [w.get('driver_1'), w.get('driver_2'), w.get('driver_3')]))
        print(f"  [{w['race']}] {w['car']} | {w['team']} ({w['vehicle']}) - {drivers}")
