#!/usr/bin/env python3
"""
Sync family tree data from localStorage to GitHub.
Usage:
1. In the app, click Export to download the JSON
2. Move the JSON to this folder (e.g., data.json)
3. Run: python sync_data.py data.json
4. The script will update App.js with the new data and push to GitHub
"""

import json
import sys
import re
import subprocess
import os

def sync_data(json_file):
    # Check if file exists
    if not os.path.exists(json_file):
        print(f"❌ File {json_file} not found!")
        print("\nHow to use:")
        print("1. In the app, click '📥 Export' button")
        print("2. The JSON file downloads (usually to Downloads folder)")
        print(f"3. Move it here: {os.getcwd()}")
        print("4. Run: python sync_data.py yourfile.json")
        return
    
    # Read the JSON data
    with open(json_file, 'r') as f:
        data = json.load(f)
    
    print("✓ Data loaded from JSON")
    
    # Read current App.js
    with open('src/App.js', 'r') as f:
        content = f.read()
    
    # Find the initialFamilyData section
    match = re.search(r'const initialFamilyData = \{.*?\n  \};', content, re.DOTALL)
    
    if not match:
        print("❌ Could not find initialFamilyData in App.js")
        return
    
    # Create new data string
    data_str = json.dumps(data, indent=4)
    new_section = f'const initialFamilyData = {data_str};'
    
    # Replace in content
    new_content = content[:match.start()] + new_section + content[match.end():]
    
    # Write back
    with open('src/App.js', 'w') as f:
        f.write(new_content)
    
    print("✓ App.js updated with new data")
    
    # Git operations
    subprocess.run(['git', 'add', 'src/App.js'], check=True)
    subprocess.run(['git', 'commit', '-m', 'Updated family tree data from browser export'], check=True)
    subprocess.run(['git', 'push'], check=True)
    
    print("✓ Pushed to GitHub!")
    print(f"Total wives: {len(data.get('wives', []))}")
    total_children = sum(len(w.get('children', [])) for w in data.get('wives', []))
    print(f"Total children across all wives: {total_children}")

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python sync_data.py <exported_file.json>")
        print("\nSteps:")
        print("1. Open app in browser")
        print("2. Click '📥 Export' button")
        print("3. JSON file downloads")
        print("4. Move JSON to this folder")
        print("5. Run: python sync_data.py filename.json")
    else:
        sync_data(sys.argv[1])
