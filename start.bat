@echo off
echo 🚀 Starting Brainrotter stack...

REM --- FRONTEND ---
echo Starting frontend...
start cmd /k "cd brainrotter_frontend && npm run dev"

REM --- NODE BACKEND ---
echo Starting brainrot-backend...
start cmd /k "cd brainrot-backend && npm run dev"

REM --- FLASK BACKEND ---
echo Starting Flask backend...
start cmd /k "cd brainrotter_backend && set FLASK_APP=app.py && flask run"

echo.
echo ✅ All services started in separate windows.
echo Close all windows OR run stop.bat to kill everything.
pause
