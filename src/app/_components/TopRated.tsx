import { TOKEN } from "@/util/constants";
import MovieCard from "@/app/_components/MovieCard";

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
    <div>
      <h1 className="text-[24px] font-semibold">Top Rated</h1>

      <MovieCard data={topratedData.results} />
    </div>
  );
}
