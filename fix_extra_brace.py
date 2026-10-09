with open("src/views/Modules/settings/UserManagement.vue", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("""    } finally {
      rolesLoading.value = false
    }
  }
}

const filteredUsers = computed(() => {""", """    } finally {
      rolesLoading.value = false
    }
}

const filteredUsers = computed(() => {""")

with open("src/views/Modules/settings/UserManagement.vue", "w", encoding="utf-8") as f:
    f.write(content)
