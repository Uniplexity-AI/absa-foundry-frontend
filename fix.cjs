const fs = require('fs')
let content = fs.readFileSync('src/components/ingest/EditCustomerModal.vue', 'utf-8')

content = content.replace(/<div class="flex items-center gap-6 px-6 pt-3 border-b border-gray-200 bg-gray-50">[\s\S]*?<\/div>\s*<!-- Form -->/m, '<!-- Form -->')
content = content.replace(/<!-- --------- Feature snapshot --------- -->[\s\S]*?<\/fieldset>\s*<\/div>/m, '')
content = content.replace(/let addedSnapshot = false[\s\S]*?if \(withSnapshot\.value\) \{[\s\S]*?catch \(e\) \{[\s\S]*?\}[\s\S]*?\}/m, '')
content = content.replace(/let statesUpserted = null[\s\S]*?if \(addedSnapshot[\s\S]*?catch \(e\) \{[\s\S]*?\}[\s\S]*?\}/m, '')
content = content.replace(/addedSnapshot \? 'feature snapshot' : null,/g, '')
content = content.replace(/statesUpserted != null/g, 'false')
content = content.replace(/snapshot: addedSnapshot/g, 'snapshot: false')
content = content.replace(/v-show="tab === MASTER"/g, '')

fs.writeFileSync('src/components/ingest/EditCustomerModal.vue', content, 'utf-8')
