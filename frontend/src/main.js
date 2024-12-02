/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
// Import dependencies
import { createApp } from "vue";
import axios from "axios";
import { registerPlugins } from "@/plugins"; // Assuming you have a custom function to register plugins
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

// Import the root component
import App from "./App.vue";

// Set the base URL for Axios globally
axios.defaults.baseURL = "http://127.0.0.1:8000"; // Ensure your backend API is running on this URL

// Create the Vue app instance
const app = createApp(App);

// Register the Toast plugin
app.use(Toast); // Register the Toast plugin before other plugins

// Register other plugins (assuming you have a custom registerPlugins function)
registerPlugins(app);

// Mount the app to the DOM
app.mount("#app");
