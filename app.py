import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots

# Page config
st.set_page_config(
    page_title="WEC Analysis 2026",
    page_icon="🏎️",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS
st.markdown("""
    <style>
    .main-header {
        font-size: 3rem;
        font-weight: bold;
        color: #FF6B6B;
        text-align: center;
        padding: 1rem 0;
    }
    .sub-header {
        font-size: 1.5rem;
        color: #4ECDC4;
        padding: 0.5rem 0;
    }
    .metric-card {
        background-color: #f0f2f6;
        border-radius: 10px;
        padding: 20px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    </style>
""", unsafe_allow_html=True)

# Load data with caching
@st.cache_data
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
    
    return df

# Main app
def main():
    st.markdown('<div class="main-header">🏁 WEC Racing Analysis Dashboard 2026 🏁</div>', unsafe_allow_html=True)
    
    # Load data
    df = load_data()
    
    # Sidebar filters
    st.sidebar.markdown("## 🎛️ Filters")
    
    # Season filter
    seasons = sorted(df['season'].unique())
    selected_season = st.sidebar.multiselect(
        "Select Season(s)",
        options=seasons,
        default=seasons
    )
    
    # Class filter
    classes = sorted(df['class_group'].dropna().unique())
    selected_classes = st.sidebar.multiselect(
        "Select Class(es)",
        options=classes,
        default=classes
    )
    
    # Race filter
    races = sorted(df['race'].unique())
    selected_races = st.sidebar.multiselect(
        "Select Race(s)",
        options=races,
        default=races
    )
    
    # Filter dataframe
    filtered_df = df[
        (df['season'].isin(selected_season)) &
        (df['class_group'].isin(selected_classes)) &
        (df['race'].isin(selected_races))
    ]
    
    # Key metrics
    st.markdown("## 📊 Key Statistics")
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.metric("Total Races", len(filtered_df['race'].unique()))
    with col2:
        st.metric("Total Teams", len(filtered_df['team'].unique()))
    with col3:
        st.metric("Total Cars", len(filtered_df['car'].unique()))
    with col4:
        st.metric("Total Entries", len(filtered_df))
    
    # Tabs for different analyses
    tab1, tab2, tab3, tab4, tab5, tab6 = st.tabs([
        "🏆 Team Wins", 
        "🏎️ Car Performance", 
        "🛞 Tyres Analysis",
        "⏱️ Lap Times",
        "📈 Speed Analysis",
        "🏁 Race Winners"
    ])
    
    with tab1:
        st.markdown('<div class="sub-header">Team Performance by Class</div>', unsafe_allow_html=True)
        
        # Filter winners
        winners = filtered_df[filtered_df['class_position'] == 1]
        
        col1, col2 = st.columns(2)
        
        with col1:
            # Hypercar team wins
            if 'Hypercar' in selected_classes:
                hypercar_wins = winners[winners['class_group'] == 'Hypercar']['team'].value_counts().head(10)
                if not hypercar_wins.empty:
                    fig = px.bar(
                        x=hypercar_wins.index,
                        y=hypercar_wins.values,
                        labels={'x': 'Team', 'y': 'Wins'},
                        title='🏆 Top 10 Hypercar Teams by Wins',
                        color=hypercar_wins.values,
                        color_continuous_scale='Reds'
                    )
                    fig.update_layout(showlegend=False, height=400)
                    st.plotly_chart(fig, use_container_width=True)
                else:
                    st.info("No Hypercar data available for selected filters")
        
        with col2:
            # LMGT3 team wins
            if 'LMGT3' in selected_classes:
                lmgt3_wins = winners[winners['class_group'] == 'LMGT3']['team'].value_counts().head(10)
                if not lmgt3_wins.empty:
                    fig = px.bar(
                        x=lmgt3_wins.index,
                        y=lmgt3_wins.values,
                        labels={'x': 'Team', 'y': 'Wins'},
                        title='🏆 Top 10 LMGT3 Teams by Wins',
                        color=lmgt3_wins.values,
                        color_continuous_scale='Blues'
                    )
                    fig.update_layout(showlegend=False, height=400)
                    st.plotly_chart(fig, use_container_width=True)
                else:
                    st.info("No LMGT3 data available for selected filters")
        
        # Victory distribution by class
        st.markdown("### Victory Distribution by Class")
        victory_counts = winners['class_group'].value_counts()
        fig = px.pie(
            values=victory_counts.values,
            names=victory_counts.index,
            title='Distribution of Victories by Class Group',
            hole=0.4
        )
        fig.update_traces(textposition='inside', textinfo='percent+label')
        st.plotly_chart(fig, use_container_width=True)
    
    with tab2:
        st.markdown('<div class="sub-header">Car Performance Analysis</div>', unsafe_allow_html=True)
        
        # Dominant cars per season and class
        winners_by_season = winners.groupby(['season', 'class_group', 'vehicle']).size().reset_index(name='wins')
        
        if not winners_by_season.empty:
            # Top performing vehicles
            top_vehicles = winners.groupby(['vehicle', 'class_group']).size().reset_index(name='wins').sort_values('wins', ascending=False).head(15)
            
            fig = px.bar(
                top_vehicles,
                x='wins',
                y='vehicle',
                color='class_group',
                orientation='h',
                title='🏎️ Top 15 Winning Vehicles by Class',
                labels={'wins': 'Number of Wins', 'vehicle': 'Vehicle'},
                color_discrete_map={
                    'Hypercar': '#FF6B6B',
                    'LMP2': '#4ECDC4',
                    'LMGT3': '#FFE66D'
                }
            )
            fig.update_layout(height=600)
            st.plotly_chart(fig, use_container_width=True)
            
            # Dominant car each year
            st.markdown("### Dominant Cars by Season and Class")
            dominant_cars = winners.groupby(['season', 'class_group', 'vehicle']).size().reset_index(name='wins')
            dominant_cars = dominant_cars.sort_values(['season', 'class_group', 'wins'], ascending=[True, True, False])
            
            # Pivot table
            pivot_table = dominant_cars.pivot_table(
                index=['season', 'class_group'],
                values='wins',
                aggfunc='max'
            ).reset_index()
            
            st.dataframe(
                dominant_cars.groupby(['season', 'class_group']).first().reset_index()[['season', 'class_group', 'vehicle', 'wins']],
                use_container_width=True,
                height=400
            )
        else:
            st.info("No data available for selected filters")
    
    with tab3:
        st.markdown('<div class="sub-header">Tyres Manufacturers Analysis</div>', unsafe_allow_html=True)
        
        # Tyres usage
        tyres_usage = filtered_df['tyres'].value_counts()
        
        col1, col2 = st.columns(2)
        
        with col1:
            fig = px.pie(
                values=tyres_usage.values,
                names=tyres_usage.index,
                title='🛞 Tyres Manufacturers Usage',
                hole=0.3
            )
            st.plotly_chart(fig, use_container_width=True)
        
        with col2:
            # Tyres by class
            tyres_by_class = filtered_df.groupby(['class_group', 'tyres']).size().reset_index(name='count')
            fig = px.bar(
                tyres_by_class,
                x='class_group',
                y='count',
                color='tyres',
                title='Tyres Usage by Class',
                barmode='group'
            )
            st.plotly_chart(fig, use_container_width=True)
    
    with tab4:
        st.markdown('<div class="sub-header">Lap Time Analysis</div>', unsafe_allow_html=True)
        
        # Filter data with valid lap times
        lap_time_df = filtered_df[filtered_df['fl_kph_average'].notna()].copy()
        
        if not lap_time_df.empty:
            # Best lap times by class and season
            col1, col2 = st.columns(2)
            
            with col1:
                # Average speed by class
                avg_speed = lap_time_df.groupby('class_group')['fl_kph_average'].mean().sort_values(ascending=False)
                fig = px.bar(
                    x=avg_speed.index,
                    y=avg_speed.values,
                    labels={'x': 'Class', 'y': 'Average Speed (km/h)'},
                    title='⏱️ Average Fastest Lap Speed by Class',
                    color=avg_speed.values,
                    color_continuous_scale='Viridis'
                )
                fig.update_layout(showlegend=False)
                st.plotly_chart(fig, use_container_width=True)
            
            with col2:
                # Best lap by class per season
                best_laps = lap_time_df.loc[lap_time_df.groupby(['season', 'class_group'])['fl_kph_average'].idxmax()]
                fig = px.scatter(
                    best_laps,
                    x='season',
                    y='fl_kph_average',
                    color='class_group',
                    size='fl_kph_average',
                    hover_data=['car', 'race', 'fl_time'],
                    title='🚀 Best Lap Speed per Season and Class'
                )
                st.plotly_chart(fig, use_container_width=True)
            
            # Speed evolution over years
            st.markdown("### Speed Evolution Over Years")
            speed_by_year = lap_time_df.groupby(['season', 'class_group'])['fl_kph_average'].mean().reset_index()
            fig = px.line(
                speed_by_year,
                x='season',
                y='fl_kph_average',
                color='class_group',
                markers=True,
                title='Average Speed Trend by Class Over Seasons',
                labels={'fl_kph_average': 'Average Speed (km/h)', 'season': 'Season'}
            )
            st.plotly_chart(fig, use_container_width=True)
        else:
            st.info("No lap time data available for selected filters")
    
    with tab5:
        st.markdown('<div class="sub-header">Speed Analysis by Race and Year</div>', unsafe_allow_html=True)
        
        speed_df = filtered_df[filtered_df['fl_kph_average'].notna()].copy()
        
        if not speed_df.empty:
            # Speed comparison across races
            speed_by_race = speed_df.groupby(['race', 'class_group'])['fl_kph_average'].mean().reset_index()
            
            fig = px.box(
                speed_df,
                x='race',
                y='fl_kph_average',
                color='class_group',
                title='📊 Speed Distribution by Race Track and Class',
                labels={'fl_kph_average': 'Speed (km/h)', 'race': 'Race Track'}
            )
            fig.update_layout(height=500)
            st.plotly_chart(fig, use_container_width=True)
            
            # Fastest cars per track and year
            st.markdown("### Fastest Cars per Track and Season")
            fastest_cars = speed_df.loc[speed_df.groupby(['race', 'season', 'class_group'])['fl_kph_average'].idxmax()]
            
            fastest_display = fastest_cars[['race', 'season', 'class_group', 'car', 'fl_kph_average', 'fl_time']].sort_values(
                ['season', 'race', 'fl_kph_average'], 
                ascending=[False, True, False]
            )
            
            st.dataframe(fastest_display, use_container_width=True, height=400)
        else:
            st.info("No speed data available for selected filters")
    
    with tab6:
        st.markdown('<div class="sub-header">Race Winners and Lap Times</div>', unsafe_allow_html=True)
        
        # Winners per track
        race_winners = winners[['race', 'season', 'class_group', 'car', 'team', 'fl_time', 'fl_kph_average']].copy()
        
        if not race_winners.empty:
            # Interactive table
            st.markdown("### 🏆 Race Winners by Track and Season")
            
            # Group by race and season
            for race in race_winners['race'].unique():
                with st.expander(f"🏁 {race}"):
                    race_data = race_winners[race_winners['race'] == race].sort_values(['season', 'class_group'], ascending=[False, True])
                    st.dataframe(race_data, use_container_width=True)
            
            # Heatmap of wins per track
            wins_heatmap = winners.groupby(['race', 'season']).size().reset_index(name='winners_count')
            wins_pivot = wins_heatmap.pivot(index='race', columns='season', values='winners_count').fillna(0)
            
            fig = px.imshow(
                wins_pivot,
                labels=dict(x="Season", y="Race Track", color="Number of Winners"),
                title="Winners Count Heatmap by Track and Season",
                color_continuous_scale='YlOrRd',
                aspect="auto"
            )
            st.plotly_chart(fig, use_container_width=True)
        else:
            st.info("No winner data available for selected filters")
    
    # Footer
    st.markdown("---")
    st.markdown("""
        <div style='text-align: center; color: gray; padding: 20px;'>
            <p>🏎️ WEC Analysis Dashboard 2026 | Built with Streamlit & Plotly</p>
            <p>Data Source: WEC Racing Historical Data</p>
        </div>
    """, unsafe_allow_html=True)

if __name__ == "__main__":
    main()
