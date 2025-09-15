import { InferType } from "yup";
import { clientRequestGateway } from "./client-request-gateway";

const requestGateway = clientRequestGateway();

export const notificationClientsRequests = {
  getUserNotifications: () => requestGateway.get(`/notifications`),

  getUnreadCount: () => requestGateway.get(`/notifications/unread-count`),
};
