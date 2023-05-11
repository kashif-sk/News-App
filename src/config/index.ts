export const supportedLanguages = [
  {languageCode: 'en', displayName: 'English'},
  {languageCode: 'ar', displayName: 'عربي'},
] as const;

export const rtlLanguageCodes: (typeof supportedLanguages)[number]['languageCode'][] =
  ['ar'];

export const defaultLanguage: (typeof supportedLanguages)[number]['languageCode'] =
  'en';

export const lightColorMode = 'light';
export const darkColorMode = 'dark';

export const topics = [
  'Apple',
  'Meta',
  'Netflix',
  'Google',
  'Twitter',
  'Tesla',
] as const;
