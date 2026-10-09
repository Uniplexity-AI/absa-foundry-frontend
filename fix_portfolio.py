import os

path = 'src/views/PortfolioOverview.vue'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add font-sans to the root div of PortfolioOverview
if '<div class="w-full pt-6 px-6 pb-6">' in content:
    content = content.replace(
        '<div class="w-full pt-6 px-6 pb-6">',
        '<div class="w-full pt-6 px-6 pb-6 font-sans">'
    )
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Added font-sans to PortfolioOverview.vue")
else:
    print("Root div not found.")
