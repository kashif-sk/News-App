import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';

import {defaultLanguage} from '../config';
import useAppStore from '../store';
import {localStorage} from '../utils/localStorage';

// Languages
import ar from './locales/ar.json';
import en from './locales/en.json';

export const resources = {
  en: {translation: en},
  ar: {translation: ar},
} as const;

(async () => {
  let lng;
  const currentAppLang = await localStorage.get('APP_LANGUAGE');
  useAppStore.setState({language: currentAppLang});
  if (currentAppLang?.length) {
    lng = currentAppLang;
  } else {
    lng = defaultLanguage;
    localStorage.set('APP_LANGUAGE', defaultLanguage);
  }
  i18next.use(initReactI18next).init({
    lng,
    resources,
    fallbackLng: defaultLanguage,
    keySeparator: '.',
    interpolation: {escapeValue: false},
    compatibilityJSON: 'v3',
  });
})();

export default i18next;
