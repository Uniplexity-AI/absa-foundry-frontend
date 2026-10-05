import subprocess
import time

print("Waiting for build to finish...")
# We will just wait 50 seconds to ensure the build finishes, then commit and push.
time.sleep(50)

subprocess.run(["git", "add", "."], check=True)
subprocess.run(["git", "commit", "-m", "chore: build frontend with latest customer profile changes"], check=True)
subprocess.run(["git", "push", "origin", "main"], check=True)
print("Pushed successfully!")
