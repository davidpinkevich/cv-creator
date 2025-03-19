import { type ReactNode } from "react";
import { Button } from "@mui/material";

export function ButtonAdd({
  children,
  handleClick,
  disabled,
}: {
  disabled?: boolean;
  children: ReactNode;
  handleClick: () => void;
}) {
  return (
    <Button
      variant="contained"
      fullWidth
      size="large"
      onClick={handleClick}
      sx={{ color: "white" }}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}
