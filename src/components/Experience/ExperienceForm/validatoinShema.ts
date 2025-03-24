import { type UseTranslationResponse } from "react-i18next";
import * as yup from "yup";

type TFunction = UseTranslationResponse<"translation", undefined>["t"];

export const validatoinShema = (t: TFunction) =>
  yup.object({
    isCurrent: yup.boolean(),
    position: yup.string().required(t("valiadation.required")),
    teamSize: yup.string().required(t("valiadation.required")),
    achievements: yup.string().required(t("valiadation.required")),
    technologies: yup.string().required(t("valiadation.required")),
    project: yup.string().required(t("valiadation.required")),
    start: yup.date().required(t("valiadation.required")),
    end: yup.date().when("isCurrent", ([isCurrent], schema) => {
      return isCurrent
        ? schema.nullable().notRequired()
        : schema.required(t("valiadation.required"));
    }),
  });
