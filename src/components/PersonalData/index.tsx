import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack } from "@mui/material";

import { englishLevels } from "../../constants/english-levels";
import { personalDataStore } from "../../stores/personal-data-store";
import { Select } from "../Select";
import { TextInput } from "../TextInput";
import { validatoinShema } from "./validationShema";

export const PersonalData = () => {
  const { t } = useTranslation();

  const { updatePersonalData } = personalDataStore;

  const {
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validatoinShema(t)),
    defaultValues: {
      firstName: "",
      secondName: "",
      position: "",
      education: "",
      about: "",
      level: "B1",
      skills: "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    updatePersonalData(watch());
  }, [watch()]);

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
          label={t("personal.name")}
          variant="outlined"
          errors={errors}
          control={control}
          handleKeyDown={handleKeyDown}
        />
        <TextInput
          name="secondName"
          label={t("personal.secondName")}
          variant="outlined"
          errors={errors}
          control={control}
          handleKeyDown={handleKeyDown}
        />
        <TextInput
          name="position"
          label={t("personal.position")}
          variant="outlined"
          errors={errors}
          control={control}
          handleKeyDown={handleKeyDown}
        />
        <Select
          name="level"
          label={t("personal.level")}
          variant="outlined"
          control={control}
          value={englishLevels}
        />
        <TextInput
          name="education"
          label={t("personal.education")}
          variant="outlined"
          errors={errors}
          control={control}
        />
        <TextInput
          name="about"
          label={t("personal.about")}
          variant="outlined"
          errors={errors}
          control={control}
          multiline={true}
          maxRows={10}
        />
        <TextInput
          name="skills"
          label={t("personal.skills")}
          variant="outlined"
          errors={errors}
          control={control}
          multiline={true}
          maxRows={6}
        />
      </Stack>
    </form>
  );
};
