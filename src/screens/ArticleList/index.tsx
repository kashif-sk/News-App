import React, {useState} from 'react';
import {Box, FlatList, Spinner, useBreakpointValue} from 'native-base';
import useFetchArticles from '../../api/useFetchArticles';
import Card from '../../components/Card';
import Error from '../../components/Error';
import ErrorBoundary from '../../components/ErrorBoundary';
import Header from '../../components/Header';
import TopicSelector from '../../components/TopicSelector';
import {topics} from '../../config';

const ArticleList = (): JSX.Element => {
  const [selectedTopic, setSelectedTopic] = useState<(typeof topics)[number]>(
    topics[0],
  );

  const numColumnsInList = useBreakpointValue({base: 1, md: 2, lg: 3, xl: 4});

  const {loading, error, articlesData} = useFetchArticles({
    topic: selectedTopic,
  });

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
            contentContainerStyle={{alignItems: 'center'}}
            numColumns={numColumnsInList}
            keyExtractor={(_item, index) => String(index)}
            renderItem={({item}) => (
              <Card
                imageUrl={item.urlToImage}
                publishedDate={item.publishedAt}
                title={item.title}
                description={item.description}
                articleUrl={item.url}
              />
            )}
          />
        )}
      </ErrorBoundary>
    </Box>
  );
};

export default ArticleList;
