#!/usr/bin/env python3
"""
Auto-sync: Watches for new JSON exports and syncs automatically.
Run this while using the app. It will automatically detect new exports.
"""

import os
import time
import json
import re
import subprocess
from pathlib import Path

WATCH_FOLDER = os.path.expanduser('~/storage/downloads')
PROJECT_FOLDER = os.path.expanduser('~/projects/arap-bett-family-tree')
LAST_FILE = os.path.join(PROJECT_FOLDER, '.last_sync')

def sync_file(json_file):
    print(f"\n🔄 Syncing {os.path.basename(json_file)}...")
    
    with open(json_file, 'r') as f:
        data = json.load(f)
    
    with open(os.path.join(PROJECT_FOLDER, 'src/App.js'), 'r') as f:
        content = f.read()
    
    match = re.search(r'const initialFamilyData = \{.*?\n  \};', content, re.DOTALL)
    if not match:
        print("❌ Could not find data section")
        return
    
    data_str = json.dumps(data, indent=4)
    new_section = f'const initialFamilyData = {data_str};'
    new_content = content[:match.start()] + new_section + content[match.end():]
    
    with open(os.path.join(PROJECT_FOLDER, 'src/App.js'), 'w') as f:
        f.write(new_content)
    
    os.chdir(PROJECT_FOLDER)
    subprocess.run(['git', 'add', 'src/App.js'], check=True)
    subprocess.run(['git', 'commit', '-m', 'Auto-sync: Updated family tree data'], check=True)
    subprocess.run(['git', 'push'], check=True)
    
    print("✓ Pushed to GitHub!")
    with open(LAST_FILE, 'w') as f:
        f.write(os.path.basename(json_file))

def main():
    print("👀 Watching for new exports...")
    print(f"📁 Watch folder: {WATCH_FOLDER}")
    print("Press Ctrl+C to stop\n")
    
    last_synced = ''
    if os.path.exists(LAST_FILE):
        with open(LAST_FILE) as f:
            last_synced = f.read().strip()
    
    while True:
        try:
            if os.path.exists(WATCH_FOLDER):
                files = list(Path(WATCH_FOLDER).glob('arap_bett_family_tree*.json'))
                for f in files:
                    if f.name != last_synced:
                        sync_file(str(f))
                        last_synced = f.name
            time.sleep(2)
        except KeyboardInterrupt:
            print("\n👋 Stopped watching")
            break
        except Exception as e:
            print(f"❌ Error: {e}")

if __name__ == '__main__':
    main()
