import { Box } from "@mui/material";

import { type ExperienceType } from "../../Experience/types";
import { BlockExperience } from "../BlockExperience";
import { stylesPage } from "../styles";

export function ExperiencesPage({
  experiences,
}: {
  experiences: [string, ExperienceType][];
}) {
  return (
    <Box sx={{ ...stylesPage, padding: "20px" }}>
      {experiences.map((exp) => (
        <BlockExperience key={exp[0]} experience={exp[1]} />
      ))}
    </Box>
  );
}
