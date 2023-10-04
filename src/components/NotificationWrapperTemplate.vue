<script setup lang="ts">
import NotificationTemplate from "@/components/NotificationTemplate.vue";
import {computed, watch} from "vue";
import {Notifications} from "@/stores/notifications";

const not = Notifications()
const nots = computed(() => not.notifications)

</script>

<template>
  <div class="list-notifications" v-if="nots.length > 0">
    <NotificationTemplate
      v-for="(n, i) in nots"
      :key="`notification-${i}`"
      :variant="n.variant"
      :message="n.message"
      :id="n.id"
      :duration="n.duration"
    />
  </div>
</template>

<style scoped>

</style>