import { Button } from "@mui/material";

import { type ButtonAddProps } from "./types";

export function ButtonAdd({ children, handleClick, disabled }: ButtonAddProps) {
  return (
    <Button
      variant="contained"
      fullWidth
      size="large"
      onClick={handleClick}
      sx={{ color: "white" }}
      disabled={disabled}
      type="submit"
    >
      {children}
    </Button>
  );
}
