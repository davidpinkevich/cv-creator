import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Stack, Typography } from "@mui/material";

import { SkillForm } from "./SkillForm";
import type { SkillGroupsTypes } from "./types";
import { type SkillsType } from "./types";

export function Skills({ skillGroups }: { skillGroups: SkillGroupsTypes }) {
  const [skills, setSkills] = useState<SkillsType[]>([{ id: uuidv4() }]);

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
        Навыки:
      </Typography>
      <Stack spacing={2} mb={2}>
        {skills.map(({ id }) => {
          return (
            <SkillForm
              key={id}
              withAddSkillBtn={id === skills[skills.length - 1].id}
              skillGroups={skillGroups}
              addNewSkill={addNewSkill}
              deleteSkill={deleteSkill(id)}
            />
          );
        })}
      </Stack>
    </>
  );
}
