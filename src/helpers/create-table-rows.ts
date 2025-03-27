import { type SkillsType } from "../components/Skills/types";
import { type SkillsStoreType } from "../stores/skills-store";

export function createTableRows(data: SkillsStoreType) {
  const result: { [key: string]: SkillsType[] } = {};

  Object.values(data).forEach((item) => {
    if (item.groups in result) {
      result[item.groups].push({ ...item });
    } else if (item.groups.length) {
      result[item.groups] = [{ ...item }];
    }
  });

  return Object.entries(result);
}
