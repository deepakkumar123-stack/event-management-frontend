import * as Yup from "yup";
export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email must be required"),
  password: Yup.string()
    .required("Password must be required")
    .min(6, "Password must be at least 6 characters"),
});
