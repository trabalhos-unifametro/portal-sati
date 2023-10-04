<script lang="ts">
import {RouterLink} from "vue-router";
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Index",
  components: {
    RouterLink
  }
})

</script>

<template>
  <main class="w-100 h-100">
    <RouterView />
  </main>
</template>