import Image from "next/image";

export default async function Card({ data }: { data: MovieType[] }) {
  return (
    <div className="grid grid-cols-5 gap-[32px]">
      {data.slice(0, 10).map((d) => {
        return (
          <div key={d.id} className="w-[239px] h-[470px] bg-[#f4f4f5] text-[#09090B] rounded-[6px] overflow-hidden">
            <div className=" max-w-[239px] h-[340px] ">
              <Image
                width={1000}
                height={1000}
                className="size-76"
                src={`https://image.tmdb.org/t/p/w500${d.poster_path}`}
                alt={d.original_title}
              />
            </div>
            <div className="p-4">
              <div className="text-[12px] mt-6 flex align-middle">
                <img src="star.svg" alt="" />
                <p><span className="text-[14px] font-bold text-[#09090B]"> {d.vote_average.toFixed(1)}</span> /10</p>
              </div>

              <h2 className="flex flex-col gap-6 text-[18px]">
                {d.original_title}
              </h2>
            </div>
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
