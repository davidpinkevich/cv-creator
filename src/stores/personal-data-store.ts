import { makeAutoObservable } from "mobx";

import { type PersonalDataFormType } from "../components/PersonalData/types";

class PersonalDataStore {
  personalData: PersonalDataFormType = {} as PersonalDataFormType;

  constructor() {
    makeAutoObservable(this);
  }

  updatePersonalData = (value: PersonalDataFormType) => {
    this.personalData = { ...value };
  };
}

export const personalDataStore = new PersonalDataStore();
