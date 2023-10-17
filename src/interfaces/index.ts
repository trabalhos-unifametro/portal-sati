export interface UserSession {
  id: number
  name: string
  email: string
  role: string
  cellphone: string
  token_api: string
}

export interface Notification {
  id?: number
  message: string
  variant: string
  duration?: number
}

export interface RequestSignIn {
  email: string
  password: string
}

export interface RequestGenerateCode {
  email: string
}

export interface RequestConfirmCode {
  email: string
  code_recovery: string
}

export interface RequestRecoverPassword {
  email: string
  new_password: string
  confirm_new_password: string
  code_recovery: string
}