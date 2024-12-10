<template>
  <v-card class="bg-card" elevation="24">
    <h1 class="text-center pt-6 pb-4">Create an account</h1>
    <v-form ref="form" @submit.prevent="handleRegister">
      <v-text-field
        v-model="username"
        color="blue-lighten-2"
        label="Username"
        required
        outlined
      />
      <v-text-field
        v-model="email"
        color="blue-lighten-2"
        label="Email"
        type="email"
        required
        outlined
      />
      <v-text-field
        v-model="password"
        color="blue-lighten-2"
        label="Password"
        type="password"
        required
        outlined
      />
      <v-text-field
        v-model="confirmPassword"
        color="blue-lighten-2"
        label="Confirm Password"
        type="password"
        required
        outlined
      />
      <v-row class="pb-10 pt-2">
        <v-col>
          <v-btn @click="handleBack" color="grey-darken-2" block>Back</v-btn>
        </v-col>
        <v-col>
          <v-btn type="submit" color="primary" block>Submit</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import { useAuthStore } from "@/stores/auth"; // Import the authStore
import { ref } from "vue";

export default {
  props: {
    modelValue: Boolean,
  },
  emits: ["update:modelValue"],

  setup(props, { emit }) {
    const authStore = useAuthStore();
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");

    const handleRegister = async () => {
      if (
        !username.value ||
        !email.value ||
        !password.value ||
        !confirmPassword.value
      ) {
        toast.error("Please fill out all fields.");
        return false;
      }

      const success = await authStore.register(
        username.value,
        email.value,
        password.value,
        confirmPassword.value
      );

      if (success) {
        emit("update:modelValue", false); // Close dialog after successful registration
      } else {
        // Error handling is done in the authStore
      }
    };

    const handleBack = () => {
      emit("update:modelValue", false); // Close the dialog without registering
    };

    return {
      username,
      email,
      password,
      confirmPassword,
      handleRegister,
      handleBack,
    };
  },
};
</script>

<style scoped>
.bg-card {
  /* From https://css.glass */
  background: #0e2947e4;
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.3px);
  -webkit-backdrop-filter: blur(3.3px);
}
</style>
