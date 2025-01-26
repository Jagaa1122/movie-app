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
 };

type GenreType = {
  id:number;
  name:string;
};
 
type CrewType = {
  known_for_department: string;
  name:string;
};

type CastType = {
  name:string;
}