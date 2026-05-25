#!/bin/bash

# Morning Stretch — launch menu bar app

cd "$(dirname "$0")"

if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is not installed."
    exit 1
fi

if [ ! -d "venv" ]; then
    python3 -m venv venv
fi

source venv/bin/activate
pip install -r requirements.txt > /dev/null 2>&1

python3 menubar.py
