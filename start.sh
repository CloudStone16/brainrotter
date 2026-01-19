#!/bin/bash

echo "🚀 Starting Brainrotter stack..."

# run in a separate process group so we can kill everything cleanly later
set -m

cd brainrotter_frontend && npm run dev &
cd backend && npm run dev &
cd brainrot-backend && npm run dev &
cd brainrotter_backend && export FLASK_APP=app.py && flask run &

# keep this shell alive
wait
