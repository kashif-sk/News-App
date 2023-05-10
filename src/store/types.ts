import {defaultLanguage} from '../config';

type LanguageType = typeof defaultLanguage;

export type AppState = {
  language: LanguageType;
  setLanguage: (language: LanguageType) => void;
};
