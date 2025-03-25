import { makeAutoObservable } from "mobx";

import { type SkillsType } from "../components/Skills/types";

type ExperienceStoreType = {
  [key: string]: SkillsType;
};

class SkillsStore {
  dataSkills: ExperienceStoreType = {};

  constructor() {
    makeAutoObservable(this);
  }

  updateSkills = (obj: SkillsType, key: string) => {
    this.dataSkills[key] = obj;
  };
}

export const skillsDataStore = new SkillsStore();
