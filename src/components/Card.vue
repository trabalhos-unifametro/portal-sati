<script setup lang="ts">
import {useSlots} from "vue";

const slots = useSlots()

const props = defineProps({
  title: String,
  subtitle: String,
  classes: String,
  classesBody: String,
  classesWithoutBody: String,
  minHeight: {
    type: String,
    default: 'auto'
  },
  verticalAlignBody: {
    type: String,
    default: 'start'
  },
  withBorder: {
    type: Boolean,
    default: false
  },
  hasBody: {
    type: Boolean,
    default: true
  }
})

const classesBody = (): string => {
  let classes: string = 'text-center card-body-default'

  if (props.hasBody) {
    classes += ' card-body'
  }
  if (props.classesBody) {
    classes += ` ${props.classesBody}`
  }

  return classes
}

const classesCard = (): string => {
  let classes: string = 'card'

  if (!props.withBorder) {
    classes += ' border-none'
  }
  if (props.classes) {
    classes += ` ${props.classes}`
  }

  return classes
}

const contentWithBody = slots['content-with-body']
const contentWithoutBody = slots['content-without-body']
</script>

<template>
  <div :class="classesCard()">
    <div :class="classesBody()" v-if="contentWithBody">
      <slot name="content-with-body"></slot>
    </div>
    <div :class="props.classesWithoutBody" v-else-if="contentWithoutBody">
      <slot name="content-without-body"></slot>
    </div>
    <div :class="classesBody()" v-else>
      <span class="h2">{{ props.title }}</span>
      <span class="font-size-20px">{{ props.subtitle }}</span>
    </div>
  </div>
</template>

<style scoped>
  .card-body-default {
    min-height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
</style>