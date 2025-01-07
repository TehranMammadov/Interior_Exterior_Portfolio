import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import Cookies from 'js-cookie';

const cookieLanguage = Cookies.get('i18next');

i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ['az', 'en' ],
        fallbackLng: cookieLanguage ? cookieLanguage : 'az',
        detection: {
            order: ['cookie'],
            caches: ['cookie']
        },
        backend: {
            loadPath: '/i18n/{{lng}}/translation.json',
        },
        react: {
            useSuspense: true,
        }
    });

export default i18n;