import axios from 'axios';
import {useCallback, useEffect, useState} from 'react';
import debounce from 'lodash/debounce';
import {topics} from '../config';
import {useAppTranslation} from '../localization';
import {ArticlesData, FetchArticlesResponse} from '../models/Articles';
import useAppStore from '../store';
import {getQueryString} from '../utils/helper';

const useFetchArticles = ({topic}: useFetchArticlesParams) => {
  const {language} = useAppStore();
  const {t} = useAppTranslation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [articlesData, setArticlesData] = useState<ArticlesData>([]);

  const fetchArticles = useCallback(async () => {
    try {
      setError('');
      setLoading(true);
      const todaysDate = new Date().getDate();
      const fromDate = new Date(
        new Date().setDate(todaysDate - 30),
      ).toISOString();

      const queryParams = {
        q: topic,
        from: fromDate,
        sortBy: 'publishedAt',
        language,
      };

      const url = `everything?${getQueryString(queryParams)}`;
      const {data} = await axios.get<FetchArticlesResponse>(url);
      if (data.status === 'ok') {
        setArticlesData(data.articles);
      } else {
        setError(data.message);
      }
    } catch (e) {
      setError(t('defaultError'));
    } finally {
      setLoading(false);
    }
  }, [language, t, topic]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchArticles = useCallback(debounce(fetchArticles, 500), [
    fetchArticles,
  ]);

  useEffect(() => {
    debouncedFetchArticles();
  }, [debouncedFetchArticles]);

  return {
    loading,
    error,
    articlesData,
  };
};

export default useFetchArticles;

type useFetchArticlesParams = {topic: (typeof topics)[number]};
