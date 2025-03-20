import Paper from "@mui/material/Paper";

import { Creator } from "./components/Creator";

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
