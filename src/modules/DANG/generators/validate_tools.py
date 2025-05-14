import json

with open("tool_types.json") as f:
    tools = json.load(f)

with open("tool_assembly_formats.json") as f:
    formats = json.load(f)

with open("abbreviations.json") as f:
    abbreviations = json.load(f)

errors = []

for tool in tools:
    if tool["format"] not in formats:
        errors.append(f"Missing format: {tool['format']} for tool {tool['tool_name']}")
    if tool["abbreviation"] not in abbreviations:
        errors.append(f"Missing abbreviation: {tool['abbreviation']} for tool {tool['tool_name']}")

if errors:
    print("Validation Errors:")
    for err in errors:
        print(f"  - {err}")
    exit(1)
else:
    print("✅ All tools validated successfully.")