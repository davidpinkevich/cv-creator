import { type UseTranslationResponse } from "react-i18next";
import dayjs from "dayjs";
import * as yup from "yup";

type TFunction = UseTranslationResponse<"translation", undefined>["t"];

export const validatoinShema = (t: TFunction) =>
  yup.object({
    groups: yup.string().required(t("valiadation.required")),
    skill: yup.string().required(t("valiadation.required")),
    level: yup.string().required(t("valiadation.required")),
    year: yup
      .mixed()
      .test("is-dayjs", (value) => dayjs.isDayjs(value) && value.isValid())
      .required(t("valiadation.required")),
    experienceYears: yup.string().required(t("valiadation.required")),
  });
