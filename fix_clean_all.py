import re
content = open('src/components/ingest/EditCustomerModal.vue', 'r', encoding='utf-8').read()

# Remove snapshot declarations from computed and imports
content = re.sub(r"import \{ useSnapshotStore \} from '@/stores/snapshotStore'\n", '', content)
content = re.sub(r"const snapshotStore = useSnapshotStore\(\)\n", '', content)
content = re.sub(r"const SNAPSHOT = 'customer_features'\n", '', content)
content = re.sub(r"const snapshotDataset = computed\(.*?\n", '', content)
content = re.sub(r"const snapshotFields = computed\(.*?\n", '', content)
content = re.sub(r"const snapshotInputFields = computed\(.*?\n", '', content)
content = re.sub(r"const visibleSnapshotFields = computed\(\(\) => \{[\s\S]*?\}\)\n", '', content)

content = re.sub(r"const filledSnapshotCount = computed\(\n.*?\}\)\n", '', content, flags=re.DOTALL)
content = re.sub(r"const withSnapshot = computed\(.*?\n", '', content)
content = re.sub(r"const snapshotValues = computed\(.*?\n", '', content)
content = re.sub(r"const snapshotDate = computed\(.*?\n", '', content)
content = re.sub(r"const offPilotDate = computed\(.*?\n", '', content)

# Remove the resetForm snapshot stuff that was missed
content = re.sub(r"  snapshot\.value = Object\.fromEntries\([\s\S]*?\n", '', content)
content = re.sub(r"  // Prefill the snapshot date the views actually read, so the customer lands in\n  // a snapshot the portfolio can see\.\n  if \('as_of_date' in snapshot\.value\) snapshot\.value\.as_of_date = snapshotStore\.asOfDate\n", '', content)

# Remove JSDoc comments containing snapshot
content = re.sub(r"/\*\*.*?[Ss]napshot.*?\*/\n", '', content, flags=re.DOTALL)

open('src/components/ingest/EditCustomerModal.vue', 'w', encoding='utf-8').write(content)
