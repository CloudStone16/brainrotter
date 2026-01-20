#!/bin/bash
set -e

source venv/bin/activate

(cd brainrotter_frontend && npm run dev) &
(cd brainrot-backend && npm run dev) &
(cd backend && npm run dev) &
(cd brainrotter_backend && flask run) &

wait
