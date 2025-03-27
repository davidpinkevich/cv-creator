import { Box, Stack } from "@mui/material";

import logo from "../../../public/logo.svg";
import { ButtonToggle } from "../ButtonToggle";

export function Header() {
  return (
    <Box
      bgcolor="#2C3144"
      sx={{
        padding: "20px 0px",
      }}
    >
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0px 40px",
        }}
      >
        <img src={logo} />
        <Box bgcolor="#FFFFFF">
          <ButtonToggle />
        </Box>
      </Stack>
    </Box>
  );
}
