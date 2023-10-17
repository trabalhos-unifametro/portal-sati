import {defineStore} from 'pinia'
import { type Notification } from "@/interfaces"
import {ref, type Ref} from "vue";

export const Notifications = defineStore('notifications', () => {
  const notifications: Ref<Notification[]> = ref([])
  const _idGeneratorIncrement: Ref<number> = ref(0)
  const _defaultDurationNotification: Ref<number> = ref(5000)

  const set = (not: Notification) => {
    const id: number = _idGeneratorIncrement.value++
    notifications.value.push({
      id: id,
      message: not.message,
      variant: not.variant,
      duration: not.duration ?? _defaultDurationNotification.value,
    })
    _setTimeoutClearNotification(id, not.duration ?? _defaultDurationNotification.value)
  }

  const _setTimeoutClearNotification = (id: number, duration: number) => {
    setTimeout(() => {
      remove(id)
    }, duration)
  }

  const _getIndex = (index: number): number | null => {
    for (let i = 0; i < notifications.value.length; i ++) {
      if (notifications.value[i].id === index) {
        return i;
      }
    }
    return null
  }

  const remove = (i: number) => {
    let index: number | null | undefined = _getIndex(i)
    if (index !== null && index !== undefined) {
      notifications.value.splice(index, 1)
    }
  }

  return {
    set,
    remove,
    notifications
  } as const
})
