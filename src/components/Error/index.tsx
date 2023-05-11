import React from 'react';
import {Button, Center, Text, WarningOutlineIcon} from 'native-base';
import {useAppTranslation} from '../../localization';
import {ErrorProps} from './types';

const Error = ({errMsg, onRetry}: ErrorProps): JSX.Element => {
  const {t} = useAppTranslation();
  return (
    <Center flex={1}>
      <WarningOutlineIcon size="70" color="primary.800" />
      <Text variant="text32_700" my="5">
        {errMsg || t('defaultError')}
      </Text>
      {onRetry && <Button onPress={onRetry}>{t('retry')}</Button>}
    </Center>
  );
};

export default Error;
