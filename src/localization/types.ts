import {defaultLanguage} from '../config';

export type LanguageType = typeof defaultLanguage;

export type HandleLanguageChangeParams = {
  lang: LanguageType;
  onSuccess: () => void;
  onError: () => void;
};
