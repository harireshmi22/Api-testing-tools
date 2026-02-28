@echo off
REM 🚀 API Testing Tools Deployment Script for Windows
REM This script helps deploy frontend to Netlify and backend to Railway

echo.
echo ========================================
echo   🚀 API Testing Tools Deployment
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

echo [INFO] Dependencies check passed ✓
echo.

REM Main menu
:menu
echo Choose what to build and deploy:
echo 1. Frontend only
echo 2. Backend only  
echo 3. Both frontend and backend
echo 4. Setup MongoDB Atlas guide
echo 5. Exit
echo.

set /p choice=Enter your choice (1-5): 

if "%choice%"=="1" goto build_frontend
if "%choice%"=="2" goto build_backend
if "%choice%"=="3" goto build_both
if "%choice%"=="4" goto mongodb_guide
if "%choice%"=="5" goto end

echo [ERROR] Invalid choice
goto menu

:build_frontend
echo [STEP] Building frontend for production...
cd frontend

echo Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Frontend dependency installation failed
    pause
    exit /b 1
)

echo Building for static export...
call npm run build:export
if %errorlevel% neq 0 (
    echo [ERROR] Frontend build failed
    pause
    exit /b 1
)

echo [INFO] Frontend build successful ✓
echo [INFO] Static files are ready in 'out' directory
cd ..

echo.
echo Frontend Deployment Options:
echo 1. Drag & Drop to Netlify (Easiest)
echo 2. Git Integration (Recommended)
echo.

set /p deploy_choice=Choose deployment method (1 or 2): 

if "%deploy_choice%"=="1" (
    echo [INFO] Open https://app.netlify.com/drop
    echo [INFO] Upload the 'frontend\out' folder
    echo [WARNING] Make sure to update netlify.toml with your backend URL
)

if "%deploy_choice%"=="2" (
    echo [INFO] Push your code to GitHub first
    echo [INFO] Then connect your repository to Netlify
    echo [INFO] Configure build settings:
    echo   Build command: npm run build:export
    echo   Publish directory: out
)

goto end

:build_backend
echo [STEP] Building backend for production...
cd backend

echo Installing dependencies...
call npm install --production
if %errorlevel% neq 0 (
    echo [ERROR] Backend dependency installation failed
    pause
    exit /b 1
)

echo [INFO] Backend build successful ✓
cd ..

echo.
echo Backend Deployment Options:
echo 1. Railway (Recommended)
echo 2. Render (Alternative)
echo.

set /p backend_choice=Choose deployment platform (1 or 2): 

if "%backend_choice%"=="1" (
    echo [INFO] Open https://railway.app/new
    echo [INFO] Choose 'Deploy from GitHub repo'
    echo [INFO] Select your repository
    echo [WARNING] Configure these environment variables:
    echo   NODE_ENV=production
    echo   PORT=5000
    echo   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/api-testing-tools
    echo   JWT_SECRET=your-super-secret-jwt-key
    echo   CORS_ORIGIN=https://your-frontend-url.netlify.app
)

if "%backend_choice%"=="2" (
    echo [INFO] Open https://render.com
    echo [INFO] Click 'New' → 'Web Service'
    echo [INFO] Connect your GitHub repository
    echo [WARNING] Configure these settings:
    echo   Name: api-testing-backend
    echo   Environment: Node
    echo   Build Command: npm install
    echo   Start Command: npm start
    echo   Instance Type: Free
)

goto end

:build_both
call :build_frontend
call :build_backend
call :deploy_backend
goto end

:mongodb_guide
echo [STEP] MongoDB Atlas Setup
echo [INFO] 1. Go to https://cloud.mongodb.com
echo [INFO] 2. Create a free cluster (M0 Sandbox)
echo [INFO] 3. Create a database user
echo [INFO] 4. Get connection string
echo [INFO] 5. Replace in your backend environment variables
echo [WARNING] Connection string format:
echo   mongodb+srv://username:password@cluster.mongodb.net/api-testing-tools
goto end

:end
echo.
echo [INFO] 🎉 Deployment preparation complete!
echo [INFO] Follow the platform-specific instructions above to complete deployment
echo [INFO] Don't forget to:
echo   ✅ Update frontend API URL with backend URL
echo   ✅ Configure CORS origins  
echo   ✅ Test the live application
echo.
pause
