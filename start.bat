@echo off
chcp 65001 >nul
title MyEnglish Trainer (B1 English Booster)
echo ========================================================
echo   Starting MyEnglish Trainer (Pareto 20%% / B1 Fluency)
echo ========================================================
echo.
echo Opening browser at http://localhost:8080 ...
start http://localhost:8080
echo.
echo Local server is running on http://localhost:8080
echo Press Ctrl+C in this terminal window to stop the server.
echo.
python -m http.server 8080
if %errorlevel% neq 0 (
    echo Python not found, trying with npx serve...
    npx serve -l 8080 .
)
pause
