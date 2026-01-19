#!/bin/bash

echo "🛑 Stopping Brainrotter services..."

# Kill the start script itself (if running)
pkill -f "./start.sh"

# Kill all related dev processes
pkill -f "npm run dev"
pkill -f "flask run"

echo "✅ All services stopped."
