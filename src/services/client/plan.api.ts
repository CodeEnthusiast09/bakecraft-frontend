import { clientRequestGateway } from "./client-request-gateway";

const requestGateway = clientRequestGateway();

export const planClientRequests = {
  getAll: () => requestGateway.get(`/plans`),
};
