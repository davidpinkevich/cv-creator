import * as yup from "yup";

export const validatoinShema = yup.object({
  isCurrent: yup.boolean(),
  position: yup.string().required("Обязательное поле"),
  teamSize: yup.string().required("Обязательное поле"),
  achievements: yup.string().required("Обязательное поле"),
  technologies: yup.string().required("Обязательное поле"),
  project: yup.string().required("Обязательное поле"),
  start: yup.date().required("Обязательное поле"),
  end: yup.date().when("isCurrent", ([isCurrent], schema) => {
    return isCurrent
      ? schema.nullable().notRequired()
      : schema.required("Обязательное поле");
  }),
});
