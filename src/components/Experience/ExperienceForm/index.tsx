import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { Paper, Stack, Typography } from "@mui/material";

import { experienceData } from "../../../stores/experience-store";
import { ButtonAdd } from "../../ButtonAdd";
import { ButtonDelete } from "../../ButtonDelete";
import { Checkbox } from "../../Checkbox";
import { DatePicker } from "../../DatePicker";
import { TextInput } from "../../TextInput";
import { type ExperienceFormProps } from "./types";
import { validatoinShema } from "./validatoinShema";

function Form({
  id,
  withAddExperienceBtn,
  addNewProject,
  deleteProject,
}: ExperienceFormProps) {
  const { t } = useTranslation();
  const { updateExperience } = experienceData;

  const {
    watch,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validatoinShema(t)),
    defaultValues: {
      position: "",
      teamSize: "",
      project: "",
      achievements: "",
      technologies: "",
      start: undefined,
      end: undefined,
      isCurrent: false,
    },
    mode: "onSubmit",
  });

  const isCurrent = watch("isCurrent");

  useEffect(() => {
    updateExperience(watch(), id);
  }, [watch(), id]);

  const onSubmit = () => {
    if (isValid) addNewProject();
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
          <Stack spacing={2} mb={2} mt={2}>
            <Typography variant="h3" mb={2} sx={{ fontSize: "1.5rem" }}>
              {t("experience.generalInformation")}
            </Typography>
            <TextInput
              name="position"
              label={t("experience.position")}
              variant="outlined"
              errors={errors}
              control={control}
            />
            <TextInput
              name="teamSize"
              label={t("experience.teamSize")}
              variant="outlined"
              type="number"
              errors={errors}
              control={control}
            />
            <TextInput
              name="project"
              label={t("experience.description")}
              variant="outlined"
              multiline
              maxRows={10}
              errors={errors}
              control={control}
            />
            <TextInput
              name="achievements"
              label={t("experience.responsibilities")}
              variant="outlined"
              multiline
              maxRows={10}
              errors={errors}
              control={control}
            />
            <TextInput
              name="technologies"
              label={t("experience.technologies")}
              variant="outlined"
              multiline
              maxRows={10}
              errors={errors}
              control={control}
            />
          </Stack>
          <Typography variant="h3" mb={2} sx={{ fontSize: "1.5rem" }}>
            {t("experience.time.title")}
          </Typography>
          <Stack spacing={2} mb={2} mt={2}>
            <DatePicker
              name="start"
              label={t("experience.time.start")}
              views={["year", "month"]}
              control={control}
              errors={errors}
            />
            {!isCurrent && (
              <DatePicker
                name="end"
                label={t("experience.time.end")}
                views={["year", "month"]}
                control={control}
                errors={errors}
              />
            )}
            <Checkbox
              name="isCurrent"
              control={control}
              label={t("experience.time.current")}
            />
          </Stack>
          <ButtonDelete handleClick={deleteProject}>
            {t("experience.delete")}
          </ButtonDelete>
        </Paper>
        {withAddExperienceBtn && (
          <ButtonAdd type="submit">{t("experience.addExperience")}</ButtonAdd>
        )}
      </form>
    </>
  );
}
export const ExperienceForm = memo(Form);
