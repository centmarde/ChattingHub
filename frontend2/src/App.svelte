<script lang="ts">
  import { Router, Route, link } from 'svelte-routing';
  import { routes } from './router/routes'; // Import your routes
</script>

<Router>
  <!-- Dynamically render components based on the current route -->
  {#each Object.keys(routes) as path}
    <Route path={path} component={routes[path]} />
  {/each}
</Router>
