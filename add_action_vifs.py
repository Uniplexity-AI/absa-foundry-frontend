import re
filepath = 'src/views/Modules/crm/CRMCalendarPage.vue'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add v-if to Complete button in List view
content = content.replace(
  '<button @click.stop="markComplete(evt)" class="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-green-500 hover:border-green-500 transition-colors rounded-sm" title="Mark Complete"><Check :size="12" /></button>',
  '<button v-if="(evt.status || \'scheduled\').toLowerCase() !== \'completed\' && (evt.status || \'scheduled\').toLowerCase() !== \'cancelled\'" @click.stop="markComplete(evt)" class="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-green-500 hover:border-green-500 transition-colors rounded-sm" title="Mark Complete"><Check :size="12" /></button>'
)

# Add v-if to Cancel button in List view
content = content.replace(
  '<button @click.stop="cancelEvent(evt)" class="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-amber-500 hover:border-amber-500 transition-colors rounded-sm" title="Cancel"><X :size="12" /></button>',
  '<button v-if="(evt.status || \'scheduled\').toLowerCase() !== \'completed\' && (evt.status || \'scheduled\').toLowerCase() !== \'cancelled\'" @click.stop="cancelEvent(evt)" class="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-amber-500 hover:border-amber-500 transition-colors rounded-sm" title="Cancel"><X :size="12" /></button>'
)

# Add v-if to Complete button in Card view
content = content.replace(
  '<button @click.stop="markComplete(evt)" class="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-500 hover:text-green-500 transition-colors rounded-sm" title="Mark Complete"><Check :size="10" /></button>',
  '<button v-if="(evt.status || \'scheduled\').toLowerCase() !== \'completed\' && (evt.status || \'scheduled\').toLowerCase() !== \'cancelled\'" @click.stop="markComplete(evt)" class="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-500 hover:text-green-500 transition-colors rounded-sm" title="Mark Complete"><Check :size="10" /></button>'
)

# Add v-if to Cancel button in Card view
content = content.replace(
  '<button @click.stop="cancelEvent(evt)" class="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-500 hover:text-amber-500 transition-colors rounded-sm" title="Cancel"><X :size="10" /></button>',
  '<button v-if="(evt.status || \'scheduled\').toLowerCase() !== \'completed\' && (evt.status || \'scheduled\').toLowerCase() !== \'cancelled\'" @click.stop="cancelEvent(evt)" class="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-500 hover:text-amber-500 transition-colors rounded-sm" title="Cancel"><X :size="10" /></button>'
)


with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("v-ifs added.")
