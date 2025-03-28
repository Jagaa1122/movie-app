"use client";
import { TOKEN } from "@/util/constants";
import Image from "next/image";
import Link from "next/link";
import GenrePagination from "@/app/_components/GenrePagination";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { GenreType, MovieType } from "@/util/types";

export default function Page({
  params,
}: {
  params: Promise<{ genresId: string }>;
}) {
  const [resolvedParams, setResolvedParams] = useState<{
    genresId: string;
  } | null>(null);
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [genres, setGenres] = useState<GenreType[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const router = useRouter();
  const searchParams = useSearchParams();
  const genreIds = searchParams.get("genreIds") || "";
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  // Unwrap `params` correctly
  useEffect(() => {
    async function resolveParams() {
      const resolved = await params;
      setResolvedParams(resolved);
    }
    resolveParams();
  }, [params]);

  // Fetch genres and movies when `params` are resolved or when genreIds change
  useEffect(() => {
    async function fetchGenresAndMovies() {
      if (!resolvedParams) return;

      try {
        // Fetch available genres
        const genreResponse = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?language=en-US",
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );
        const genreData = await genreResponse.json();
        setGenres(genreData.genres);

        // Fetch movies based on selected genres
        const selectedGenres = genreIds ? genreIds : resolvedParams.genresId;
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=${selectedGenres}&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );
        const movieData = await movieResponse.json();
        setMovies(movieData.results);
        setTotalPages(movieData.total_pages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchGenresAndMovies();
  }, [resolvedParams, genreIds, page]);

  // Handle genre selection
  const onValueChange = (values: string[]) => {
    const params = new URLSearchParams();
    if (values.length > 0) {
      params.set("genreIds", values.join(","));
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="w-[1280px] h-full flex flex-col items-start gap-8 mx-auto">
      <p className="text-[30px] font-semibold">Search filter</p>
      <div className="flex items-start self-stretch gap-1 h-full">
        <div className="w-[387px] flex flex-col items-start gap-5 text-secondary-foreground">
          <div className="w-[213px] flex flex-col items-start gap-1">
            <p className="text-[24px] font-semibold">Genres</p>
            <p className="text-[16px] font-normal">
              See lists of movies by genre
            </p>
          </div>
          <ToggleGroup
            onValueChange={onValueChange}
            type="multiple"
            className="w-[387px] flex items-start content-start gap-4  flex-wrap justify-start "
          >
            {genres?.map((d: GenreType) => (
              <ToggleGroupItem
                value={d.id.toString()}
                key={d.id}
                className="w-[87px] gap-4 "
              >
                {d.name}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <div className="w-[1189px] h-[1px] flex flex-col px-4 gap-[10px] self-stretch rotate-90 bg-white border-l-0,5 pl-[20px]"></div>
        <div className="w-[806px] flex flex-col items-start gap-8">
          <p className="flex flex-col items-start gap-8">Movies</p>
          <div className="w-[806px] items-start flex flex-wrap self-stretch gap-8">
            {movies?.map((d: MovieType) => (
              <Link key={d.id} href={`/${d.id}`}>
                <div className="bg-secondary rounded-[8px] overflow-hidden w-[160px] h-[320px] cursor-pointer hover:opacity-50 ease-in">
                  <Image
                    src={`https://image.tmdb.org/t/p/original/${d.poster_path}`}
                    alt={`Poster of ${d.original_title}`}
                    width={500}
                    height={750}
                  />
                  <div className="flex p-2 flex-col items-start">
                    <div className="flex gap-[2px] items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M7.99992 1.33325L10.0599 5.50659L14.6666 6.17992L11.3333 9.42659L12.1199 14.0133L7.99992 11.8466L3.87992 14.0133L4.66658 9.42659L1.33325 6.17992L5.93992 5.50659L7.99992 1.33325Z"
                          fill="yellow"
                          stroke="blue"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p>
                        {d.vote_average.toFixed(1)}
                        <span className="text-[#71717a] text-[12px]">/10</span>
                      </p>
                    </div>
                    <p className="text-wrap">{d.original_title}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <GenrePagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}
