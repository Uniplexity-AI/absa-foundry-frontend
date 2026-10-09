import os
import re

def add_permission(content, pattern, perm_string):
    # Find all buttons matching the pattern that don't already have v-permission
    def replacer(match):
        button_tag = match.group(0)
        if 'v-permission' in button_tag:
            return button_tag
        return button_tag.replace('<button', f'<button v-permission="{perm_string}"')
    
    return re.sub(pattern, replacer, content)

components_dir = "src/views/Modules/CRM/components"
for filename in os.listdir(components_dir):
    if not filename.endswith(".vue"): continue
    
    filepath = os.path.join(components_dir, filename)
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Delete buttons
    content = add_permission(content, r'<button[^>]*handleDelete[^>]*>', r"['crm', 'delete']")
    content = add_permission(content, r'<button[^>]*bulkDelete[^>]*>', r"['crm', 'delete']")
    content = add_permission(content, r'<button[^>]*deleteSelected[^>]*>', r"['crm', 'delete']")
    
    # Edit buttons
    content = add_permission(content, r'<button[^>]*\$emit\(\'edit\'[^>]*>', r"['crm', 'edit']")
    
    # Export/Extract buttons
    content = add_permission(content, r'<button[^>]*showExtractDialog[^>]*>', r"['crm', 'export']")
    
    # Assign buttons
    content = add_permission(content, r'<button[^>]*selectAssignTo[^>]*>', r"['crm', 'assign']")
    content = add_permission(content, r'<button[^>]*runAutoAssign[^>]*>', r"['crm', 'assign']")
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

print("Permissions injected into CRM components")
