import pandas as pd
import json

df = pd.read_csv('/home/ben/WEC-Analysis-2026/Data/raw/wec_data.csv')

print("--- 1. VERIFY 48 DUPLICATES ---")
dups_all = df[df.duplicated(keep=False)].sort_values(by=['season', 'race', 'car'])
print(f"Total duplicate rows (keep=False): {len(dups_all)}")
if len(dups_all) > 0:
    sample_dups = dups_all[dups_all['car'] == dups_all['car'].iloc[0]]
    print("Sample duplicate group:")
    for i, row in sample_dups.iterrows():
        print(row.to_dict())

print("\nAre there any columns that differ in the 2019-2020 Bahrain races?")
# Filter 2019-2020 Bahrain
bahrain_1920 = df[(df['season'] == '2019-2020') & (df['race'] == 'Bahrain')]
print(f"Rows for 2019-2020 Bahrain: {len(bahrain_1920)}")
print(f"Unique cars in 2019-2020 Bahrain: {bahrain_1920['car'].nunique()}")
print(f"Exact duplicates within 2019-2020 Bahrain: {bahrain_1920.duplicated().sum()} (pairs)")

print("\n--- 2. VERIFY WIN DEFINITION ---")
class_wins = df[df['class_position'] == 1]
overall_wins = df[df['overall_position'] == 1]
print(f"Total class wins: {len(class_wins)}")
print(f"Total overall wins: {len(overall_wins)}")
overall_win_groups = df.groupby(['season', 'race', 'class_position']).size().reset_index()
print("class_position=1 counts per race (should be 1 per class):")
print(df[df['class_position'] == 1].groupby(['season', 'race']).size().value_counts())

print("\n--- 3. VERIFY HISTORICAL CLASS NORMALIZATION ---")
print("Original Classes in dataset:")
print(df['class'].value_counts(dropna=False))
print("Does 'LMGT3' exist in original? ", 'LMGT3' in df['class'].unique())

print("\n--- 4. VERIFY TOYOTA DOMINANCE ---")
# Count by team
class_norm_map = {
    'LM P1': 'LMP1', 'LMP1': 'LMP1',
    'LM P2': 'LMP2', 'LMP2': 'LMP2',
    'LM GTE Pro': 'LMGTE Pro', 'LMGTE Pro': 'LMGTE Pro',
    'LM GTE Am': 'LMGTE Am', 'LMGTE Am': 'LMGTE Am',
    'HYPERCAR': 'Hypercar', 'LMH': 'Hypercar', 'LMDh': 'Hypercar',
    'CDNT': 'Experimental', 'INNOVATIVE CAR': 'Experimental'
}
df['class'] = df['class'].map(class_norm_map)
df['team'] = df['team'].str.replace('Toyota Racing', 'Toyota Gazoo Racing')

top_class = df[df['class'].isin(['LMP1', 'Hypercar'])]
top_class_wins = top_class[top_class['class_position'] == 1]
print("Top Class Wins by Team (class_position=1):")
print(top_class_wins['team'].value_counts())
print("\nUnique cars entering Top Class per team:")
print(top_class.groupby('team')['car'].nunique())
print("\nTop Class Overall Wins by Team (overall_position=1):")
print(top_class[top_class['overall_position'] == 1]['team'].value_counts())

print("\n--- 5. VERIFY GT COUNTS ---")
gt_class = df[df['class'].isin(['LMGTE Pro', 'LMGTE Am'])]
gt_wins = gt_class[gt_class['class_position'] == 1]
print("GT Wins by Class:")
print(gt_wins['class'].value_counts())
print("\nGT Wins by Team:")
print(gt_wins['team'].value_counts().head(5))
print("\nNumber of unique entries (cars) per team in GT:")
print(gt_class.groupby('team')['car'].nunique().sort_values(ascending=False).head(5))

print("\n--- 6. VERIFY MICHELIN MONOPOLY ---")
print("Total rows:", len(df))
print("Missing tyre values:", df['tyres'].isnull().sum())
print("Tyre counts (representing 1 car entry in 1 race):")
print(df['tyres'].value_counts())
