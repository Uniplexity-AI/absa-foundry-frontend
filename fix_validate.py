import re
content = open('src/components/ingest/EditCustomerModal.vue', 'r', encoding='utf-8').read()

correct_fn = '''// Validation
function validateField(field, values) {
  const raw = String(values[field.name] ?? '').trim()
  if (!raw) return field.required ? field.label + ' is required' : ''
  if (field.max_length && raw.length > field.max_length) return 'Max ' + field.max_length + ' characters'
  if (field.type === 'enum' && field.allowed_values?.length && !field.allowed_values.includes(raw)) {
    return 'Must be one of: ' + field.allowed_values.join(', ')
  }
  if (field.regex) {
    try {
      if (!new RegExp(field.regex).test(raw)) return field.format || 'Invalid format'
    } catch {
    }
  }
  if (field.type === 'date' && !/^\d{4}-\d{2}-\d{2}$/.test(raw)) return 'Use YYYY-MM-DD'
  return ''
}'''

content = re.sub(r'// Validation.*?return \'\'\n\}', correct_fn, content, flags=re.DOTALL)
open('src/components/ingest/EditCustomerModal.vue', 'w', encoding='utf-8').write(content)
