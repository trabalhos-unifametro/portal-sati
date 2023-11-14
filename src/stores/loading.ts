import {defineStore} from "pinia";
import {ref, type Ref, type UnwrapRef} from 'vue'

export const Loading = defineStore('loading', () => {
  const loading: Ref<UnwrapRef<boolean>> = ref(false)

  const show = () => {
    loading.value = true
  }

  const hide = () => {
    loading.value = false
  }

  return {
    show,
    hide,
    loading
  } as const
})
