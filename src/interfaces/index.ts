export interface UserSession {
  id: number
  name: string
  email: string
  role: string
  cellphone: string
}

export interface Notification {
  id: number
  message: string
  variant: string
  duration: number
}