import re

with open('src/views/CustomerDetail.vue', 'r', encoding='utf-8') as f:
    content = f.read()

# Match 1: Add fetchNextBestAction
content = content.replace(
    'customerStore.fetchCustomerDetail(id),',
    'customerStore.fetchCustomerDetail(id),\n    customerStore.fetchNextBestAction(id),'
)

# Match 2: Add nba-override binding
content = content.replace(
    ':churn-prob="churnProb"',
    ':nba-override="customerStore.currentNba"\n        :churn-prob="churnProb"'
)

with open('src/views/CustomerDetail.vue', 'w', encoding='utf-8') as f:
    f.write(content)
print("Patched CustomerDetail.vue")
