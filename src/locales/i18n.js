import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 번역 파일을 import 방식으로 불러옵니다.
import koTranslation from './ko/translation.json';
import enTranslation from './en/translation.json';
import jaTranslation from './ja/translation.json';
import zhTranslation from './zh/translation.json';


i18n.use(initReactI18next).init({
  resources: {
    ko: {
      translation: koTranslation,
    },
    en: {
      translation: enTranslation,
    },
    ja: {
      translation: jaTranslation,
    },
    zh: {
      translation: zhTranslation,
    },
  },
  lng: 'ko', // 기본 언어 설정
  fallbackLng: 'en', // 언어를 찾을 수 없으면 기본 언어로 fallback
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
