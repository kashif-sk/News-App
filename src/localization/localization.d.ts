import {LanguageType} from './types';

import {resources} from './index';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: (typeof resources)[LanguageType];
  }
}
