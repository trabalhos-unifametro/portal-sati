import {apis} from "@/services/api";
import {routeUnitList, routeUnitTotalizators} from "@/settings";

export const getListUnits = async (filters="") => await apis().get(routeUnitList+filters)
export const getTotalizatorsUnits = async (id: number, filters="") => {
  return await apis().get(`${routeUnitTotalizators}/${id}${filters}`)
}