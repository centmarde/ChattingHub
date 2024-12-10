<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer expand-on-hover rail color="#0e253f" elevation="5">
        <!-- Chat Hub -->
        <v-list class="mb-2 mt-1">
          <v-list-item
            :prepend-avatar="chatAvatar"
            title="ChatHub"
          ></v-list-item>
        </v-list>

        <v-list density="compact" nav>
          <!-- Dashboard -->
          <v-list-item
            prepend-icon="mdi-view-dashboard"
            title="Dashboard"
            value="dashboard"
            class="mb-3"
          ></v-list-item>

          <!-- Chats -->
          <v-list-item
            prepend-icon="mdi-chat"
            title="Chats"
            value="chats"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main class="custom-main">
        <header>
          <v-card
            height="65px"
            rounded="0"
            flat
            color="transparent"
            elevation="0"
          >
            <v-toolbar color="#0e253f">
              <v-app-bar-nav-icon></v-app-bar-nav-icon>

              <v-spacer></v-spacer>

              <!-- Notification Icon -->
              <v-btn size="x-small" variant="tonal" icon class="mr-3">
                <v-icon>mdi-bell</v-icon>
              </v-btn>

              <!-- User Settings -->
              <v-btn rounded="xl" size="large" variant="tonal">
                <v-avatar size="25" class="mr-2">
                  <v-img src="@/assets/images/avatars/avatar-1.png"></v-img>
                </v-avatar>
                <v-icon>mdi-cog</v-icon>
              </v-btn>
            </v-toolbar>
          </v-card>
        </header>

        <v-container fluid class="main-container pa-8 rounded-xl">
          <v-row>
            <VCol cols="12">
              <UserTable />
            </VCol>
          </v-row>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import chatAvatar from "@/assets/images/icon/chat.png";
import UserTable from "@/views/dashboard/UserTable.vue";
</script>

<style scoped>
.custom-main {
  height: 100vh;
  background-color: #0e253f;
}

.main-container {
  background-color: #000f20;
}

/* Deep CSS to remove left border of v-navigation-drawer */
:deep(.v-navigation-drawer--left) {
  border-right-width: none !important;
  border-right: none !important;
}
</style>
