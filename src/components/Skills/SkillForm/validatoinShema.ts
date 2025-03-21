import dayjs from "dayjs";
import * as yup from "yup";

export const validatoinShema = yup.object({
  groups: yup.string().required("Обязательное поле"),
  skill: yup.string().required("Обязательное поле"),
  level: yup.string().required("Обязательное поле"),
  year: yup
    .mixed()
    .test("is-dayjs", (value) => dayjs.isDayjs(value) && value.isValid())
    .required("Обязательное поле"),
  experienceYears: yup.string().required("Обязательное поле"),
  groupUnderAvatar: yup.string(),
});
