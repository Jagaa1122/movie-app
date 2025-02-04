"use client";

import { TOKEN } from "@/util/constants";
import Image from "next/image";
import Link from "next/link";
import SearchPagination from "@/app/_components/SearchPagination";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

async function getMovies(query: string, page: number) {
  const searchResponse = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  return searchResponse.json();
}

async function getGenres() {
  const genresResponse = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=en",
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  return genresResponse.json();
}

export default function SearchResults() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const query = searchParams.get("query") || "";
  const genreIds = searchParams.get("genreIds") || "";

  const [searchData, setSearchData] = useState<any>(null);
  const [genres, setGenres] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const genresData = await getGenres();
      setGenres(genresData.genres);

      const moviesData = await getMovies(query, currentPage);
      console.log("Movie data", moviesData);
      console.log("My selected genres", genreIds.split(","));
      setSearchData(moviesData);
    };

    fetchData();
  }, [query, currentPage]);

  const handleGenreClick = (genreId: string) => {
    router.push(`/genres/${genreId}`);
  };

  if (!searchData || !genres) return null;

  const onValueChange = (values: string[]) => {
    const params = new URLSearchParams();
    if (values.length > 0) {
      params.set("genreIds", values.join(","));
    }
    params.set("page", "1");
    router.push(`?query=${query}&${params.toString()}`);
  };

  return (
    <div className="px-[20px] max-w-[1280px] mx-auto">
      <div className="flex gap-8">
        {/* Left side - Movies */}
        <div className="flex-1">
          <h1 className="text-[24px] font-semibold mb-8">
            Search Results for "{query}"
          </h1>

          <div className="w-[806px] items-start flex flex-wrap self-stretch gap-8">
            {searchData.results?.map((movie: MovieType) => (
              <Link key={movie.id} href={`/${movie.id}`}>
                <div className="bg-secondary rounded-[8px] overflow-hidden w-[160px] h-[320px] cursor-pointer hover:opacity-50 easin">
                  <Image
                    className="object-cover w-[160px] h-[230px]"
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt={`Poster of ${movie.original_title}`}
                    width={160}
                    height={230}
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
                        {movie.vote_average.toFixed(1)}
                        <span className="text-[#71717a] text-[12px]">/10</span>
                      </p>
                    </div>
                    <p className="text-wrap">
                      {movie.original_title.length > 25
                        ? movie.original_title.substring(0, 25) + "..."
                        : movie.original_title}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <SearchPagination
            currentPage={currentPage}
            totalPages={searchData.total_pages}
          />
        </div>

        {/* Right side - Genres */}
        <div className="w-[400px] shrink-0">
          <div className="sticky top-24">
            <div className="w-[213px] flex flex-col items-start gap-1 mb-6">
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
        </div>
      </div>
    </div>
  );
}
