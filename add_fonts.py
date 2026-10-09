import re

with open('src/main.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Add 800 and 900 for hanken-grotesk
if 'hanken-grotesk/800.css' not in content:
    content = content.replace(
        "import '@fontsource/hanken-grotesk/700.css';",
        "import '@fontsource/hanken-grotesk/700.css';\nimport '@fontsource/hanken-grotesk/800.css';\nimport '@fontsource/hanken-grotesk/900.css';"
    )

with open('src/main.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Added Hanken Grotesk 800 and 900")
