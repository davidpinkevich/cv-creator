import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

import { type TextInputProps } from "./types";

export function TextInput({
  handleKeyDown,
  control,
  errors,
  name,
  label,
  variant,
  multiline,
  maxRows,
}: TextInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          variant={variant}
          error={!!errors[name]}
          helperText={errors[name]?.message}
          multiline={multiline}
          maxRows={maxRows}
          onKeyDown={handleKeyDown}
        />
      )}
    />
  );
}
