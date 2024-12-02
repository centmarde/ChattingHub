// main.js
import { createApp } from "vue";
import axios from "axios";
import { createPinia } from "pinia";
import { registerPlugins } from "@/plugins";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from "./App.vue";

// Disable specific Vue warnings
const app = createApp(App);
app.config.warnHandler = (msg, vm, trace) => {
  // You can log the message or completely suppress it
  console.log(`Warning: ${msg}`);
  // Optionally suppress the warning by doing nothing
};

// Create the Vue app instance
axios.defaults.baseURL = "http://127.0.0.1:8000";

// Create and register Pinia store
const pinia = createPinia();

// Register the Toast plugin
app.use(Toast);

// Register other plugins
registerPlugins(app);

// Mount the app to the DOM
app.mount("#app");
