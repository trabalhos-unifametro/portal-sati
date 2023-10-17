import {type InjectionKey, provide} from 'vue';
import axios, {type AxiosInstance} from 'axios';
import {baseUrl} from "@/settings";
import {session} from "@/stores/session";

export const apiSymbol: InjectionKey<AxiosInstance> = Symbol()

export function apis() {
  // Here we set the base URL for all requests made to the api
  const api = axios.create({
    baseURL: `${baseUrl}`
  })

  // We set an interceptor for each request to
  // include Bearer token to the request if user is logged in
  api.interceptors.request.use((config: any) => {
    const userSession: any = session()

    if (userSession.isLoggedIn) {
      config.headers = {
        ...config.headers,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json, text/plain, */*',
        'Access-Control-Allow-Headers': 'Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin',
        'Authorization': userSession.user.token_api,
      }
    }

    return config
  })

  api.interceptors.response.use(
    (response: any) => {
      return Promise.resolve(response);
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );

  provide(apiSymbol, api)

  return api
}
