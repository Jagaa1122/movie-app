import { TOKEN } from "@/util/constants";
import MovieCard from "@/app/_components/MovieCard";
import { ArrowRight } from "lucide-react";

export default async function Popular() {
  const popularResponse = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  const popularData = await popularResponse.json();
  return (
    <div className="mt-10">
      <div className="flex justify-between mb-8">
       <h1 className="text-[24px] font-semibold">Popular</h1>
       <p className="font-semibold flex text-[16px] hover:underline underline-offset-4 cursor-pointer">See more <ArrowRight className="p-1"/></p>
       </div>
       <MovieCard data={popularData.results} />
    </div>
  );
}
