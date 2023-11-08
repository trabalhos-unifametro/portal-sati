import {apis} from "@/services/api";
import {routeStatusList} from "@/settings";

export const getListStatus = async (filters: string) => {
  return await apis().get(`${routeStatusList}${filters}`)
}