<script lang="ts">
  import { Router, Route, link } from 'svelte-routing';
  import { routes, handleRouteChange } from './router/routes'; // Import your routes and route change handler
  import { onMount } from 'svelte';

  // To track route changes manually and trigger authentication check
  let currentPath = window.location.pathname;

  // Call the route change handler on mount and whenever the route changes
  onMount(() => {
    handleRouteChange(currentPath);
  });

  function onRouteChange(event: CustomEvent) {
    currentPath = event.detail.path; // Update the current path
    handleRouteChange(currentPath);  // Trigger the route handler for redirection checks
  }
</script>

<Router on:route={onRouteChange}>
  <!-- Dynamically render components based on the current route -->
  {#each Object.keys(routes) as path}
    <Route path={path} component={routes[path]} />
  {/each}
</Router>
