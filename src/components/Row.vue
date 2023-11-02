<script setup lang="ts">

const mountRow = (): string => {
  let row: string = 'row'
  const mode: string = props.mode?.toLowerCase()
  const size: string = props.size?.toLowerCase()
  const cols: string = props.cols?.toLowerCase()
  const defaultMode: Array<string> = ['gap', 'cols']
  const defaultSize: Array<string> = ['sm','lg','xl','xxl']
  const defaultGaps: Array<string> = ['0','1','2','3','4','5']
  const defaultCols: Array<string> = ['1','2','3','4','5','6','auto']

  if (defaultMode.indexOf(mode) !== -1) {
    row += `-${mode}`

    if (defaultSize.indexOf(size) !== -1) {
      row += `-${size}`
    }
    if (mode === 'gap') {
      if (defaultGaps.indexOf(cols) !== -1) {
        row += `-${cols}`
      } else {
        row += `-auto`
      }
    } else {
      if (defaultCols.indexOf(cols) !== -1) {
        row += `-${cols}`
      } else {
        row += `-auto`
      }
    }
  }

  return row
}

const props = defineProps({
  mode: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: ''
  },
  cols: {
    type: String,
    default: ''
  },
  classes: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div :class="[mountRow(), props.classes]">
    <slot></slot>
  </div>
</template>