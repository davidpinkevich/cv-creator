import * as yup from "yup";

export const validatoinShema = yup.object({
  firstName: yup
    .string()
    .required("Обязательное поле")
    .min(3, "The string must be exactly 3 characters long")
    .matches(
      /^[A-Z][a-z]{2}/,
      "The first letter must be uppercase, followed by two lowercase letters"
    ),
  secondName: yup
    .string()
    .required("Обязательное поле")
    .min(3, "The string must be exactly 3 characters long")
    .matches(
      /^[A-Z][a-z]{2}/,
      "The first letter must be uppercase, followed by two lowercase letters"
    ),
  position: yup.string().required("Обязательное поле"),
  about: yup.string().required("Обязательное поле"),
  level: yup.string().required("Обязательное поле"),
  education: yup.string().required("Обязательное поле"),
});
