import { signUpValidationSchema } from "@/validations";
import { InferType } from "yup";
import * as Yup from "yup";

const userSchema = signUpValidationSchema.fields.user as Yup.ObjectSchema<{
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}>;

const tenantSchema = signUpValidationSchema.fields.tenant as Yup.ObjectSchema<{
  companyName: string;
  companyEmail: string;
  companyPhoneNumber: string;
}>;

export const userStepSchema = userSchema.pick([
  "firstName",
  "lastName",
  "email",
  "phoneNumber",
]);

export const passwordStepSchema = userSchema.pick(["password"]);

export const tenantStepSchema = tenantSchema.pick([
  "companyName",
  "companyEmail",
  "companyPhoneNumber",
]);

export type UserStepData = InferType<typeof userStepSchema>;
export type PasswordStepData = InferType<typeof passwordStepSchema>;
export type TenantStepData = InferType<typeof tenantStepSchema>;

// Full payload = combination
export interface SignUpPayload {
  user: UserStepData & PasswordStepData; // merge
  tenant: TenantStepData;
}
