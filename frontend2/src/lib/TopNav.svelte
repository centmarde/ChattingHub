<TopAppBar bind:this={topAppBar} variant="short" collapsed >
  <Row>
    <Section>
      <div  on:click={() => console.log('Menu clicked')}>
        <IconButton class="material-icons">
          menu
        </IconButton>
      </div>
      
      <Title>Short</Title>
    </Section>
    <Section align="end" toolbar>
      <div  on:click={logout}>
      <IconButton
        class="material-icons"
        aria-label="Logout"
       
      >
        logout
      </IconButton>
    </div>
    </Section>
  </Row>
</TopAppBar>
<AutoAdjust {topAppBar}></AutoAdjust>

<script lang="ts">
  import TopAppBar, { Row, Section, Title, AutoAdjust } from '@smui/top-app-bar';
  import IconButton from '@smui/icon-button';
  import { isAuthenticated, accessToken, userId } from '../stores/authStore';
  import { navigate } from 'svelte-routing';
  import { routes, handleRouteChange } from '../router/routes';

  let topAppBar: TopAppBar | null = null;

  function logout() {
   

    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');

    accessToken.set(null);
    userId.set(null);
    isAuthenticated.set(false);

    // Redirect to the home route after logout
    navigate(routes.home);
    handleRouteChange(window.location.pathname);
     alert('Logout successful');
  }
</script>

<style>
  /* Ensure proper layout for the top app bar */
  :global(#smui-app),
  :global(body),
  :global(html) {
    display: block !important;
    height: auto !important;
    width: auto !important;
    position: static !important;
  }

  /* Fix potential interference with the buttons */
  :global(.material-icons) {
    pointer-events: auto;
  }

</style>
