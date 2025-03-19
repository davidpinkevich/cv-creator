import { type ReactNode } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";

export function ButtonDelete({
  children,
  handleClick,
}: {
  children: ReactNode;
  handleClick: () => void;
}) {
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
