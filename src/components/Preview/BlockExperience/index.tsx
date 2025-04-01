import { useTranslation } from "react-i18next";
import { Box, Stack } from "@mui/material";

import { getDate } from "../../../helpers/get-date";
import { type ExperienceType } from "../../Experience/types";
import { Typography } from "../../Typography";
import { ListItems } from "../ListItems";

export function BlockExperience({
  experience,
}: {
  experience: ExperienceType;
}) {
  const { t, i18n } = useTranslation();

  return (
    <Stack spacing={0.5}>
      <Box>
        <Typography component="span" fsz={11} fw={700}>
          {experience && experience.position && experience.position + " | "}
        </Typography>
        <Typography component="span" fsz={11}>
          {experience &&
            getDate(
              i18n.language,
              experience.isCurrent,
              experience.start,
              experience.end
            )}
        </Typography>
      </Box>
      <Box>
        <Typography component="span" fsz={11} fw={700}>
          {t("cv.experience.teamSize")}
        </Typography>
        <Typography color="#8A9090" component="span" fsz={11}>
          {" "}
          {experience && experience.teamSize}
        </Typography>
      </Box>
      <Box>
        <Typography fsz={11} fw={700}>
          {t("cv.experience.projectDescription")}
        </Typography>
        <Typography color="#8A9090" fsz={11} sx={{ textAlign: "justify" }}>
          {experience && experience.project}
        </Typography>
      </Box>
      <Box>
        <Typography fsz={11} fw={700}>
          {t("cv.experience.achievements")}
        </Typography>
        <ListItems
          type="achievements"
          items={experience && experience.achievements}
        />
      </Box>
      <Box>
        <Typography fsz={11} fw={700}>
          {t("cv.experience.technologies")}
        </Typography>
        <Typography color="#8A9090" fsz={11} sx={{ textAlign: "justify" }}>
          {experience && experience.technologies}
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "#D9D9D9",
          height: "2px",
        }}
      />
    </Stack>
  );
}
