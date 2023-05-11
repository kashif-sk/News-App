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
    transparent: 'transparent',
  },
  components: {
    Text: {
      variants: {
        text12_200: {
          fontSize: 12,
          fontWeight: '200',
          color: 'gray.800',
        },
        text14_200: ({colorMode}: {colorMode: ColorMode}) => ({
          fontSize: 14,
          fontWeight: '300',
          color: colorMode === darkColorMode ? 'coolGray.100' : 'gray.800',
        }),
        text14_400: ({colorMode}: {colorMode: ColorMode}) => ({
          fontSize: 14,
          fontWeight: '400',
          color: colorMode === darkColorMode ? 'coolGray.100' : 'gray.800',
        }),
        text16_700: ({colorMode}: {colorMode: ColorMode}) => ({
          fontSize: 16,
          fontWeight: '700',
          textAlign: 'center',
          color: colorMode === darkColorMode ? 'primary.300' : 'primary.800',
        }),
        text32_700: ({colorMode}: {colorMode: ColorMode}) => ({
          fontSize: 32,
          fontWeight: '700',
          textAlign: 'center',
          color: colorMode === darkColorMode ? 'coolGray.50' : 'gray.800',
        }),
      },
    },
    Box: {
      variants: {
        header: ({colorMode}: {colorMode: ColorMode}) => ({
          backgroundColor:
            colorMode === darkColorMode ? 'gray.900' : 'coolGray.50',
          justifyContent: 'center',
          shadowColor: colorMode !== darkColorMode ? 'gray.800' : 'coolGray.50',
        }),
        container: ({colorMode}: {colorMode: ColorMode}) => ({
          backgroundColor:
            colorMode === darkColorMode ? 'gray.700' : 'coolGray.50',
          flex: 1,
        }),
        card: ({colorMode}: {colorMode: ColorMode}) => ({
          justifyContent: 'space-between',
          backgroundColor:
            colorMode === darkColorMode ? 'gray.800' : 'coolGray.100',
          shadowColor: colorMode !== darkColorMode ? 'gray.800' : 'coolGray.50',
          overflow: 'hidden',
          borderColor: colorMode === darkColorMode ? 'gray.700' : 'gray.300',
          borderWidth: 0.5,
          rounded: 'lg',
          shadow: '2',
        }),
      },
    },
    Pressable: {
      variants: {
        chip: ({colorMode}: {colorMode: ColorMode}) => ({
          borderColor:
            colorMode === darkColorMode ? 'primary.300' : 'primary.800',
          flexDirection: 'row',
          borderRadius: 25,
          borderWidth: 0.5,
          p: '2',
          m: '1',
          alignItems: 'center',
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
