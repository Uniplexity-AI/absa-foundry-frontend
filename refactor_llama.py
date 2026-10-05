import re
import os

filepath = '../absa-foundry-backend/customer-lifecycle-ai/gateway/routes/crm_routes.py'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add Llama import and global cache
if "from llama_cpp import Llama" not in content:
    content = content.replace("import chromadb", "import chromadb\nfrom llama_cpp import Llama")
    
if "_EMBEDDER = None" not in content:
    embedder_code = """
_EMBEDDER = None
def get_embedder():
    global _EMBEDDER
    if _EMBEDDER is None:
        blob_path = os.path.expanduser("~/.ollama/models/blobs/sha256-7cd4618c1faf8b7233c6c906dac1694b6a47684b37b8895d470ac688520b9c01")
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
"""
    content = content.replace("router = APIRouter", embedder_code + "\nrouter = APIRouter")

old_code = """            # Call local Ollama for embedding (using gemma3:1b as fallback)
            try:
                resp = requests.post("http://localhost:11434/api/embeddings", json={
                    "model": "gemma3:1b",
                    "prompt": chunk_text
                }, timeout=120)
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
                print(f"Embedding failed for chunk {i}: {e}")"""

new_code = """            # Use native llama-cpp-python for embedding
            try:
                embedder = get_embedder()
                resp = embedder.create_embedding(chunk_text)
                embedding = resp["data"][0]["embedding"]
                
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
                print(f"Embedding failed for chunk {i}: {e}")"""

content = content.replace(old_code, new_code)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Refactored upload_faq to use native llama-cpp-python.")
