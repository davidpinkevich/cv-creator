import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";

import { ButtonToggle } from "../ButtonToggle";
import { Experience } from "../Experience";
import { PersonalData } from "../PersonalData";
import { Skills } from "../Skills";

export function Creator() {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h2" mb={2} sx={{ fontSize: "2rem" }}>
        {t("personal.title")}
      </Typography>
      <ButtonToggle />
      <PersonalData />
      <Skills />
      <Experience />
    </>
  );
}
