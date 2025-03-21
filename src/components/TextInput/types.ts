import type { Control, FieldErrors, FieldValues, Path } from "react-hook-form";

export type TextInputProps<FormValues extends FieldValues> = {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  name: Path<FormValues>;
  label: string;
  type?: string;
  variant: "outlined" | "filled" | "standard";
  multiline?: boolean;
  maxRows?: number;
  size?: "small" | "medium";
  handleKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};
