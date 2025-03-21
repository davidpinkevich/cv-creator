import type { Control, FieldErrors, FieldValues, Path } from "react-hook-form";

export type DatePickerProps<FormValues extends FieldValues> = {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  label: string;
  size?: "small" | "medium";
  views: Array<"year" | "month">;
  name: Path<FormValues>;
};
