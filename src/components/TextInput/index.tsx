import { Controller, type FieldValues } from "react-hook-form";
import { TextField } from "@mui/material";

import { type TextInputProps } from "./types";

export function TextInput<FormValues extends FieldValues>({
  handleKeyDown,
  control,
  errors,
  name,
  label,
  variant,
  multiline,
  maxRows,
  type = "text",
  size = "medium",
}: TextInputProps<FormValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          size={size}
          {...field}
          label={label}
          type={type}
          variant={variant}
          error={!!errors[name]}
          helperText={errors[name]?.message?.toString()}
          multiline={multiline}
          maxRows={maxRows}
          onKeyDown={handleKeyDown}
        />
      )}
    />
  );
}
