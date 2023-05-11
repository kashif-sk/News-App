export type CardProps = {
  imageUrl: string | null;
  publishedDate: string | null;
  title: string | null;
  description: string | null;
  articleUrl: string | null;
  readArticle: (articleUrl: string | null) => void;
};
