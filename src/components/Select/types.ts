import type { Control, FieldValues, Path } from "react-hook-form";

export type SelectProps<FormValues extends FieldValues> = {
  control: Control<FormValues>;
  name: Path<FormValues>;
  label: string;
  value: string[];
  size?: "small" | "medium";
  variant: "outlined" | "filled" | "standard";
};
