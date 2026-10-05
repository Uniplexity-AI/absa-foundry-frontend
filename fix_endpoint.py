import os

filepath = '../absa-foundry-backend/customer-lifecycle-ai/gateway/routes/crm_routes.py'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Forcefully remove everything from @router.post("/faqs/upload") downwards
start_idx = content.find('@router.post("/faqs/upload")')
content = content[:start_idx]

# Append the new perfect implementation
new_endpoint = """
_EMBEDDER = None
def get_embedder():
    global _EMBEDDER
    if _EMBEDDER is None:
        from llama_cpp import Llama
        blob_path = os.path.expanduser("~/.ollama/models/blobs/sha256-2bada8a7450677000f678be90653b85d364de7db25eb5ea54136ada5f3933730")
        print(f"Loading native llama-cpp embedder from {blob_path}...")
        _EMBEDDER = Llama(
            model_path=blob_path,
            embedding=True,
            n_ctx=1024,
            n_threads=4,
            verbose=False
        )
        print("Embedder loaded.")
    return _EMBEDDER

@router.post("/faqs/upload")
async def upload_faq(file: UploadFile = File(...)):
    \"\"\"Upload an FAQ document, chunk it, embed it using native llama-cpp Qwen, and save it.\"\"\"
    try:
        content_bytes = await file.read()
        text = content_bytes.decode('utf-8', errors='ignore')
        
        chunks = [c.strip() for c in text.split("Q:") if c.strip()]
        if not chunks:
            chunks = [text[i:i+500] for i in range(0, len(text), 500)]
            
        import psycopg2
        import os
        import numpy as np
        
        # Connect to DB (Save Blob)
        conn = psycopg2.connect("postgresql://postgres:wamulehi@localhost:5432/absa_dw")
        conn.autocommit = True
        cur = conn.cursor()
        
        cur.execute(
            "INSERT INTO faq_documents (filename, mime_type, file_data) VALUES (%s, %s, %s) RETURNING id",
            (file.filename, file.content_type, psycopg2.Binary(content_bytes))
        )
        doc_id = cur.fetchone()[0]
        
        # Initialize ChromaDB client
        chroma_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "database", "chroma_db"))
        import chromadb
        chroma_client = chromadb.PersistentClient(path=chroma_path)
        collection = chroma_client.get_or_create_collection(name="crm_faq_bot")

        embeddings_count = 0
        embedder = get_embedder()
        
        for i, chunk in enumerate(chunks):
            chunk_text = "Q: " + chunk if chunk.startswith("How") or "?" in chunk[:50] else chunk
            
            try:
                resp = embedder.create_embedding(chunk_text)
                emb_raw = resp["data"][0]["embedding"]
                
                if len(emb_raw) > 0 and isinstance(emb_raw[0], list):
                    embedding = np.mean(emb_raw, axis=0).tolist()
                else:
                    embedding = emb_raw
                
                if embedding:
                    collection.add(
                        embeddings=[embedding],
                        documents=[chunk_text],
                        ids=[f"{doc_id}_chunk_{i}"],
                        metadatas=[{"document_id": str(doc_id), "chunk_index": i}]
                    )
                    embeddings_count += 1
            except Exception as e:
                import traceback
                traceback.print_exc()
                print(f"Embedding failed for chunk {i}: {e}")
                
        cur.close()
        conn.close()
        
        return {
            "status": "success", 
            "message": f"Parsed {len(chunks)} chunks, successfully embedded and stored {embeddings_count} FAQs.",
            "document_id": str(doc_id)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
"""

content += new_endpoint

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Force replaced upload_faq with native llama_cpp script.")
