"use client";

import { useEffect, useState } from "react";

type MovieType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  popularity: number;
  vote_average: number;
  vote_count: number;
};

export default function Home() {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwY2ZjN2Q0OWU5ZTE3MjMzZWFhZWY4YTU2ZmU3N2I4MSIsIm5iZiI6MTczNzM0MjQxOS45OTYsInN1YiI6IjY3OGRiZGQzZDhhNWIwZDAwYzQzNGNkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yrklh2DdZ0DLG1mj3OzajlZUddJANak9_0ji5NQKvrQ";

  const getMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data?.results) {
      setMovies(data.results);
    }
  };

  useEffect(() => {
    getMovies();
    console.log("Getting movies...");
  }, []);

  return (
    <div className="flex flex-wrap">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="flex flex-col gap-4 w-[375px] h-[510px] pl-[20px] pt-[20px]"
        >
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.original_title}
            />
          </div>
          <div className="flex flex-col gap-4">
             {movie.original_title}
          </div>
        </div>
      ))}
    </div>
  );
}