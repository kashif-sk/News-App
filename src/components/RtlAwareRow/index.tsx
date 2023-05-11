import * as React from 'react';
import {Platform} from 'react-native';
import {Row} from 'native-base';
import {isRTL} from '../../localization';
import {RtlAwareRowProps} from './types';

const RtlAwareRow = (props: RtlAwareRowProps) => {
  return (
    <Row
      flexDirection={Platform.OS === 'web' && isRTL() ? 'row-reverse' : 'row'}
      {...props}
    />
  );
};

export default RtlAwareRow;
