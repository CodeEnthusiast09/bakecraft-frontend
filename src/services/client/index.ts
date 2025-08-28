import { planClientRequests } from "./plan.api";
import { authClientRequests } from "./auth.api";

export const clientRequest = {
  auth: authClientRequests,
  plan: planClientRequests,
};
