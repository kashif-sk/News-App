import axios from 'axios';
import {useCallback, useEffect, useState} from 'react';
import debounce from 'lodash/debounce';
import {topics} from '../config';
import {useAppTranslation} from '../localization';
import {ArticlesData, FetchArticlesResponse} from '../models/Articles';
import useAppStore from '../store';
import {getQueryString} from '../utils/helper';

const PageSize = 48;
const MaxPageAccessible = Math.floor(100 / PageSize);

const useFetchArticles = ({topic}: useFetchArticlesParams) => {
  const {language} = useAppStore();
  const {t} = useAppTranslation();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [articlesData, setArticlesData] = useState<ArticlesData>([]);
  const [page, setPage] = useState(1);
  const [loadingMoreItems, setLoadingMoreItems] = useState(false);
  const [isAllArticlesFetched, setIsAllArticlesFetched] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [language, topic]);

  const fetchArticles = useCallback(async () => {
    try {
      setError('');
      if (page === 1) {
        setLoading(true);
      }
      const todaysDate = new Date().getDate();
      const fromDate = new Date(
        new Date().setDate(todaysDate - 30),
      ).toISOString();

      const queryParams = {
        q: topic,
        from: fromDate,
        sortBy: 'publishedAt',
        language,
        pageSize: PageSize,
        page,
      };

      const url = `everything?${getQueryString(queryParams)}`;
      const {data} = await axios.get<FetchArticlesResponse>(url);
      if (data.status === 'ok') {
        let articlesDataCount = 0;
        page === 1
          ? setArticlesData(data.articles)
          : setArticlesData(prevData => {
              const newData = [...prevData, ...data.articles];
              articlesDataCount = newData.length;
              return newData;
            });
        if (
          articlesDataCount >= data.totalResults ||
          page >= MaxPageAccessible
        ) {
          setIsAllArticlesFetched(true);
        }
      } else {
        setError(data.message);
      }
    } catch (e) {
      setError(t('defaultError'));
    } finally {
      setLoading(false);
      setLoadingMoreItems(false);
    }
  }, [language, page, t, topic]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchArticles = useCallback(debounce(fetchArticles, 500), [
    fetchArticles,
  ]);

  useEffect(() => {
    debouncedFetchArticles();
  }, [debouncedFetchArticles]);

  const loadMoreArticles = useCallback(() => {
    if (!loading && !loadingMoreItems) {
      setLoadingMoreItems(true);
      setPage(prevPage => prevPage + 1);
    }
  }, [loading, loadingMoreItems]);

  const onRefresh = () => {
    setPage(1);
    debouncedFetchArticles();
  };

  return {
    loading,
    loadingMoreItems,
    error,
    articlesData,
    isAllArticlesFetched,
    loadMoreArticles,
    onRefresh,
  };
};

export default useFetchArticles;

type useFetchArticlesParams = {topic: (typeof topics)[number]['key']};
