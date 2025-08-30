import { clientRequestGateway } from "./client-request-gateway";

const requestGateway = clientRequestGateway();
export const accountClientRequests = {
  accountDetails: () => requestGateway.get(`profile/personal-details`),
};
