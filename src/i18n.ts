import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resources from "./resource.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: resources.en,
    },
    fa: {
      translation: resources.fa,
    },
  },
  lng: "en",
  fallbackLng: "fa",
  interpolation: {
    escapeValue: false,
  },
  debug: false,
});

export default i18n;
