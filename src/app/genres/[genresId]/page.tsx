"use client";
import { TOKEN } from "@/util/constants";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "@/components/ui/pagination";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function ({ genresId }: { genresId: string }) {
  const [movie, setMovie] = useState<MovieType[]>();
  const [genres, setGenres] = useState<GenreType[]>();
  // props: { params: Promise<{ genresId: string }> }
  // const params = await props.params;
  //     const { genresId } = params;
  React.useEffect(() => {
    async function genre() {
      const genresData = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?language=en-US&page=1",
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      const datagenres = await genresData.json();

      const genresAllData = await fetch(
        `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genresId}&page=1`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      const genreData = await genresAllData.json();
      setMovie(genreData.results);
      setGenres(datagenres.genres);
      console.log(genreData.results);
    }
    genre();
  }, []);
  const router = useRouter();
  const searchParams = useSearchParams();

  const genreIds = searchParams.get("genreIds");
  console.log("genreIds", genreIds);

  const onValueChange = (values: string[]) => {
    router.push(`?genreIds=${values}`);
  };
  return (
    <div className="w-[1440px] h-full flex flex-col items-center mt-5">
      <div className="w-[1280px] h-full flex flex-col items-start gap-8">
        <p className="text-[30px] normal font-semibold ">Search filter</p>
        <div className="flex items-start self-stretch gap-1 h-full">
          <div className="w-[387px] flex flex-col items-start gap-5 text-secondary-foreground">
            <div className="w-[213px] flex flex-col items-start gap-1">
              <p className="text-[24px] normal font-semibold">Genres</p>
              <p className="text-[16px] normal font-normal ">
                See lists of movies by genre
              </p>
            </div>
            <ToggleGroup
              onValueChange={onValueChange}
              type="multiple"
              className="w-[387px] flex items-start content-start gap-4 self-stretch flex-wrap"
            >
              {genres?.map((d: GenreType, index: number) => {
                return (
                  <ToggleGroupItem
                    value={d.id.toString()}
                    aria-label={""}
                    key={index}
                    className="w-[87px]  gap-4 self-stretch "
                  >
                    {d.name}
                  </ToggleGroupItem>
                );
              })}
            </ToggleGroup>
          </div>
          <div className="w-[1189px] h-[1px] flex flex-col px-4 gap-[10px] self-stretch rotate-90 bg-white"></div>
          <div className="w-[806px] flex flex-col items-start gap-8">
            <p className="flex flex-col items-start gap-8">title</p>
            <div className="w-[806px] items-start flex flex-wrap self-stretch gap-8">
              {movie?.map((d: MovieType, index: number) => {
                return (
                  <Link className="" key={index} href={`/${d.id}`}>
                    <div className="bg-secondary rounded-[8px] overflow-hidden w-[160px] h-[320px] cursor-pointer">
                      <Image
                        src={`https://image.tmdb.org/t/p/original/${d?.poster_path}`}
                        alt={`Poster of ${d?.original_title}`}
                        width={500}
                        height={750}
                      />
                      <div className=" flex p-2 flex-col items-start ">
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
                            {d?.vote_average.toFixed(1)}
                            <span className="text-[#71717a] text-[12px]">
                              /10
                            </span>{" "}
                          </p>
                        </div>
                        <p className="text-wrap">{d?.original_title}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}
