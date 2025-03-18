import type { Control, FieldErrors } from "react-hook-form";

import { type FormType } from "../types";

export type TextInputProps = {
  control: Control<FormType>;
  errors: FieldErrors<FormType>;
  name: keyof FormType;
  label: string;
  variant: "outlined" | "filled" | "standard";
  multiline?: boolean;
  maxRows?: number;
  handleKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};
