<script setup lang="ts">
import {computed} from "vue";

const props = defineProps({
  id: String,
  error: Boolean,
  modelValue: {
    type: [String, Number],
    default: ''
  },
  isSeparator: Boolean,
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
</script>

<template>
  <div class="mini-div-separator" v-if="props.isSeparator"></div>
  <input
    v-else
    :id="props.id"
    :class="{ 'has-error': props.error }"
    class="input-single"
    type="text"
    v-model="model"
    maxlength="1"
    @keyup="$emit('key-up', $event)"
    @focusout="$emit('focus-out')"
  />
</template>

<style scoped>
  input {
    &.input-single {
      width: 50px;
      height: 50px;
      font-size: 30px;
      text-align: center;
      border-radius: 5px;
      border-color: rgba(0,0,0,0.3);
      color: rgba(0, 0, 0, 0.75);

      &:focus, &:focus-visible {
        border-color: #1C6F77;
        box-shadow: 0 0 0 0.15rem rgba(28, 111, 119, 0.2);
        outline: none;
      }

      &::placeholder {
        color: rgba(0,0,0,0.1);
      }

      &.has-error {
        color: #FF5050 !important;
        border-color: #FF5050 !important;

        &::placeholder {
          color: rgba(255, 80, 80, 0.3) !important;
        }

        &:focus {
          border-color: #FF5050;
          box-shadow: 0 0 0 0.15rem rgba(255, 80, 80, 0.3);
        }
      }
    }
  }
  .mini-div-separator {
    width: 20px;
    height: 4px;
    background-color: #1C6F77;
  }
</style>