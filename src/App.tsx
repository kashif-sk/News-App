import React from 'react';
import {NativeBaseProvider} from 'native-base';
import './localization';
import {colorModeManager, customTheme} from './theme';
import ArticleList from './screens/ArticleList';

export default function App() {
  return (
    <NativeBaseProvider colorModeManager={colorModeManager} theme={customTheme}>
      <ArticleList />
    </NativeBaseProvider>
  );
}
