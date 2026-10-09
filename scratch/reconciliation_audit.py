import pandas as pd
import numpy as np

df_raw = pd.read_csv('/home/ben/WEC-Analysis-2026/Data/raw/wec_data.csv')

print("--- EVENT COUNT RECONCILIATION ---")
# Before duplicates
print("Raw overall winners count:", len(df_raw[df_raw['overall_position'] == 1]))

df_raw['event_id'] = df_raw['season'].astype(str) + '_' + df_raw['race'].astype(str)
print("Raw unique event_id count:", df_raw['event_id'].nunique())

dup_mask = df_raw.duplicated(keep=False)
dup_df = df_raw[dup_mask]
print("Duplicated overall winners in raw:", len(dup_df[dup_df['overall_position'] == 1]))

# After duplicates
df = df_raw.drop_duplicates().copy()
print("Cleaned overall winners count:", len(df[df['overall_position'] == 1]))
print("Cleaned unique event_id count:", df['event_id'].nunique())

events_winners = df[df['overall_position'] == 1].groupby('event_id').size()
print("Cleaned events with exactly 1 overall winner:", (events_winners == 1).sum())
print("Cleaned events with >1 overall winner:", (events_winners > 1).sum())

print("\n--- CLASS WINNER RECONCILIATION ---")
class_winners = df[df['class_position'] == 1]
class_winners_per_event = class_winners.groupby(['event_id', 'class']).size()
print("Class/event combinations with >1 winner:")
print(class_winners_per_event[class_winners_per_event > 1])

print("\n--- TOYOTA RECONCILIATION ---")
class_norm_map = {
    'LM P1': 'LMP1', 'LMP1': 'LMP1',
    'LM P2': 'LMP2', 'LMP2': 'LMP2',
    'LM GTE Pro': 'LMGTE Pro', 'LMGTE Pro': 'LMGTE Pro',
    'LM GTE Am': 'LMGTE Am', 'LMGTE Am': 'LMGTE Am',
    'HYPERCAR': 'Hypercar', 'LMH': 'Hypercar', 'LMDh': 'Hypercar',
    'CDNT': 'Experimental', 'INNOVATIVE CAR': 'Experimental'
}
df['class_norm'] = df['class'].map(class_norm_map)
df['team_norm'] = df['team'].str.replace('Toyota Racing', 'Toyota Gazoo Racing')
df['class_group'] = df['class_norm'].map({
    'LMP1': 'Top Class (LMP1/Hypercar)',
    'Hypercar': 'Top Class (LMP1/Hypercar)',
    'LMP2': 'LMP2',
    'LMGTE Pro': 'GT (GTE Pro/Am)',
    'LMGTE Am': 'GT (GTE Pro/Am)',
    'Experimental': 'Experimental'
})

toyota_wins = df[(df['class_group'] == 'Top Class (LMP1/Hypercar)') & 
                 (df['class_position'] == 1) & 
                 (df['team_norm'] == 'Toyota Gazoo Racing')]

print(f"Toyota Top-Class Class Victories: {len(toyota_wins)}")
print(f"Toyota Unique Events Represented: {toyota_wins['event_id'].nunique()}")
print(f"Toyota Overall Victories in those events: {(toyota_wins['overall_position'] == 1).sum()}")
print("Season distribution:")
print(toyota_wins['season'].value_counts().sort_index())

print("\n--- TYRE RECONCILIATION ---")
print("Raw rows:", len(df_raw))
print("Raw missing tyres:", df_raw['tyres'].isna().sum())
print("Raw Michelin:", df_raw['tyres'].value_counts().get('Michelin'))

print("Cleaned rows:", len(df))
print("Cleaned missing tyres:", df['tyres'].isna().sum())
print("Cleaned Michelin:", df['tyres'].value_counts().get('Michelin'))

print("Difference in rows:", len(df_raw) - len(df))
print("Difference in Michelin:", df_raw['tyres'].value_counts().get('Michelin') - df['tyres'].value_counts().get('Michelin'))
