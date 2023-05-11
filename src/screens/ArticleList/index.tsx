import React from 'react';
import {Box} from 'native-base';
import ErrorBoundary from '../../components/ErrorBoundary';
import Header from '../../components/Header';

const ArticleList = (): JSX.Element => {
  return (
    <Box variant="container">
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>
    </Box>
  );
};

export default ArticleList;
