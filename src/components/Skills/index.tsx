import { useState } from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { Stack, Typography } from "@mui/material";

import { SkillForm } from "./SkillForm";
import { type SkillsType } from "./types";

export function Skills() {
  const [skills, setSkills] = useState<SkillsType[]>([{ id: uuidv4() }]);

  const { t } = useTranslation();

  const addNewSkill = () => {
    const newForm = {
      id: uuidv4(),
    };

    setSkills([...skills, newForm]);
  };

  const deleteSkill = (id: string) => () => {
    const newProjects = [...skills].filter((item) => item.id !== id);

    if (skills.length > 1) setSkills(newProjects);
  };

  return (
    <>
      <Typography variant="h2" mb={2} sx={{ fontSize: "2rem" }}>
        {t("skills.title")}
      </Typography>
      <Stack spacing={2} mb={2}>
        {skills.map(({ id }) => {
          return (
            <SkillForm
              key={id}
              withAddSkillBtn={id === skills[skills.length - 1].id}
              addNewSkill={addNewSkill}
              deleteSkill={deleteSkill(id)}
            />
          );
        })}
      </Stack>
    </>
  );
}
