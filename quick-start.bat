@echo off
title StudentsPark Application
echo.
echo ================================
echo  StudentsPark - Quick Start
echo ================================
echo.

REM Kill existing Node processes
taskkill /f /im node.exe >nul 2>&1

echo Starting backend server...
cd backend
start "Backend Server" cmd /k "npm run dev"
cd ..

echo.
echo Waiting 5 seconds for backend to initialize...
timeout /t 5 /nobreak >nul

echo.
echo Starting frontend development server...
echo Frontend will open in your default browser
echo.
npm run dev

pause
