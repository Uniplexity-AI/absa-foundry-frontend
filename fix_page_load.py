import re

with open('src/views/CustomerDetail.vue', 'r', encoding='utf-8') as f:
    content = f.read()

target = """  await Promise.allSettled([
    customerStore.fetchCustomerDetail(id),
    customerStore.fetchNextBestAction(id),
    customerStore.fetchCustomerTimeline(id),
    customerStore.fetchPortfolio(),
  ])"""

replacement = """  // Fire and forget the NBA generation so it doesn't block page load
  customerStore.fetchNextBestAction(id)

  await Promise.allSettled([
    customerStore.fetchCustomerDetail(id),
    customerStore.fetchCustomerTimeline(id),
    customerStore.fetchPortfolio(),
  ])"""

new_content = content.replace(target, replacement)

with open('src/views/CustomerDetail.vue', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Fixed blocking NBA fetch")
