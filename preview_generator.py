"""
WEC Dashboard - Static HTML Preview Generator
Generates standalone HTML files with embedded Plotly charts
"""

import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots

# Colors
COLORS = {
    'primary': '#E10600',
    'accent': '#FFD700',
    'background': '#0A0A0A',
    'card': '#1E1E1E',
    'text': '#FFFFFF'
}

print("🏁 Loading WEC data...")
df = pd.read_csv('Data/raw/wec_data.csv')

# Data cleaning
df['class'] = df['class'].replace({
    'LM P1': 'LMP1',
    'LM P2': 'LMP2',
    'LM GTE Pro': 'LMGTE Pro',
    'LM GTE Am': 'LMGTE Am',
    'CDNT': 'Experimental',
    'INNOVATIVE CAR': 'Experimental'
})

class_map = {
    'LMP1': 'Hypercar',
    'LMH': 'Hypercar',
    'LMDh': 'Hypercar',
    'HYPERCAR': 'Hypercar',
    'LMP2': 'LMP2',
    'LMGTE Am': 'LMGT3',
    'LMGTE Pro': 'LMGT3',
    'CDNT': 'Experimental',
    'INNOVATIVE CAR': 'Experimental'
}
df['class_group'] = df['class'].map(class_map)

winners = df[df['class_position'] == 1]

print("📊 Generating visualizations...")

# 1. Hypercar Teams Wins
hypercar_wins = winners[winners['class_group'] == 'Hypercar']['team'].value_counts().head(10)
fig1 = px.bar(
    x=hypercar_wins.values,
    y=hypercar_wins.index,
    orientation='h',
    labels={'x': 'Wins', 'y': 'Team'},
    title='🏆 TOP 10 HYPERCAR TEAMS BY WINS',
    color=hypercar_wins.values,
    color_continuous_scale='Reds'
)
fig1.update_layout(
    template='plotly_dark',
    plot_bgcolor=COLORS['card'],
    paper_bgcolor=COLORS['background'],
    font=dict(family='Arial', color=COLORS['text'], size=14),
    height=500,
    margin=dict(l=200),
    showlegend=False
)

# 2. LMGT3 Teams Wins
lmgt3_wins = winners[winners['class_group'] == 'LMGT3']['team'].value_counts().head(10)
fig2 = px.bar(
    x=lmgt3_wins.values,
    y=lmgt3_wins.index,
    orientation='h',
    labels={'x': 'Wins', 'y': 'Team'},
    title='🏆 TOP 10 LMGT3 TEAMS BY WINS',
    color=lmgt3_wins.values,
    color_continuous_scale='Blues'
)
fig2.update_layout(
    template='plotly_dark',
    plot_bgcolor=COLORS['card'],
    paper_bgcolor=COLORS['background'],
    font=dict(family='Arial', color=COLORS['text'], size=14),
    height=500,
    margin=dict(l=200),
    showlegend=False
)

# 3. Victory Distribution
victory_counts = winners['class_group'].value_counts()
fig3 = px.pie(
    values=victory_counts.values,
    names=victory_counts.index,
    title='VICTORY DISTRIBUTION BY CLASS',
    hole=0.4,
    color_discrete_sequence=[COLORS['primary'], COLORS['accent'], '#4ECDC4']
)
fig3.update_layout(
    template='plotly_dark',
    paper_bgcolor=COLORS['background'],
    font=dict(family='Arial', color=COLORS['text'], size=14),
    height=500
)

# 4. Top Vehicles
top_vehicles = winners.groupby(['vehicle', 'class_group']).size().reset_index(name='wins').sort_values('wins', ascending=False).head(15)
fig4 = px.bar(
    top_vehicles,
    x='wins',
    y='vehicle',
    color='class_group',
    orientation='h',
    title='🏎️ TOP 15 WINNING VEHICLES',
    labels={'wins': 'Wins', 'vehicle': 'Vehicle'},
    color_discrete_map={
        'Hypercar': COLORS['primary'],
        'LMP2': '#4ECDC4',
        'LMGT3': COLORS['accent']
    }
)
fig4.update_layout(
    template='plotly_dark',
    plot_bgcolor=COLORS['card'],
    paper_bgcolor=COLORS['background'],
    font=dict(family='Arial', color=COLORS['text'], size=14),
    height=700,
    margin=dict(l=250)
)

# 5. Speed Trends
lap_time_df = df[df['fl_kph_average'].notna()].copy()
speed_by_year = lap_time_df.groupby(['season', 'class_group'])['fl_kph_average'].mean().reset_index()
fig5 = px.line(
    speed_by_year,
    x='season',
    y='fl_kph_average',
    color='class_group',
    markers=True,
    title='⏱️ SPEED EVOLUTION OVER SEASONS',
    labels={'fl_kph_average': 'Average Speed (km/h)', 'season': 'Season'},
    color_discrete_map={
        'Hypercar': COLORS['primary'],
        'LMP2': '#4ECDC4',
        'LMGT3': COLORS['accent']
    }
)
fig5.update_layout(
    template='plotly_dark',
    plot_bgcolor=COLORS['card'],
    paper_bgcolor=COLORS['background'],
    font=dict(family='Arial', color=COLORS['text'], size=14),
    height=500
)

# Generate HTML
print("🎨 Creating HTML file...")

html_content = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WEC Racing Analysis Dashboard 2026 - Preview</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.plot.ly/plotly-2.27.0.min.js"></script>
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        
        body {{
            font-family: 'Rajdhani', sans-serif;
            background: {COLORS['background']};
            color: {COLORS['text']};
            padding: 0;
            margin: 0;
        }}
        
        .header {{
            background: linear-gradient(135deg, {COLORS['background']} 0%, #1A1A1A 100%);
            padding: 30px 40px;
            border-bottom: 4px solid {COLORS['primary']};
            box-shadow: 0 4px 20px rgba(225, 6, 0, 0.3);
            text-align: center;
        }}
        
        .header h1 {{
            font-family: 'Orbitron', sans-serif;
            font-weight: 900;
            font-size: 48px;
            letter-spacing: 3px;
            background: linear-gradient(90deg, {COLORS['primary']}, {COLORS['accent']});
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 10px;
        }}
        
        .header p {{
            font-size: 16px;
            color: #B0B0B0;
            letter-spacing: 2px;
            text-transform: uppercase;
        }}
        
        .container {{
            max-width: 1400px;
            margin: 0 auto;
            padding: 40px 20px;
        }}
        
        .stats-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }}
        
        .stat-card {{
            background: linear-gradient(135deg, {COLORS['card']} 0%, #1A1A1A 100%);
            padding: 30px;
            border-radius: 10px;
            border: 1px solid {COLORS['primary']};
            box-shadow: 0 4px 15px rgba(225, 6, 0, 0.2);
            text-align: center;
        }}
        
        .stat-label {{
            font-size: 14px;
            color: #B0B0B0;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: bold;
            margin-bottom: 15px;
        }}
        
        .stat-value {{
            font-family: 'Orbitron', sans-serif;
            font-size: 48px;
            font-weight: bold;
            color: {COLORS['primary']};
            text-shadow: 0 0 20px {COLORS['primary']};
        }}
        
        .section {{
            margin-bottom: 50px;
        }}
        
        .section-title {{
            font-family: 'Orbitron', sans-serif;
            font-size: 28px;
            color: {COLORS['text']};
            border-bottom: 2px solid {COLORS['primary']};
            padding-bottom: 15px;
            margin-bottom: 30px;
            text-transform: uppercase;
            letter-spacing: 2px;
        }}
        
        .chart-container {{
            background: {COLORS['card']};
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 30px;
            border: 1px solid #333;
        }}
        
        .footer {{
            text-align: center;
            padding: 30px;
            background: #1A1A1A;
            border-top: 2px solid {COLORS['primary']};
            margin-top: 50px;
        }}
        
        .footer p {{
            font-family: 'Orbitron', sans-serif;
            font-size: 12px;
            color: #B0B0B0;
            letter-spacing: 2px;
            margin: 5px 0;
        }}
        
        .note {{
            background: rgba(255, 215, 0, 0.1);
            border-left: 4px solid {COLORS['accent']};
            padding: 20px;
            margin: 30px 0;
            border-radius: 5px;
        }}
        
        .note h3 {{
            color: {COLORS['accent']};
            font-family: 'Orbitron', sans-serif;
            margin-bottom: 10px;
        }}
    </style>
</head>
<body>
    <div class="header">
        <h1>🏁 WEC RACING ANALYSIS 🏁</h1>
        <p>Season Analysis Dashboard 2026 - Static Preview</p>
    </div>
    
    <div class="container">
        <div class="note">
            <h3>📌 Static Preview Version</h3>
            <p>This is a <strong>static HTML preview</strong> of the WEC Dashboard. For full interactive experience with filters and real-time updates, run the Python application locally or deploy to Streamlit Cloud.</p>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-label">Total Races</div>
                <div class="stat-value">{len(df['race'].unique())}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Total Teams</div>
                <div class="stat-value">{len(df['team'].unique())}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Total Cars</div>
                <div class="stat-value">{len(df['car'].unique())}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Total Entries</div>
                <div class="stat-value">{len(df)}</div>
            </div>
        </div>
        
        <div class="section">
            <h2 class="section-title">🏆 Team Performance Analysis</h2>
            <div class="chart-container">
                {fig1.to_html(include_plotlyjs=False, div_id='chart1')}
            </div>
            <div class="chart-container">
                {fig2.to_html(include_plotlyjs=False, div_id='chart2')}
            </div>
            <div class="chart-container">
                {fig3.to_html(include_plotlyjs=False, div_id='chart3')}
            </div>
        </div>
        
        <div class="section">
            <h2 class="section-title">🏎️ Car Performance Analysis</h2>
            <div class="chart-container">
                {fig4.to_html(include_plotlyjs=False, div_id='chart4')}
            </div>
        </div>
        
        <div class="section">
            <h2 class="section-title">⏱️ Speed Trends Analysis</h2>
            <div class="chart-container">
                {fig5.to_html(include_plotlyjs=False, div_id='chart5')}
            </div>
        </div>
        
        <div class="note">
            <h3>🚀 Want the Full Experience?</h3>
            <p><strong>Run locally:</strong></p>
            <pre style="background: #0A0A0A; padding: 15px; border-radius: 5px; overflow-x: auto;">
python app_dash.py
# Open: http://localhost:8050
            </pre>
            <p style="margin-top: 15px;"><strong>Or deploy FREE to Streamlit Cloud:</strong></p>
            <p>Visit <a href="https://share.streamlit.io" style="color: {COLORS['accent']}">share.streamlit.io</a> and deploy from GitHub!</p>
        </div>
    </div>
    
    <div class="footer">
        <p>🏁 WEC RACING ANALYSIS DASHBOARD 2026 🏁</p>
        <p>Built with Dash & Plotly | Inspired by FIA WEC</p>
    </div>
</body>
</html>
"""

# Save HTML
with open('wec_dashboard_preview.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("✅ Preview HTML generated successfully!")
print("📁 File: wec_dashboard_preview.html")
print("🌐 Open this file in your browser to see the preview!")
