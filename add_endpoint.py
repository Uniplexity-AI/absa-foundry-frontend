import re
with open('../absa-foundry-backend/customer-lifecycle-ai/gateway/routes/crm_routes.py', 'r') as f:
    content = f.read()

# Add imports
if "UploadFile" not in content:
    content = content.replace(
        "from fastapi import APIRouter, HTTPException, Depends",
        "from fastapi import APIRouter, HTTPException, Depends, UploadFile, File\nimport json\nimport requests\nimport numpy as np\nfrom shared.database.postgres import get_db_connection"
    )

endpoint_code = """
@router.post("/faqs/upload")
async def upload_faq(file: UploadFile = File(...)):
    \"\"\"Upload an FAQ document, chunk it, embed it using Ollama, and save it.\"\"\"
    try:
        # Read file binary
        content_bytes = await file.read()
        
        # In a production app you'd parse PDF/Doc. 
        # Here we do a basic string extraction for the prototype.
        text = content_bytes.decode('utf-8', errors='ignore')
        
        # Super simple chunker (split by Q: / A: pairs or paragraphs)
        chunks = [c.strip() for c in text.split("Q:") if c.strip()]
        if not chunks:
            chunks = [text[i:i+500] for i in range(0, len(text), 500)]
            
        import psycopg2
        import os
        
        # Connect to DB
        conn = psycopg2.connect("postgresql://postgres:wamulehi@localhost:5432/absa_dw")
        conn.autocommit = True
        cur = conn.cursor()
        
        # Save Blob
        cur.execute(
            "INSERT INTO faq_documents (filename, mime_type, file_data) VALUES (%s, %s, %s) RETURNING id",
            (file.filename, file.content_type, psycopg2.Binary(content_bytes))
        )
        doc_id = cur.fetchone()[0]
        
        # Embed and Save Chunks
        embeddings_count = 0
        for i, chunk in enumerate(chunks):
            # Format the chunk back if it was split
            chunk_text = "Q: " + chunk if chunk.startswith("How") or "?" in chunk[:50] else chunk
            
            # Call local Ollama for embedding (using qwen2.5-coder:7b as fallback)
            try:
                resp = requests.post("http://localhost:11434/api/embeddings", json={
                    "model": "qwen2.5-coder:7b",
                    "prompt": chunk_text
                }, timeout=10)
                if resp.status_code == 200:
                    embedding = resp.json().get("embedding")
                    if embedding:
                        cur.execute(
                            "INSERT INTO faq_embeddings (document_id, chunk_index, text_content, embedding) VALUES (%s, %s, %s, %s)",
                            (doc_id, i, chunk_text, embedding)
                        )
                        embeddings_count += 1
            except Exception as e:
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

if "/faqs/upload" not in content:
    content += endpoint_code

with open('../absa-foundry-backend/customer-lifecycle-ai/gateway/routes/crm_routes.py', 'w') as f:
    f.write(content)
print("done adding upload endpoint")
