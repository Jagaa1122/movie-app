export type MovieType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  job: string;
  type: string;
  name: string;
};

export type GenreType = {
  id: number;
  name: string;
};

export type CrewType = {
  job: string;
  id: number;
  name: string;
};

export type CastType = {
  id: number;
  name: string;
};
export type TrailerType = {
  id: string;
  type: string;
  key: string;
};
export type Genres = {
  name: string;
  id: number;
  total_results: number;
};
export type Genre = {
  id: number;
  name: string;
};
