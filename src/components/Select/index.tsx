import { Controller, type FieldValues } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as FormSelect,
} from "@mui/material";

import { type SelectProps } from "./types";

export function Select<FormValues extends FieldValues>({
  control,
  label,
  name,
  size = "small",
  variant,
  value,
}: SelectProps<FormValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl size={size} fullWidth error={!!error}>
          <InputLabel
            size={size === "small" ? "small" : "normal"}
            id="select-label"
          >
            {label}
          </InputLabel>
          <FormSelect
            {...field}
            labelId="select-label"
            label={label}
            variant={variant}
          >
            {value.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </FormSelect>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
