import Paper from "@mui/material/Paper";

import { Creator } from "./components/Creator";

import "./i18n.js";

export function App() {
  return (
    <Paper
      style={{ padding: 20, backgroundColor: "#FAFAFA" }}
      variant="outlined"
    >
      <Creator />
    </Paper>
  );
}
