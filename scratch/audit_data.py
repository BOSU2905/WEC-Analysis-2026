import pandas as pd
import json

df = pd.read_csv('/home/ben/WEC-Analysis-2026/Data/raw/wec_data.csv')

print("--- SHAPE ---")
print(df.shape)

print("\n--- COLUMNS & DATA TYPES ---")
print(df.dtypes)

print("\n--- MISSING VALUES ---")
print(df.isnull().sum()[df.isnull().sum() > 0])

print("\n--- DUPLICATES ---")
print(f"Exact duplicates: {df.duplicated().sum()}")

print("\n--- SAMPLE DATA ---")
print(df.head())

print("\n--- RACES & SEASONS ---")
if 'season' in df.columns:
    print(f"Seasons: {df['season'].nunique()}")
    print(df['season'].unique())
if 'race' in df.columns:
    print(f"Races: {df['race'].nunique()}")
if 'event' in df.columns:
    print(f"Events: {df['event'].nunique()}")

print("\n--- UNIQUE CLASSES ---")
if 'class' in df.columns:
    print(df['class'].value_counts())
elif 'category' in df.columns:
    print(df['category'].value_counts())

print("\n--- UNIQUE POSITIONS ---")
for col in df.columns:
    if 'position' in col.lower() or 'pos' in col.lower():
        print(f"\n{col}:")
        print(df[col].value_counts().head(10))

print("\n--- TEAMS/MANUFACTURERS (top 10) ---")
for col in ['team', 'manufacturer', 'car', 'tyre', 'tyres']:
    if col in df.columns:
        print(f"\n{col}:")
        print(df[col].value_counts().head(10))
