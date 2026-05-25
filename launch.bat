@echo off
REM Morning Stretch App - Launch Script (Windows)
REM This script sets up and launches the morning stretch application

cls
echo ==================================================
echo Morning Stretch App - Setup and Launch
echo ==================================================

REM Check if Python is installed
python --version > nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed.
    echo Please install Python from https://www.python.org/downloads/
    pause
    exit /b 1
)

echo.
for /f "tokens=*" %%i in ('python --version') do set PYTHON_VERSION=%%i
echo OK Python found: %PYTHON_VERSION%

REM Create virtual environment if it doesn't exist
if not exist "venv" (
    echo.
    echo Creating virtual environment...
    python -m venv venv
    echo OK Virtual environment created
)

REM Activate virtual environment
echo.
echo Activating virtual environment...
call venv\Scripts\activate.bat
echo OK Virtual environment activated

REM Install requirements
echo.
echo Installing dependencies...
pip install -r requirements.txt > nul 2>&1
echo OK Dependencies installed

REM Launch the app
echo.
echo ==================================================
echo Starting Morning Stretch App...
echo ==================================================
echo.
python app.py

pause
