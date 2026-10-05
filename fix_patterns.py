repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\components\crm\PromiseToFundModal.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

import re

# 1. Fix CSS definitions
css_old = """<style scoped>
.mesh-background {
  background-color: transparent;
  background-image: 
      linear-gradient(rgba(220, 0, 55, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(220, 0, 55, 0.05) 1px, transparent 1px);
  background-size: 32px 32px;
}
.dotted-pattern {
  background-image: radial-gradient(circle, #000 1px, transparent 1px);
  background-size: 16px 16px;
  opacity: 0.03;
}"""

css_new = """<style scoped>
.mesh-background {
  background-color: #ffffff;
  background-image: 
      linear-gradient(rgba(220, 0, 55, 0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(220, 0, 55, 0.08) 1px, transparent 1px);
  background-size: 40px 40px;
}
.dotted-pattern {
  background-image: radial-gradient(circle, #000 1px, transparent 1px);
  background-size: 16px 16px;
}"""
content = content.replace(css_old, css_new)

# 2. Fix Mesh Background in template
mesh_old = """<div class="absolute inset-0 mesh-background opacity-40 pointer-events-none"></div>"""
mesh_new = """<div class="absolute inset-0 mesh-background pointer-events-none"></div>"""
content = content.replace(mesh_old, mesh_new)

# 3. Fix Dotted Pattern opacities
# KPIs
content = content.replace("opacity-[0.03] group-hover:opacity-[0.08]", "opacity-5 group-hover:opacity-10")
# Promise Details Column (it used opacity-[0.05] with no hover)
content = content.replace("opacity-[0.05] pointer-events-none", "opacity-5 pointer-events-none")

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done fixing patterns")
