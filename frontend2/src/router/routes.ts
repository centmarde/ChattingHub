import { isAuthenticated } from '../stores/authStore';  // Import the auth store
import { navigate } from 'svelte-routing';

type RouteMap = {
  [key: string]: any;  // Use 'any' or 'SvelteComponent' to support Svelte components
};

// Define routes and components
export const routes: RouteMap = {
  '/': () => import('../pages/Login.svelte'),  // Public page (login)
  '/dashboard': () => import('../pages/Dashboard.svelte'),  // Protected page
  '*': () => import('../pages/NotFound.svelte'),  // Not Found page
  '/chat': () => import('../router/chat/+Chat.svelte'),
};

// Router logic to handle redirection based on authentication state
export function handleRouteChange(path: string) {
  const isLoggedIn = isAuthenticated;  // Access the auth store's value reactively
  console.log("isLoggedIn:", isLoggedIn);
  if (path === '/' && isLoggedIn) {
    // Redirect authenticated users away from the login page
    navigate('/dashboard');
  } else if (path === '/dashboard' && !isLoggedIn) {
    // Redirect unauthenticated users away from the dashboard
    navigate('/');
  } else {
    // Otherwise, render the component for the given path
    const route = routes[path];
    if (route) {
      route().then(component => {
        // Render the component (depending on your setup)
      });
    } else {
      routes['*']().then(component => {
        // Render the NotFound component if no route is matched
      });
    }
  }
}
