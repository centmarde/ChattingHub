<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer expand-on-hover rail color="#0e253f" elevation="5">
        <!-- Chat Hub -->
        <v-list class="mb-2 mt-1">
          <v-list-item
            :prepend-avatar="chatAvatar"
            title="ChatHub"
          ></v-list-item>
        </v-list>

        <v-list density="compact" nav>
          <!-- Dashboard -->
          <v-list-item
            prepend-icon="mdi-view-dashboard"
            title="Dashboard"
            value="dashboard"
            class="mb-3"
          ></v-list-item>

          <!-- Chats -->
          <v-list-item
            prepend-icon="mdi-chat"
            title="Chats"
            value="chats"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main class="custom-main">
        <header>
          <v-card height="65px" rounded="0" flat elevation="0">
            <v-toolbar color="#0e253f">
              <v-app-bar-nav-icon></v-app-bar-nav-icon>

              <v-spacer></v-spacer>

              <!-- Notification Icon -->
              <v-btn size="x-small" variant="tonal" icon class="mr-3">
                <v-icon>mdi-bell</v-icon>
              </v-btn>

              <!-- User Settings -->
              <v-btn rounded="xl" size="large" variant="tonal">
                <v-avatar size="25" class="mr-2">
                  <v-img src="@/assets/images/avatars/avatar-1.png"></v-img>
                </v-avatar>
                <v-icon>mdi-cog</v-icon>
              </v-btn>
            </v-toolbar>
          </v-card>
        </header>

        <v-container fluid class="main-container pa-8 rounded-lg">
          <v-row>
            <VCol cols="12">
              <UserTable :userData="users" />
            </VCol>
          </v-row>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import chatAvatar from "@/assets/images/icon/chat.png";
import UserTable from "@/views/dashboard/UserTable.vue";
import defaultAvatar from "@/assets/images/avatars/avatar-1.png"; // Import default avatar

const users = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchUsers = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/users/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log("API response:", response.data); // Log the entire response for debugging
    users.value = response.data.data.users.map((user) => ({
      username: user.name,
      email: user.email,
      status: "active", // Set default status to "active"
      avatar: defaultAvatar, // Set default avatar
    }));
    console.log("Processed users data:", users.value); // Log the processed users data
  } catch (err) {
    error.value = err.message || "Something went wrong!";
    console.error("Error fetching users:", error.value); // Log the error
  } finally {
    loading.value = false;
  }
};

onMounted(fetchUsers);
</script>

<style scoped>
.custom-main {
  height: 100vh;
  background-color: #0e253f;
}

.main-container {
  background-color: #000f20;
}

/* Deep CSS to remove left border of v-navigation-drawer */
:deep(.v-navigation-drawer--left) {
  border-right-width: none !important;
  border-right: none !important;
}
</style>
