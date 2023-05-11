import {defaultLanguage} from '../config';

type LanguageType = typeof defaultLanguage;

export type AppState = {
  language: LanguageType | null;
  setLanguage: (language: LanguageType) => void;
};
