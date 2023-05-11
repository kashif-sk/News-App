import {topics} from '../../config';

export type TopicSelectorProps = {
  selectedTopic: (typeof topics)[number];
  onTopicChange: (topic: (typeof topics)[number]) => void;
};
