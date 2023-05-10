import {I18nManager} from 'react-native';

import i18next from 'i18next';
import {initReactI18next, useTranslation} from 'react-i18next';

import {defaultLanguage, rtlLanguageCodes} from '../config';
import useAppStore from '../store';
import {localStorage} from '../utils/localStorage';

// Languages
import ar from './locales/ar.json';
import en from './locales/en.json';
import {HandleLanguageChangeParams} from './types';

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

export async function handleLanguageChange({
  lang,
  onSuccess,
  onError,
}: HandleLanguageChangeParams) {
  const forceRTL = rtlLanguageCodes.includes(lang);
  localStorage
    .set('APP_LANGUAGE', lang)
    .then(() => {
      i18next
        .changeLanguage(lang)
        .then(() => {
          useAppStore.setState({language: lang});
          I18nManager.forceRTL(forceRTL);
          onSuccess();
        })
        .catch(() => {
          onError();
        });
    })
    .catch(() => {
      onError();
    });
}

export const useAppTranslation = useTranslation;

export default i18next;
