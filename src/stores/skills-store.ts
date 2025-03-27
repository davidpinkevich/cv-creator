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

  deleteSkillTable = (key: string) => {
    if (key in this.dataSkills && Object.keys(this.dataSkills).length > 1) {
      delete this.dataSkills[key];
    }
  };
}

export const skillsDataStore = new SkillsStore();
