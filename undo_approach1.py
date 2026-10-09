import re

# 1. Restore main.css
with open('src/assets/main.css', 'r', encoding='utf-8') as f:
    css_content = f.read()

# Remove the AbsaNumerics block
css_content = re.sub(r'/\* ---- GLOBAL ABSA NUMERICS INTERCEPTION ---- \*/.*?(?=:root \{)', '', css_content, flags=re.DOTALL)

with open('src/assets/main.css', 'w', encoding='utf-8') as f:
    f.write(css_content)

# 2. Restore tailwind.config.js
with open('tailwind.config.js', 'r', encoding='utf-8') as f:
    tw_content = f.read()

tw_content = tw_content.replace('sans: [\'"AbsaNumerics"\', \'"Hanken Grotesk"\',', 'sans: [\'"Hanken Grotesk"\',')

with open('tailwind.config.js', 'w', encoding='utf-8') as f:
    f.write(tw_content)

print("Restored.")
