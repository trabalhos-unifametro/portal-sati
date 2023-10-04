import {defineStore} from 'pinia'

export const Modals = defineStore('modals', () => {
  const show = (id: string) => {
    let modal: HTMLElement | null = document.getElementById(id)
    if (modal !== null) {
      modal.classList.add('show')
      modal.style.display = 'block'
    }
  }

  const hide = (id: string) => {
    let modal: HTMLElement | null = document.getElementById(id)
    if (modal !== null) {
      modal.classList.remove('show')
      modal.style.display = 'none'
    }
  }

  return {
    show,
    hide
  } as const
})
