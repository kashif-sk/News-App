import {Box, CheckIcon, Select, Toast} from 'native-base';
import React from 'react';
import {supportedLanguages} from '../../config';
import {handleLanguageChange, useAppTranslation} from '../../localization';
import {LanguageType} from '../../localization/types';
import useAppStore from '../../store';

const LanguageDropDown = (): JSX.Element => {
  const {t} = useAppTranslation();
  const {language, setLanguage} = useAppStore();

  const onLanguageChange = (newLanguage: string) => {
    handleLanguageChange({
      lang: newLanguage as LanguageType,
      onSuccess: () => {
        setLanguage(newLanguage as LanguageType);
      },
      onError: () => {
        Toast.show({title: t('defaultError')});
      },
    });
  };

  if (language == null) {
    return <></>;
  }

  return (
    <Box px="3">
      <Select
        selectedValue={language}
        minWidth="120"
        variant="rounded"
        placeholder={t('selectLanguage')}
        _selectedItem={{
          endIcon: <CheckIcon size="5" />,
        }}
        onValueChange={onLanguageChange}>
        {supportedLanguages.map(item => (
          <Select.Item
            key={item.languageCode}
            label={item.displayName}
            value={item.languageCode}
          />
        ))}
      </Select>
    </Box>
  );
};

export default LanguageDropDown;
