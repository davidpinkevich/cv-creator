import { type UseTranslationResponse } from "react-i18next";
import * as yup from "yup";

type TFunction = UseTranslationResponse<"translation", undefined>["t"];

export const validatoinShema = (t: TFunction) =>
  yup.object({
    firstName: yup
      .string()
      .required(t("valiadation.required"))
      .min(3, t("valiadation.lengthThreeItems"))
      .matches(/^[A-ZА-Я][a-zа-я]{2}/, t("valiadation.firstLetterUpper")),
    secondName: yup
      .string()
      .required(t("valiadation.required"))
      .min(3, t("valiadation.lengthThreeItems"))
      .matches(/^[A-ZА-Я][a-zа-я]{2}/, t("valiadation.firstLetterUpper")),
    position: yup.string().required(t("valiadation.required")),
    about: yup.string().required(t("valiadation.required")),
    level: yup.string().required(t("valiadation.required")),
    education: yup.string().required(t("valiadation.required")),
    skills: yup.string().required(t("valiadation.required")),
  });
