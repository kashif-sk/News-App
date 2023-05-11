import {Switch, Text, useColorMode} from 'native-base';
import React from 'react';
import {darkColorMode} from '../../config';
import {useAppTranslation} from '../../localization';

const DarkModeSwitch = (): JSX.Element => {
  const {colorMode, toggleColorMode} = useColorMode();
  const {t} = useAppTranslation();

  return (
    <>
      <Text variant="text14_400" _dark={{color: 'primary.300'}}>
        {t('darkMode')}
      </Text>
      <Switch
        size="sm"
        value={colorMode === darkColorMode}
        onToggle={toggleColorMode}
      />
    </>
  );
};

export default DarkModeSwitch;
