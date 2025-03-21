import { Typography } from "@mui/material";

import { skillGroups } from "../../constants/skill-groups";
import { Experience } from "../Experience";
import { PersonalData } from "../PersonalData";
import { Skills } from "../Skills";

export function Creator() {
  return (
    <>
      <Typography variant="h2" mb={2} sx={{ fontSize: "2rem" }}>
        Личная информация:
      </Typography>
      <PersonalData />
      <Skills skillGroups={skillGroups} />
      <Experience />
    </>
  );
}
