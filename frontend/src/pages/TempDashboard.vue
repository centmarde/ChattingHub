<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12" lg="12">
        <h2 class="text-center my-4">USERS DATA / DASHBOARD</h2>
        <!-- Display loading spinner when the data is being fetched -->
        <v-spinner
          v-if="loading"
          color="primary"
          class="d-flex justify-center"
        />

        <!-- Show data table only when the data is available -->

        <v-data-table
          v-else-if="!loading && users.length > 0"
          :items="users"
          item-value="name"
          class="elevation-1"
        >
          <!-- Manually define the table headers -->
          <template v-slot:column.id="{ column }">
            <span>ID</span>
          </template>
          <template v-slot:column.name="{ column }">
            <span>Name</span>
          </template>
          <template v-slot:column.email="{ column }">
            <span>Email</span>
          </template>

          <!-- Default slot to render table rows -->
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.email }}</td>
            </tr>
          </template>
        </v-data-table>

        <!-- Show a message when there are no users -->
        <v-alert
          v-else-if="!loading && users.length === 0"
          type="info"
          class="mt-4"
        >
          No users found.
        </v-alert>

        <!-- Show error message if there's an error fetching users -->
        <v-alert v-if="error" type="error" class="mt-4">
          Error fetching users: {{ error }}
        </v-alert>

        <!-- Logout Button -->
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn @click="logout" color="red" class="mt-4">Logout</v-btn>
        <router-link to="/chat">
          <v-btn @click="ChatPage" color="green" class="mt-4 mx-2"
            >Chat Page</v-btn
          ></router-link
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "@/stores/auth"; // If you're using Pinia for store management

export default {
  name: "Users",
  data() {
    return {
      users: [], // The list of users
      loading: true, // Loading state to show spinner until data is fetched
      error: null, // Error message state
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/users/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Using Bearer token authentication
          },
        });
        console.log("API response:", response); // For debugging
        this.users = response.data.data.users; // Ensure the correct path to users data
      } catch (error) {
        console.error("Error fetching users:", error);
        this.error = error.message || "Something went wrong!"; // Set error message if request fails
      } finally {
        this.loading = false; // Set loading to false after the request is done
      }
    },

    // Logout method
    logout() {
      const authStore = useAuthStore();
      authStore.logout(); // Clear the auth token in Pinia store
    },
  },
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
