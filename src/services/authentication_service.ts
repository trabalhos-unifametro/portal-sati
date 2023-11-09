import {
  routeConfirmCode,
  routeGenerateCode,
  routeRecoverPassword,
  routeSignIn,
  routeUserUpdate
} from "@/settings";
import {apis} from "@/services/api";
import type {
  RequestConfirmCode,
  RequestGenerateCode,
  RequestRecoverPassword,
  RequestSignIn,
  UpdateUser
} from "@/interfaces";

export const signIn = async (body: RequestSignIn) => await apis().post(routeSignIn, body)

export const generateAndSendCodePerEmail = async (body: RequestGenerateCode) => await apis().post(routeGenerateCode, body)

export const confirmCode = async (body: RequestConfirmCode) => await apis().post(routeConfirmCode, body)

export const recoverPassword = async (body: RequestRecoverPassword) => await apis().put(routeRecoverPassword, body)

export const updateUser = async (user: UpdateUser) => await apis().put(`${routeUserUpdate}`, user)