import { useTranslation } from "react-i18next";
import { Stack, Typography } from "@mui/material";

import { Experience } from "../Experience";
import { PersonalData } from "../PersonalData";
import { Skills } from "../Skills";

export function Creator() {
  const { t } = useTranslation();

  return (
    <Stack>
      <Typography variant="h2" mb={2} sx={{ fontSize: "2rem" }}>
        {t("personal.title")}
      </Typography>
      <PersonalData />
      <Experience />
      <Skills />
    </Stack>
  );
}
