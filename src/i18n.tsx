import i18n from "i18next";
import i18nBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";


const getCurrentHost =
  import.meta.env.MODE === "development"
    ? "http://localhost:5173"
    : "LINK TO PROD";

i18n
  .use(LanguageDetector)
  .use(i18nBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    lng: localStorage. getItem("i18nextLng") || 'en' ,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: `${getCurrentHost}/i18n/{{lng}}.json`,
    },
  });

export default i18n;