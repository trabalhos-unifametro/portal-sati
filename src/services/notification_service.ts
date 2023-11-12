import {apis} from "@/services/api";
import {routeNotificationList, routeNotificationRead} from "@/settings";
import type {ReadNotification} from "@/interfaces";

export const getListNotifications = async (userID: number) => {
  return await apis().get(`${routeNotificationList}/${userID}`)
}

export const readNotifications = async (userID: number, notificationID: number) => {
  return await apis().put(`${routeNotificationRead}/${userID}`, { id: notificationID })
}