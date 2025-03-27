import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { Box, Stack } from "@mui/material";

import avatar from "../../../assets/images/avatar.png";
import { experienceDataStore } from "../../../stores/experience-store";
import { personalDataStore } from "../../../stores/personal-data-store";
import { Typography } from "../../Typography";
import { BlockExperience } from "../BlockExperience";
import { ListItems } from "../ListItems";

export const MainPage = observer(() => {
  const { t } = useTranslation();

  const { personalData } = personalDataStore;

  const { dataExperience } = experienceDataStore;

  const [firstExperience] = Object.entries(dataExperience);

  const { firstName, secondName, position, level, education, about, skills } =
    personalData;

  return (
    <Stack direction="row" sx={{ minHeight: "100%", flexGrow: 1 }}>
      <Box
        sx={{
          minWidth: "33%",
          maxWidth: "33%",
          backgroundColor: "#2C3144",
          padding: "14px 12px 0 6px",
        }}
      >
        <Stack mb={1.5} direction="row">
          <img src={avatar} />
          <Stack>
            <Typography color="white" fsz={14} fw={700}>
              {firstName} {secondName && `${secondName[0]}.`}
            </Typography>
            <Typography color="#C3C2C2" fsz={12}>
              {position}
            </Typography>
          </Stack>
        </Stack>
        <Stack spacing={1.5} sx={{ paddingLeft: "10px" }}>
          <Box>
            <Typography color="white" fsz={14} fw={700}>
              {t("cv.mainPage.skills")}
            </Typography>
            <ListItems items={skills} type="skills" />
          </Box>
          <Box>
            <Typography color="white" fsz={14} fw={700}>
              {t("cv.mainPage.languages")}
            </Typography>
            <Typography color="#C3C2C2" fsz={12}>
              {t("cv.mainPage.en")} {level}
            </Typography>
          </Box>
          <Box>
            <Typography color="white" fsz={14} fw={700}>
              {t("cv.mainPage.education")}
            </Typography>
            <Typography color="#C3C2C2" fsz={12}>
              {education}
            </Typography>
          </Box>
        </Stack>
      </Box>
      <Box
        sx={{
          padding: "12px",
          width: "100%",
        }}
      >
        <Typography color="#878787" fsz={14} fw={700}>
          {t("cv.mainPage.aboutDev")}
        </Typography>
        <Box
          sx={{
            backgroundColor: "#D9D9D9",
            height: "4px",
          }}
        />
        <Typography
          fsz={11}
          sx={{ whiteSpace: "pre-line", textAlign: "justify" }}
        >
          {about}
        </Typography>
        <Typography color="#878787" fw={700}>
          {t("cv.experience.title")}
        </Typography>
        <Box
          sx={{
            backgroundColor: "#D9D9D9",
            height: "4px",
          }}
        />
        <BlockExperience experience={firstExperience && firstExperience[1]} />
        <Box
          sx={{
            backgroundColor: "#D9D9D9",
            height: "2px",
          }}
        />
      </Box>
    </Stack>
  );
});
