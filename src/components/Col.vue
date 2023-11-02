<script setup lang="ts">

const returnSize = (size: any) => {
  const defaultSize: Array<string> = ['sm', 'lg', 'xl', 'xxl']
  return defaultSize.indexOf(size?.toLowerCase()) === -1 ? 'sm' : size?.toLowerCase()
}

const returnCols = (cols: any) => {
  const defaultCols: Array<string> = ['1','2','3','4','5','6','7','8','9','10','11','12','auto']
  return defaultCols.indexOf(cols?.toLowerCase()) === -1 ? 'auto' : cols?.toLowerCase()
}

const props = defineProps({
  cols: {
    type: String,
    default: 'auto'
  },
  size: {
    type: String,
    default: 'sm'
  },
  classes: {
    type: String,
    default: '',
    required: false
  }
})
</script>

<template>
  <div :class="`col-${returnSize(props.size)}-${returnCols(props.cols)} ${props.classes ?? ''}`">
    <slot></slot>
  </div>
</template>

<style scoped>

</style>