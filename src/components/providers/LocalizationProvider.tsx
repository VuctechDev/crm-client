import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

interface Props {
  children: React.ReactElement;
}

// src/i18n.ts

// const init = () =>
i18n
  .use(HttpBackend) // Load translation files from backend
  .use(LanguageDetector) // Detect language from browser or query parameters
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    fallbackLng: "en", // Default language if detection fails
    debug: true, // Set to false in production
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    backend: {
      loadPath: "/locales/{{lng}}/common.json", // Path to translation files
    },
  });

// export default i18n;

const LocalizationProvider: React.FC<Props> = ({ children }) => {
  //   init();
  return <>{children}</>;
};

export default LocalizationProvider;
