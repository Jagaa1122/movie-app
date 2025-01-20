"use client";

import { useEffect, useState } from "react";

type MovieType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [];
  id: number;
  original_title: "";
  original_language: "";
  overview: "";
  poster_path: "";
  release_date: "";
  title: "";
  video: boolean;
  popularity: number;
  vote_average: number;
  vote_count: number;
};

export default function Home() {
  const [movie, setMovie] = useState<MovieType | undefined>();
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwY2ZjN2Q0OWU5ZTE3MjMzZWFhZWY4YTU2ZmU3N2I4MSIsIm5iZiI6MTczNzM0MjQxOS45OTYsInN1YiI6IjY3OGRiZGQzZDhhNWIwZDAwYzQzNGNkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yrklh2DdZ0DLG1mj3OzajlZUddJANak9_0ji5NQKvrQ";
  const getMovie = async () => {
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
      setMovie(data.results[0]);
    }
  };
  useEffect(() => {
    getMovie();
    console.log("getting movie");
  }, []);
  console.log({ movie });
  return (
    <div className="flex flex-col gap-4 w-[375px] h-[510px] pl-[20px] pt-[20px]">
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`}
          alt=""
        />
      </div>
      <div className="flex flex-col  gap-4">Hello: {movie?.original_title}</div>
    </div>
  );
}
