import re

# 1. Update main.css
with open('src/assets/main.css', 'r', encoding='utf-8') as f:
    css_content = f.read()

font_faces = '''
/* ---- GLOBAL ABSA NUMERICS INTERCEPTION ---- */
/* Forces all numbers to use Montserrat, regardless of base font */
@font-face { font-family: 'AbsaNumerics'; font-weight: 400; src: url('@fontsource/montserrat/files/montserrat-latin-400-normal.woff2') format('woff2'); unicode-range: U+0030-0039, U+002C, U+002E, U+002B, U+002D, U+0025; }
@font-face { font-family: 'AbsaNumerics'; font-weight: 500; src: url('@fontsource/montserrat/files/montserrat-latin-500-normal.woff2') format('woff2'); unicode-range: U+0030-0039, U+002C, U+002E, U+002B, U+002D, U+0025; }
@font-face { font-family: 'AbsaNumerics'; font-weight: 600; src: url('@fontsource/montserrat/files/montserrat-latin-600-normal.woff2') format('woff2'); unicode-range: U+0030-0039, U+002C, U+002E, U+002B, U+002D, U+0025; }
@font-face { font-family: 'AbsaNumerics'; font-weight: 700; src: url('@fontsource/montserrat/files/montserrat-latin-700-normal.woff2') format('woff2'); unicode-range: U+0030-0039, U+002C, U+002E, U+002B, U+002D, U+0025; }
@font-face { font-family: 'AbsaNumerics'; font-weight: 800; src: url('@fontsource/montserrat/files/montserrat-latin-800-normal.woff2') format('woff2'); unicode-range: U+0030-0039, U+002C, U+002E, U+002B, U+002D, U+0025; }
@font-face { font-family: 'AbsaNumerics'; font-weight: 900; src: url('@fontsource/montserrat/files/montserrat-latin-900-normal.woff2') format('woff2'); unicode-range: U+0030-0039, U+002C, U+002E, U+002B, U+002D, U+0025; }
'''

if 'AbsaNumerics' not in css_content:
    css_content = css_content.replace(':root {', font_faces + '\n:root {')
    with open('src/assets/main.css', 'w', encoding='utf-8') as f:
        f.write(css_content)

# 2. Update tailwind.config.js
with open('tailwind.config.js', 'r', encoding='utf-8') as f:
    tw_content = f.read()

# Replace sans: ['"Hanken Grotesk"', ...] with sans: ['"AbsaNumerics"', '"Hanken Grotesk"', ...]
if '"AbsaNumerics"' not in tw_content:
    tw_content = tw_content.replace('sans: [\'"Hanken Grotesk"\',', 'sans: [\'"AbsaNumerics"\', \'"Hanken Grotesk"\',')
    with open('tailwind.config.js', 'w', encoding='utf-8') as f:
        f.write(tw_content)

print("Done.")
