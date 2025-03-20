import type { Control, FieldErrors, FieldValues, Path } from "react-hook-form";

export type DatePickerProps<FormValues extends FieldValues> = {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  label: string;
  name: Path<FormValues>;
};
