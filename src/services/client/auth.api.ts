import { InferType } from "yup";
import { clientRequestGateway } from "./client-request-gateway";
import {
  activateAccountValidationSchema,
  forgotPasswordValidationSchema,
  requestActivationEmailValidationSchema,
  resetPasswordValidationSchema,
  signInValidationSchema,
  signUpValidationSchema,
} from "@/validations";

const requestGateway = clientRequestGateway();

export const authClientRequests = {
  signUp: (payload: InferType<typeof signUpValidationSchema>) =>
    requestGateway.post({
      url: `/tenants`,
      payload,
    }),

  signIn: (payload: InferType<typeof signInValidationSchema>) =>
    requestGateway.post({
      url: `auth/login`,
      payload,
    }),

  forgotPassword: (payload: InferType<typeof forgotPasswordValidationSchema>) =>
    requestGateway.post({
      url: `auth/staff/forgot-password`,
      payload,
    }),

  requestActivationEmail: (
    payload: InferType<typeof requestActivationEmailValidationSchema>
  ) =>
    requestGateway.post({
      url: `auth/staff/request-token`,
      payload,
    }),

  activateAccount: (
    payload: InferType<typeof activateAccountValidationSchema>
  ) =>
    requestGateway.post({
      url: `auth/staff/set-password`,
      payload,
    }),

  resetPassword: (payload: InferType<typeof resetPasswordValidationSchema>) =>
    requestGateway.post({
      url: `auth/staff/reset-password`,
      payload,
    }),

  verifyActivateAccount: (payload: { token: string; userId: string }) =>
    requestGateway.post({
      url: `auth/staff/resolve-token`,
      payload,
    }),

  verifyForgotPassword: (payload: { token: string; userId: string }) =>
    requestGateway.post({
      url: `auth/staff/resolve-forgot-password`,
      payload,
    }),

  logout: async () => await requestGateway.post({ url: "/logout" }),
};
