import { type ReactNode } from "react";

export type ButtonAddProps = {
  disabled?: boolean;
  children: ReactNode;
  handleClick: () => void;
};
