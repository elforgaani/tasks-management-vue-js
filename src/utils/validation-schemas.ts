import { toTypedSchema } from "@vee-validate/yup";
import * as Yup from "yup";

export const signInValidationSchema = toTypedSchema(
  Yup.object({
    email: Yup.string().required().email().max(30),
    password: Yup.string().required().min(8).max(16),
  })
);
