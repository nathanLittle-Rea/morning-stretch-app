#!/usr/bin/env python3
"""
Morning Stretch App - Desktop Backend
A Flask server that manages stretching routines, progress tracking, and stats.
"""

from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import json
import os
from datetime import datetime, timedelta
import webbrowser
import threading
import time

app = Flask(__name__, static_folder='static', static_url_path='')
CORS(app)

DATA_FILE = 'stretch_data.json'

def load_data():
    """Load user data from JSON file."""
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, 'r') as f:
                return json.load(f)
        except:
            return get_default_data()
    return get_default_data()

def get_default_data():
    """Return default data structure."""
    return {
        'sessions': [],
        'total_sessions': 0,
        'streak': 0,
        'last_session_date': None,
        'preferences': {
            'sound_enabled': True,
            'notifications_enabled': True
        }
    }

def save_data(data):
    """Save user data to JSON file."""
    tmp = DATA_FILE + '.tmp'
    with open(tmp, 'w') as f:
        json.dump(data, f, indent=2)
    os.replace(tmp, DATA_FILE)

def update_streak(data):
    """Update streak based on last session date."""
    if not data['last_session_date']:
        return 1
    
    last_date = datetime.fromisoformat(data['last_session_date']).date()
    today = datetime.now().date()
    yesterday = today - timedelta(days=1)
    
    if last_date == today:
        return data['streak']
    elif last_date == yesterday:
        return data['streak'] + 1
    else:
        return 1

@app.route('/')
def index():
    """Serve the main HTML file."""
    return send_from_directory('static', 'index.html')

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get user statistics."""
    data = load_data()
    today = datetime.now().date()
    sessions = data['sessions']
    return jsonify({
        'total_sessions': data['total_sessions'],
        'streak': data['streak'],
        'last_session': data['last_session_date'],
        'sessions_today': len([s for s in sessions if datetime.fromisoformat(s['date']).date() == today]),
        'sessions_this_week': len([s for s in sessions if (today - datetime.fromisoformat(s['date']).date()).days < 7]),
        'sessions_this_month': len([s for s in sessions if (today - datetime.fromisoformat(s['date']).date()).days < 30]),
    })

@app.route('/api/session/start', methods=['POST'])
def start_session():
    return jsonify({'session_id': datetime.now().timestamp(), 'status': 'started'})

@app.route('/api/session/complete', methods=['POST'])
def complete_session():
    """Mark a session as complete."""
    data = load_data()
    
    today = datetime.now().date()
    data['total_sessions'] += 1
    data['streak'] = update_streak(data)
    data['last_session_date'] = today.isoformat()
    
    session_record = {
        'date': datetime.now().isoformat(),
        'duration': request.json.get('duration', 600),
        'exercises_completed': request.json.get('exercises', 8)
    }
    data['sessions'].append(session_record)
    
    save_data(data)
    
    return jsonify({
        'status': 'completed',
        'streak': data['streak'],
        'total_sessions': data['total_sessions']
    })

@app.route('/api/session/record', methods=['POST'])
def record_exercise():
    """Record a completed exercise."""
    payload = request.json
    return jsonify({'status': 'recorded', 'exercise': payload.get('exercise')})

@app.route('/api/preferences', methods=['GET'])
def get_preferences():
    """Get user preferences."""
    data = load_data()
    return jsonify(data['preferences'])

@app.route('/api/preferences', methods=['POST'])
def update_preferences():
    """Update user preferences."""
    data = load_data()
    data['preferences'].update(request.json)
    save_data(data)
    return jsonify({'status': 'updated', 'preferences': data['preferences']})

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({'status': 'ok', 'version': '1.0.0'})

def open_browser():
    """Open the browser after a short delay."""
    time.sleep(2)
    webbrowser.open('http://localhost:5001')

if __name__ == '__main__':
    print("=" * 60)
    print("Morning Stretch App - Starting...")
    print("=" * 60)
    print("\n✓ Server running at http://localhost:5001")
    print("✓ Opening browser window...\n")

    browser_thread = threading.Thread(target=open_browser, daemon=True)
    browser_thread.start()

    app.run(debug=False, host='0.0.0.0', port=5001, use_reloader=False)
