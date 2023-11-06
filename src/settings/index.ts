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