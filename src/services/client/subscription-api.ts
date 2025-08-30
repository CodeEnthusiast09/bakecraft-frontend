import { InferType } from "yup";
import { clientRequestGateway } from "./client-request-gateway";
import { subscriptionValidationSchema } from "@/validations/subscription";

const requestGateway = clientRequestGateway({ prependTenantId: false });

export const subscriptionClientRequests = {
  subscribe: (payload: InferType<typeof subscriptionValidationSchema>) =>
    requestGateway.post({ url: `/subscriptions/initialize`, payload }),
};
