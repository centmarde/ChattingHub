<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="8">

      </v-col>
      <v-col cols="12"  lg="4">
        <br> <br> <br> <br>
        <login-form>
      <template #header>
       
        <h2 class="text-center mt-5">Welcome Back</h2>
      </template>
      <template #footer>
        <v-btn text @click="switchToRegister">Don't have an account? Register</v-btn>
      </template>
    </login-form>
      </v-col>
    </v-row>
   
    
    <v-dialog v-model="showRegister" persistent max-width="400px">
      <register-form v-model="showRegister">
        <template #header>
          <h2 class="text-center">Create an Account</h2>
        </template>
        <template #footer>
          <!-- Optional footer content for the register form -->
        </template>
      </register-form>
    </v-dialog>
  </v-container>
</template>

<script>
import { ref } from "vue";
import LoginForm from "@/layouts/LoginForm.vue";
import RegisterForm from "@/layouts/RegisterForm.vue";

export default {
  components: { LoginForm, RegisterForm },
  setup() {
    const showRegister = ref(false);

    const switchToLogin = () => (showRegister.value = false);
    const switchToRegister = () => (showRegister.value = true);

    return { showRegister, switchToLogin, switchToRegister };
  },
};
</script>
