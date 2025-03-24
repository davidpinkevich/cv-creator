import enTranslation from "./locales/en/translation.json";
import ruTranslation from "./locales/ru/translation.json";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    ru: {
      translation: ruTranslation,
    },
  },
  fallbackLng: "ru",
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
