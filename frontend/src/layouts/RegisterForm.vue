<template>
  <v-card class="pa-4">
    <slot name="header">
      <h2>Register</h2>
    </slot>
    <v-form ref="form" @submit.prevent="handleRegister">
      <v-text-field
        v-model="username"
        label="Username"
        required
        outlined
      ></v-text-field>
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
      <v-text-field
        v-model="confirmPassword"
        label="Confirm Password"
        type="password"
        required
        outlined
      ></v-text-field>
      <v-row>
        <v-col>
          <v-btn @click="handleBack" color="secondary" block>Back</v-btn>
        </v-col>
        <v-col>
          <v-btn type="submit" color="primary" block>Submit</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import { useAuthStore } from '@/stores/auth'; // Import the authStore
import { ref } from 'vue';

export default {
  props: {
    modelValue: Boolean,
  },
  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const authStore = useAuthStore();
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');

 const handleRegister = async () => {
  if (!username.value || !email.value || !password.value || !confirmPassword.value) {
    toast.error("Please fill out all fields.");
    return false;
  }

  const success = await authStore.register(username.value, email.value, password.value, confirmPassword.value);

  if (success) {
    emit('update:modelValue', false); // Close dialog after successful registration
  } else {
    // Error handling is done in the authStore
  }
};


    const handleBack = () => {
      emit('update:modelValue', false); // Close the dialog without registering
    };

    return { username, email, password, confirmPassword, handleRegister, handleBack };
  },
};
</script>
