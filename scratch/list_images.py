import re
with open(r'C:\Users\user\.gemini\antigravity-ide\brain\22eccfdd-880f-4558-98a1-74af767148dc\.system_generated\steps\1140\content.md', encoding='utf-8') as f:
    html = f.read()
matches = re.findall(r'<img[^>]+src=[\"\']([^\"\']+)[\"\']', html)
for m in matches:
    print(m)
