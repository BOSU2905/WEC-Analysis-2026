import pandas as pd
import json

df = pd.read_csv('c:\\WEC Analysis (Updated Version)\\WEC-Analysis-2026\\WEC-Analysis-2026\\data\\processed\\circuit_evolution.csv')
lemans_df = df[df['race'] == 'LeMans'].copy()

result = []
for season, group in lemans_df.groupby('season'):
    row = {"season": str(season)}
    for _, item in group.iterrows():
        row[item['class_group']] = round(item['min_fastest_lap_time_sec'], 3)
    result.append(row)

with open('c:\\WEC Analysis (Updated Version)\\WEC-Analysis-2026\\WEC-Analysis-2026\\web\\src\\data\\circuit_evolution_lemans.json', 'w') as f:
    json.dump(result, f, indent=2)

print("Exported LeMans evolution data")
