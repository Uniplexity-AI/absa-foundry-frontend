const fs = require('fs')
const file = 'src/components/managers/CatalogUploadModal.vue'
let content = fs.readFileSync(file, 'utf8')

// Add editItem to props
content = content.replace(
  /type: \{\s*type: String,\s*default: 'campaign' \/\/ 'campaign' or 'product'\s*\}/,
  	ype: {\n      type: String,\n      default: 'campaign'\n    },\n    editItem: {\n      type: Object,\n      default: null\n    }
)

// Add watch to populate formData and set uploadMode
content = content.replace(
  "const uploadMode = ref('form')",
  "const uploadMode = ref('form')\n  import { watch } from 'vue'\n  watch(() => props.editItem, (newVal) => {\n    if (newVal) {\n      uploadMode.value = 'form'\n      formData.title = newVal.title || ''\n      formData.description = newVal.description || ''\n      formData.channel = newVal.channel || ''\n      formData.target_segment = newVal.target_segment || 'MASS_MARKET'\n    } else {\n      formData.title = ''\n      formData.description = ''\n      formData.channel = ''\n      formData.target_segment = 'MASS_MARKET'\n    }\n  }, { immediate: true })"
)

// Change button text in template
content = content.replace(
  /Upload \& Process/,
  {{ props.editItem ? 'Save Changes' : 'Upload & Process' }}
)

// Update submit logic to PUT if editItem is present
content = content.replace(
  "await api.post(endpoint, formData)",
  "if (props.editItem) {\n        await api.put(\/\, formData)\n      } else {\n        await api.post(endpoint, formData)\n      }"
)

fs.writeFileSync(file, content)
