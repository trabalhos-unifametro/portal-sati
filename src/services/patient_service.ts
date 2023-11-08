import {apis} from "@/services/api";
import {routePatientList, routePatientTotalizators} from "@/settings";

export const getPatientsTotalizators = async (filters="") => {
  return await apis().get(`${routePatientTotalizators}${filters}`)
}

export const getPatientsList = async (filters="") => {
  return await apis().get(`${routePatientList}${filters}`)
}