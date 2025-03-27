import { Box, Stack } from "@mui/material";
import Paper from "@mui/material/Paper";

import { Creator } from "./components/Creator";
import { Header } from "./components/Header";
import { Preview } from "./components/Preview";

import "./i18n.js";

export function App() {
  return (
    <>
      <Header />
      <Box style={{ padding: "20px 40px", backgroundColor: "#F0F1F1" }}>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Paper
            style={{ padding: "1rem 1.5rem", backgroundColor: "#FAFAFA" }}
            variant="outlined"
          >
            <Creator />
          </Paper>
          <Preview />
        </Stack>
      </Box>
    </>
  );
}
