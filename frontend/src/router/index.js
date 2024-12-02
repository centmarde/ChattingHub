// router/index.ts

// Existing imports and setup
import { createRouter, createWebHistory } from "vue-router/auto";
import { setupLayouts } from "virtual:generated-layouts";
import { routes as autoRoutes } from "vue-router/auto-routes";
import { useAuthStore } from "@/stores/auth";
import Hero from "@/pages/index.vue";
import Dashboard from "@/pages/Dashboard.vue";
import NotFound from "@/pages/NotFoundPage.vue";
import ChatBase from "@/pages/ChatBase.vue";

const routes = setupLayouts([
  ...autoRoutes,
  { path: "/", component: Hero },
  { path: "/:pathMatch(.*)*", component: NotFound },
  { path: "/Dashboard", component: Dashboard, meta: { requiresAuth: true } },
  { path: "/Chat", component: ChatBase, meta: { requiresAuth: true } },
]);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Prevent browser back/forward navigation (when logged out or on restricted routes)
function preventBackNavigation() {
  // Push a new history state to the browser history
  history.pushState(null, document.title, location.href);
  window.onpopstate = () => {
    history.pushState(null, document.title, location.href); // Re-push state to prevent going back
  };
}

// Global authentication and role-based guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Load token from localStorage if available
  if (!authStore.accessToken) {
    authStore.loadTokenFromStorage(); // Ensure this method properly loads the token
  }

  const isAuthenticated = !!authStore.accessToken;
  const userRole = JSON.parse(localStorage.getItem("Role") || "false"); // false as default if no role is found
  const hasVisitedDashboard = JSON.parse(
    localStorage.getItem("hasVisitedDashboard") || "false"
  ); // Track dashboard visit

  console.log("isAuthenticated:", isAuthenticated);
  console.log("User Role:", userRole); // Debugging role

  // Pages that don't require authentication
  const publicPages = ["/"];

  // Pages that require authentication
  const protectedPages = ["/Dashboard", "/Chat"];

  // Redirect to login if trying to access protected pages without being logged in
  if (protectedPages.includes(to.path) && !isAuthenticated) {
    return next("/");
  }

  // Redirect admin to the dashboard on first login if they haven't visited it yet
  if (isAuthenticated && userRole === true && !hasVisitedDashboard) {
    localStorage.setItem("hasVisitedDashboard", "true"); // Set flag to true after visiting dashboard
    return next("/Dashboard");
  }

  // Redirect to home if already logged in and trying to access public pages
  if (publicPages.includes(to.path) && isAuthenticated) {
    return next("/Dashboard");
  }

  // If the route requires authentication and the user is not authenticated, redirect to login
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ path: "/", query: { redirect: to.fullPath } });
  } else if (isAuthenticated && (to.path === "/" || to.path === "/")) {
    // Redirect authenticated users to the dashboard if they try to access login or home page
    next("/Dashboard");
  } else {
    // Default behavior: proceed to the requested route
    next();
  }
});

// Call preventBackNavigation when necessary
router.isReady().then(() => {
  if (!useAuthStore().accessToken) {
    preventBackNavigation(); // Prevent back navigation if the user is logged out
  }
});

// Clean up after dynamic import error handling
router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

// Logout function
function logout() {
  const authStore = useAuthStore();

  // Clear the authentication token from localStorage
  localStorage.removeItem("auth_token");
  localStorage.removeItem("Role");
  alert("Logout successful");

  // Reset token and role in the store
  authStore.accessToken = null;
  authStore.userRole = null;

  // Redirect to login page or home page
  router.push("/login"); // Redirect to login after logout
  preventBackNavigation(); // Prevent back navigation after logout
}

// Export the logout function to be used in your application
export { logout };
export default router;
