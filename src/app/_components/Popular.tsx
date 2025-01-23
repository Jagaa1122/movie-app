import { TOKEN } from "@/util/constants";
import MovieCard from "@/app/_components/MovieCard";

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
    <div>
      <h1 className="text-[24px] font-semibold">Popular</h1>

      <MovieCard data={popularData.results} />
    </div>
  );
}
