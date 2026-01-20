Start-Process "powershell" -ArgumentList "-NoExit","-Command","cd brainrotter_frontend; npm run dev"
Start-Process "powershell" -ArgumentList "-NoExit","-Command","cd brainrot-backend; npm run dev"
Start-Process "powershell" -ArgumentList "-NoExit","-Command","cd backend; npm run dev"
Start-Process "powershell" -ArgumentList "-NoExit","-Command","cd brainrotter_backend; flask run"
