import { memo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Paper, Stack, Typography } from "@mui/material";

import { ButtonAdd } from "../../ButtonAdd";
import { ButtonDelete } from "../../ButtonDelete";
import { Checkbox } from "../../Checkbox";
import { DatePicker } from "../../DatePicker";
import { TextInput } from "../../TextInput";
import { type ExperienceFormProps } from "./types";
import { validatoinShema } from "./validatoinShema";

function Form({
  withAddExperienceBtn,
  addNewProject,
  deleteProject,
}: ExperienceFormProps) {
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validatoinShema),
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
              Общая информация:
            </Typography>
            <TextInput
              name="position"
              label="Позиция"
              variant="outlined"
              errors={errors}
              control={control}
            />
            <TextInput
              name="teamSize"
              label="Размер команды"
              variant="outlined"
              type="number"
              errors={errors}
              control={control}
            />
            <TextInput
              name="project"
              label="Описание проекта"
              variant="outlined"
              multiline
              maxRows={10}
              errors={errors}
              control={control}
            />
            <TextInput
              name="achievements"
              label="Обязанности и достижения"
              variant="outlined"
              multiline
              maxRows={10}
              errors={errors}
              control={control}
            />
            <TextInput
              name="technologies"
              label="Технологии"
              variant="outlined"
              multiline
              maxRows={10}
              errors={errors}
              control={control}
            />
          </Stack>
          <Typography variant="h3" mb={2} sx={{ fontSize: "1.5rem" }}>
            Время нахождения на проекте:
          </Typography>
          <Stack spacing={2} mb={2} mt={2}>
            <DatePicker
              name="start"
              label="Начало"
              views={["year", "month"]}
              control={control}
              errors={errors}
            />
            {!isCurrent && (
              <DatePicker
                name="end"
                label="Конец"
                views={["year", "month"]}
                control={control}
                errors={errors}
              />
            )}
            <Checkbox
              name="isCurrent"
              control={control}
              label="По текущий момент"
            />
          </Stack>
          <ButtonDelete handleClick={deleteProject}>Удалить</ButtonDelete>
        </Paper>
        {withAddExperienceBtn && (
          <ButtonAdd type="submit">Добавить опыт</ButtonAdd>
        )}
      </form>
    </>
  );
}

export const ExperienceForm = memo(Form);
