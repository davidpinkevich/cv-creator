import { Controller, type FieldValues } from "react-hook-form";
import { Autocomplete as Auto, TextField } from "@mui/material";

import { type AutocompleteProps } from "./types";

export function Autocomplete<FormValues extends FieldValues>({
  name,
  label,
  control,
  options,
}: AutocompleteProps<FormValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Auto
          size="small"
          freeSolo
          {...field}
          options={options}
          value={field.value || ""}
          onChange={(_, newValue) => field.onChange(newValue)}
          onInputChange={(_, newInputValue) => field.onChange(newInputValue)}
          getOptionLabel={(option) => String(option)}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={!!error}
              helperText={error?.message || ""}
            />
          )}
        />
      )}
    />
  );
}
