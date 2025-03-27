import { makeAutoObservable } from "mobx";

import { type SkillsType } from "../components/Skills/types";

export type SkillsStoreType = {
  [key: string]: SkillsType;
};

class SkillsStore {
  dataSkills: SkillsStoreType = {};

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
