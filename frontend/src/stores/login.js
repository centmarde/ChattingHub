import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router/index";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: null, // Store access token
  }),

  actions: {
    // Login action: attempts to authenticate and set the access token
    async login(email, password) {
      try {
        const response = await axios.post("/api/login/", {
          email: email,
          password: password,
        });
        this.accessToken = response.data.access; // Set token in store
        console.log("Access Token:", this.accessToken);
        // Save the token to localStorage for persistence
        localStorage.setItem("accessToken", this.accessToken);
        return true; // Successful login
      } catch (error) {
        console.error("Login failed:", error);
        this.accessToken = null;
        localStorage.removeItem("accessToken"); // Remove invalid token
        return false; // Failed login
      }
    },

    // Logout action: clears both the store and localStorage
    logout() {
      this.accessToken = null; // Reset token in store
      localStorage.removeItem("accessToken");
      router.push("/");
    },

    // Load token from localStorage (on app initialization)
    loadTokenFromStorage() {
      const token = localStorage.getItem("accessToken");
      if (token) {
        this.accessToken = token; // Set token in store if available in localStorage
      }
    },
  },
});
