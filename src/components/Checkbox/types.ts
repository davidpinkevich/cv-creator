import { type Control, type FieldValues, type Path } from "react-hook-form";

export type CheckboxProps<FormValues extends FieldValues> = {
  control: Control<FormValues>;
  name: Path<FormValues>;
  label: string;
};
