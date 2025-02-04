// i18n.js (or i18n.ts)
import i18n from "i18next";
import { initReactI18next } from "react-i18next"; // Import for React usage
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json';
import translationET from './locales/et/translation.json';

i18n
    .use(LanguageDetector) // Detect user language
    .use(initReactI18next) // Initialize react-i18next
    .init({
        fallbackLng: "et",
        debug: true, // Set to false in production
        resources: {
            en: {
                translation: translationEN
            },
            es: {
                translation: translationES
            },
            et: {
                translation: translationET
            }
        }
    });

export default i18n; // Export the i18n instance