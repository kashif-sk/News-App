import React from 'react';
import {NativeBaseProvider, Box} from 'native-base';
import {colorModeManager, customTheme} from './theme';

export default function App() {
  return (
    <NativeBaseProvider colorModeManager={colorModeManager} theme={customTheme}>
      <Box>Hello world</Box>
    </NativeBaseProvider>
  );
}
