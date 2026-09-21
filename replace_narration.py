import sys

path = r'src/components/intelligence/AiNarrationPanel.vue'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add marked import and parsedNarration computed
import_replacement = "import { computed, onBeforeUnmount, ref } from 'vue'\nimport { marked } from 'marked'\n"
content = content.replace("import { computed, onBeforeUnmount, ref } from 'vue'\n", import_replacement)

# 2. Add computed property right before function generate()
computed_code = '''
const parsedNarration = computed(() => {
  if (!narration.value) return ''
  return marked(narration.value)
})

function generate() {
'''
content = content.replace('function generate() {', computed_code)

# 3. Replace the <p> tag rendering {{ narration }} with <div v-html="parsedNarration"></div>
old_html = '<p class="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{{ narration }}</p>'
new_html = '<div class="text-sm text-gray-700 leading-relaxed markdown-content" v-html="parsedNarration"></div>'
content = content.replace(old_html, new_html)

# 4. Add scoped styles at the end
styles = '''
<style scoped>
.markdown-content :deep(p) {
  margin-bottom: 1em;
}
.markdown-content :deep(p:last-child) {
  margin-bottom: 0;
}
.markdown-content :deep(strong) {
  font-weight: 700;
  color: #111827; /* gray-900 */
}
.markdown-content :deep(ul) {
  list-style-type: disc;
  padding-left: 1.5em;
  margin-bottom: 1em;
}
.markdown-content :deep(ol) {
  list-style-type: decimal;
  padding-left: 1.5em;
  margin-bottom: 1em;
}
.markdown-content :deep(li) {
  margin-bottom: 0.5em;
}
</style>
'''
if '<style scoped>' not in content:
    content += styles

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Replaced successfully.")
