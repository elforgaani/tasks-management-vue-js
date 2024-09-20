import { toTypedSchema } from "@vee-validate/yup";
import * as Yup from "yup";

export const signInValidationSchema = toTypedSchema(
  Yup.object({
    email: Yup.string().required().email().max(30),
    password: Yup.string().required().min(8).max(16),
  })
);

export const sendOtpValidationSchema = toTypedSchema(
  Yup.object({
    email: Yup.string().required().email().max(30),
  })
);

export const signUpValidationSchema = Yup.object().shape({
  firstName: Yup.string().required().min(2).max(32),
  lastName: Yup.string().required().min(2).max(32),
  password: Yup.string().required().min(8).max(32),
  otp: Yup.string().required().length(6),
});
