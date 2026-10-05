repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\components\crm\PromiseToFundModal.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the import
content = content.replace("import 'jspdf-autotable'", "import autoTable from 'jspdf-autotable'")

# Replace the method call
content = content.replace("doc.autoTable({", "autoTable(doc, {")

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done patching jsPDF autotable")
