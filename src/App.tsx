import React from 'react';
import {NativeBaseProvider, Box} from 'native-base';
import {customTheme} from './theme';

export default function App() {
  return (
    <NativeBaseProvider theme={customTheme}>
      <Box>Hello world</Box>
    </NativeBaseProvider>
  );
}
