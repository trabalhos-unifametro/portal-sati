const versionApi: string = 'v1';
export const baseUrl: string = `http://localhost:5000/api/${versionApi}`;

// AUTHENTICATION SERVICE ====================================================
export const routeSignIn: string = '/auth/signin';
export const routeGenerateCode: string = '/auth/generate_code';
export const routeConfirmCode: string = '/auth/confirm_code';
export const routeRecoverPassword: string = '/auth/recover_password';

// DASHBOARD SERVICE =========================================================
export const routeDashboardTotalizatorsUnits: string = '/dashboard/units/totalizators';
export const routeDashboardGraphicUnits: string = '/dashboard/units/graphic';
export const routeDashboardTotalizatorsPatients: string = '/dashboard/patients/totalizators';
export const routeDashboardGraphicPatients: string = '/dashboard/patients/graphic';
export const routeDashboardGraphicOccupationMonthly: string = '/dashboard/monthly_occupation/graphic';


// UNIT SERVICE ==============================================================
export const routeUnitList: string = '/units/list'
export const routeUnitTotalizators: string = '/units/totalizators'
export const routeUnitListPatients: string = '/units/patients'


// MEDICAL RECORD SERVICE ====================================================
export const routeMedicalRecordFindByID: string = '/medical_record/find_by_id'

// PATIENT SERVICE ===========================================================
export const routePatientTotalizators: string = '/patients/totalizators'
export const routePatientList: string = '/patients/list'

// STATUS SERVICE ============================================================
export const routeStatusList: string = '/status/list'

// USER SERVICE ==============================================================
export const routeUserUpdate: string = '/user/update'
export const routeUserMyData: string = '/user/mydata'