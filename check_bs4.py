from bs4 import BeautifulSoup
with open("src/views/Modules/settings/UserManagement.vue", "r") as f:
    content = f.read()

template = content.split("<template>")[1].split("</template>")[0]
soup = BeautifulSoup(template, "html.parser")
print("Parsed with BeautifulSoup!")
