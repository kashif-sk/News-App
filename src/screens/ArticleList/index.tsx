import React, {useState} from 'react';
import {Linking, Platform} from 'react-native';
import {Box, FlatList, Spinner, Toast, useBreakpointValue} from 'native-base';
import useFetchArticles from '../../api/useFetchArticles';
import ArticleDetailsModal from '../../components/ArticleDetailsModal';
import Card from '../../components/Card';
import Error from '../../components/Error';
import ErrorBoundary from '../../components/ErrorBoundary';
import Header from '../../components/Header';
import TopicSelector from '../../components/TopicSelector';
import {topics} from '../../config';
import {useAppTranslation} from '../../localization';
import styles from './styles';

const ArticleList = (): JSX.Element => {
  const {t} = useAppTranslation();

  const [selectedTopic, setSelectedTopic] = useState<(typeof topics)[number]>(
    topics[0],
  );
  const [selectedArticleUrl, setSelectedArticleUrl] = useState<string | null>(
    null,
  );

  const numColumnsInList = useBreakpointValue({base: 1, md: 2, lg: 3, xl: 4});

  const {loading, error, articlesData} = useFetchArticles({
    topic: selectedTopic,
  });

  const onPressReadArticle = (articleUrl: string | null) => {
    try {
      if (articleUrl == null) {
        Toast.show({title: t('defaultError')});
        return;
      }
      if (Platform.OS === 'web') {
        Linking.openURL(articleUrl);
        return;
      }
      setSelectedArticleUrl(articleUrl);
    } catch (e) {
      Toast.show({title: t('defaultError')});
    }
  };

  const closeArticleDetailsModal = () => setSelectedArticleUrl(null);

  return (
    <Box variant="container">
      <ErrorBoundary>
        <Header />
        {!loading && (
          <TopicSelector
            selectedTopic={selectedTopic}
            onTopicChange={setSelectedTopic}
          />
        )}

        {loading ? (
          <Spinner size="lg" />
        ) : error !== '' ? (
          <Error errMsg={error} />
        ) : (
          <FlatList
            data={articlesData}
            padding={{base: 2, md: 3}}
            key={numColumnsInList} //to update columns on the fly on web
            contentContainerStyle={styles.flatlistContentContainer}
            numColumns={numColumnsInList}
            keyExtractor={(_item, index) => String(index)}
            renderItem={({item}) => (
              <Card
                imageUrl={item.urlToImage}
                publishedDate={item.publishedAt}
                title={item.title}
                description={item.description}
                articleUrl={item.url}
                readArticle={onPressReadArticle}
              />
            )}
          />
        )}
        <ArticleDetailsModal
          visible={selectedArticleUrl !== null}
          onClose={closeArticleDetailsModal}
          url={selectedArticleUrl}
        />
      </ErrorBoundary>
    </Box>
  );
};

export default ArticleList;
