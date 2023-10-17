import {defineStore} from 'pinia'

export const Modals = defineStore('modals', () => {
  const show = (id: string) => {
    const modal: HTMLElement | null = document.getElementById(id)
    if (modal !== null) {
      modal.classList.add('show')
      modal.style.display = 'block'
    }
  }

  const hide = (id: string) => {
    const btnClose: HTMLElement | null = document.getElementById(id)
    if (btnClose !== null) {
      btnClose.click()
    }
  }

  return {
    show,
    hide
  } as const
})
