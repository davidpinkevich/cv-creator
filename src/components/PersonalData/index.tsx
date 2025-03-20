import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack } from "@mui/material";

import { Select } from "../Select";
import { TextInput } from "../TextInput";
import { validatoinShema } from "./validationShema";

export function PersonalData() {
  const {
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validatoinShema),
    defaultValues: {
      firstName: "",
      secondName: "",
      position: "",
      education: "",
      about: "",
      level: "B1",
    },
    mode: "onTouched",
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const char = event.key;
    if (/\d/.test(char)) {
      event.preventDefault();
    }
  };

  return (
    <form>
      <Stack spacing={2} mb={2}>
        <TextInput
          name="firstName"
          label="Имя"
          variant="outlined"
          errors={errors}
          control={control}
          handleKeyDown={handleKeyDown}
        />
        <TextInput
          name="secondName"
          label="Фамилия"
          variant="outlined"
          errors={errors}
          control={control}
          handleKeyDown={handleKeyDown}
        />
        <TextInput
          name="position"
          label="Позиция"
          variant="outlined"
          errors={errors}
          control={control}
          handleKeyDown={handleKeyDown}
        />
        <Select
          name="level"
          label="Уровень английского"
          variant="outlined"
          control={control}
          value={["A1", "A2", "B1", "B2", "C1", "C3"]}
        />
        <TextInput
          name="education"
          label="Образование"
          variant="outlined"
          errors={errors}
          control={control}
        />
        <TextInput
          name="about"
          label="О разработчике"
          variant="outlined"
          errors={errors}
          control={control}
          multiline={true}
          maxRows={10}
        />
      </Stack>
    </form>
  );
}
