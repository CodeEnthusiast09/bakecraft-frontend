import { InferType } from "yup";
import { clientRequestGateway } from "./client-request-gateway";
import {
  activateAccountValidationSchema,
  forgotPasswordValidationSchema,
  requestActivationEmailValidationSchema,
  resetPasswordValidationSchema,
  signInValidationSchema,
  tenantSignUpValidationSchema,
  userSignUpValidationSchema,
} from "@/validations";

const requestGateway = clientRequestGateway();

export const authClientRequests = {
  tenantSignUp: (payload: InferType<typeof tenantSignUpValidationSchema>) =>
    requestGateway.post({
      url: `tenants`,
      payload,
    }),

  userSignUp: (payload: InferType<typeof userSignUpValidationSchema>) =>
    requestGateway.post({
      url: `auth/signup`,
      payload,
    }),

  signIn: (payload: InferType<typeof signInValidationSchema>) =>
    requestGateway.post({
      url: `auth/login`,
      payload,
    }),

  forgotPassword: (payload: InferType<typeof forgotPasswordValidationSchema>) =>
    requestGateway.post({
      url: `auth/forgot-password`,
      payload,
    }),

  requestActivationEmail: (
    payload: InferType<typeof requestActivationEmailValidationSchema>
  ) =>
    requestGateway.post({
      url: `auth/request-token`,
      payload,
    }),

  activateAccount: (
    payload: InferType<typeof activateAccountValidationSchema>
  ) =>
    requestGateway.post({
      url: `auth/set-password`,
      payload,
    }),

  resetPassword: (payload: InferType<typeof resetPasswordValidationSchema>) =>
    requestGateway.post({
      url: `auth/reset-password`,
      payload,
    }),

  verifyActivateAccount: (payload: { token: string; userId: string }) =>
    requestGateway.post({
      url: `auth/resolve-token`,
      payload,
    }),

  verifyForgotPassword: (payload: { token: string; userId: string }) =>
    requestGateway.post({
      url: `auth/resolve-forgot-password`,
      payload,
    }),

  logout: async () => await requestGateway.post({ url: "/logout" }),
};
