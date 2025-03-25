import { useState } from "react";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { v4 as uuidv4 } from "uuid";
import { Stack, Typography } from "@mui/material";

import { ButtonAdd } from "../ButtonAdd";
import { ExperienceForm } from "./ExperienceForm";

export const Experience = observer(() => {
  const { t } = useTranslation();

  const [experiences, setExperiences] = useState<{ id: string }[]>([]);

  const addNewProject = () => {
    const newForm = {
      id: uuidv4(),
    };

    setExperiences([...experiences, newForm]);
  };

  const deleteProject = (id: string) => () => {
    const newProjects = [...experiences].filter((item) => item.id !== id);

    setExperiences(newProjects);
  };

  return (
    <>
      <Typography variant="h2" mb={2} sx={{ fontSize: "2rem" }}>
        {t("experience.title")}
      </Typography>
      {!experiences.length && (
        <ButtonAdd handleClick={addNewProject}>
          {t("experience.addExperience")}
        </ButtonAdd>
      )}
      <Stack spacing={2} mb={2}>
        {experiences.map(({ id }) => {
          return (
            <ExperienceForm
              key={id}
              id={id}
              withAddExperienceBtn={
                id === experiences[experiences.length - 1].id
              }
              addNewProject={addNewProject}
              deleteProject={deleteProject(id)}
            />
          );
        })}
      </Stack>
    </>
  );
});
