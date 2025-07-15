@echo off
echo.
echo ================================
echo  StudentsPark Platform Setup
echo ================================
echo.

echo Step 1: Testing Backend Connection...
cd backend
echo Current directory: %CD%
echo.

if exist "node_modules" (
    echo ✅ Backend dependencies found
) else (
    echo Installing backend dependencies...
    npm install
)

echo.
echo Starting backend server in background...
    start /B npm run dev
    echo Backend started on http://localhost:5000
    echo.
    
    cd ..
    echo Step 2: Starting Frontend...
    echo Current directory: %CD%
    
    if exist "node_modules" (
        echo ✅ Frontend dependencies found
    ) else (
        echo Installing frontend dependencies...
        npm install
    )
    
    echo.
    echo Starting frontend development server...
    echo Frontend will be available at: http://localhost:5173
    echo.
    echo 🎉 Both servers are starting up!
    echo 📊 Backend API: http://localhost:5000
    echo 🌐 Frontend: http://localhost:5173
    echo 🔍 Health Check: http://localhost:5000/health
    echo.
    npm run dev
