import { Controller, type FieldValues } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker as Picker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { type DatePickerProps } from "./types";

import "dayjs/locale/ru";

export function DatePicker<FormValues extends FieldValues>({
  name,
  label,
  errors,
  control,
}: DatePickerProps<FormValues>) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <>
              <Picker
                {...field}
                label={label}
                views={["year", "month"]}
                slotProps={{
                  textField: {
                    error: !!errors[name],
                    helperText: errors[name]?.message?.toString(),
                  },
                }}
              />
            </>
          );
        }}
      />
    </LocalizationProvider>
  );
}
