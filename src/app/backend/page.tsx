"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MovieType } from "@/util/types";

const Page = () => {
  const [fetchData, setFetchData] = useState<MovieType[]>([]);
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`http://localhost:4000/movie`);
      const data = await res.json();
      setFetchData(data.data.results);
    };
    getData();
  }, []);

  return (
    <div className="flex flex-wrap gap-5">
      {fetchData?.map((movie: MovieType) => {
        return (
          <div key={movie.id}>
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
                <Image src="star.svg" alt="" width={239} height={540} />
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
