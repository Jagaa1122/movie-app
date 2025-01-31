import Image from "next/image";
import Link from "next/link";

export default async function MovieCard({ data }: { data: MovieType[] }) {
  return (
    <div className="grid grid-cols-5 gap-[32px] max-w-[1440px]">
      {data?.slice(0, 5).map((d) => {
        return (
          <Link
            href={`/${d.id}`}
            key={d.id}
            className="max-w-[230px] bg-secondary rounded-[6px] overflow-hidden"
          >
            <div className=" max-w-[230px] h-[300px] ">
              <Image
                width={1000}
                height={1000}
                className="size-76"
                src={`https://image.tmdb.org/t/p/w500${d.poster_path}`}
                alt={d.original_title}
              />
            </div>
            <div className="p-1">
              <div className="text-[12px] flex ">
                <img src="star.svg" alt="" />
                <p>
                  <span className="text-[14px] font-bold">
                    {" "}
                    {d.vote_average.toFixed(1)}
                  </span>{" "}
                  /10
                </p>
              </div>

              <h2 className="flex flex-col gap-6 text-[18px]">
                {d.original_title}
              </h2>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
// data type ->
// page:number,
// results: MovieType[],
// total_pages:number,
// total_results:number,
