import {Pressable, CheckIcon, Row, Text} from 'native-base';
import React from 'react';
import {topics} from '../../config';
import {TopicSelectorProps} from './types';

const TopicSelector = ({
  disabled,
  selectedTopic,
  onTopicChange,
}: TopicSelectorProps): JSX.Element => {
  return (
    <Row flexWrap="wrap" p="2" pb="0">
      {topics.map(topic => {
        const isSelected = selectedTopic === topic;
        return (
          <Pressable
            key={topic}
            variant="chip"
            disabled={disabled}
            onPress={() => onTopicChange(topic)}
            opacity={disabled ? 0.5 : 1}>
            {isSelected && (
              <CheckIcon color="primary.800" _dark={{color: 'primary.300'}} />
            )}
            <Text variant="text14_400" px="2">
              {topic}
            </Text>
          </Pressable>
        );
      })}
    </Row>
  );
};

export default TopicSelector;
