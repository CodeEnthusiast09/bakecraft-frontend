import { InferType } from "yup";
import { clientRequestGateway } from "./client-request-gateway";
import { tenantSignUpValidationSchema } from "@/validations";

const requestGateway = clientRequestGateway({ prependTenantId: false });

export const tenantClientRequest = {
  tenantSignUp: (payload: InferType<typeof tenantSignUpValidationSchema>) =>
    requestGateway.post({
      url: `tenants`,
      payload,
    }),
};
