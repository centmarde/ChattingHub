<script>  
import Button, { Label, Icon } from '@smui/button';
import TopNav from '../../lib/TopNav.svelte';
import AuthGuard from "../../auth/AuthGuard.svelte";
</script>
<TopNav />
<AuthGuard><h1>Chat</h1></AuthGuard>

