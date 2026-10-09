#!/bin/bash

echo "🏁 Starting WEC Analysis Dashboard..."
echo ""
echo "📦 Checking dependencies..."

# Check if streamlit is installed
if ! command -v streamlit &> /dev/null; then
    echo "⚠️  Streamlit not found. Installing dependencies..."
    pip install -r requirements.txt
else
    echo "✅ Dependencies OK"
fi

echo ""
echo "🚀 Launching dashboard..."
echo "📍 Dashboard will open at: http://localhost:8501"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

streamlit run app.py
