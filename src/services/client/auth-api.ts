import { InferType } from "yup";
import { clientRequestGateway } from "./client-request-gateway";
import {
  activateAccountValidationSchema,
  forgotPasswordValidationSchema,
  requestActivationEmailValidationSchema,
  resetPasswordValidationSchema,
  signInValidationSchema,
  userSignUpValidationSchema,
} from "@/validations";

export const authClientRequests = {
  userSignUp: (payload: InferType<typeof userSignUpValidationSchema>) => {
    const requestGateway = clientRequestGateway();
    return requestGateway.post({
      url: `auth/signup`,
      payload,
    });
  },

  signIn: (payload: InferType<typeof signInValidationSchema>) => {
    const requestGateway = clientRequestGateway();
    return requestGateway.post({
      url: `auth/login`,
      payload,
    });
  },

  forgotPassword: (
    payload: InferType<typeof forgotPasswordValidationSchema>
  ) => {
    const requestGateway = clientRequestGateway();
    return requestGateway.post({
      url: `auth/forgot-password`,
      payload,
    });
  },

  requestActivationEmail: (
    payload: InferType<typeof requestActivationEmailValidationSchema>
  ) => {
    const requestGateway = clientRequestGateway();
    return requestGateway.post({
      url: `auth/request-token`,
      payload,
    });
  },

  activateAccount: (
    payload: InferType<typeof activateAccountValidationSchema>
  ) => {
    const requestGateway = clientRequestGateway();
    return requestGateway.post({
      url: `auth/set-password`,
      payload,
    });
  },

  resetPassword: (payload: InferType<typeof resetPasswordValidationSchema>) => {
    const requestGateway = clientRequestGateway();
    return requestGateway.post({
      url: `auth/reset-password`,
      payload,
    });
  },

  verifyActivateAccount: (payload: { token: string; userId: string }) => {
    const requestGateway = clientRequestGateway();
    return requestGateway.post({
      url: `auth/resolve-token`,
      payload,
    });
  },

  verifyForgotPassword: (payload: { token: string; userId: string }) => {
    const requestGateway = clientRequestGateway();
    return requestGateway.post({
      url: `auth/resolve-forgot-password`,
      payload,
    });
  },

  logout: async () => {
    const requestGateway = clientRequestGateway();
    return await requestGateway.post({ url: "/logout" });
  },
};
