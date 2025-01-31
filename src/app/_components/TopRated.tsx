import { TOKEN } from "@/util/constants";
import MovieCard from "@/app/_components/MovieCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

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
    <div className="mt-10">
      <div className="flex justify-between mb-8">
        <h1 className="text-[24px] font-semibold">Top Rated</h1>
        <Link href={`/category/top_rated`}>
          <p className="font-semibold flex text-[16px] hover:underline underline-offset-4 cursor-pointer">
            See more <ArrowRight className="p-1" />
          </p>
        </Link>
      </div>
      <MovieCard data={topratedData.results} />
    </div>
  );
}
