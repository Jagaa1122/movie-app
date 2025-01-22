import { TOKEN } from "@/util/constants";
import MovieCard from "@/app/_components/MovieCard";
import Image from "next/image";
import { Carousel } from "@/components/ui/carousel";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default async function Home() {
  const popularResponse = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  const upcomingResponse = await fetch(
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  const topratedResponse = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  const upcomingData = await upcomingResponse.json();

  const popularData = await popularResponse.json();

  const topratedData = await topratedResponse.json();
  return (
    <div className="flex justify-center items-center flex-col">
      <ModeToggle />
      <Carousel></Carousel>
      <h1>Upcoming</h1>
      {/* <Card data={upcomingData.results}>
        <CardTitle />
      </Card>
      <CardContent /> */}
      <MovieCard data={upcomingData.results} />
      <h1>Popular</h1>
      <MovieCard data={popularData.results} />
      <h1>Top Rated</h1>
      <MovieCard data={topratedData.results} />
    </div>
  );
}
