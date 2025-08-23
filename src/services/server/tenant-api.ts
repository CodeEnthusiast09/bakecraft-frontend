import { serverRequestGateway } from "./server-request-gateway";

export const tenantServerRequest = {
  resolveTenantSlug: async (slug: string) =>
    await serverRequestGateway.get(`tenants/${slug}`),
};
