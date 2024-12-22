<template>
  <div class="bg">
    <BackgroundSvg />
  </div>

  <div class="login-container">
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="5" lg="5" md="5" class="px-8">
          <login-form class="pa-10">
            <template #footer>
              <v-card-text class="text-center mt-3">
                <span class="text-center font-weight-light">
                  New on our platform?
                </span>
                <span
                  class="text-blue-lighten-1 text-decoration-none cursor-pointer"
                  @click="switchToRegister"
                >
                  Create an account
                </span>
              </v-card-text>
            </template>
          </login-form>
        </v-col>
        <v-col cols="5" md="5" lg="5">
          <ChattingHubSvg />
        </v-col>
      </v-row>
    </v-container>
  </div>

  <v-dialog v-model="showRegister" persistent>
    <v-row justify="center" align="center">
      <v-col cols="10" lg="4" md="6" sm="6">
        <register-form v-model="showRegister" class="px-10">
          <template #footer>
            <!-- Optional footer content for the register form -->
          </template>
        </register-form>
      </v-col>
    </v-row>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
import LoginForm from "@/layouts/LoginForm.vue";
import RegisterForm from "@/layouts/RegisterForm.vue";
import BackgroundSvg from "@/components/svg/BackgroundSvg.vue";
import ChattingHubSvg from "./svg/ChattingHubSvg.vue";

const showRegister = ref(false);

const switchToRegister = () => (showRegister.value = true);
</script>

<style scoped>
.bg {
  position: absolute;
  height: 100vh;
  width: auto;
  overflow: hidden;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
