import * as yup from "yup";

export const tenantSignUpValidationSchema = yup.object().shape({
  companyName: yup.string().required("Company name is required"),

  companyEmail: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Email must be a valid email"
    ),

  companyPhoneNumber: yup.string().required("Company phone number is required"),
});

export const userSignUpValidationSchema = yup.object().shape({
  firstName: yup.string().required("This field is required"),

  lastName: yup.string().required("This field is required"),

  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Email must be a valid email"
    ),

  phoneNumber: yup.string().required("This field is required"),

  password: yup.string().required("Password is required"),

  passwordConfirmation: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export const signInValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Email must be a valid email"
    ),
  password: yup.string().required("Password is required"),
});

export const inviteStaffValidationSchema = yup.object().shape({
  invites: yup
    .array()
    .of(
      yup.object().shape({
        firstName: yup.string().required("First name is required"),

        lastName: yup.string().required("Last name is required"),

        phoneNumber: yup.string().required("Phone number is required"),

        department: yup.string().required("Department is required"),

        email: yup
          .string()
          .email("Email must be a valid email")
          .optional()
          .matches(
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            "Email must be a valid email"
          )
          .required("Department is required"),

        role: yup.string().required("Department is required"),
      })
    )
    .required("At least one invite is required"),
});

export const forgotPasswordValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Email must be a valid email"
    ),
});

export const requestActivationEmailValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Email must be a valid email"
    ),
});

export const activateAccountValidationSchema = yup.object().shape({
  userId: yup.string(),
  password: yup
    .string()
    .required("Password is required")
    .min(10, "Password must be at least 10 characters")
    .test(
      "password",
      "Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character",
      (value) => {
        return (
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(
            value
          ) || value === ""
        );
      }
    ),
  passwordConfirmation: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export const resetPasswordValidationSchema = yup.object().shape({
  userId: yup.string(),
  resetToken: yup.string(),
  password: yup
    .string()
    .required("Password is required")
    .min(10, "Password must be at least 10 characters")
    .test(
      "password",
      "Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character",
      (value) => {
        return (
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(
            value
          ) || value === ""
        );
      }
    ),
  passwordConfirmation: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
