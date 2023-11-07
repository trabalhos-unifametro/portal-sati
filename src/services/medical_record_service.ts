import {apis} from "@/services/api";
import {routeMedicalRecordFindByID} from "@/settings";

export const getMedicalRecordByID = async (id: number) => {
  return await apis().get(`${routeMedicalRecordFindByID}/${id}`)
}