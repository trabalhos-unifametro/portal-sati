<script setup lang="ts">
import { ref, type Ref, type UnwrapRef } from 'vue'

const props = defineProps({
  keys: {
    type: Array<string>,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  item: {
    type: null,
    required: true
  }
})

const item: Ref<UnwrapRef<any>> = ref(props.item)
const index: Ref<UnwrapRef<Number | undefined>> = ref(props.index)

</script>

<template>
  <tr>
    <slot></slot>
  </tr>
  <tr v-if="props.item?._details === true">
    <td :colspan="props.keys?.length">
      <slot name="row-details" :item="item" :index="index"></slot>
    </td>
  </tr>
</template>

<style scoped>

</style>