import {Pressable, CheckIcon, Text} from 'native-base';
import React from 'react';
import {Platform} from 'react-native';
import {topics} from '../../config';
import {isRTL, useAppTranslation} from '../../localization';
import RtlAwareRow from '../RtlAwareRow';
import {TopicSelectorProps} from './types';

const TopicSelector = ({
  disabled,
  selectedTopic,
  onTopicChange,
}: TopicSelectorProps): JSX.Element => {
  const {t} = useAppTranslation();

  return (
    <RtlAwareRow flexWrap="wrap" p="2" pb="0">
      {topics.map(topic => {
        const isSelected = selectedTopic === topic.key;
        return (
          <Pressable
            key={topic.key}
            variant="chip"
            disabled={disabled}
            onPress={() => onTopicChange(topic.key)}
            opacity={disabled ? 0.5 : 1}
            flexDirection={
              Platform.OS === 'web' && isRTL() ? 'row-reverse' : 'row'
            }>
            {isSelected && (
              <CheckIcon color="primary.800" _dark={{color: 'primary.300'}} />
            )}
            <Text variant="text14_400" px="2">
              {t(topic.labelKey)}
            </Text>
          </Pressable>
        );
      })}
    </RtlAwareRow>
  );
};

export default TopicSelector;
