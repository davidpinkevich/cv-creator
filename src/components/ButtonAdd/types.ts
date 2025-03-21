import { type ReactNode } from "react";

export type ButtonAddProps = {
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  size?: "small" | "medium" | "large";
  children: ReactNode;
  handleClick?: () => void;
};
