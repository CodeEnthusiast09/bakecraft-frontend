import { InferType } from "yup";
import { clientRequestGateway } from "./client-request-gateway";
import { signInValidationSchema, signUpValidationSchema } from "@/validations";

const requestGateway = clientRequestGateway();

export const authClientRequests = {
  signIn: (payload: InferType<typeof signInValidationSchema>) =>
    requestGateway.post({
      url: `auth/register`,
      payload,
    }),

  login: (payload: InferType<typeof signUpValidationSchema>) =>
    requestGateway.post({
      url: `auth/login`,
      payload,
    }),

  logout: async () => await requestGateway.post({ url: "/logout" }),
};
