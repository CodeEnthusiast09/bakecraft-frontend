import { InferType } from "yup";
import { inviteStaffValidationSchema } from "@/validations";
import { clientRequestGateway } from "./client-request-gateway";

const requestGateway = clientRequestGateway();

export const teamClientRequests = {
  create: (payload: InferType<typeof inviteStaffValidationSchema>) =>
    requestGateway.post({ url: "auth/invite", payload }),
};
