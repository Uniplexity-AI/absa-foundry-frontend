import re
with open("src/views/Modules/CRM/CRMTicketsPage.vue", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("type: 'Complaint'", "subject: 'App not working', type: 'Complaint'", 1)
content = content.replace("type: 'Enquiry'", "subject: 'Loan requirements', type: 'Enquiry'", 1)
content = content.replace("type: 'Account Block'", "subject: 'Card stolen, block immediately', type: 'Account Block'", 1)
content = content.replace("type: 'Card Delivery'", "subject: 'Where is my new debit card?', type: 'Card Delivery'", 1)

with open("src/views/Modules/CRM/CRMTicketsPage.vue", "w", encoding="utf-8") as f:
    f.write(content)
