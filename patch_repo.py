import os
import json
repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-backend\customer-lifecycle-ai\services\decision-intelligence-service\app\repository\pilot_action_repository.py'
with open(repo_path, 'r') as f:
    content = f.read()

addition = """
    def delete_action(self, action_id: int) -> bool:
        def _q():
            conn = self._connect()
            try:
                with conn.cursor() as cur:
                    cur.execute("DELETE FROM etl_clean.pilot_action_log WHERE id = %s", (action_id,))
                    conn.commit()
                    return cur.rowcount > 0
            finally:
                conn.close()
        return self._retry(_q, "delete_action")

    def update_action(self, action_id: int, action_type: str, detail: str, meta: dict) -> bool:
        import json
        def _q():
            conn = self._connect()
            try:
                with conn.cursor() as cur:
                    cur.execute("UPDATE etl_clean.pilot_action_log SET action_type = %s, detail = %s, meta = %s WHERE id = %s", (action_type, detail, json.dumps(meta), action_id))
                    conn.commit()
                    return cur.rowcount > 0
            finally:
                conn.close()
        return self._retry(_q, "update_action")
"""

content = content.replace("    def get_state(", addition + "\n    def get_state(")
with open(repo_path, 'w') as f:
    f.write(content)
print("done repo")
