import os

filepath = '../absa-foundry-backend/customer-lifecycle-ai/gateway/routes/crm_routes.py'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the embedding parsing block
old_code = """                resp = embedder.create_embedding(chunk_text)
                embedding = resp["data"][0]["embedding"]
                
                if embedding:"""

new_code = """                resp = embedder.create_embedding(chunk_text)
                emb_raw = resp["data"][0]["embedding"]
                
                # Qwen returns a 2D array (list of tokens x hidden_dim) since it's an instruct model
                # We need to mean-pool it into a 1D vector of length 3584 for ChromaDB
                import numpy as np
                if len(emb_raw) > 0 and isinstance(emb_raw[0], list):
                    embedding = np.mean(emb_raw, axis=0).tolist()
                else:
                    embedding = emb_raw
                
                if embedding:"""

content = content.replace(old_code, new_code)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Added mean-pooling logic for Qwen embeddings.")
