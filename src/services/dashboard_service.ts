import {apis} from "@/services/api";
import {
  routeDashboardGraphicOccupationMonthly,
  routeDashboardGraphicPatients,
  routeDashboardGraphicUnits,
  routeDashboardTotalizatorsPatients,
  routeDashboardTotalizatorsUnits,
} from "@/settings";

export const dashboardTotalizatorsUnits = async (filters="") => await apis().get(routeDashboardTotalizatorsUnits+filters)
export const dashboardGraphicUnits = async () => await apis().get(routeDashboardGraphicUnits)
export const dashboardTotalizatorsPatients = async () => await apis().get(routeDashboardTotalizatorsPatients)
export const dashboardGraphicPatients = async () => await apis().get(routeDashboardGraphicPatients)
export const dashboardGraphicOccupationMonthly = async () => await apis().get(routeDashboardGraphicOccupationMonthly)