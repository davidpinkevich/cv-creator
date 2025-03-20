import * as yup from "yup";

export const validatoinShema = yup.object({
  isCurrent: yup.boolean(),
  position: yup.string().required("This field is required"),
  teamSize: yup.string().required("This field is required"),
  project: yup.string().required("This field is required"),
  start: yup.date().required("This field is required"),
  end: yup.date().when("isCurrent", ([isCurrent], schema) => {
    return isCurrent
      ? schema.nullable().notRequired()
      : schema.required("This field is required");
  }),
});
