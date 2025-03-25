import { makeAutoObservable } from "mobx";

import { type PersonalDataFormType } from "../components/PersonalData/types";

class PersonalDataStore {
  data: PersonalDataFormType = {} as PersonalDataFormType;

  constructor() {
    makeAutoObservable(this);
  }

  updatePersonalData = (value: PersonalDataFormType) => {
    this.data = { ...value };
  };
}

export const personalData = new PersonalDataStore();
