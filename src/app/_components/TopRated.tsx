import { TOKEN } from "@/util/constants";
import MovieCard from "@/app/_components/MovieCard";
import { ArrowRight } from "lucide-react";

export default async function TopRated() {
  const topratedResponse = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  const topratedData = await topratedResponse.json();
  return (
    <div className="">
       <div className="flex justify-between">
        <h1 className="text-[24px] font-semibold">Top Rated</h1>
        <p className="font-semibold flex text-[16px] hover:underline underline-offset-4 cursor-pointer">See more <ArrowRight className="p-1"/></p>
      </div>
      <MovieCard data={topratedData.results} />
    </div>
  );
}
