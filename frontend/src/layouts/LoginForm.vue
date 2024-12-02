<template>
    <v-card class="pa-4">
      <slot name="header">
        <h2>Login</h2>
      </slot>
      <v-form ref="form" @submit.prevent="handleLogin">
        <v-text-field
          v-model="username"
          label="Username"
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
  import { useAuthStore } from "@/stores/auth";
  import { ref } from "vue";
  
  export default {
    setup() {
      const authStore = useAuthStore();
      const username = ref("");
      const password = ref("");
  
      const handleLogin = () => {
        if (!authStore.login(username.value, password.value)) {
          alert("Login failed");
        }
      };
  
      return { username, password, handleLogin };
    },
  };
  </script>
  