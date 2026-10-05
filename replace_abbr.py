repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\components\crm\PromiseToFundModal.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace abbreviations in spans
content = content.replace('text-[9px]">ACC: </span>', 'text-[9px]">Account: </span>')
content = content.replace('text-[9px]">TYP: </span>', 'text-[9px]">Type: </span>')
content = content.replace('text-[9px]">BRN: </span>', 'text-[9px]">Branch: </span>')

content = content.replace('text-[9px]">MOB: </span>', 'text-[9px]">Mobile: </span>')
content = content.replace('text-[9px]">EML: </span>', 'text-[9px]">Email: </span>')
content = content.replace('text-[9px]">NOK: </span>', 'text-[9px]">Next of Kin: </span>')

content = content.replace('tracking-widest mr-1">AMT:</span>', 'tracking-widest mr-1">Amount:</span>')
content = content.replace('tracking-widest mr-1">DAT:</span>', 'tracking-widest mr-1">Date:</span>')
content = content.replace('mr-1">BY:</span>', 'mr-1">Logged By:</span>')

content = content.replace('tracking-widest">RSN:</span>', 'tracking-widest">Reason:</span>')
content = content.replace('tracking-widest">FBK:</span>', 'tracking-widest">Feedback:</span>')

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done replacing abbreviations")
