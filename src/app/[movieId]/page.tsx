import { Header } from "@/app/_components/Header";
import { TOKEN } from "@/util/constants";
import Image from "next/image";
import { Crew } from "../_components/Crew";
import { Link } from "lucide-react";
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
  console.log(trailer);

  return (
    <div className="flex flex-col justify-between mt-10">
      <div className="flex justify-between">
        <div>
          <p>{data.original_title}</p>
          <p>{data.release_date}</p>
        </div>

        <div className="flex justify-center items-center gap-2">
          <h2>Rating</h2>
          <img src="/star.svg" alt="" className="w-[30px] h-[50px]" />
          <p> {data.vote_average}</p>
          <p> {data.vote_count}</p>
        </div>
      </div>
      <div className="flex">
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
            <DialogTrigger className="absolute bottom-2 left-3">
              {/* <Button variant={"secondary"} className=""> */}
              <PlayIcon />
              Play trailer
              {/* </Button> */}
            </DialogTrigger>
          </div>
          <DialogContent className="w-[700px]">
            <DialogTitle>{trailer.results[0].name}</DialogTitle>{" "}
            <iframe
              src={`https://www.youtube.com/embed/${trailer.results[0].key}`}
              width={450}
              height={300}
              title={trailer.results[0].name}
            ></iframe>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex gap-9">
        {data.genres.map((genre: GenreType, index: number) => {
          return (
            <div className="" key={index}>
              {genre.name}
            </div>
            // <button className="" key={index}>
            //   {genre.name}
            // </button>
          );
        })}
      </div>
      <p className="w-[1080px] h-[90px]">{data.overview}</p>
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
        <h1>More like this</h1>
      </div>
    </div>
  );
}
