import sys
sys.path.append("c:\\Users\\ADMIN\\Desktop\\uniplexity-ai\\ABSA\\absa-foundry-backend\\customer-lifecycle-ai")
from shared.auth.user_repository import UserRepository
repo = UserRepository()
print(repo.get_roles())
