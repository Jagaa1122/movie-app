import { TOKEN } from "@/util/constants";
import MovieCard from "@/app/_components/MovieCard";
import { ArrowRight } from "lucide-react";

export default async function Upcoming() {
  const upcomingResponse = await fetch(
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  const upcomingData = await upcomingResponse.json();
  return (
    <div className="">
      <div className="flex justify-between">
      <h1 className="text-[24px] font-semibold">Upcoming</h1>
      <p className="font-semibold flex text-[16px] hover:underline underline-offset-4 cursor-pointer">See more <ArrowRight className="p-1"/></p>
     </div>
     <MovieCard data={upcomingData.results} />
    </div>
  );
}
