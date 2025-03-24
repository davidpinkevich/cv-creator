import { useEffect } from "react";
import { type UseFormSetValue, type UseFormWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { levelMapping } from "../constants/level-mapping";
import { skillGroupsMapping } from "../constants/skill-groups-mapping";
import { translate } from "../helpers/translate";

type FormValues = {
  groupUnderAvatar?: string | undefined;
  groups: string;
  skill: string;
  experienceYears: string;
  level: string;
  year: object;
};

export function useTranslateSelects({
  watch,
  setValue,
}: {
  watch: UseFormWatch<FormValues>;
  setValue: UseFormSetValue<FormValues>;
}) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const currentGroup = watch("groups") as keyof typeof skillGroupsMapping;
    const currentLevel = watch("level") as keyof typeof levelMapping;

    if (currentGroup) {
      const translatedGroup = translate(
        currentGroup,
        skillGroupsMapping,
        i18n.language as "ru" | "en"
      );
      setValue("groups", translatedGroup);
    }

    if (currentLevel) {
      const translatedLevel = translate(
        currentLevel,
        levelMapping,
        i18n.language as "ru" | "en"
      );
      setValue("level", translatedLevel);
    } else {
      setValue("level", t("skills.level.advanced"));
    }
  }, [i18n.language]);
}
