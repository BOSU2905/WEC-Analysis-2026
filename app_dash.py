import dash
from dash import dcc, html, Input, Output, callback
import plotly.express as px
import plotly.graph_objects as go
import pandas as pd
import numpy as np

# Initialize the app
app = dash.Dash(__name__, suppress_callback_exceptions=True)
app.title = "WEC Racing Analysis 2026"

# Load data
@callback(Output('data-store', 'data'))
def load_data():
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
    
    # Create class groups
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
    
    return df.to_dict('records')

# Define colors inspired by FIA WEC
COLORS = {
    'primary': '#E10600',      # WEC Red
    'secondary': '#1A1A1A',    # Dark Gray/Black
    'accent': '#FFD700',       # Gold
    'background': '#0A0A0A',   # Deep Black
    'card': '#1E1E1E',         # Card Background
    'text': '#FFFFFF',         # White
    'text_secondary': '#B0B0B0' # Gray
}

# Custom CSS with FIA WEC inspired design
app.index_string = '''
<!DOCTYPE html>
<html>
    <head>
        {%metas%}
        <title>{%title%}</title>
        {%favicon%}
        {%css%}
        <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;900&display=swap" rel="stylesheet">
    </head>
    <body>
        {%app_entry%}
        <footer>
            {%config%}
            {%scripts%}
            {%renderer%}
        </footer>
    </body>
</html>
'''

# Layout
app.layout = html.Div([
    dcc.Store(id='data-store'),
    
    # Header
    html.Div([
        html.Div([
            html.Div([
                html.Img(
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/FIA_World_Endurance_Championship_logo.svg/2560px-FIA_World_Endurance_Championship_logo.svg.png',
                    style={
                        'height': '60px',
                        'marginRight': '20px',
                        'filter': 'brightness(0) invert(1)'
                    }
                ),
                html.Div([
                    html.H1('WEC RACING ANALYSIS', 
                           style={
                               'fontFamily': 'Orbitron, sans-serif',
                               'fontWeight': '900',
                               'fontSize': '42px',
                               'margin': '0',
                               'letterSpacing': '3px',
                               'background': f'linear-gradient(90deg, {COLORS["primary"]}, {COLORS["accent"]})',
                               'WebkitBackgroundClip': 'text',
                               'WebkitTextFillColor': 'transparent',
                               'textTransform': 'uppercase'
                           }),
                    html.P('Season Analysis Dashboard 2026',
                          style={
                              'fontFamily': 'Rajdhani, sans-serif',
                              'color': COLORS['text_secondary'],
                              'fontSize': '16px',
                              'margin': '5px 0 0 0',
                              'letterSpacing': '2px',
                              'textTransform': 'uppercase'
                          })
                ])
            ], style={'display': 'flex', 'alignItems': 'center'})
        ], style={
            'maxWidth': '1400px',
            'margin': '0 auto',
            'padding': '20px 40px'
        })
    ], style={
        'background': f'linear-gradient(135deg, {COLORS["background"]} 0%, {COLORS["secondary"]} 100%)',
        'borderBottom': f'4px solid {COLORS["primary"]}',
        'boxShadow': '0 4px 20px rgba(225, 6, 0, 0.3)'
    }),
    
    # Main Container
    html.Div([
        # Sidebar Filters
        html.Div([
            html.Div([
                html.H3('⚙️ FILTERS', 
                       style={
                           'fontFamily': 'Orbitron, sans-serif',
                           'color': COLORS['text'],
                           'borderBottom': f'2px solid {COLORS["primary"]}',
                           'paddingBottom': '10px',
                           'marginBottom': '20px',
                           'textTransform': 'uppercase',
                           'letterSpacing': '2px'
                       }),
                
                # Season Filter
                html.Label('SEASON', 
                          style={
                              'fontFamily': 'Rajdhani, sans-serif',
                              'color': COLORS['accent'],
                              'fontSize': '14px',
                              'fontWeight': 'bold',
                              'marginBottom': '8px',
                              'display': 'block',
                              'textTransform': 'uppercase',
                              'letterSpacing': '1px'
                          }),
                dcc.Dropdown(
                    id='season-filter',
                    multi=True,
                    placeholder='Select Season(s)',
                    style={
                        'marginBottom': '20px',
                        'fontFamily': 'Rajdhani, sans-serif'
                    }
                ),
                
                # Class Filter
                html.Label('CLASS', 
                          style={
                              'fontFamily': 'Rajdhani, sans-serif',
                              'color': COLORS['accent'],
                              'fontSize': '14px',
                              'fontWeight': 'bold',
                              'marginBottom': '8px',
                              'display': 'block',
                              'textTransform': 'uppercase',
                              'letterSpacing': '1px'
                          }),
                dcc.Dropdown(
                    id='class-filter',
                    multi=True,
                    placeholder='Select Class(es)',
                    style={
                        'marginBottom': '20px',
                        'fontFamily': 'Rajdhani, sans-serif'
                    }
                ),
                
                # Race Filter
                html.Label('RACE TRACK', 
                          style={
                              'fontFamily': 'Rajdhani, sans-serif',
                              'color': COLORS['accent'],
                              'fontSize': '14px',
                              'fontWeight': 'bold',
                              'marginBottom': '8px',
                              'display': 'block',
                              'textTransform': 'uppercase',
                              'letterSpacing': '1px'
                          }),
                dcc.Dropdown(
                    id='race-filter',
                    multi=True,
                    placeholder='Select Race(s)',
                    style={
                        'marginBottom': '20px',
                        'fontFamily': 'Rajdhani, sans-serif'
                    }
                ),
                
                # Reset Button
                html.Button('RESET FILTERS', 
                           id='reset-button',
                           style={
                               'width': '100%',
                               'padding': '12px',
                               'background': COLORS['primary'],
                               'color': COLORS['text'],
                               'border': 'none',
                               'borderRadius': '5px',
                               'fontFamily': 'Rajdhani, sans-serif',
                               'fontSize': '14px',
                               'fontWeight': 'bold',
                               'cursor': 'pointer',
                               'textTransform': 'uppercase',
                               'letterSpacing': '1px',
                               'transition': 'all 0.3s'
                           })
            ], style={
                'background': COLORS['card'],
                'padding': '25px',
                'borderRadius': '10px',
                'border': f'1px solid {COLORS["secondary"]}',
                'boxShadow': '0 4px 15px rgba(0,0,0,0.5)'
            })
        ], style={
            'width': '280px',
            'marginRight': '30px'
        }),
        
        # Main Content
        html.Div([
            # Stats Cards
            html.Div(id='stats-cards', style={'marginBottom': '30px'}),
            
            # Navigation Tabs
            dcc.Tabs(id='main-tabs', value='team-wins', children=[
                dcc.Tab(label='🏆 TEAM WINS', value='team-wins',
                       style={
                           'fontFamily': 'Rajdhani, sans-serif',
                           'fontWeight': 'bold',
                           'fontSize': '14px'
                       },
                       selected_style={
                           'fontFamily': 'Rajdhani, sans-serif',
                           'fontWeight': 'bold',
                           'fontSize': '14px',
                           'borderTop': f'3px solid {COLORS["primary"]}'
                       }),
                dcc.Tab(label='🏎️ CAR PERFORMANCE', value='car-performance',
                       style={
                           'fontFamily': 'Rajdhani, sans-serif',
                           'fontWeight': 'bold',
                           'fontSize': '14px'
                       },
                       selected_style={
                           'fontFamily': 'Rajdhani, sans-serif',
                           'fontWeight': 'bold',
                           'fontSize': '14px',
                           'borderTop': f'3px solid {COLORS["primary"]}'
                       }),
                dcc.Tab(label='🛞 TYRES', value='tyres',
                       style={
                           'fontFamily': 'Rajdhani, sans-serif',
                           'fontWeight': 'bold',
                           'fontSize': '14px'
                       },
                       selected_style={
                           'fontFamily': 'Rajdhani, sans-serif',
                           'fontWeight': 'bold',
                           'fontSize': '14px',
                           'borderTop': f'3px solid {COLORS["primary"]}'
                       }),
                dcc.Tab(label='⏱️ LAP TIMES', value='lap-times',
                       style={
                           'fontFamily': 'Rajdhani, sans-serif',
                           'fontWeight': 'bold',
                           'fontSize': '14px'
                       },
                       selected_style={
                           'fontFamily': 'Rajdhani, sans-serif',
                           'fontWeight': 'bold',
                           'fontSize': '14px',
                           'borderTop': f'3px solid {COLORS["primary"]}'
                       }),
                dcc.Tab(label='📈 SPEED', value='speed',
                       style={
                           'fontFamily': 'Rajdhani, sans-serif',
                           'fontWeight': 'bold',
                           'fontSize': '14px'
                       },
                       selected_style={
                           'fontFamily': 'Rajdhani, sans-serif',
                           'fontWeight': 'bold',
                           'fontSize': '14px',
                           'borderTop': f'3px solid {COLORS["primary"]}'
                       }),
                dcc.Tab(label='🏁 WINNERS', value='winners',
                       style={
                           'fontFamily': 'Rajdhani, sans-serif',
                           'fontWeight': 'bold',
                           'fontSize': '14px'
                       },
                       selected_style={
                           'fontFamily': 'Rajdhani, sans-serif',
                           'fontWeight': 'bold',
                           'fontSize': '14px',
                           'borderTop': f'3px solid {COLORS["primary"]}'
                       })
            ], style={
                'fontFamily': 'Rajdhani, sans-serif'
            }),
            
            # Tab Content
            html.Div(id='tab-content', style={'marginTop': '30px'})
            
        ], style={'flex': '1'})
        
    ], style={
        'display': 'flex',
        'maxWidth': '1400px',
        'margin': '30px auto',
        'padding': '0 40px'
    }),
    
    # Footer
    html.Div([
        html.Div([
            html.P('WEC RACING ANALYSIS DASHBOARD 2026', 
                  style={
                      'fontFamily': 'Orbitron, sans-serif',
                      'fontSize': '12px',
                      'margin': '10px 0',
                      'color': COLORS['text_secondary'],
                      'letterSpacing': '2px'
                  }),
            html.P('Built with Dash & Plotly | Inspired by FIA WEC', 
                  style={
                      'fontFamily': 'Rajdhani, sans-serif',
                      'fontSize': '11px',
                      'margin': '0',
                      'color': COLORS['text_secondary']
                  })
        ], style={'textAlign': 'center'})
    ], style={
        'background': COLORS['secondary'],
        'borderTop': f'2px solid {COLORS["primary"]}',
        'padding': '20px',
        'marginTop': '50px'
    })
    
], style={
    'background': COLORS['background'],
    'minHeight': '100vh',
    'fontFamily': 'Rajdhani, sans-serif',
    'color': COLORS['text']
})

# Callbacks
@callback(
    [Output('season-filter', 'options'),
     Output('season-filter', 'value'),
     Output('class-filter', 'options'),
     Output('class-filter', 'value'),
     Output('race-filter', 'options'),
     Output('race-filter', 'value')],
    [Input('data-store', 'data'),
     Input('reset-button', 'n_clicks')]
)
def update_filters(data, reset_clicks):
    df = pd.DataFrame(data)
    
    seasons = sorted(df['season'].unique())
    classes = sorted(df['class_group'].dropna().unique())
    races = sorted(df['race'].unique())
    
    season_options = [{'label': str(s), 'value': s} for s in seasons]
    class_options = [{'label': c, 'value': c} for c in classes]
    race_options = [{'label': r, 'value': r} for r in races]
    
    return season_options, seasons, class_options, classes, race_options, races

@callback(
    Output('stats-cards', 'children'),
    [Input('data-store', 'data'),
     Input('season-filter', 'value'),
     Input('class-filter', 'value'),
     Input('race-filter', 'value')]
)
def update_stats_cards(data, seasons, classes, races):
    df = pd.DataFrame(data)
    
    if seasons and classes and races:
        df = df[
            (df['season'].isin(seasons)) &
            (df['class_group'].isin(classes)) &
            (df['race'].isin(races))
        ]
    
    total_races = len(df['race'].unique())
    total_teams = len(df['team'].unique())
    total_cars = len(df['car'].unique())
    total_entries = len(df)
    
    card_style = {
        'background': f'linear-gradient(135deg, {COLORS["card"]} 0%, {COLORS["secondary"]} 100%)',
        'padding': '25px',
        'borderRadius': '10px',
        'textAlign': 'center',
        'border': f'1px solid {COLORS["primary"]}',
        'boxShadow': '0 4px 15px rgba(225, 6, 0, 0.2)',
        'flex': '1'
    }
    
    value_style = {
        'fontFamily': 'Orbitron, sans-serif',
        'fontSize': '48px',
        'fontWeight': 'bold',
        'color': COLORS['primary'],
        'margin': '10px 0',
        'textShadow': f'0 0 20px {COLORS["primary"]}'
    }
    
    label_style = {
        'fontFamily': 'Rajdhani, sans-serif',
        'fontSize': '14px',
        'color': COLORS['text_secondary'],
        'textTransform': 'uppercase',
        'letterSpacing': '2px',
        'fontWeight': 'bold'
    }
    
    return html.Div([
        html.Div([
            html.P('TOTAL RACES', style=label_style),
            html.P(str(total_races), style=value_style)
        ], style=card_style),
        html.Div([
            html.P('TOTAL TEAMS', style=label_style),
            html.P(str(total_teams), style=value_style)
        ], style=card_style),
        html.Div([
            html.P('TOTAL CARS', style=label_style),
            html.P(str(total_cars), style=value_style)
        ], style=card_style),
        html.Div([
            html.P('TOTAL ENTRIES', style=label_style),
            html.P(str(total_entries), style=value_style)
        ], style=card_style)
    ], style={
        'display': 'flex',
        'gap': '20px',
        'justifyContent': 'space-between'
    })

@callback(
    Output('tab-content', 'children'),
    [Input('main-tabs', 'value'),
     Input('data-store', 'data'),
     Input('season-filter', 'value'),
     Input('class-filter', 'value'),
     Input('race-filter', 'value')]
)
def render_tab_content(active_tab, data, seasons, classes, races):
    df = pd.DataFrame(data)
    
    if seasons and classes and races:
        df = df[
            (df['season'].isin(seasons)) &
            (df['class_group'].isin(classes)) &
            (df['race'].isin(races))
        ]
    
    if active_tab == 'team-wins':
        return render_team_wins_tab(df)
    elif active_tab == 'car-performance':
        return render_car_performance_tab(df)
    elif active_tab == 'tyres':
        return render_tyres_tab(df)
    elif active_tab == 'lap-times':
        return render_lap_times_tab(df)
    elif active_tab == 'speed':
        return render_speed_tab(df)
    elif active_tab == 'winners':
        return render_winners_tab(df)

def render_team_wins_tab(df):
    winners = df[df['class_position'] == 1]
    
    # Hypercar wins
    hypercar_wins = winners[winners['class_group'] == 'Hypercar']['team'].value_counts().head(10)
    fig_hypercar = go.Figure(data=[
        go.Bar(
            x=hypercar_wins.values,
            y=hypercar_wins.index,
            orientation='h',
            marker=dict(
                color=hypercar_wins.values,
                colorscale='Reds',
                showscale=False
            ),
            text=hypercar_wins.values,
            textposition='auto'
        )
    ])
    fig_hypercar.update_layout(
        title='🏆 TOP 10 HYPERCAR TEAMS BY WINS',
        title_font=dict(family='Orbitron', size=20, color=COLORS['text']),
        plot_bgcolor=COLORS['card'],
        paper_bgcolor=COLORS['card'],
        font=dict(family='Rajdhani', color=COLORS['text']),
        xaxis_title='Wins',
        yaxis_title='Team',
        height=500,
        margin=dict(l=200)
    )
    
    # LMGT3 wins
    lmgt3_wins = winners[winners['class_group'] == 'LMGT3']['team'].value_counts().head(10)
    fig_lmgt3 = go.Figure(data=[
        go.Bar(
            x=lmgt3_wins.values,
            y=lmgt3_wins.index,
            orientation='h',
            marker=dict(
                color=lmgt3_wins.values,
                colorscale='Blues',
                showscale=False
            ),
            text=lmgt3_wins.values,
            textposition='auto'
        )
    ])
    fig_lmgt3.update_layout(
        title='🏆 TOP 10 LMGT3 TEAMS BY WINS',
        title_font=dict(family='Orbitron', size=20, color=COLORS['text']),
        plot_bgcolor=COLORS['card'],
        paper_bgcolor=COLORS['card'],
        font=dict(family='Rajdhani', color=COLORS['text']),
        xaxis_title='Wins',
        yaxis_title='Team',
        height=500,
        margin=dict(l=200)
    )
    
    # Victory distribution
    victory_counts = winners['class_group'].value_counts()
    fig_pie = go.Figure(data=[
        go.Pie(
            labels=victory_counts.index,
            values=victory_counts.values,
            hole=0.4,
            marker=dict(colors=[COLORS['primary'], COLORS['accent'], '#4ECDC4'])
        )
    ])
    fig_pie.update_layout(
        title='VICTORY DISTRIBUTION BY CLASS',
        title_font=dict(family='Orbitron', size=20, color=COLORS['text']),
        plot_bgcolor=COLORS['card'],
        paper_bgcolor=COLORS['card'],
        font=dict(family='Rajdhani', color=COLORS['text'], size=14),
        height=500
    )
    
    return html.Div([
        html.Div([
            dcc.Graph(figure=fig_hypercar, style={'flex': '1'}),
            dcc.Graph(figure=fig_lmgt3, style={'flex': '1'})
        ], style={'display': 'flex', 'gap': '20px', 'marginBottom': '30px'}),
        dcc.Graph(figure=fig_pie)
    ])

def render_car_performance_tab(df):
    winners = df[df['class_position'] == 1]
    
    # Top vehicles
    top_vehicles = winners.groupby(['vehicle', 'class_group']).size().reset_index(name='wins').sort_values('wins', ascending=False).head(15)
    fig = px.bar(
        top_vehicles,
        x='wins',
        y='vehicle',
        color='class_group',
        orientation='h',
        title='🏎️ TOP 15 WINNING VEHICLES',
        labels={'wins': 'Number of Wins', 'vehicle': 'Vehicle'},
        color_discrete_map={
            'Hypercar': COLORS['primary'],
            'LMP2': '#4ECDC4',
            'LMGT3': COLORS['accent']
        }
    )
    fig.update_layout(
        title_font=dict(family='Orbitron', size=24, color=COLORS['text']),
        plot_bgcolor=COLORS['card'],
        paper_bgcolor=COLORS['card'],
        font=dict(family='Rajdhani', color=COLORS['text']),
        height=700,
        margin=dict(l=250)
    )
    
    return html.Div([
        dcc.Graph(figure=fig)
    ])

def render_tyres_tab(df):
    tyres_usage = df['tyres'].value_counts()
    
    fig = go.Figure(data=[
        go.Pie(
            labels=tyres_usage.index,
            values=tyres_usage.values,
            hole=0.3,
            marker=dict(colors=[COLORS['primary'], COLORS['accent'], '#4ECDC4', '#95E1D3'])
        )
    ])
    fig.update_layout(
        title='🛞 TYRES MANUFACTURERS USAGE',
        title_font=dict(family='Orbitron', size=24, color=COLORS['text']),
        plot_bgcolor=COLORS['card'],
        paper_bgcolor=COLORS['card'],
        font=dict(family='Rajdhani', color=COLORS['text'], size=16),
        height=600
    )
    
    return html.Div([
        dcc.Graph(figure=fig)
    ])

def render_lap_times_tab(df):
    lap_time_df = df[df['fl_kph_average'].notna()].copy()
    
    # Average speed by class
    avg_speed = lap_time_df.groupby('class_group')['fl_kph_average'].mean().sort_values(ascending=False)
    fig1 = go.Figure(data=[
        go.Bar(
            x=avg_speed.index,
            y=avg_speed.values,
            marker=dict(
                color=avg_speed.values,
                colorscale='Viridis',
                showscale=False
            ),
            text=[f'{v:.1f} km/h' for v in avg_speed.values],
            textposition='auto'
        )
    ])
    fig1.update_layout(
        title='⏱️ AVERAGE FASTEST LAP SPEED BY CLASS',
        title_font=dict(family='Orbitron', size=20, color=COLORS['text']),
        plot_bgcolor=COLORS['card'],
        paper_bgcolor=COLORS['card'],
        font=dict(family='Rajdhani', color=COLORS['text']),
        xaxis_title='Class',
        yaxis_title='Average Speed (km/h)',
        height=400
    )
    
    # Speed evolution
    speed_by_year = lap_time_df.groupby(['season', 'class_group'])['fl_kph_average'].mean().reset_index()
    fig2 = px.line(
        speed_by_year,
        x='season',
        y='fl_kph_average',
        color='class_group',
        markers=True,
        title='SPEED EVOLUTION OVER SEASONS',
        labels={'fl_kph_average': 'Average Speed (km/h)', 'season': 'Season'},
        color_discrete_map={
            'Hypercar': COLORS['primary'],
            'LMP2': '#4ECDC4',
            'LMGT3': COLORS['accent']
        }
    )
    fig2.update_layout(
        title_font=dict(family='Orbitron', size=20, color=COLORS['text']),
        plot_bgcolor=COLORS['card'],
        paper_bgcolor=COLORS['card'],
        font=dict(family='Rajdhani', color=COLORS['text']),
        height=400
    )
    
    return html.Div([
        dcc.Graph(figure=fig1),
        dcc.Graph(figure=fig2)
    ])

def render_speed_tab(df):
    speed_df = df[df['fl_kph_average'].notna()].copy()
    
    fig = px.box(
        speed_df,
        x='race',
        y='fl_kph_average',
        color='class_group',
        title='📊 SPEED DISTRIBUTION BY RACE TRACK AND CLASS',
        labels={'fl_kph_average': 'Speed (km/h)', 'race': 'Race Track'},
        color_discrete_map={
            'Hypercar': COLORS['primary'],
            'LMP2': '#4ECDC4',
            'LMGT3': COLORS['accent']
        }
    )
    fig.update_layout(
        title_font=dict(family='Orbitron', size=24, color=COLORS['text']),
        plot_bgcolor=COLORS['card'],
        paper_bgcolor=COLORS['card'],
        font=dict(family='Rajdhani', color=COLORS['text']),
        height=600,
        xaxis_tickangle=-45
    )
    
    return html.Div([
        dcc.Graph(figure=fig)
    ])

def render_winners_tab(df):
    winners = df[df['class_position'] == 1]
    
    wins_heatmap = winners.groupby(['race', 'season']).size().reset_index(name='winners_count')
    wins_pivot = wins_heatmap.pivot(index='race', columns='season', values='winners_count').fillna(0)
    
    fig = go.Figure(data=go.Heatmap(
        z=wins_pivot.values,
        x=wins_pivot.columns,
        y=wins_pivot.index,
        colorscale='YlOrRd',
        text=wins_pivot.values,
        texttemplate='%{text}',
        textfont={"size": 12}
    ))
    fig.update_layout(
        title='🏁 WINNERS COUNT HEATMAP BY TRACK AND SEASON',
        title_font=dict(family='Orbitron', size=24, color=COLORS['text']),
        plot_bgcolor=COLORS['card'],
        paper_bgcolor=COLORS['card'],
        font=dict(family='Rajdhani', color=COLORS['text']),
        xaxis_title='Season',
        yaxis_title='Race Track',
        height=700
    )
    
    return html.Div([
        dcc.Graph(figure=fig)
    ])

if __name__ == '__main__':
    app.run_server(debug=True, host='0.0.0.0', port=8050)
