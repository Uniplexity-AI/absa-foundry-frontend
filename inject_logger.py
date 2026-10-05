import os

filepath = '../absa-foundry-backend/customer-lifecycle-ai/gateway/routes/crm_routes.py'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("raise HTTPException(status_code=500, detail=str(e))", """
        import traceback
        with open("crm_crash.log", "w") as crash_log:
            crash_log.write(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))
""")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Injected crash logger.")
