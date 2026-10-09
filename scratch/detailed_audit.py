import pandas as pd

df = pd.read_csv('/home/ben/WEC-Analysis-2026/Data/raw/wec_data.csv')

print("--- EXACT DUPLICATES ---")
dups = df[df.duplicated(keep=False)].sort_values(by=['season', 'race', 'car'])
print(dups.head(10))
print(f"Total rows duplicated: {len(dups)}")

print("\n--- RACE & WINNER INTEGRITY ---")
class_map = {
    'LM P1' : 'LMP1', 'LMP1': 'LMP1',
    'LM P2' : 'LMP2', 'LMP2': 'LMP2',
    'LM GTE Pro' : 'LMGTE Pro', 'LMGTE Pro': 'LMGTE Pro',
    'LM GTE Am' : 'LMGTE Am', 'LMGTE Am': 'LMGTE Am',
    'HYPERCAR': 'HYPERCAR', 'LMH': 'HYPERCAR', 'LMDh': 'HYPERCAR',
    'CDNT' :'Experimental', 'INNOVATIVE CAR' : 'Experimental'
}
df['class_norm'] = df['class'].map(class_map)
df['class_group'] = df['class_norm'].map({
    'LMP1': 'Hypercar', 'HYPERCAR': 'Hypercar',
    'LMP2': 'LMP2',
    'LMGTE Pro': 'LMGT3', 'LMGTE Am': 'LMGT3',
    'Experimental': 'Experimental'
})

print("\nNumber of races per season:")
races_per_season = df.groupby('season')['race'].nunique()
print(races_per_season)

print("\nMultiple class_position == 1 per (season, race, class)?")
winners = df[df['class_position'] == 1]
winner_counts = winners.groupby(['season', 'race', 'class_norm']).size()
print(winner_counts[winner_counts > 1])

print("\nAre there overall_position == 1 duplicates per race?")
overall_winners = df[df['overall_position'] == 1]
overall_winner_counts = overall_winners.groupby(['season', 'race']).size()
print(overall_winner_counts[overall_winner_counts > 1])

print("\n--- ENTITY CONSISTENCY ---")
print("Top 10 Teams:")
print(df['team'].value_counts().head(10))
print("\nTeams with similar names:")
print([t for t in df['team'].unique() if pd.notna(t) and 'Toyota' in t])
print([t for t in df['team'].unique() if pd.notna(t) and 'Aston' in t])
print([t for t in df['team'].unique() if pd.notna(t) and 'Audi' in t])
print([t for t in df['team'].unique() if pd.notna(t) and 'Porsche' in t])

print("\n--- TYRE USAGE ---")
print(df.groupby(['season', 'class_norm', 'tyres']).size().head(20))

print("\n--- SPEED METRICS ---")
print("Null fastest lap speeds:")
print(df['fl_kph_average'].isnull().sum())
print("Do we have fl_kph_average for all circuits?")
print(df.groupby('race')['fl_kph_average'].mean())

