import { type ReactNode } from "react";

export type ButtonDeleteProps = {
  children: ReactNode;
  size?: "small" | "medium" | "large";
  handleClick: () => void;
};
