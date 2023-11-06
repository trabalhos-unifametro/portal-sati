export interface UserSession {
  id:        number
  name:      string
  email:     string
  role:      string
  cellphone: string
  token_api: string
}

export interface Notification {
  id?:       number
  message:   string
  variant:   string
  duration?: number
}

export interface RequestSignIn {
  email:    string
  password: string
}

export interface RequestGenerateCode {
  email: string
}

export interface RequestConfirmCode {
  email:         string
  code_recovery: string
}

export interface RequestRecoverPassword {
  email:                string
  new_password:         string
  confirm_new_password: string
  code_recovery:        string
}

export interface ResponseDashboardTotalizatorsUnits {
  total:          number
  with_vacancies: number
  no_vacancy:     number
}

export interface ResponseDashboardGraphicUnits {
  with_vacancies: number
  no_vacancy:     number
}

export interface ResponseDashboardTotalizatorsPatients {
  total:          number
  within_period:  number
  outside_period: number
}

export interface ResponseDashboardGraphicPatients {
  patients_in_unit:      number
  patients_waiting_unit: number
}

export interface ResponseDashboardGraphicMonthlyOccupation {
  month:                 number
  year:                  number
  total_vacancies_units: number
  total_vacancies:       number
  total_occupation:      number
}

export interface ResponseUnit {
  id:                       number
  name:                     string
  max_patient_capacity:     number
  current_patient_capacity: number
  number_of_vacancies:      number
  status:                   string
}

export interface ResponseUnitTotalizators {
  unit_name:    string
  qtd_max:      number
  qtd_patients: number
  vacancies:    number
}