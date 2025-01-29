import { TOKEN } from "@/util/constants";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "@/components/ui/pagination";

export default async function ({
    params: { genresId },
}: {
    params: { genresId : string};
}) {
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
      const dataAllgenres = await genresAllData.json();
      return (
        <div className="w-[1440px] h-[1569px] flex flex-col items-center mt-5">
          <div className="w-[1280px] h-[1257px] flex flex-col items-start gap-8">
            <p className="text-[#fafafa] text-[30px] normal font-semibold ">
              Search filter
            </p>
            <div className="flex items-start self-stretch gap-1">
              <div className="w-[387px] flex flex-col items-start gap-5 text-[#fafafa]">
                <div className="w-[213px] flex flex-col items-start gap-1">
                  <p className="text-[24px] normal font-semibold">Genres</p>
                  <p className="text-[16px] normal font-normal ">
                    See lists of movies by genre
                  </p>
                </div>
                <div className="w-[387px] flex items-start content-start gap-4 self-stretch flex-wrap">
                  {datagenres.genres.map((d: MovieType, index: number) => {
                     return (
                        <div>
                          <p>{d.name}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="w-[1189px] h-[1px] flex flex-col px-4 gap-[10px] self-stretch rotate-90 bg-white"></div>
                <div className="w-[806px] flex flex-col items-start gap-8">
                  <p className="flex flex-col items-start gap-8">title</p>
                  <div className="w-[806px] h-full flex flex-wrap items-start self-stretch gap-8">
                    {dataAllgenres.results.slice.map((d: MovieType, index: number) => {
                        return (
                          <Link href={`/${d.id}`}>
                            <div
                              key={index}
                              className="rounded-[8px] overflow-hidden w-[230px] h-[439px] flex flex-col items-start cursor-pointer"
                            >
                              <Image
                                src={`https://image.tmdb.org/t/p/original/${d?.poster_path}`}
                                alt={`Poster of ${d?.original_title}`}
                                width={500}
                                height={750}
                              />
                              <div className="bg-[#27272a] flex p-2 flex-col items-start self-stretch h-full">
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
                                    stroke="yellow"
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
                              <p>{d?.original_title}</p>
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
