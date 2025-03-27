import { Controller, type FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker as Picker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { type DatePickerProps } from "./types";

import "dayjs/locale/ru";

export function DatePicker<FormValues extends FieldValues>({
  name,
  size = "small",
  label,
  views,
  errors,
  control,
}: DatePickerProps<FormValues>) {
  const { i18n } = useTranslation();

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={i18n.language}
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <>
              <Picker
                {...field}
                label={label}
                views={views}
                slotProps={{
                  textField: {
                    size,
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
