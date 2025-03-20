import { Controller } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as FormSelect,
} from "@mui/material";

import { type SelectProps } from "./types";

export function Select({ control, label, name, variant, value }: SelectProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl fullWidth>
          <InputLabel id="select-label">{label}</InputLabel>
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
        </FormControl>
      )}
    />
  );
}
