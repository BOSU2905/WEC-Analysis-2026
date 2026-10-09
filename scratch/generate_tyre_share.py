import pandas as pd
import json

df_raw = pd.read_csv('c:\\WEC Analysis (Updated Version)\\WEC-Analysis-2026\\WEC-Analysis-2026\\data\\raw\\wec_data.csv')

# Drop ghost rows 
df = df_raw.drop_duplicates(subset=['season', 'race', 'team', 'car', 'class', 'driver_1', 'overall_position', 'class_position', 'laps', 'total_time', 'status']).copy()
df = df.dropna(subset=['tyres'])

# Calculate overall check
print(f"Total valid tyre assignments: {len(df)}")
print(f"Michelin: {df['tyres'].value_counts().get('Michelin', 0)}")

# Aggregation over time
agg = df.groupby(['season', 'tyres']).size().unstack(fill_value=0)
agg['total'] = agg.sum(axis=1)

result = []
for season, row in agg.iterrows():
    michelin = row.get('Michelin', 0)
    dunlop = row.get('Dunlop', 0)
    goodyear = row.get('Goodyear', 0)
    other = row['total'] - michelin - dunlop - goodyear
    
    result.append({
        'season': str(season),
        'michelin_pct': round((michelin / row['total']) * 100, 1),
        'dunlop_pct': round((dunlop / row['total']) * 100, 1),
        'goodyear_pct': round((goodyear / row['total']) * 100, 1),
        'other_pct': round((other / row['total']) * 100, 1),
        'total_entries': int(row['total']),
        'michelin_count': int(michelin)
    })

with open('c:\\WEC Analysis (Updated Version)\\WEC-Analysis-2026\\WEC-Analysis-2026\\web\\src\\data\\tyre_share.json', 'w') as f:
    json.dump(result, f, indent=2)

print("Created tyre_share.json successfully.")
