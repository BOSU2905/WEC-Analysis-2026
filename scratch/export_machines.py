import pandas as pd
import json

df = pd.read_csv('c:\\WEC Analysis (Updated Version)\\WEC-Analysis-2026\\WEC-Analysis-2026\\data\\raw\\wec_data.csv')
df['class_pos'] = pd.to_numeric(df['class_position'], errors='coerce')

target_cars = [
    "Oreca 07 - Gibson",
    "Aston Martin Vantage V8",
    "Porsche 911 RSR",
    "Toyota TS050 - Hybrid",
    "Porsche 919 Hybrid"
]

wins_df = df[df['class_pos'] == 1].copy()
wins_df = wins_df[wins_df['vehicle'].isin(target_cars)]

vehicle_stats = wins_df.groupby('vehicle').agg({
    'class_pos': 'count',
    'class': lambda x: x.mode()[0],
    'season': ['min', 'max']
}).reset_index()

vehicle_stats.columns = ['vehicle', 'class_wins', 'primary_class', 'first_win', 'last_win']
vehicle_stats = vehicle_stats.sort_values('class_wins', ascending=False)

output = vehicle_stats.to_dict('records')

with open('c:\\WEC Analysis (Updated Version)\\WEC-Analysis-2026\\WEC-Analysis-2026\\web\\src\\data\\machine_wins.json', 'w') as f:
    json.dump(output, f, indent=2)

print("Exported specific machine wins to JSON.")
