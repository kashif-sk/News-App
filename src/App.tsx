import './localization';
import React from 'react';
import {NativeBaseProvider, Spinner} from 'native-base';
import './api/interceptor';
import {colorModeManager, customTheme} from './theme';
import ArticleList from './screens/ArticleList';
import useAppStore from './store';

export default function App() {
  const {language} = useAppStore();
  return (
    <NativeBaseProvider colorModeManager={colorModeManager} theme={customTheme}>
      {language == null ? <Spinner size="lg" /> : <ArticleList />}
    </NativeBaseProvider>
  );
}
