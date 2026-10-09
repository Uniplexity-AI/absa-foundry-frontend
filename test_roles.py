import urllib.request
import json

try:
    req = urllib.request.Request('http://22.84.115.25:8080/auth/admin/roles')
    with urllib.request.urlopen(req) as response:
        print(response.read().decode())
except Exception as e:
    print(f"Failed: {e}")
