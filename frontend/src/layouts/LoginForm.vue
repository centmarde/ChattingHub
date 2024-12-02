<template>
  <v-card class="pa-4">
    <slot name="header">
      <h2>Login</h2>
    </slot>
    <v-form ref="form" @submit.prevent="handleLogin">
      <v-text-field
        v-model="email"
        label="Email"
        type="email"
        required
        outlined
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        required
        outlined
      ></v-text-field>
      <v-btn type="submit" color="primary" class="mt-4" block>Login</v-btn>
    </v-form>
    <slot name="footer"></slot>
  </v-card>
</template>

<script>
import { useAuthStore } from "@/stores/login";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const toast = useToast();

    const handleLogin = async () => {
      const success = await authStore.login(email.value, password.value);
      if (!success) {
        toast.error("Login failed");
      } else {
        toast.success("Login successful");
        // Redirect to /dashboard or another route
        const redirect = router.currentRoute.value.query.redirect || "/dashboard";
        router.push(redirect);
      }
    };

    return { email, password, handleLogin };
  },
};
</script>
