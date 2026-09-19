import re
content = open('src/components/ingest/EditCustomerModal.vue', 'r', encoding='utf-8').read()

# Add pagination state
content = content.replace(
    'const schema = ref(null)',
    'const currentPage = ref(1)\nconst itemsPerPage = 2\nconst schema = ref(null)'
)

# Add paginatedGroups computed
content = content.replace(
    'const masterGroups = computed(() => {',
    'const paginatedGroups = computed(() => {\n  const start = (currentPage.value - 1) * itemsPerPage\n  return masterGroups.value.slice(start, start + itemsPerPage)\n})\nconst totalPages = computed(() => Math.ceil(masterGroups.value.length / itemsPerPage))\n\nconst masterGroups = computed(() => {'
)

# Use paginatedGroups in template
content = content.replace(
    'v-for=\"group in masterGroups\"',
    'v-for=\"group in paginatedGroups\"'
)

# Update buttons
buttons_html = '''<div class="flex items-center justify-between gap-3 border-t border-gray-200 pt-4">
            <div class="text-[11px] text-gray-500">
              <span v-if="totalPages > 1">Step {{ currentPage }} of {{ totalPages }}</span>
            </div>
            <div class="flex items-center gap-3">
              <button
                v-if="currentPage > 1"
                type="button"
                :disabled="submitting"
                class="px-4 py-2 border border-gray-300 text-gray-700 rounded-sm text-xs font-bold hover:bg-gray-50 disabled:opacity-50"
                @click="currentPage--"
              >Previous</button>
              <button
                type="button"
                v-if="currentPage === 1"
                :disabled="submitting"
                class="px-4 py-2 border border-gray-300 text-gray-700 rounded-sm text-xs font-bold hover:bg-gray-50 disabled:opacity-50"
                @click="emit('close')"
              >Cancel</button>
              <button
                v-if="currentPage < totalPages"
                type="button"
                :disabled="submitting"
                class="px-4 py-2 bg-absa-passion text-white rounded-sm text-xs font-bold hover:bg-absa-power disabled:opacity-50"
                @click="currentPage++"
              >Next</button>
              <button
                v-if="currentPage === totalPages"
                type="submit"
                :disabled="submitting || schemaLoading || !!schemaError"
                class="px-4 py-2 bg-absa-passion text-white rounded-sm text-xs font-bold hover:bg-absa-power disabled:opacity-50 flex items-center gap-2"
              >
                <span class="material-symbols-outlined text-[16px]">{{ submitting ? 'hourglass_top' : 'save' }}</span>
                {{ submitting ? 'Saving...' : 'Save changes' }}
              </button>
            </div>
          </div>'''

content = re.sub(
    r'<div class=\"flex items-center justify-end gap-3\">.*?</form>',
    buttons_html + '\n        </form>',
    content,
    flags=re.DOTALL
)

open('src/components/ingest/EditCustomerModal.vue', 'w', encoding='utf-8').write(content)
