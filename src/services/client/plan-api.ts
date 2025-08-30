import { clientRequestGateway } from "./client-request-gateway";

const requestGateway = clientRequestGateway({ prependTenantId: false });

export const planClientRequests = {
  getAll: () => requestGateway.get(`/plans`),
};
