import {topics} from '../../config';

export type TopicSelectorProps = {
  disabled?: boolean;
  selectedTopic: (typeof topics)[number];
  onTopicChange: (topic: (typeof topics)[number]) => void;
};
