import { TOKEN } from "@/util/constants";
import MovieCard from "@/app/_components/MovieCard";

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
    <div>
      <h1 className="text-[24px] font-semibold">Upcoming</h1>
      <p>See more</p>
      <MovieCard data={upcomingData.results} />
    </div>
  );
}
