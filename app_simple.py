"""
WEC Racing Analysis Dashboard - Simplified Version for Testing
"""
import streamlit as st
import pandas as pd
import plotly.express as px

st.set_page_config(page_title="WEC Analysis 2026", page_icon="🏎️", layout="wide")

# Title
st.title("🏁 WEC Racing Analysis Dashboard 2026")

# Load data
@st.cache_data
def load_data():
    try:
        df = pd.read_csv('Data/raw/wec_data.csv')
        st.success(f"✅ Data loaded: {len(df)} rows")
        return df
    except Exception as e:
        st.error(f"❌ Error loading data: {str(e)}")
        st.info("📁 Looking for: Data/raw/wec_data.csv")
        st.stop()

df = load_data()

# Show basic info
st.write(f"**Total Rows:** {len(df)}")
st.write(f"**Columns:** {', '.join(df.columns[:5])}...")

# Simple chart
if st.button("Show Sample Chart"):
    fig = px.bar(df['class'].value_counts().head(10), 
                 title="Top 10 Classes")
    st.plotly_chart(fig)

# Show data
if st.checkbox("Show Raw Data"):
    st.dataframe(df.head(20))

st.success("✅ App is running successfully!")
