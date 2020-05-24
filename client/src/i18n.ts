import i18n from 'i18next';
import Fetch from 'i18next-fetch-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const fallbackLng = ['en'];
const availableLanguages = ['en', 'ru'];

i18n
  .use(Fetch)
  .use(LanguageDetector) 
  .use(initReactI18next)
  .init({
    fallbackLng,
    debug: false,
    simplifyPluralSuffix: false,
    whitelist: availableLanguages,
    interpolation: {
      escapeValue: false
    },
  });

export default i18n;
