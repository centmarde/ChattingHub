import { defineStore } from "pinia"; // Assuming you're using Pinia for state management
import axios from "axios";
import { useToast } from "vue-toastification"; // Import the toast library

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
    error: null,
  }),
  actions: {
    async register(name, email, password, confirmPassword) {
      const toast = useToast(); // Initialize the toast

      // Check if passwords match
      if (password !== confirmPassword) {
        this.error = "Passwords do not match";
        toast.error("Passwords do not match"); // Show error toast
        return false;
      }

      try {
        // Send the POST request to the signup API
        const response = await axios.post("http://127.0.0.1:8000/api/signup/", {
          email,
          name,
          password1: password,
          password2: confirmPassword, // Ensure passwords match
        });

        if (response.data.message === "success") {
          this.user = response.data.user; // Assuming user data is returned
          toast.success("Registration successful!"); // Show success toast
          return true;
        } else {
          this.error = response.data.errors || "An unknown error occurred";
          toast.error(this.error); // Show error toast if registration fails
          return false;
        }
      } catch (error) {
        this.error = error.response?.data?.detail || error.message;
        console.error("Registration error:", error);
        toast.error(this.error); // Show error toast in case of network failure
        return false;
      }
    },

    clearError() {
      this.error = null;
    },
  },
});
