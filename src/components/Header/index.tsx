import {Box, Row, StatusBar, Text, useColorMode} from 'native-base';
import React from 'react';
import {darkColorMode} from '../../config';
import {useAppTranslation} from '../../localization';
import DarkModeSwitch from '../DarkModeSwitch';
import LanguageDropDown from '../LanguageDropDown';

const Header = (): JSX.Element => {
  const {t} = useAppTranslation();
  const {colorMode} = useColorMode();

  const isDarkMode = colorMode === darkColorMode;

  return (
    <Box variant="header" safeAreaTop shadow="2">
      <StatusBar
        backgroundColor={isDarkMode ? 'gray.900' : 'coolGray.50'}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <Row justifyContent="space-between" alignItems="center" space="3" p="3">
        <Text variant="text16_700" _dark={{color: 'primary.300'}}>
          {t('appName')}
        </Text>
        <Row alignItems="center">
          <LanguageDropDown />
          <DarkModeSwitch />
        </Row>
      </Row>
    </Box>
  );
};

export default Header;
