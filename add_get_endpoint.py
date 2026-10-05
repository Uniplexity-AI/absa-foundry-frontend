import os

filepath = '../absa-foundry-backend/customer-lifecycle-ai/gateway/routes/crm_routes.py'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

new_endpoint = """
@router.get("/faqs")
async def list_faqs():
    \"\"\"Retrieve all embedded FAQs from ChromaDB.\"\"\"
    try:
        import os
        import chromadb
        chroma_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "database", "chroma_db"))
        chroma_client = chromadb.PersistentClient(path=chroma_path)
        collection = chroma_client.get_or_create_collection(name="crm_faq_bot")
        
        results = collection.get()
        faqs = []
        if results and results.get("documents"):
            for i, doc in enumerate(results["documents"]):
                meta = results["metadatas"][i] if results.get("metadatas") else {}
                faqs.append({
                    "id": results["ids"][i],
                    "text": doc,
                    "document_id": meta.get("document_id")
                })
        return {"status": "success", "faqs": faqs}
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
"""

if "@router.get(\"/faqs\")" not in content:
    content += new_endpoint
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Added GET /faqs endpoint.")
else:
    print("Endpoint already exists.")
