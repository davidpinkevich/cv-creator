import { Typography } from "@mui/material";

import { Experience } from "../Experience";
import { PersonalData } from "../PersonalData";

export function Creator() {
  return (
    <>
      <Typography variant="h2" mb={2} sx={{ fontSize: "2rem" }}>
        Личная информация
      </Typography>
      <PersonalData />
      <Experience />
    </>
  );
}
