@echo off
echo 🛑 Stopping Brainrotter services...

taskkill /IM node.exe /F >nul 2>&1
taskkill /IM python.exe /F >nul 2>&1
taskkill /IM flask.exe /F >nul 2>&1

echo ✅ All services stopped.
pause
