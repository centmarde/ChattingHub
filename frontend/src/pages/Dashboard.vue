<template>
  <v-app class="app-container">
    <v-navigation-drawer app expand-on-hover rail color="#0e253f" elevation="5">
      <!-- Chat Hub -->
      <v-list class="mb-2 mt-1">
        <v-list-item :prepend-avatar="chatAvatar" title="ChatHub"></v-list-item>
      </v-list>

      <v-list density="compact" nav>
        <!-- Dashboard -->
        <v-list-item
          prepend-icon="mdi-view-dashboard"
          title="Dashboard"
          value="dashboard"
          class="mb-3"
          :class="{ 'active-tab': activeTab === 'dashboard' }"
          @click="activeTab = 'dashboard'"
        ></v-list-item>

        <!-- Chats -->
        <v-list-item
          prepend-icon="mdi-chat"
          title="Chats"
          value="chats"
          :class="{ 'active-tab': activeTab === 'chats' }"
          @click="activeTab = 'chats'"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="#0e253f">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-spacer></v-spacer>

      <!-- Notification Icon with Badge -->
      <v-btn size="x-small" variant="tonal" icon class="mr-3">
        <v-badge color="blue" dot>
          <v-icon>mdi-bell</v-icon>
        </v-badge>
      </v-btn>

      <!-- User Settings -->
      <v-menu v-model="menu" :close-on-content-click="false" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            rounded="xl"
            size="large"
            variant="tonal"
            v-bind="attrs"
            v-on="on"
            @click="toggleMenu"
          >
            <v-avatar size="25" class="mr-2">
              <v-img src="@/assets/images/avatars/avatar-1.png"></v-img>
            </v-avatar>
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
          <v-list-item @click="profile">
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main class="custom-main">
      <v-container fluid class="main-container pa-8 rounded-lg">
        <v-row v-if="activeTab === 'dashboard'">
          <VCol cols="12">
            <UserTable :userData="users" />
          </VCol>
        </v-row>
        <v-row v-else-if="activeTab === 'chats'">
          <VCol cols="12">
            <ChatBox />
          </VCol>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { useAuthStore } from "@/stores/auth"; // Import the auth store
import chatAvatar from "@/assets/images/icon/chat.png";
import UserTable from "@/views/dashboard/UserTable.vue";
import ChatBox from "@/components/ChatBox.vue"; // Import ChatBox component
import defaultAvatar from "@/assets/images/avatars/avatar-1.png"; // Import default avatar

const users = ref([]);
const loading = ref(true);
const error = ref(null);
const activeTab = ref(localStorage.getItem("activeTab") || "dashboard"); // Retrieve activeTab from local storage
const menu = ref(false); // State for the user settings menu

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

const logout = () => {
  const authStore = useAuthStore();
  authStore.logout(); // Clear the auth token in Pinia store
  console.log("Logout clicked");
};

const profile = () => {
  // Handle profile logic here
  console.log("Profile clicked");
};

const toggleMenu = () => {
  menu.value = !menu.value;
};

onMounted(fetchUsers);

// Watch for changes in activeTab and save it to local storage
watch(activeTab, (newTab) => {
  localStorage.setItem("activeTab", newTab);
});
</script>

<style scoped>
.app-container {
  overflow: hidden; /* Prevent unwanted scrollbars */
  height: 100vh; /* Ensure the app container takes full height */
  display: flex;
  flex-direction: column;
}

.v-navigation-drawer {
  overflow: hidden; /* Prevent unwanted scrollbars */
}

.v-app-bar {
  overflow: hidden; /* Prevent unwanted scrollbars */
}

.custom-main {
  flex: 1; /* Take remaining space */
  background-color: #0e253f;
  overflow-y: auto; /* Ensure the main content is scrollable */
}

.main-container {
  background-color: #000f20;
}

.active-tab {
  background-color: #1e3a5f !important;
  color: #ffffff !important;
}

/* Deep CSS to remove left border of v-navigation-drawer */
:deep(.v-navigation-drawer--left) {
  border-right-width: none !important;
  border-right: none !important;
}
</style>
