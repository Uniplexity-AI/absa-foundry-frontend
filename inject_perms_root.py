import os
import re

def add_permission(content, pattern, perm_string):
    def replacer(match):
        button_tag = match.group(0)
        if 'v-permission' in button_tag:
            return button_tag
        return button_tag.replace('<button', f'<button v-permission="{perm_string}"')
    
    return re.sub(pattern, replacer, content)

components_dir = "src/views/Modules/CRM"
for filename in os.listdir(components_dir):
    if not filename.endswith(".vue"): continue
    
    filepath = os.path.join(components_dir, filename)
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Delete buttons
    content = add_permission(content, r'<button[^>]*handleDelete[^>]*>', r"['crm', 'delete']")
    
    # Edit / Add buttons
    content = add_permission(content, r'<button[^>]*showExpandedLeadForm = true[^>]*>', r"['crm', 'write']")
    content = add_permission(content, r'<button[^>]*showAccountModal = true[^>]*>', r"['crm', 'write']")
    content = add_permission(content, r'<button[^>]*showContactModal = true[^>]*>', r"['crm', 'write']")
    content = add_permission(content, r'<button[^>]*showDealModal = true[^>]*>', r"['crm', 'write']")
    
    # Export buttons
    content = add_permission(content, r'<button[^>]*export[^>]*>', r"['crm', 'export']")
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

print("Permissions injected into CRM root pages")
