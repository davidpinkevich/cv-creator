import { makeAutoObservable } from "mobx";

import { type ExperienceType } from "../components/Experience/types";

type ExperienceStoreType = {
  [key: string]: ExperienceType;
};

class ExperienceStore {
  data: ExperienceStoreType = {};

  constructor() {
    makeAutoObservable(this);
  }

  updateExperience = (obj: ExperienceType, key: string) => {
    this.data[key] = obj;
  };
}

export const experienceData = new ExperienceStore();
