import Image from "next/image";

export default async function Card({ data }: { data: MovieType[] }) {
  return (
    <div className="flex flex-wrap justify-center items-center w-[100%] h-[100vh] gap-4 ">
      {data.slice(0, 10).map((d) => {
        return (
          <div key={d.id} className="w-[239px] h-[470px] bg-[#f4f4f5]">
            <div className=" max-w-[239px] h-[340px]">
              <Image
                width={1000}
                height={1000}
                className="size-76"
                src={`https://image.tmdb.org/t/p/w500${d.poster_path}`}
                alt={d.original_title}
              />
            </div>
            <p className="text-[12px] mt-6">
              <span className="text-[14px] font-bold">
                {d.vote_average.toFixed(1)}
              </span>
              /10
            </p>

            <h2 className="flex flex-col gap-6 text-[18px]">
              {d.original_title}
            </h2>
          </div>
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
