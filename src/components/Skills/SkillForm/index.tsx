import { memo } from "react";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Paper, Stack } from "@mui/material";

import { Autocomplete } from "../../Autocomplete";
import { ButtonAdd } from "../../ButtonAdd";
import { ButtonDelete } from "../../ButtonDelete";
import { DatePicker } from "../../DatePicker";
import { Select } from "../../Select";
import { TextInput } from "../../TextInput";
import { type SkillFormProps } from "./types";
import { validatoinShema } from "./validatoinShema";

function Form({
  skillGroups,
  withAddSkillBtn,
  addNewSkill,
  deleteSkill,
}: SkillFormProps) {
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validatoinShema),
    defaultValues: {
      groups: "",
      skill: "",
      level: "Продвинутый",
      experienceYears: "",
      groupUnderAvatar: "",
      year: dayjs(),
    },
    mode: "onSubmit",
  });

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
                  label="Группа навыков"
                  variant="outlined"
                  control={control}
                  value={Object.keys(skillGroups)}
                />
              </Box>
              <Box sx={{ width: "35%" }}>
                <Autocomplete
                  name="skill"
                  control={control}
                  label="Навык"
                  options={
                    watch("groups")
                      ? skillGroups[watch("groups")]
                      : Object.keys(skillGroups).reduce<string[]>(
                          (acc, key) => [...acc, ...skillGroups[key]],
                          []
                        )
                  }
                />
              </Box>
            </Stack>
            <Stack direction="row" spacing={2} mb={2} mt={2}>
              <Box sx={{ width: "38%" }}>
                <Select
                  name="level"
                  size="small"
                  label="Уровень"
                  variant="outlined"
                  control={control}
                  value={["Средний", "Продвинутый"]}
                />
              </Box>
              <Box sx={{ width: "20%" }}>
                <TextInput
                  name="experienceYears"
                  size="small"
                  label="Опыт, в годах"
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
                  label="Последний год"
                  name="year"
                />
              </Box>
              <Box sx={{ width: "20%" }}>
                <TextInput
                  name="groupUnderAvatar"
                  size="small"
                  label="Группа"
                  variant="outlined"
                  type="number"
                  errors={errors}
                  control={control}
                />
              </Box>
            </Stack>
            <Stack direction="row" spacing={2} mb={2} mt={2}>
              <ButtonDelete size="medium" handleClick={deleteSkill}>
                Удалить
              </ButtonDelete>
              {withAddSkillBtn && (
                <ButtonAdd size="medium" type="submit">
                  Добавить новый
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
