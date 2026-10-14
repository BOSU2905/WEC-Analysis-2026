import json

with open(r'C:\Users\user\.gemini\antigravity-ide\brain\3fc69bb9-44cf-4edd-b7de-a800de041efa\.system_generated\logs\transcript_full.jsonl', 'r', encoding='utf-8') as f:
    for line in f:
        d = json.loads(line)
        idx = d.get('step_index', 0)
        if 230 <= idx <= 275:
            print(f"Step {idx}: {d.get('type')}")
            if d.get('tool_calls'):
                print("  Tool calls:", d['tool_calls'])
            if d.get('thinking'):
                print("  Thinking:", d['thinking'][:200])
