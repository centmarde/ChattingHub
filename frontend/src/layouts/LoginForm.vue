<template>
  <v-card class="bg-card" elevation="24">
    <h1 class="text-center pb-6">Chat Whisperer</h1>

    <v-form ref="form" @submit.prevent="handleLogin">
      <v-text-field
        v-model="email"
        color="blue-darken-1"
        placeholder="example@gmail.com"
        label="Email"
        variant="outlined"
        type="email"
        required
      />
      <v-text-field
        v-model="password"
        color="blue-darken-1"
        placeholder="············"
        label="Password"
        variant="outlined"
        :type="isPasswordVisible ? 'text' : 'password'"
        :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append-inner="isPasswordVisible = !isPasswordVisible"
        required
      />

      <div class="d-flex align-center justify-space-between flex-wrap mb-3">
        <v-checkbox
          class="d-flex align-center"
          color="blue-darken-1"
          label="Remember me"
        />
        <a class="text-blue-lighten-1" href="javascript:void(0)">
          Forgot Password?
        </a>
      </div>

      <v-btn
        type="submit"
        color="blue-darken-1"
        class="mt-1 rounded"
        size="large"
        block
        >Login</v-btn
      >
    </v-form>
    <slot name="footer" />
  </v-card>
</template>

<script>
import { useAuthStore } from "@/stores/auth"; // Importing the merged auth store
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export default {
  setup() {
    const authStore = useAuthStore(); // Access the auth store
    const router = useRouter();
    const email = ref(""); // Bind email input
    const password = ref(""); // Bind password input
    const toast = useToast();
    const isPasswordVisible = ref(false);

    const handleLogin = async () => {
      const success = await authStore.login(email.value, password.value); // Use the store's login action
      if (!success) {
        toast.error("Login failed"); // Display error toast if login fails
      } else {
        toast.success("Login successful"); // Display success toast if login succeeds
        // Redirect to the previously requested page, or to /dashboard if none is specified
        const redirect =
          router.currentRoute.value.query.redirect || "/dashboard";
        router.push(redirect);
      }
    };

    return { email, password, isPasswordVisible, handleLogin };
  },
};
</script>

<style scoped>
.bg-card {
  /* From https://css.glass */
  background: rgba(53, 108, 177, 0.22);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.3px);
  -webkit-backdrop-filter: blur(3.3px);
}
</style>
