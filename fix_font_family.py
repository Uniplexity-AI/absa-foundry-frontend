import re

with open('src/assets/main.css', 'r', encoding='utf-8') as f:
    css_content = f.read()

# Replace --font-family-main
css_content = re.sub(r"--font-family-main:\s*'Montserrat',[^;]+;", "--font-family-main: 'Hanken Grotesk', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;", css_content)

with open('src/assets/main.css', 'w', encoding='utf-8') as f:
    f.write(css_content)

print("Updated main.css")
