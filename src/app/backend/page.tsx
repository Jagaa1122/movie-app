"use client";
import React, { useEffect, useState } from "react";
import MovieCard from "@/app/_components/MovieCard";
import Image from "next/image";

const Page = () => {
  const [fetchData, setFetchData] = useState<MovieType[]>([]);
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`http://localhost:4000/movie`);
      const data = await res.json();
      setFetchData(data.data.results);
      console.log(fetchData);
    };
    getData();
  }, []);
  console.log(fetchData);
  return (
    <div className="flex flex-wrap gap-5">
      {fetchData?.map((movie: MovieType) => {
        return (
          <div>
            <div className=" max-w-[239px] h-[340px] ">
              <Image
                width={239}
                height={540}
                className="size-46"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.original_title}
              />
            </div>
            <div className="p-4">
              <div className="text-[12px] mt-6 flex align-middle">
                <img src="star.svg" alt="" />
                <p>
                  <span className="text-[14px] font-bold">
                    {movie.vote_average.toFixed(1)}
                  </span>
                  /10
                </p>
              </div>
              <h2 className="flex flex-col gap-6 text-[18px]">
                {movie.original_title}
              </h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Page;

// import { TOKEN } from "@/util/constants";
// import MovieCard from "@/app/_components/MovieCard";
// import { ArrowRight } from "lucide-react";
// import Link from "next/link";

// export default async function Popular() {
//   const popularResponse = await fetch("http://localhost:4000/movie");
//   const popularData = await popularResponse.json();
//   return (
//     <div className="mt-10">
//       <div className="flex justify-between mb-8">
//         <h1 className="text-[24px] font-semibold">Popular</h1>
//         <Link href={`/category/popular`}>
//           <p className="font-semibold flex text-[16px] hover:underline underline-offset-4 cursor-pointer">
//             See more <ArrowRight className="p-1" />
//           </p>
//         </Link>
//       </div>
//       <MovieCard data={popularData.popular.results} />
//     </div>
//   );
// }
