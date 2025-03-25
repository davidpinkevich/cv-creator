import { makeAutoObservable } from "mobx";

import { type ExperienceType } from "../components/Experience/types";

type ExperienceStoreType = {
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
}

export const experienceDataStore = new ExperienceStore();
