repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-backend\customer-lifecycle-ai\services\decision-intelligence-service\app\api\pilot_action_routes.py'
with open(repo_path, 'r') as f:
    content = f.read()

addition = """
@router.delete("/log/{action_id}")
def delete_action(action_id: int):
    success = pilot_action_service.delete_action(action_id)
    if not success:
        raise HTTPException(status_code=404, detail="Not found")
    return {"success": True}

@router.put("/log/{action_id}")
def update_action(action_id: int, req: PilotActionLogRequest):
    success = pilot_action_service.update_action(action_id, req)
    if not success:
        raise HTTPException(status_code=404, detail="Not found")
    return {"success": True}
"""

content = content.replace("@router.get(\"/state/{customer_id}\"", addition + "\n@router.get(\"/state/{customer_id}\"")
with open(repo_path, 'w') as f:
    f.write(content)
print("done di router")
