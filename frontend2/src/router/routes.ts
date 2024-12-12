

type RouteMap = {
  [key: string]: any;  // Use 'any' or 'SvelteComponent' to support Svelte components
};

export const routes: RouteMap = {
  '/':  () => import('../pages/Login.svelte'), 
 '/dashboard': () => import('../pages/Dashboard.svelte'), 
  '*': () => import('../pages/NotFound.svelte'), 
};
