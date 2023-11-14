<script setup lang="ts">
  import {Loading} from "@/stores/loading";

  const load = Loading()
  const year = new Date().getFullYear()
</script>

<template>
  <div class="footer" :class="{ 'loading': load.loading }">
    Copyright © {{ year }} Hospital Medical Care
  </div>
</template>

<style scoped>

</style>