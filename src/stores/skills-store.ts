import { makeAutoObservable } from "mobx";

import { type SkillsType } from "../components/Skills/types";

type ExperienceStoreType = {
  [key: string]: SkillsType;
};

class SkillsStore {
  data: ExperienceStoreType = {};

  constructor() {
    makeAutoObservable(this);
  }

  updateSkills = (obj: SkillsType, key: string) => {
    this.data[key] = obj;
  };
}

export const skillsData = new SkillsStore();
