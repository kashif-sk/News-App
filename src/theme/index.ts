import {ColorMode, extendTheme} from 'native-base';
import {darkColorMode, lightColorMode} from '../config';
import {localStorage} from '../utils/localStorage';

export const customTheme = extendTheme({
  colors: {
    primary: {
      300: '#6ee7b7',
      800: '#065f46',
    },
    coolGray: {
      50: '#f9fafb',
      100: '#f3f4f6',
    },
    gray: {
      300: '#D4D4D8',
      700: '#3f3f46',
      800: '#27272a',
      900: '#18181b',
    },
  },
  components: {
    Text: {
      variants: {
        text14_400: ({colorMode}: {colorMode: ColorMode}) => ({
          fontSize: 14,
          fontWeight: '400',
          color: colorMode === darkColorMode ? 'coolGray.100' : 'gray.800',
        }),
        text32_700: ({colorMode}: {colorMode: ColorMode}) => ({
          fontSize: 32,
          fontWeight: '700',
          textAlign: 'center',
          color: colorMode === darkColorMode ? 'coolGray.50' : 'gray.800',
        }),
      },
    },
  },
});

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
