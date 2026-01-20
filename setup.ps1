$FLAG_FILE = ".brainrotter_setup_done"

if (Test-Path $FLAG_FILE) {
    Write-Host "Setup already completed. Running application."
    powershell -NoExit -Command ".\run.ps1"
    exit
}

if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Host "Python 3 is required."
    exit
}

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js is required."
    exit
}

python -m venv venv
.\venv\Scripts\Activate.ps1
pip install --upgrade pip
pip install -r requirements.txt

$dirs = "brainrot-backend","backend","brainrotter_frontend"

foreach ($dir in $dirs) {
    cd $dir
    npm install
    cd ..
}

New-Item -ItemType File -Name $FLAG_FILE -Force | Out-Null
Write-Host "Setup complete. Running application."
powershell -NoExit -Command ".\run.ps1"
