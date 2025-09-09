import { planClientRequests } from "./plan-api";
import { authClientRequests } from "./auth-api";
import { subscriptionClientRequests } from "./subscription-api";
import { accountClientRequests } from "./account-api";
import { teamClientRequests } from "./team-api";
import { selectionClientRequests } from "./selection-api";

export const clientRequest = {
  auth: authClientRequests,
  plan: planClientRequests,
  subscription: subscriptionClientRequests,
  user: accountClientRequests,
  team: teamClientRequests,
  selection: selectionClientRequests,
};
