import './localization';
import React from 'react';
import {Platform, useWindowDimensions} from 'react-native';
import {Box, NativeBaseProvider, Spinner} from 'native-base';
import './api/interceptor';
import {colorModeManager, customTheme} from './theme';
import ArticleList from './screens/ArticleList';
import useAppStore from './store';

export default function App() {
  const {language} = useAppStore();
  const {height} = useWindowDimensions();

  return (
    <NativeBaseProvider colorModeManager={colorModeManager} theme={customTheme}>
      <Box
        variant="container"
        minHeight={Platform.OS === 'web' ? height : undefined}>
        {language == null ? <Spinner size="lg" /> : <ArticleList />}
      </Box>
    </NativeBaseProvider>
  );
}
