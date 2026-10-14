import csv

with open('data/raw/wec_data.csv', 'r', encoding='utf-8') as f:
    rows = list(csv.DictReader(f))

for s in ['2011', '2012', '2013', '2014', '2015']:
    s_rows = [r for r in rows if r['season'] == s and r.get('overall_position') == '1']
    print(f"=== {s} ===")
    for w in s_rows:
        drivers = " / ".join(filter(None, [w.get('driver_1'), w.get('driver_2'), w.get('driver_3')]))
        print(f"  [{w['race']}] {w['car']} | {w['team']} ({w['vehicle']}) - {drivers}")
