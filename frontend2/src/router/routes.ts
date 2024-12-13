import { isAuthenticated } from '../stores/authStore';  // Import the auth store
import { navigate } from 'svelte-routing';
import { get } from 'svelte/store';
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

export function handleRouteChange(path: string) {
  const loggedIn = get(isAuthenticated); // Retrieve the current authentication state

  console.log("Route change detected:", path);
  console.log("User authenticated:", loggedIn);

  // Protect routes using a switch case for scalability
  switch (path) {
    case '/chat':
      if (!loggedIn) {
        console.log("Unauthorized access to /chat. Redirecting to /");
        navigate('/');
        return;
      }
      break;

    case '/dashboard':
      if (!loggedIn) {
        console.log("Unauthorized access to /dashboard. Redirecting to /");
        navigate('/');
        return;
      }
      break;

    case '/':
      if (loggedIn) {
        console.log("Authenticated user attempting to access /. Redirecting to /chat");
        navigate('/chat');
        return;
      }
      break;

    default:
      break;
  }

  // Handle other routes
 /*  const route = routes[path];
  if (route) {
    route().then(component => {
      console.log("Rendering component for:", path);
      // Add logic to render the component (depends on your setup)
    });
  } else {
    routes['*']().then(component => {
      console.log("Rendering NotFound component.");
      // Add logic to render a 404 component
    });
  } */
}
