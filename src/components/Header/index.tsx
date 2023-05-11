import {Box, StatusBar, Text, useColorMode} from 'native-base';
import React from 'react';
import {darkColorMode} from '../../config';
import {useAppTranslation} from '../../localization';
import DarkModeSwitch from '../DarkModeSwitch';
import LanguageDropDown from '../LanguageDropDown';
import RtlAwareRow from '../RtlAwareRow';

const Header = (): JSX.Element => {
  const {t} = useAppTranslation();
  const {colorMode} = useColorMode();

  const isDarkMode = colorMode === darkColorMode;

  return (
    <Box variant="header" safeAreaTop shadow="2">
      <StatusBar
        backgroundColor="transparent"
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <RtlAwareRow
        justifyContent="space-between"
        alignItems="center"
        space="3"
        p="3">
        <Text variant="text16_700" _dark={{color: 'primary.300'}}>
          {t('appName')}
        </Text>
        <RtlAwareRow alignItems="center">
          <LanguageDropDown />
          <DarkModeSwitch />
        </RtlAwareRow>
      </RtlAwareRow>
    </Box>
  );
};

export default Header;
