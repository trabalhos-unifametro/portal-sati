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

export interface ResponsePatientByUnit {
  patient_id:                    number
  unit_id:                       number
  hospitalization_code:          number
  patient_name:                  string
  expected_hospitalization_time: string
  current_hospitalization_time:  string
  situation_id:                  number
  situation:                     string
  medical_record_id:             number
  mother_name:                   string
  cpf:                           string
  gender:                        string
  unit_name:                     string
  street:                        string
  number:                        number
  neighborhood:                  string
  city:                          string
  state:                         string
  zip_code:                      string
  complement:                    string
}

export interface ResponseMedicalRecord {
  allergy:              string
  caregiver_contact:    string
  city:                 string
  complement:           string
  date_of_birth:        string
  doctors:              string
  email:                string
  gender:               string
  hospitalization_code: number
  limitation:           string
  neighborhood:         string
  number:               string
  occupation:           string
  opening_date:         string
  patient_id:           number
  patient_name:         string
  schooling:            string
  state:                string
  street:               string
  telephone:            string
  unit_id:              number
  unit_name:            string
  zip_code:             string
}

export interface Status {
  id: number
  name: string
}

export interface ResponseTotalizatorsPatient {
  total:                 number
  hospitalized_patients: number
  waiting_patients:      number
}

export interface ResponsePatient {
  patient_id:                    number
  unit_id:                       number
  hospitalization_code:          number
  patient_name:                  string
  expected_hospitalization_time: string
  current_hospitalization_time:  string
  situation_id:                  number
  situation:                     string
  status_id:                     number
  status:                        string
  medical_record_id:             number
  mother_name:                   string
  cpf:                           string
  gender:                        string
  unit_name:                     string
  street:                        string
  number:                        number
  neighborhood:                  string
  city:                          string
  state:                         string
  zip_code:                      string
  complement:                    string
}

export interface UpdateUser {
  id:        number
  email:     string
  cellphone: string
}