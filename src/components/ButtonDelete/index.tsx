import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";

import { type ButtonDeleteProps } from "./types";

export function ButtonDelete({
  children,
  handleClick,
  size = "large",
}: ButtonDeleteProps) {
  return (
    <Button
      variant="outlined"
      fullWidth
      size={size}
      startIcon={<DeleteIcon />}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}
