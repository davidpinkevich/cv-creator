import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Paper, Stack } from "@mui/material";

import { skillGroupsEn, skillsEn } from "../../../constants/skill-groups-en";
import { skillGroupsRu, skillsRu } from "../../../constants/skill-groups-ru";
import { useTranslateSelects } from "../../../hooks/useTranslateSelects";
import { skillsDataStore } from "../../../stores/skills-store";
import { Autocomplete } from "../../Autocomplete";
import { ButtonAdd } from "../../ButtonAdd";
import { ButtonDelete } from "../../ButtonDelete";
import { DatePicker } from "../../DatePicker";
import { Select } from "../../Select";
import { TextInput } from "../../TextInput";
import { type SkillFormProps } from "./types";
import { validatoinShema } from "./validatoinShema";

function Form({
  id,
  withAddSkillBtn,
  addNewSkill,
  deleteSkill,
}: SkillFormProps) {
  const { t, i18n } = useTranslation();

  const { updateSkills } = skillsDataStore;

  const skillGroups = i18n.language === "ru" ? skillGroupsRu : skillGroupsEn;
  const skills = i18n.language === "ru" ? skillsRu : skillsEn;

  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validatoinShema(t)),
    defaultValues: {
      groups: "",
      skill: "",
      level: t("skills.level.advanced"),
      experienceYears: "",
      groupUnderAvatar: "",
      year: dayjs(),
    },
    mode: "onSubmit",
  });

  useTranslateSelects({ watch, setValue });

  useEffect(() => {
    updateSkills(watch(), id);
  }, [watch(), id]);

  const onSubmit = () => {
    if (isValid) addNewSkill();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper
          style={{
            padding: 20,
            marginBottom: "1rem",
            backgroundColor: "#FAFAFA",
          }}
          variant="outlined"
        >
          <Stack spacing={3} mb={2} mt={2}>
            <Stack direction="row" spacing={2} mb={2} mt={2}>
              <Box sx={{ width: "65%" }}>
                <Select
                  name="groups"
                  size="small"
                  label={t("skills.groups")}
                  variant="outlined"
                  control={control}
                  value={skillGroups.groups}
                />
              </Box>
              <Box sx={{ width: "35%" }}>
                <Autocomplete
                  name="skill"
                  control={control}
                  label={t("skills.skill")}
                  options={
                    watch("groups")
                      ? skills[watch("groups") as keyof typeof skills]
                      : Object.values(skills).flat()
                  }
                />
              </Box>
            </Stack>
            <Stack direction="row" spacing={2} mb={2} mt={2}>
              <Box sx={{ width: "38%" }}>
                <Select
                  name="level"
                  size="small"
                  label={t("skills.level.label")}
                  variant="outlined"
                  control={control}
                  value={[t("skills.level.medium"), t("skills.level.advanced")]}
                />
              </Box>
              <Box sx={{ width: "20%" }}>
                <TextInput
                  name="experienceYears"
                  size="small"
                  label={t("skills.experienceYears")}
                  variant="outlined"
                  type="number"
                  errors={errors}
                  control={control}
                />
              </Box>
              <Box sx={{ width: "25%" }}>
                <DatePicker
                  control={control}
                  errors={errors}
                  views={["year"]}
                  size="small"
                  label={t("skills.year")}
                  name="year"
                />
              </Box>
              <Box sx={{ width: "20%" }}>
                <TextInput
                  name="groupUnderAvatar"
                  size="small"
                  label={t("skills.groupUnderAvatar")}
                  variant="outlined"
                  type="number"
                  errors={errors}
                  control={control}
                />
              </Box>
            </Stack>
            <Stack direction="row" spacing={2} mb={2} mt={2}>
              <ButtonDelete size="medium" handleClick={deleteSkill}>
                {t("skills.delete")}
              </ButtonDelete>
              {withAddSkillBtn && (
                <ButtonAdd size="medium" type="submit">
                  {t("skills.addSkill")}
                </ButtonAdd>
              )}
            </Stack>
          </Stack>
        </Paper>
      </form>
    </>
  );
}

export const SkillForm = memo(Form);
