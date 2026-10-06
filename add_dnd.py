import re
filepath = 'src/views/Modules/crm/CRMCalendarPage.vue'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add Drag handlers
script_additions = """
const onDragStart = (e, evt) => {
  e.dataTransfer.setData('text/plain', evt.id)
}
const onDrop = (e, status) => {
  const evtId = e.dataTransfer.getData('text/plain')
  const evt = events.value.find(ev => ev.id.toString() === evtId.toString())
  if (evt) {
    evt.status = status
    saveEvents()
  }
}

const fetchEvents = () => {
"""

content = content.replace("const fetchEvents = () => {", script_additions)

# Bind handlers to HTML
# Columns
content = content.replace(
  '<div v-for="col in kanbanColumns" :key="col.id" class="flex-1 min-w-[280px] bg-gray-50/50 rounded-sm border border-gray-200 flex flex-col max-h-[70vh]">',
  '<div v-for="col in kanbanColumns" :key="col.id" @drop="onDrop($event, col.id)" @dragenter.prevent @dragover.prevent class="flex-1 min-w-[280px] bg-gray-50/50 rounded-sm border border-gray-200 flex flex-col max-h-[70vh]">'
)

# Cards
content = content.replace(
  '<div v-for="evt in col.items" :key="evt.id" class="bg-white border border-gray-200 rounded-sm p-3 hover:shadow-sm cursor-grab active:cursor-grabbing border-l-2"',
  '<div v-for="evt in col.items" :key="evt.id" draggable="true" @dragstart="onDragStart($event, evt)" class="bg-white border border-gray-200 rounded-sm p-3 hover:shadow-sm cursor-grab active:cursor-grabbing border-l-2"'
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Drag and drop added.")
