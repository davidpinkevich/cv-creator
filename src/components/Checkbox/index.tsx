import { Controller, type FieldValues } from "react-hook-form";
import { Checkbox as FormCheckbox, FormControlLabel } from "@mui/material";

import { type CheckboxProps } from "./types";

export function Checkbox<FormValues extends FieldValues>({
  name,
  control,
  label,
}: CheckboxProps<FormValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={<FormCheckbox {...field} size="large" />}
          label={label}
        />
      )}
    />
  );
}
