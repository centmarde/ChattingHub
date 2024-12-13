<script lang="ts">
    import { onMount } from 'svelte';
    import { isAuthenticated } from '../stores/authStore';
    import { navigate } from 'svelte-routing'; // Import navigate function for routing

    let isLoggedIn: boolean = false;
    let isLoading: boolean = true; // Add a loading state

    // Subscribe to isAuthenticated store reactively
    $: {
        isAuthenticated.subscribe((value) => {
            isLoggedIn = value;
            isLoading = false; // Set loading to false once we have the auth state

            // Redirect unauthenticated users immediately
            if (!isLoggedIn) {
                window.location.href = '/';
            }
        });
    }
</script>

{#if isLoading}
    <!-- Show a loading screen or spinner while waiting for auth state -->
    <div class="loader">Loading...</div> 
{:else}
    {#if isLoggedIn}
        <!-- Render child components if authenticated -->
        <slot />
    {:else}
        <!-- You can also show an alternative message for non-authenticated users if needed -->
        <p>You need to be logged in to access this page.</p>
    {/if}
{/if}

<style>
    .loader {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 1.5em;
        color: #333;
    }
</style>
