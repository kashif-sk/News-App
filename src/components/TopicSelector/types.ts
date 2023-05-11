import {topics} from '../../config';

export type TopicSelectorProps = {
  disabled?: boolean;
  selectedTopic: (typeof topics)[number]['key'];
  onTopicChange: (topicKey: (typeof topics)[number]['key']) => void;
};
