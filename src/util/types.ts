type MovieType = {
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

type GenreType = {
  id: number;
  name: string;
};

type CrewType = {
  job: string;
  id: number;
  name: string;
};

type CastType = {
  id: number;
  name: string;
};
type Trailer = {
  id: string;
  type: string;
  key: string;
};
type Genres = {
  name: string;
  id: number;
  total_results: number;
};
type Genre = {
  id: number;
  name: string;
};
