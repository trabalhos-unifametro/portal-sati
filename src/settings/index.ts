const versionApi: string = 'v1';
export const baseUrl: string = `http://localhost:5000/api/${versionApi}`;

export const routeSignIn: string = '/auth/signin';
export const routeGenerateCode: string = '/auth/generate_code';
export const routeConfirmCode: string = '/auth/confirm_code';
export const routeRecoverPassword: string = '/auth/recover_password';