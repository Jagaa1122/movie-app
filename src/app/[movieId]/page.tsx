import { Header } from "@/app/_components/Header";
import { TOKEN } from "@/util/constants";
import Image from "next/image";
// import { Link } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayIcon } from "lucide-react";
import Similar from "../_components/Similar";
import MovieCard from "@/app/_components/MovieCard copy";

export default async function MoviePage(props: {
  params: Promise<{ movieId: string }>;
}) {
  const params = await props.params;
  const { movieId } = params;
  const getData = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await getData.json();

  const actors = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  const actorsData = await actors.json();

  const moreLikeData = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  const moreLikeDat = await moreLikeData.json();

  const trailerData = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  const trailer = await trailerData.json();

  const similarResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`,
    {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
        },
    }
);
const similarData = await similarResponse.json();
  console.log(trailer);
  const trailerWeNeed = trailer.results.find((video: Trailer) => {
    return video.type === "Trailer";
  });
  console.log(trailerWeNeed);
  const durationHour = data.runtime / 60;
  const durition = data.runtime % 60;
  const voteCount = data.vote_count / 1000;
  return (
    <div className="mx-auto max-w-[1080px]">
      <div className="flex flex-col justify-between mt-10">
        <div className="flex justify-between">
          <div>
            <p className="text-[30px] font-bold">{data.original_title}</p>
            <p>
              {data.release_date} {durationHour.toFixed(0.1)}h {durition}m{" "}
            </p>
          </div>

          <div className="flex justify-center items-center gap-2">
            <h2>Rating</h2>
            <img src="/star.svg" alt="" className="w-[30px] h-[50px]" />
            <p> {data.vote_average.toFixed(1)}/10</p>
            <p> {voteCount.toFixed(1)}k</p>
          </div>
        </div>
        <div className="flex gap-6">
          <Image
            className="w-[300px] h-[450px] cursor-pointer rounded-lg"
            width={1000}
            height={1000}
            src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
            alt={data.original_title}
          />
          <Dialog>
            <div className="relative">
              <Image
                className="w-full h-[450px] cursor-pointer rounded-lg relative"
                width={1000}
                height={1000}
                src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
                alt={data.original_title}
              />
              <DialogTrigger className="absolute bottom-2 left-3 text-white flex items-center gap-4">
                <PlayIcon className="bg-white text-black rounded-full p-2 w-9 h-9" />
                Play trailer
              </DialogTrigger>
            </div>
            <DialogContent className="w-[700px]">
              <DialogTitle>{""}</DialogTitle>{" "}
              <iframe
                src={`https://www.youtube.com/embed/${trailerWeNeed.key}`}
                width={450}
                height={300}
              ></iframe>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex gap-9 ">
          {data.genres.map((genre: GenreType, index: number) => {
            return (
              <div
                className="border rounded-xl px-3 font-semibold mt-4 text-[13px]"
                key={index}
              >
                {genre.name}
              </div>
            );
          })}
        </div>
        <p className="">{data.overview}</p>
        <h2 className="flex">Director: {data.directer}</h2>
        <p className=" flex gap-5">
          {actorsData.crew[0].job} {actorsData.crew[0].name}
        </p>
        <p>{actorsData.crew[1].department}</p>
        <div className="flex">
          {actorsData.cast.slice(0, 5).map((star: GenreType, index: number) => {
            return <p key={index}>{star.name}</p>;
          })}
        </div>
        <div className="flex justify-between">
          <h1 className="font-bold text-[20px]">More like this</h1>
        </div>
      </div>
      {/* <Similar /> */}
      <div className="mt-10">
            <div className="flex justify-between mb-8">
                <h1 className="text-[24px] font-semibold">Similar</h1>
                <Link href={`/${movieId}/similar`}>
                    <p className="font-semibold flex text-[16px] hover:underline underline-offset-4 cursor-pointer">
                        See more <ArrowRight className="p-1" />
                    </p>
                </Link>
            </div>
            <MovieCard data={similarData.results} />
        </div>
    </div>
  );
}
