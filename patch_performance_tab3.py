repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\views\CustomerProfile.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

target = """                >
                  Next of Kin
                </button>
              <div class="ml-auto"""

replacement = """                >
                  Next of Kin
                </button>
                <button
                  class="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-none transition-all"
                  :class="activeTab === 'performance' ? 'text-absa-passion border-b-2 border-absa-passion' : 'text-gray-500 hover:text-gray-700'"
                  @click="activeTab = 'performance'"
                >
                  Performance
                </button>
              <div class="ml-auto"""

content = content.replace(target, replacement)

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done string replace")
