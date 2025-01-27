import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { TOKEN } from "@/util/constants";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayIcon } from "lucide-react";

export async function CarouselHome() {
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
  return (
    <Carousel className="w-full" opts={{ loop: true }}>
      <CarouselContent>
        {nowPlayingData.results.slice(0, 10).map((d: MovieType) => {
          return (
            <CarouselItem key={d.id}>
              <Card className="relative">
                <CardContent className="p-0 border-0">
                  <Image
                    width={3000}
                    height={3000}
                    className="object-cover h-[620px] w-full relative"
                    src={`https://image.tmdb.org/t/p/`+ "original"+`${d.backdrop_path}`}
                    alt={d.original_title}
                  ></Image>
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
                    <Button variant={"secondary"} className="">
                      <PlayIcon />
                      Watch Trailer
                    </Button>
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
