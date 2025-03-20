import { type Control } from "react-hook-form";

import { type FormType } from "../PersonalData/types";

export type SelectProps = {
  control: Control<FormType>;
  name: keyof FormType;
  label: string;
  value: string[];
  variant: "outlined" | "filled" | "standard";
};
