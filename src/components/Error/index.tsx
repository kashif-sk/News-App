import React from 'react';
import {Button, Center, Text} from 'native-base';
import {useAppTranslation} from '../../localization';
import {ErrorProps} from './types';

const Error = ({errMsg, onRetry}: ErrorProps): JSX.Element => {
  const {t} = useAppTranslation();
  return (
    <Center flex={1}>
      <Text variant="text32_700">{errMsg || t('defaultError')}</Text>
      {onRetry && <Button onPress={onRetry}>Retry</Button>}
    </Center>
  );
};

export default Error;
