import re

with open("src/views/Modules/settings/UserManagement.vue", "r", encoding="utf-8") as f:
    content = f.read()

pattern2 = re.compile(
    r"<label v-for=\"feat in activeModuleData\.features\" :key=\"feat\.id\".*?class=\"(.*?)\".*?:class=\"(.*?)\">.*?<div.*?class=\"(.*?)\".*?:class=\"(.*?)\">.*?<i v-if=\"hasFeature\(activeModuleData\.id, feat\.id\)\" class=\"fas fa-check text-\[10px\]\"></i>.*?</div>(.*?)<div>.*?<div class=\"flex items-center gap-2\">.*?<i :class=\"\[feat\.icon, \'text-absa-passion text-\[10px\]\'\]\"></i>.*?<span class=\"text-\[11px\] font-black text-gray-900 uppercase tracking-wider\">\{\{ feat\.name \}\}</span>.*?</div>.*?<p class=\"text-\[10px\] font-mono text-gray-500 mt-1\">\{\{ feat\.desc \}\}</p>.*?</div>\s*</label>",
    re.DOTALL
)

def replacer(match):
    return (
        f"<div v-for=\"feat in activeModuleData.features\" :key=\"feat.id\" @click.stop.prevent=\"toggleFeature(activeModuleData.id, feat.id)\" class=\"{match.group(1)} select-none\" :class=\"{match.group(2)}\">\n"
        f"  <div class=\"{match.group(3)}\" :class=\"{match.group(4)}\">\n"
        f"    <i v-if=\"hasFeature(activeModuleData.id, feat.id)\" class=\"fas fa-check text-[10px]\"></i>\n"
        f"  </div>\n"
        f"{match.group(5)}<div>\n"
        f"    <div class=\"flex items-center gap-2\">\n"
        f"      <i :class=\"[feat.icon, 'text-absa-passion text-[10px]']\"></i>\n"
        f"      <span class=\"text-[11px] font-black text-gray-900 uppercase tracking-wider\">{{{{ feat.name }}}}</span>\n"
        f"    </div>\n"
        f"    <p class=\"text-[10px] font-mono text-gray-500 mt-1\">{{{{ feat.desc }}}}</p>\n"
        f"  </div>\n"
        f"</div>"
    )

new_content = pattern2.sub(replacer, content)

with open("src/views/Modules/settings/UserManagement.vue", "w", encoding="utf-8") as f:
    f.write(new_content)

print("Replaced granular features HTML with <div>")
