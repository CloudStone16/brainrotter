#!/bin/bash
set -e

FLAG_FILE=".brainrotter_setup_done"

if [ -f "$FLAG_FILE" ]; then
  echo "Setup already completed. Running application."
  exec ./run.sh
fi

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is required."
  exit 1
fi

if ! command -v python3 >/dev/null 2>&1; then
  echo "Python 3 is required."
  exit 1
fi

python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

for dir in brainrot-backend backend brainrotter_frontend; do
  cd "$dir"
  npm install
  cd ..
done

touch "$FLAG_FILE"
echo "Setup complete. Starting application."
exec ./run.sh
