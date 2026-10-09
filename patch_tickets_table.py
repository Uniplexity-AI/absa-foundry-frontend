with open("src/views/Modules/CRM/CRMTicketsPage.vue", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    """<th class="p-3">Ticket ID</th>""",
    """<th class="p-3">Ticket ID</th>\n                  <th class="p-3">Subject</th>"""
)

content = content.replace(
    """<td class="p-3 text-absa-passion font-bold">{{ ticket.id }}</td>""",
    """<td class="p-3 text-absa-passion font-bold">{{ ticket.id }}</td>\n                  <td class="p-3 text-gray-900 truncate max-w-[150px] font-bold" :title="ticket.subject">{{ ticket.subject || 'N/A' }}</td>"""
)

with open("src/views/Modules/CRM/CRMTicketsPage.vue", "w", encoding="utf-8") as f:
    f.write(content)

print("Added subject to table")
