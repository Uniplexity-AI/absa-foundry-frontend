import re
import os

filepath = '../absa-foundry-backend/customer-lifecycle-ai/gateway/routes/crm_routes.py'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Make sure chromadb is imported
if "import chromadb" not in content:
    content = content.replace("import requests", "import requests\nimport chromadb")

old_code = """        # Embed and Save Chunks
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
        conn.close()"""

new_code = """        # Initialize ChromaDB client
        # Adjust path depending on where this script is run from (typically gateway root)
        chroma_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "database", "chroma_db"))
        chroma_client = chromadb.PersistentClient(path=chroma_path)
        collection = chroma_client.get_or_create_collection(name="crm_faq_bot")

        # Embed and Save Chunks into ChromaDB
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
                        # Save to ChromaDB instead of Postgres
                        collection.add(
                            embeddings=[embedding],
                            documents=[chunk_text],
                            ids=[f"{doc_id}_chunk_{i}"],
                            metadatas=[{"document_id": str(doc_id), "chunk_index": i}]
                        )
                        embeddings_count += 1
            except Exception as e:
                print(f"Embedding failed for chunk {i}: {e}")
                
        cur.close()
        conn.close()"""

content = content.replace(old_code, new_code)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Replaced Postgres array embeddings with ChromaDB successfully.")
