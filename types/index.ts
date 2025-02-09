export interface Author {
  id: number;
  name: string;
  bio?: string;
  image_url?: string;
}

export interface Source {
  id: number;
  title: string;
  type: string;
  publishedAt?: Date;
  url?: string;
}

export interface Quote {
  id: number;
  text: string;
  author: Author;
  source?: Source;
}
