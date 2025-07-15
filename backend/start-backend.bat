@echo off
echo.
echo ====================================
echo StudentsPark Backend API Server
echo ====================================
echo.

cd /d "%~dp0"

echo Checking dependencies...
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    echo.
)

echo Starting backend server...
echo Server will be available at: http://localhost:5000
echo.
node server.js
