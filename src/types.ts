export enum SearchBy {
  recent = 'recent',
  genre = 'genre'
}

export interface Movie {
  title?: string;
  synopsis?: string;
  image?: string;
  rating?: string;
  released?: string;
  runtime?: string;
  empty?: boolean;
}

export type TSearchResults = { [key: string]: Movie[] };

export type TGenreResults = { [key: string]: number[] }[];
