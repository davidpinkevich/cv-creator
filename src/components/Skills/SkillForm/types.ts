import { type SkillGroupsTypes } from "../types";

export type SkillFormProps = {
  skillGroups: SkillGroupsTypes;
  withAddSkillBtn: boolean;
  addNewSkill: () => void;
  deleteSkill: () => void;
};
