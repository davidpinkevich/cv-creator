import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";

import { type ButtonDeleteProps } from "./types";

export function ButtonDelete({ children, handleClick }: ButtonDeleteProps) {
  return (
    <Button
      variant="outlined"
      fullWidth
      size="large"
      startIcon={<DeleteIcon />}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}
