import { makeAutoObservable } from "mobx";

import { type ExperienceType } from "../components/Experience/types";

export type ExperienceStoreType = {
  [key: string]: ExperienceType;
};

class ExperienceStore {
  dataExperience: ExperienceStoreType = {};

  constructor() {
    makeAutoObservable(this);
  }

  updateExperience = (obj: ExperienceType, key: string) => {
    this.dataExperience[key] = obj;
  };

  deleteExperienceTable = (key: string) => {
    if (
      key in this.dataExperience &&
      Object.keys(this.dataExperience).length > 1
    ) {
      delete this.dataExperience[key];
    }
  };
}

export const experienceDataStore = new ExperienceStore();
