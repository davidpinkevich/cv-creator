import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material";
import { orange } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";

import { App } from "./App.tsx";

const updatedTheme = createTheme({
  palette: {
    primary: orange,
    secondary: orange,
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={updatedTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);
