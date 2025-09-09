import { clientRequestGateway } from "./client-request-gateway";

const requestGateway = clientRequestGateway();

export const selectionClientRequests = {
  departments: () => requestGateway.get("/selections/departments"),

  roles: () => requestGateway.get("/selections/roles"),
};
