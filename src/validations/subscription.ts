import * as yup from "yup";

export const subscriptionValidationSchema = yup.object().shape({
  tenantSlug: yup.string().required("This field is required"),
  planCode: yup.string().required("This field is required"),
  email: yup.string().required("This field is required"),
});
