"use client";
import { TOKEN } from "@/util/constants";
import Image from "next/image";
import Link from "next/link";
import GenrePagination from "@/app/_components/GenrePagination";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

export default function ({
  params,
}: {
  params: Promise<{ searchId: string }>;
}) {
  const searchParams = useSearchParams();
  const [resolvedParams, setResolvedParams] = useState<{
    searchId: string;
  } | null>(null);
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [genres, setGenres] = useState<GenreType[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const router = useRouter();
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
    //     props: {
    //   params: Promise<{ searchId: string }>;
    // }
      //   const params = await props.params;
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

        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${params}&language=en-US&page=${page}`,
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
                className="w-[87px] gap-4 justify-start"
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
            {movies?.map((d: MovieType, index: number) => (
              <Link href={`/${d?.id}`} key={index}>
                <div className="flex items-start self-stretch p-2 gap-4 rounded-[8px] dark:hover:bg-gray-700 w-[550px] hover:bg-[#efefef]">
                  <Image
                    src={`https://image.tmdb.org/t/p/original/${d?.poster_path}`}
                    width={67}
                    height={100}
                    alt={`${d.original_title}`}
                    className="rounded-[6px] cursor-pointer"
                  />
                  <div className="flex flex-col items-start gap-4 w-[100%]">
                    <h2 className="font-bold text-[20px]">
                      {d?.original_title}
                    </h2>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
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
                      <div className="flex text-[14px] items-center">
                        <p className="font-semibold">
                          {d?.vote_average.toFixed(1)}
                        </p>
                        <p className="text-[12px] text-[#71717A]">/10</p>
                      </div>
                    </div>
                    <div className="flex justify-between w-[100%]">
                      <p>{d?.release_date}</p>
                      <div className="flex items-center gap-2 cursor-pointer pr-5">
                        <p className="hover:underline text-[14px]">See more</p>
                        <ArrowRight className="w-[16px]" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[550px] h-[1.5px] my-1 dark:bg-gray-700 bg-[#efefef]"></div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <GenrePagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}
