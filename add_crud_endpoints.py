import os
import re

filepath = '../absa-foundry-backend/customer-lifecycle-ai/gateway/routes/crm_routes.py'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

endpoints = """
class FaqUpdate(BaseModel):
    text: str

@router.post("/faqs")
async def add_manual_faq(payload: FaqUpdate):
    try:
        import uuid
        import numpy as np
        import chromadb
        
        chroma_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "database", "chroma_db"))
        chroma_client = chromadb.PersistentClient(path=chroma_path)
        collection = chroma_client.get_or_create_collection(name="crm_faq_bot")
        
        embedder = get_embedder()
        resp = embedder.create_embedding(payload.text)
        emb_raw = resp["data"][0]["embedding"]
        if len(emb_raw) > 0 and isinstance(emb_raw[0], list):
            embedding = np.mean(emb_raw, axis=0).tolist()
        else:
            embedding = emb_raw
            
        new_id = f"manual_{uuid.uuid4().hex[:8]}"
        collection.add(
            embeddings=[embedding],
            documents=[payload.text],
            ids=[new_id],
            metadatas=[{"document_id": "manual"}]
        )
        return {"status": "success", "faq": {"id": new_id, "text": payload.text, "document_id": "manual"}}
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/faqs/{faq_id}")
async def update_faq(faq_id: str, payload: FaqUpdate):
    try:
        import numpy as np
        import chromadb
        
        chroma_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "database", "chroma_db"))
        chroma_client = chromadb.PersistentClient(path=chroma_path)
        collection = chroma_client.get_or_create_collection(name="crm_faq_bot")
        
        embedder = get_embedder()
        resp = embedder.create_embedding(payload.text)
        emb_raw = resp["data"][0]["embedding"]
        if len(emb_raw) > 0 and isinstance(emb_raw[0], list):
            embedding = np.mean(emb_raw, axis=0).tolist()
        else:
            embedding = emb_raw
            
        collection.update(
            ids=[faq_id],
            embeddings=[embedding],
            documents=[payload.text]
        )
        return {"status": "success"}
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/faqs/{faq_id}")
async def delete_faq(faq_id: str):
    try:
        import chromadb
        chroma_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "database", "chroma_db"))
        chroma_client = chromadb.PersistentClient(path=chroma_path)
        collection = chroma_client.get_or_create_collection(name="crm_faq_bot")
        
        collection.delete(ids=[faq_id])
        return {"status": "success"}
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
"""

if "def update_faq" not in content:
    content += endpoints
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Added POST, PUT, DELETE /faqs endpoints.")
else:
    print("Endpoints already exist.")
