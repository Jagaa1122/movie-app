import Image from "next/image";
import Link from "next/link";

export default async function MovieCard({ data }: { data: MovieType[] }) {
  return (
    <div className="grid grid-cols-5 gap-[32px] max-w-[1440px]">
      {data.slice(0, 10).map((d) => {
        return (
          <Link
            href={`/${d.id}`}
            key={d.id}
            className="w-[239px] bg-secondary rounded-[6px] overflow-hidden"
          >
            <div className=" max-w-[239px] h-[340px] ">
              <Image
                width={239}
                height={540}
                className="size-46"
                src={`https://image.tmdb.org/t/p/w500${d.poster_path}`}
                alt={d.original_title}
              />
            </div>
            <div className="p-4">
              <div className="text-[12px] mt-6 flex align-middle">
                <img src="star.svg" alt="" />
                <p>
                  <span className="text-[14px] font-bold">
                    {d.vote_average.toFixed(1)}
                  </span>
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
