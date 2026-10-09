import pandas as pd
import numpy as np

df_raw = pd.read_csv('/home/ben/WEC-Analysis-2026/Data/raw/wec_data.csv')

print("--- 1. DUPLICATE INTEGRITY ---")
# 1. How many duplicate occurrences does `duplicated()` report?
# (This counts all duplicates EXCEPT the first occurrence)
print("duplicated().sum():", df_raw.duplicated().sum())

# 2. How many total rows participate in duplicate groups?
dup_mask = df_raw.duplicated(keep=False)
print("Rows participating in duplicate groups:", dup_mask.sum())

# 3. How many unique duplicate groups exist?
# A duplicate group is a set of identical rows. 
dup_df = df_raw[dup_mask]
# Group by all columns
dup_groups = dup_df.groupby(list(df_raw.columns), dropna=False).size()
print("Unique duplicate groups:", len(dup_groups))
print("Rows per duplicate group:\n", dup_groups.value_counts())

# Are the suspected Bahrain 2019-2020 records truly exact?
# The group by all columns proves they are identical across all fields.
print("Seasons involved in duplicates:", dup_df['season'].unique())
print("Races involved in duplicates:", dup_df['race'].unique())


print("\n--- 2. RACE EVENT INTEGRITY ---")
df = df_raw.drop_duplicates().copy()
df['event_id'] = df['season'].astype(str) + '_' + df['race'].astype(str)
print("Total unique race events:", df['event_id'].nunique())

overall_winners = df[df['overall_position'] == 1]
winners_per_event = overall_winners.groupby('event_id').size()

print("Events with exactly one overall winner:", (winners_per_event == 1).sum())
print("Events with multiple overall winners:", (winners_per_event > 1).sum())
events_with_no_winners = set(df['event_id']) - set(winners_per_event.index)
print("Events with zero overall winners:", len(events_with_no_winners))
if len(events_with_no_winners) > 0:
    print("Zero winner events:", events_with_no_winners)
if (winners_per_event > 1).sum() > 0:
    print("Multiple winner events:", winners_per_event[winners_per_event > 1])

print("\n--- 5. HISTORICAL CLASS NORMALIZATION AUDIT ---")
print("Raw classes and counts:")
print(df_raw['class'].value_counts(dropna=False))

class_norm_map = {
    'LM P1': 'LMP1', 'LMP1': 'LMP1',
    'LM P2': 'LMP2', 'LMP2': 'LMP2',
    'LM GTE Pro': 'LMGTE Pro', 'LMGTE Pro': 'LMGTE Pro',
    'LM GTE Am': 'LMGTE Am', 'LMGTE Am': 'LMGTE Am',
    'HYPERCAR': 'Hypercar', 'LMH': 'Hypercar', 'LMDh': 'Hypercar',
    'CDNT': 'Experimental', 'INNOVATIVE CAR': 'Experimental'
}
unmapped = set(df_raw['class'].dropna().unique()) - set(class_norm_map.keys())
print("Unmapped classes:", unmapped)

print("\n--- 10. CIRCUIT-LEVEL ANALYSIS ---")
print("Unique race strings:")
print(df['race'].unique())

print("\n--- 12. VEHICLE ANALYSIS ---")
print("Sample vehicles:")
print(df['vehicle'].value_counts().head())
