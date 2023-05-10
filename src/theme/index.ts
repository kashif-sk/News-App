import {ColorMode, extendTheme} from 'native-base';
import {darkColorMode, lightColorMode} from '../config';
import {localStorage} from '../utils/localStorage';

export const customTheme = extendTheme({});

export const colorModeManager = {
  get: async () => {
    try {
      const val = await localStorage.get('@color-mode');
      return val === darkColorMode ? darkColorMode : lightColorMode;
    } catch (e) {
      return lightColorMode;
    }
  },
  set: async (value: ColorMode) => {
    try {
      const strValue = value ? value.toString() : '';
      localStorage.set('@color-mode', strValue);
    } catch (e) {}
  },
};

// 2. Get the type of the CustomTheme
type CustomThemeType = typeof customTheme;

// 3. Extend the internal NativeBase Theme
declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}
