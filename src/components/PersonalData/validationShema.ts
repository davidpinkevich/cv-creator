import * as yup from "yup";

export const validatoinShema = yup.object({
  firstName: yup
    .string()
    .required("This field is required")
    .min(3, "The string must be exactly 3 characters long")
    .matches(
      /^[A-Z][a-z]{2}/,
      "The first letter must be uppercase, followed by two lowercase letters"
    ),
  secondName: yup
    .string()
    .required("This field is required")
    .min(3, "The string must be exactly 3 characters long")
    .matches(
      /^[A-Z][a-z]{2}/,
      "The first letter must be uppercase, followed by two lowercase letters"
    ),
  position: yup.string().required("This field is required"),
  about: yup.string().required("This field is required"),
  level: yup.string().required("This field is required"),
  education: yup.string().required("This field is required"),
});
