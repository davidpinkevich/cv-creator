import { memo } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Paper, Stack, Typography } from "@mui/material";

import { ButtonAdd } from "../../ButtonAdd";
import { ButtonDelete } from "../../ButtonDelete";
import { Checkbox } from "../../Checkbox";
import { DatePicker } from "../../DatePicker";
import { TextInput } from "../../TextInput";
import { type ExperienceFormType } from "../types";
import { validatoinShema } from "./validatoinShema";

function Form({
  withAddExperienceBtn,
  addNewProject,
  deleteProject,
}: {
  withAddExperienceBtn: boolean;
  addNewProject: () => void;
  deleteProject: () => void;
}) {
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
      start: undefined,
      end: undefined,
      isCurrent: false,
    },
    mode: "onSubmit",
  });

  const isCurrent = watch("isCurrent");

  const onSubmit: SubmitHandler<Omit<ExperienceFormType, "id">> = () => {
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
          </Stack>
          <Typography variant="h3" mb={2} sx={{ fontSize: "1.5rem" }}>
            Время нахождения на проекте:
          </Typography>
          <Stack spacing={2} mb={2} mt={2}>
            <DatePicker
              name="start"
              label="Начало"
              control={control}
              errors={errors}
            />
            {!isCurrent && (
              <DatePicker
                name="end"
                label="Конец"
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
        {withAddExperienceBtn && <ButtonAdd>Добавить опыт</ButtonAdd>}
      </form>
    </>
  );
}

export const ExperienceForm = memo(Form);
