import { type ReactNode } from "react";
import { Typography as TypographyBase } from "@mui/material";
import { type SxProps } from "@mui/system";

export function Typography({
  component = "p",
  children,
  color,
  fsz,
  fw,
  sx,
}: {
  component?: React.ElementType;
  children: ReactNode;
  color?: string;
  fsz?: number;
  fw?: number;
  sx?: SxProps;
}) {
  return (
    <TypographyBase
      fontFamily="Calibri"
      component={component}
      color={color}
      fontSize={fsz}
      fontWeight={fw}
      sx={sx}
    >
      {children}
    </TypographyBase>
  );
}
