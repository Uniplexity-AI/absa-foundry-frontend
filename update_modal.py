import os

path = r'src/components/managers/CatalogUploadModal.vue'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add expires to formData
content = content.replace(
    "    channel: '',\n    description: ''\n  })",
    "    channel: '',\n    expires: '',\n    description: ''\n  })"
)

# Update watch
content = content.replace(
    "    formData.channel = newVal.channel || ''\n    formData.target_segment = newVal.segment || newVal.target_segment || 'MASS_MARKET'\n  } else {\n    formData.title = ''",
    "    formData.channel = newVal.channel || ''\n    formData.expires = newVal.expires || ''\n    formData.target_segment = newVal.segment || newVal.target_segment || 'MASS_MARKET'\n  } else {\n    formData.title = ''"
)
content = content.replace(
    "    formData.channel = ''\n    formData.target_segment = 'MASS_MARKET'\n  }\n}, { immediate: true })",
    "    formData.channel = ''\n    formData.expires = ''\n    formData.target_segment = 'MASS_MARKET'\n  }\n}, { immediate: true })"
)

# Clear form on submit
content = content.replace(
    "        formData.description = ''\n        formData.channel = ''\n        selectedFile.value = null",
    "        formData.description = ''\n        formData.channel = ''\n        formData.expires = ''\n        selectedFile.value = null"
)

# Add template UI (let's add it right after Channel)
ui_block = """          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1">Expiry Date</label>
            <input v-model="formData.expires" type="date" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-absa-passion focus:border-absa-passion outline-none text-sm">
          </div>"""

content = content.replace(
    '            <input v-model="formData.channel" type="text" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-absa-passion focus:border-absa-passion outline-none text-sm" placeholder="e.g., SMS, Email, Branch">\n          </div>\n          <div>\n            <label class="block text-xs font-bold text-gray-700 mb-1">Description</label>',
    f'            <input v-model="formData.channel" type="text" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-absa-passion focus:border-absa-passion outline-none text-sm" placeholder="e.g., SMS, Email, Branch">\n          </div>\n{ui_block}\n          <div>\n            <label class="block text-xs font-bold text-gray-700 mb-1">Description</label>'
)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated CatalogUploadModal.vue')
