export interface SingleArticle {
  article: Article;
}

export interface MultiArticle {
  article: Article[];
  articlesCount: number;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Author;
}

export interface FormCreateArticle {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export interface Author {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface SingleComment {
  comment: Comment;
}

export interface MultiComment {
  comments: Comment[];
}

export interface Comment {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: Author;
}

export interface Tags {
  tags: string[];
}
