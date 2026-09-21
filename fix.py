import re

file_path = 'src/views/Modules/managers/BranchManagerDashboard.vue'
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
skip = False
for i, line in enumerate(lines):
    if line.startswith("import AiCampaignModal from"):
        new_lines.append("import AiCampaignModal from '@/components/intelligence/AiCampaignModal.vue'\n")
        new_lines.append("import CatalogUploadModal from '@/components/managers/CatalogUploadModal.vue'\n")
        continue
    if "import CatalogUploadModal" in line and not line.startswith("import AiCampaignModal"):
        continue
    
    if line.startswith("const customerStore = useCustomerStore()"):
        # We might have duplicates
        if i < 600 and "const customerStore   =" in "".join(lines[i+1:i+30]):
            continue # skip the first one
            
    if line.startswith("const predictionStore = usePredictionStore()"):
        if i < 600 and "const predictionStore =" in "".join(lines[i+1:i+30]):
            continue
            
    if line.startswith("const snapshotStore = useSnapshotStore()"):
        if i < 600 and "const snapshotStore   =" in "".join(lines[i+1:i+30]):
            continue
            
    if line.startswith("const currentMonth = ref(new Date().toLocaleString"):
        if i < 600 and "const currentMonth =" in "".join(lines[i+1:i+50]):
            continue
            
    if line.startswith("const activeTab = ref('overview')"):
        if i < 600 and "const activeTab =" in "".join(lines[i+1:i+50]):
            continue
            
    if line.startswith("const caseFilter = ref('all')"):
        if i < 600 and "const caseFilter =" in "".join(lines[i+1:i+50]):
            continue
            
    if "forecastHorizon = ref(30)" in line and i < 590:
        continue
    if "branchData = ref([])" in line and i < 590:
        continue
    if "forecastData = ref(null)" in line and i < 590:
        continue

    new_lines.append(line)

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
