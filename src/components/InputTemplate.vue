<script setup lang="ts">
import {useSlots, computed} from "vue";

const slots = useSlots()

const props = defineProps({
  id: String,
  label: String,
  classes: String,
  errors: {
    type: Object,
    default: { err: false, message: '' }
  },
  placeholder: String,
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
})

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get () {
    return props.modelValue
  },

  set (value) {
    return emit('update:modelValue', value)
  }
})

const prefixIconSlot = slots['prefix-input']
const suffixIconSlot = slots['suffix-input']

</script>

<template>
  <div class="input-group-template" :class="{ 'error': props.errors?.err }">
    <span class="prefix-icon-input" v-if="prefixIconSlot">
      <slot name="prefix-input"></slot>
    </span>
    <input
      :type="props.type"
      v-model="model"
      :placeholder="props.placeholder"
      class="form-control"
      :class="{ 'has-prefix': prefixIconSlot, 'has-suffix': suffixIconSlot }"
      :id="props.id"
    >
    <div class="footer-group-input">{{ props.errors?.message }}</div>
    <span class="suffix-icon-input" v-if="suffixIconSlot">
      <slot name="suffix-input"></slot>
    </span>
  </div>
</template>

<style scoped>

</style>