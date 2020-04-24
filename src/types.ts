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

export type SearchResult = { [genreCodes: string]: Movie[] };

export type GenreCodes = { [genre: string]: number[] };
