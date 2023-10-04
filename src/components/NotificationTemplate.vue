<script setup lang="ts">
import CloseOctagon from "vue-material-design-icons/CloseOctagon.vue";
import Close from "vue-material-design-icons/Close.vue";
import CheckCircle from "vue-material-design-icons/CheckCircle.vue";
import Alert from "vue-material-design-icons/Alert.vue";
import Information from "vue-material-design-icons/Information.vue";
import {onMounted, ref, type Ref} from "vue";
import {Notifications} from "@/stores/notifications";

const not = Notifications()
const closeTimeout: Ref<number | null | undefined> = ref(null)
const props = defineProps({
  id: {
    type: Number,
    default: 0
  },
  message: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'info'
  },
  duration: {
    type: Number,
    default: 10000
  }
})

const clearTimeoutNotification = () => {
  if (closeTimeout.value !== null && closeTimeout.value !== undefined) {
    clearTimeout(closeTimeout.value)
  }
}

const closeNotification = () => {
  not.remove(props.id)
  clearTimeoutNotification()
}

</script>

<template>
  <div :class="['notification-template', props.variant]">
    <div class="suffix-icon-notification">
      <close-octagon v-if="props.variant?.toLowerCase() === 'danger'" :size="50" class="font-color-white-8"/>
      <check-circle v-else-if="props.variant?.toLowerCase() === 'success'" :size="40" class="font-color-white-8"/>
      <alert v-else-if="props.variant?.toLowerCase() === 'warning'" :size="40" class="font-color-white-8"/>
      <information v-else :size="40" class="font-color-white-8"/>
    </div>
    <div class="content-notification">
      {{ props.message }}
    </div>
    <div class="prefix-icon-notification">
      <close :size="40" class="font-color-white-8" @click="closeNotification"/>
    </div>
  </div>
</template>