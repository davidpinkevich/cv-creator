import { useState } from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { Stack, Typography } from "@mui/material";

import { SkillForm } from "./SkillForm";

export function Skills() {
  const [skills, setSkills] = useState<{ id: string }[]>([{ id: uuidv4() }]);

  const { t } = useTranslation();

  const addNewSkillForm = () => {
    const newForm = {
      id: uuidv4(),
    };

    setSkills([...skills, newForm]);
  };

  const deleteSkillForm = (id: string) => () => {
    const newProjects = [...skills].filter((item) => item.id !== id);

    if (skills.length > 1) setSkills(newProjects);
  };

  return (
    <>
      <Typography variant="h2" mb={2} sx={{ fontSize: "2rem" }}>
        {t("skills.title")}
      </Typography>
      <Stack>
        {skills.map(({ id }) => {
          return (
            <SkillForm
              key={id}
              id={id}
              withAddSkillBtn={id === skills[skills.length - 1].id}
              addNewSkillForm={addNewSkillForm}
              deleteSkillForm={deleteSkillForm(id)}
            />
          );
        })}
      </Stack>
    </>
  );
}
