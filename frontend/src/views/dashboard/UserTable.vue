<script setup>
import { defineProps } from "vue";
import avatar1 from "@/assets/images/avatars/avatar-1.png";
import avatar2 from "@/assets/images/avatars/avatar-2.png";
import avatar3 from "@/assets/images/avatars/avatar-3.png";
import avatar4 from "@/assets/images/avatars/avatar-4.png";
import avatar5 from "@/assets/images/avatars/avatar-5.png";
import avatar6 from "@/assets/images/avatars/avatar-6.png";
import avatar7 from "@/assets/images/avatars/avatar-7.png";
import avatar8 from "@/assets/images/avatars/avatar-8.png";

const props = defineProps({
  userData: {
    type: Array,
    required: true,
  },
});

const headers = [
  {
    title: "User",
    key: "username",
  },
  {
    title: "Email",
    key: "email",
  },
  {
    title: "Status",
    key: "status",
  },
];

const resolveUserStatusVariant = (stat) => {
  const statLowerCase = stat.toLowerCase();
  if (statLowerCase === "pending") return "warning";
  if (statLowerCase === "active") return "success";
  if (statLowerCase === "inactive") return "secondary";

  return "primary";
};
</script>

<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="userData"
      item-value="id"
      class="text-no-wrap"
    >
      <!-- User -->
      <template #item.username="{ item }">
        <div class="d-flex align-center" style="gap: 15px">
          <v-avatar size="34" :variant="!item.avatar ? 'tonal' : undefined">
            <v-img v-if="item.avatar" :src="item.avatar" />
          </v-avatar>

          <div class="d-flex flex-column">
            <h6 class="text-h6 font-weight-medium user-list-name">
              {{ item.username }}
            </h6>
          </div>
        </div>
      </template>
      <!-- Status -->
      <template #item.status="{ item }">
        <v-chip
          :color="resolveUserStatusVariant(item.status)"
          size="small"
          class="text-capitalize"
        >
          {{ item.status }}
        </v-chip>
      </template>

      <template #bottom />
    </v-data-table>
  </v-card>
</template>
