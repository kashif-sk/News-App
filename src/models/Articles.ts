type ArticleItem = {
  author: string | null;
  content: string | null;
  description: string | null;
  publishedAt: string | null;
  source: {id: string | null; name: string | null};
  title: string;
  url: string | null;
  urlToImage: string | null;
};

export type ArticlesData = ArticleItem[];

type FetchArticlesSuccessResponse = {
  articles: ArticlesData;
  status: 'ok';
  totalResults: number;
};

export type FetchArticlesErrorResponse = {
  status: 'error';
  code: string;
  message: string;
};

export type FetchArticlesResponse =
  | FetchArticlesSuccessResponse
  | FetchArticlesErrorResponse;
