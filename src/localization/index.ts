import {I18nManager, Platform} from 'react-native';

import i18next from 'i18next';
import {initReactI18next, useTranslation} from 'react-i18next';
import RNRestart from 'react-native-restart';

import {defaultLanguage, rtlLanguageCodes} from '../config';
import useAppStore from '../store';
import {localStorage} from '../utils/localStorage';

// Languages
import ar from './locales/ar.json';
import en from './locales/en.json';
import {HandleLanguageChangeParams, LanguageType} from './types';

export const resources = {
  en: {translation: en},
  ar: {translation: ar},
} as const;

(async () => {
  let lng;
  const currentAppLang = await localStorage.get('APP_LANGUAGE');
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
  useAppStore.setState({language: lng});
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

          if (Platform.OS !== 'web') {
            RNRestart.Restart();
          }
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

export const isRTL = () => {
  const language = useAppStore.getState().language;
  const rtl = rtlLanguageCodes.includes(language as LanguageType);
  return rtl;
};

export const useAppTranslation = useTranslation;

export default i18next;
