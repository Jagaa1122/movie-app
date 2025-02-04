"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

import { ArrowRight, PlayIcon } from "lucide-react";
import { TOKEN } from "@/util/constants";
export default function Trailer({ data }: { data: number }) {
  const [trailer, setTrailer] = useState<Trailer | null>(null);

  const getTrailerData = async () => {
    const trailerData = await fetch(
      `https://api.themoviedb.org/3/movie/${data}/videos?language=en-US&page=1`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    const trailers = await trailerData.json();
    const trailerWeNeed = trailers.results?.find((video: Trailer) => {
      return video.type === "Trailer";
    });
    setTrailer(trailerWeNeed);
  };
  useEffect(() => {
    getTrailerData();
  }, []);

  return (
    <Dialog>
      <DialogTrigger className=" flex items-center">
        <PlayIcon className="bg-white text-black rounded-full p-2 w-9 h-9" />
        Watch trailer
      </DialogTrigger>

      <DialogContent className="">
        <DialogTitle>{""}</DialogTitle>{" "}
        <iframe
          src={`https://www.youtube.com/embed/${trailer?.key}`}
          width={450}
          height={300}
          allowFullScreen
        ></iframe>
      </DialogContent>
    </Dialog>
  );
}
