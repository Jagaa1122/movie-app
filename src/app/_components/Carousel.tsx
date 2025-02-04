"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { TOKEN } from "@/util/constants";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import Trailer from "./Trailer";
import Autoplay from "embla-carousel-autoplay";

export function CarouselHome() {
  const [data, setData] = useState<MovieType[] | null>(null);

  const getData = async () => {
    const nowPlayingResponse = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    const nowPlayingData = await nowPlayingResponse.json();
    setData(nowPlayingData.results || []);
  };

  useEffect(() => {
    getData();
  }, []);
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <Carousel
      className="w-full"
      opts={{ loop: true }}
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {data?.slice(0, 10).map((d: MovieType) => {
          return (
            <CarouselItem key={d.id}>
              <Card className="relative">
                <CardContent className="p-0 border-0">
                  <Link href={`/${d.id}`}>
                    <Image
                      width={3000}
                      height={3000}
                      className="object-cover h-[620px] w-full relative"
                      src={
                        `https://image.tmdb.org/t/p/` +
                        "original" +
                        `${d.backdrop_path}`
                      }
                      alt={d.original_title}
                    ></Image>
                  </Link>
                  <div className="absolute left-[140px] bottom-[158px] w-[302px] text-[#FAFAFA] ">
                    <p className="">Now Playing:</p>
                    <p className="text-[20px] font-bold">{d.original_title}</p>
                    <p className="flex text-[16px] items-center gap-1">
                      <img className="size-7" src="star.svg" alt="" />
                      <span className="text-[18px] font-bold flex">
                        {" "}
                        {d.vote_average.toFixed(1)}
                      </span>{" "}
                      /10
                    </p>
                    <p className="text-wrap mb-[15px]">{d.overview}</p>

                    <Trailer data={d.id} />
                  </div>
                </CardContent>

                <CarouselPrevious className=" absolute top-1/2 translate-y-1/2 left-11" />
                <CarouselNext className="absolute top-1/2 translate-y-1/2 right-11" />
              </Card>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
