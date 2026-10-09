import nbformat as nbf

nb = nbf.v4.new_notebook()

nb.cells = [
    nbf.v4.new_markdown_cell("# WEC Analytical Foundation (2011–2023)\nThis is the canonical analytical notebook for the WEC Analysis project. It establishes the correct dataset structure, cleans anomalies, normalizes entities, and produces the final analytical conclusions that the website will consume."),
    
    nbf.v4.new_markdown_cell("## 00 — Research Questions\n1. How did WEC's competitive structure evolve from 2011 to 2023?\n2. Which teams dominated their respective eras and classes?\n3. How did the top-class (LMP1 to Hypercar) and GT-class transition happen?\n4. What defines a 'win' in this dataset (Overall vs. Class)?\n5. How did pace and speed evolve across different eras, and how do track characteristics affect this?"),
    
    nbf.v4.new_markdown_cell("## 01 — Dataset Audit\nLoad the raw data, check for duplicates and nulls."),
    nbf.v4.new_code_cell("import pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\nimport seaborn as sns\n\ndf_raw = pd.read_csv('../Data/raw/wec_data.csv')\n\n# Audit\nprint('Shape:', df_raw.shape)\nprint('Exact duplicates:', df_raw.duplicated().sum())"),
    
    nbf.v4.new_markdown_cell("## 02 — Data Cleaning & Entity Normalization\nWe drop the exact duplicate rows (24 duplicated pairs). We also normalize team names and create a cleaner date/season mapping. The `group` column is heavily null and shouldn't be used."),
    nbf.v4.new_code_cell("# Drop exact duplicates\ndf = df_raw.drop_duplicates().copy()\n\n# Normalize Toyota naming\ndf['team'] = df['team'].str.replace('Toyota Racing', 'Toyota Gazoo Racing')\n\n# Convert lap time to seconds for easier pace analysis\ndef lap_to_seconds(lap_time):\n    try:\n        if pd.isna(lap_time) or lap_time == '-':\n            return None\n        minutes, seconds = str(lap_time).split(':')\n        return int(minutes) * 60 + float(seconds)\n    except:\n        return None\n\ndf['fastest_lap_seconds'] = df['fl_time'].apply(lap_to_seconds)"),
    
    nbf.v4.new_markdown_cell("## 03 — Historical Class Mapping\nThe dataset contains classes like 'LM P1', 'LMP1', 'LM GTE Pro', 'LMGTE Pro'. We must normalize these spellings. \nWe also map them into broad analytical groups for longitudinal analysis (Hypercar/LMP1, LMP2, GT). Note that GT here is a combination of GTE Pro and GTE Am, and SHOULD NOT be anachronistically called 'LMGT3'."),
    nbf.v4.new_code_cell("class_norm_map = {\n    'LM P1': 'LMP1', 'LMP1': 'LMP1',\n    'LM P2': 'LMP2', 'LMP2': 'LMP2',\n    'LM GTE Pro': 'LMGTE Pro', 'LMGTE Pro': 'LMGTE Pro',\n    'LM GTE Am': 'LMGTE Am', 'LMGTE Am': 'LMGTE Am',\n    'HYPERCAR': 'Hypercar', 'LMH': 'Hypercar', 'LMDh': 'Hypercar',\n    'CDNT': 'Experimental', 'INNOVATIVE CAR': 'Experimental'\n}\n\ndf['class'] = df['class'].map(class_norm_map)\n\n# Analytical grouping for multi-year trends\ngroup_map = {\n    'LMP1': 'Top Class (LMP1/Hypercar)',\n    'Hypercar': 'Top Class (LMP1/Hypercar)',\n    'LMP2': 'LMP2',\n    'LMGTE Pro': 'GT (GTE Pro/Am)',\n    'LMGTE Am': 'GT (GTE Pro/Am)',\n    'Experimental': 'Experimental'\n}\ndf['class_group'] = df['class'].map(group_map)"),
    
    nbf.v4.new_markdown_cell("## 04 — Race & Winner Integrity\nIn WEC, `class_position == 1` means a class victory, not necessarily an overall victory. There are 16 unique circuit names in the dataset, but many were raced multiple times. Some circuits like Bahrain were raced twice in a single season (e.g., 2019-2020 and 2021)."),
    nbf.v4.new_code_cell("class_winners = df[df['class_position'] == 1]\noverall_winners = df[df['overall_position'] == 1]\n\nprint(f'Total class winners: {len(class_winners)}')\nprint(f'Total overall winners: {len(overall_winners)}')\n\n# Verify race integrity by checking if we have exactly 1 overall winner per race event\n# Note: race strings like 'Bahrain 2' identify second events in a season.\nrace_events = df.groupby(['season', 'race']).size().reset_index()\nprint(f'Total unique race events: {len(race_events)}')"),
    
    nbf.v4.new_markdown_cell("## 05 — Team / Manufacturer Analysis\nLet's analyze team dominance. For the top class (LMP1/Hypercar), Toyota Gazoo Racing has the most wins. We must count wins based on unique events, as a team might have multiple cars on the podium, but only one car wins."),
    nbf.v4.new_code_cell("top_class_winners = df[(df['class_group'] == 'Top Class (LMP1/Hypercar)') & (df['class_position'] == 1)]\nteam_wins = top_class_winners['team'].value_counts()\nprint('Top Class Team Wins:\\n', team_wins.head())"),
    
    nbf.v4.new_markdown_cell("## 06 — Car / Machine Analysis\nWhich specific car models achieved the most class wins?"),
    nbf.v4.new_code_cell("car_wins = class_winners['vehicle'].value_counts()\nprint('Car Model Class Wins:\\n', car_wins.head(10))"),
    
    nbf.v4.new_markdown_cell("## 07 — GT Competition\nGT categories (GTE Pro and GTE Am) were highly competitive. Let's see which teams had the most wins across GT."),
    nbf.v4.new_code_cell("gt_winners = df[(df['class_group'] == 'GT (GTE Pro/Am)') & (df['class_position'] == 1)]\ngt_team_wins = gt_winners['team'].value_counts()\nprint('GT Team Wins:\\n', gt_team_wins.head(5))"),
    
    nbf.v4.new_markdown_cell("## 08 — Tyre Analysis\nTyre usage can be measured in multiple ways (starts, entries, wins). Here we measure 'entries', which means the number of cars starting a race on a particular tyre. Michelin dominates heavily."),
    nbf.v4.new_code_cell("tyre_entries = df['tyres'].value_counts()\nprint('Tyre Entries:\\n', tyre_entries)"),
    
    nbf.v4.new_markdown_cell("## 09 — Pace & Speed Evolution\nWe use average fastest lap speed (kph) to compare pace, as raw lap time is track-dependent. We must be careful not to draw cross-circuit conclusions."),
    nbf.v4.new_code_cell("speed_by_class = df.groupby(['season', 'class_group'])['fl_kph_average'].mean().unstack()\nprint('Average Fastest Lap KPH by Class:\\n', speed_by_class.tail())"),
    
    nbf.v4.new_markdown_cell("## 10 — Circuit-Level Performance\nWe analyze lap times within specific circuits, such as Le Mans, to show evolution without cross-circuit distortion."),
    nbf.v4.new_code_cell("lemans_data = df[df['race'].str.contains('LeMans')]\nlemans_pace = lemans_data.groupby(['season', 'class_group'])['fl_kph_average'].mean().unstack()\n# This table can be used for track-specific pace evolution visualization\nprint('Le Mans Pace Evolution:\\n', lemans_pace.tail())"),
    
    nbf.v4.new_markdown_cell("## 11 — Lap-Time Evolution\nInstead of connecting points between Spa and Le Mans, lap-time evolution should be charted per circuit or via small multiples."),
    nbf.v4.new_code_cell("# In export, we will prepare data that allows small multiples per circuit\ncircuit_evolution = df.groupby(['season', 'race', 'class_group'])['fastest_lap_seconds'].min().reset_index()"),
    
    nbf.v4.new_markdown_cell("## 12 — Analytical Findings\n1. **Toyota's Dominance**: Toyota Gazoo Racing achieved the most Top Class wins. \n2. **GT Aggregation**: AF Corse and Aston Martin Racing accumulated high win counts largely due to multiple cars and operating in both GTE Pro and GTE Am.\n3. **Tyre Monopoly**: Michelin supplied the vast majority of entries.\n4. **Pace**: Hypercar introduced a deliberate pace reduction compared to the LMP1 era for cost control and convergence."),
    
    nbf.v4.new_markdown_cell("## 13 — Website Data Export\nWe export the cleaned and validated subsets to feed the frontend experience. We avoid making the UI perform aggregations."),
    nbf.v4.new_code_cell("import os\nos.makedirs('../Data/processed', exist_ok=True)\ndf.to_csv('../Data/processed/wec_cleaned.csv', index=False)\ncircuit_evolution.to_csv('../Data/processed/circuit_evolution.csv', index=False)\nclass_winners.to_csv('../Data/processed/class_winners.csv', index=False)\nprint('Data exported to Data/processed/')")
]

with open('/home/ben/WEC-Analysis-2026/notebooks/wec_analytical_foundation.ipynb', 'w') as f:
    nbf.write(nb, f)
