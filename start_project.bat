@echo off
title SAMAVAY Platform Launcher
echo ===================================================
echo     SAMAVAY - 1-Click Platform Launcher
echo ===================================================
echo.

echo [1/2] Starting Spring Boot Backend (Port 8080)...
start "SAMAVAY Backend" cmd /k "cd /d %~dp0backend && mvn spring-boot:run"

timeout /t 5 /nobreak >nul

echo [2/2] Starting Vite Frontend (Port 5173)...
start "SAMAVAY Frontend" cmd /k "cd /d %~dp0frontend && npm install && npm run dev"

echo.
echo ===================================================
echo   SAMAVAY is launching!
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:8080
echo ===================================================
timeout /t 3 >nul
start http://localhost:5173
