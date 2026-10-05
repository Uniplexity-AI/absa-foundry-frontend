repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-backend\customer-lifecycle-ai\gateway\routes\pilot_action_routes.py'
with open(repo_path, 'r') as f:
    content = f.read()

addition = """
@router.delete("/log/{action_id}")
async def proxy_delete_action(request: Request, action_id: int):
    return await _forward(request, f"/pilot/actions/log/{action_id}")

@router.put("/log/{action_id}")
async def proxy_update_action(request: Request, action_id: int):
    return await _forward(request, f"/pilot/actions/log/{action_id}")
"""

content = content.replace("@router.get(\"/state/{customer_id}\"", addition + "\n@router.get(\"/state/{customer_id}\"")
with open(repo_path, 'w') as f:
    f.write(content)
print("done gateway router")
