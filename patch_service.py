repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-backend\customer-lifecycle-ai\services\decision-intelligence-service\app\services\pilot_action_service.py'
with open(repo_path, 'r') as f:
    content = f.read()

addition = """
    def delete_action(self, action_id: int) -> bool:
        return self._repo.delete_action(action_id)

    def update_action(self, action_id: int, req) -> bool:
        return self._repo.update_action(action_id, req.action_type, req.detail, req.meta)
"""

content = content.replace("    def get_state(", addition + "\n    def get_state(")
with open(repo_path, 'w') as f:
    f.write(content)
print("done service")
