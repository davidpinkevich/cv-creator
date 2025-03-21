import type { Control, FieldValues, Path } from "react-hook-form";

export type AutocompleteProps<FormValues extends FieldValues> = {
  control: Control<FormValues>;
  name: Path<FormValues>;
  label: string;
  options: string[];
  size?: "small" | "medium";
};
