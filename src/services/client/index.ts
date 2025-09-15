import { planClientRequests } from "./plan-api";
import { authClientRequests } from "./auth-api";
import { subscriptionClientRequests } from "./subscription-api";
import { accountClientRequests } from "./account-api";
import { teamClientRequests } from "./team-api";
import { selectionClientRequests } from "./selection-api";
import { tenantClientRequest } from "./tenant-api";
import { notificationClientsRequests } from "./notification-api";

export const clientRequest = {
  tenant: tenantClientRequest,
  auth: authClientRequests,
  plan: planClientRequests,
  subscription: subscriptionClientRequests,
  user: accountClientRequests,
  team: teamClientRequests,
  selection: selectionClientRequests,
  notification: notificationClientsRequests,
};
