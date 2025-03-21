import { Button } from "@mui/material";

import { type ButtonAddProps } from "./types";

export function ButtonAdd({
  children,
  handleClick,
  disabled,
  size = "large",
  type = "button",
}: ButtonAddProps) {
  return (
    <Button
      variant="contained"
      fullWidth
      size={size}
      onClick={handleClick}
      sx={{ color: "white" }}
      disabled={disabled}
      type={type}
    >
      {children}
    </Button>
  );
}
