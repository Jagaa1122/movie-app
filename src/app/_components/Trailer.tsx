import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ArrowRight, PlayIcon } from "lucide-react";
import { TOKEN } from "@/util/constants";
export default async function Trailer({ data }: { data: number }) {
  const trailerData = await fetch(
    `https://api.themoviedb.org/3/movie/${data}/videos?language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  const trailer = await trailerData.json();
  const trailerWeNeed = trailer.results?.find((video: Trailer) => {
    return video.type === "Trailer";
  });
  return (
    <Dialog>
      <DialogTrigger className=" flex items-center">
        <PlayIcon className="bg-white text-black rounded-full p-2 w-9 h-9" />
        Watch trailer
      </DialogTrigger>

      <DialogContent className="">
        <DialogTitle>{""}</DialogTitle>{" "}
        <iframe
          src={`https://www.youtube.com/embed/${trailerWeNeed?.key}`}
          width={450}
          height={300}
          allowFullScreen
        ></iframe>
      </DialogContent>
    </Dialog>
  );
}
