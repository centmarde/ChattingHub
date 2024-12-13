<script>
    import AuthGuard from "../auth/AuthGuard.svelte";
    import TopNav from "../lib/TopNav.svelte";
</script>
<TopNav />
<AuthGuard> <h1>Dashboard</h1> <a href="/chat">About my site</a></AuthGuard>
