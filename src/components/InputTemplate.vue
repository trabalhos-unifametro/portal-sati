<script setup lang="ts">
import {useSlots, computed, ref, watch, onMounted} from "vue";
import { vMaska } from "maska"

const slots = useSlots()
const hasFocused = ref(false)
const optionsData: any = ref([])

const props = defineProps({
  id: String,
  label: String,
  classes: String,
  errors: {
    type: Object,
    // eslint-disable-next-line vue/require-valid-default-prop
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
  prefixIconWithoutBorder: {
    type: Boolean,
    default: false
  },
  select: {
    type: Boolean,
    default: false
  },
  options: {
    type: Array,
    // eslint-disable-next-line vue/require-valid-default-prop
    default: []
  },
  mask: {
    type: String,
    default: ''
  }
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

watch(
  () => model.value,
  (value) => {
    if (props.select) {
      if (value.toString().trim().length > 0) {
        optionsData.value = props.options?.filter(item => {
          return item?.toString().trim().toLowerCase().indexOf(value?.toString().trim().toLowerCase()) !== -1
        })
      } else {
        optionsData.value = props.options
      }
    }
  }
)

const toggleOptionsSelect = (value: boolean) => {
  setTimeout(() => {
    hasFocused.value = value
    if (!value) {
      optionsData.value = props.options
    }
  }, 150)
}

const selectedOption = (value: any) => {
  model.value = value
  emit('update:modelValue', value)
}

const clearSelected = () => {
  model.value = ''
  emit('update:modelValue', '')
}

const prefixIconSlot = slots['prefix-input']
const suffixIconSlot = slots['suffix-input']

onMounted(() => {
  optionsData.value = props.options
})

</script>

<template>
  <label v-if="props.label && props.label.length > 0" :for="props.id" class="form-label">{{ props.label }}</label>
  <div class="input-group-template" :class="{
    'error': props.errors?.err,
    'prefix-without-border': props.prefixIconWithoutBorder,
    'input-focus': hasFocused,
    'input-with-options': props.select
  }">
    <span class="prefix-icon-input" v-if="prefixIconSlot">
      <slot name="prefix-input"></slot>
    </span>
    <input
      :type="props.type"
      v-model="model"
      :placeholder="props.placeholder"
      v-maska :data-maska="props.mask"
      class="form-control"
      :class="{ 'has-prefix': prefixIconSlot, 'has-suffix': suffixIconSlot || (props.select && model.toString().length === 0), 'has-suffix-select': (props.select && model.toString().length > 0) }"
      :id="props.id"
      @focus="toggleOptionsSelect(true)"
      @focusout="toggleOptionsSelect(false)"
    >
    <div class="footer-group-input">{{ props.errors?.message }}</div>
    <span class="suffix-icon-input" v-if="suffixIconSlot && !props.select">
      <slot name="suffix-input"></slot>
    </span>
    <span class="suffix-icon-input" v-if="props.select">
      <i class="bi-x-lg font-color-black-3 font-size-12px clear-search"
         :class="{ 'show-clear': model.toString().length > 0 }"
         @click="clearSelected()"
      ></i>
      <i class="bi-caret-down-fill font-color-black-3 rotate" :class="{ 'deg-178': hasFocused }"></i>
    </span>
    <div class="options-input" v-if="optionsData.length > 0 && props.select">
      <div class="item-option" v-for="(item, index) in optionsData" :key="`option-${index}`" @click="selectedOption(item)">
        <span> {{ item }} </span>
      </div>
    </div>
    <div class="options-input" v-else-if="optionsData.length === 0 && props.select">
      <div class="item-option-not-found">
        <span> Nenhum resultado encontrado. </span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>