import { TOKEN } from "@/util/constants";
import MovieCard from "@/app/_components/MovieCard";
import Image from "next/image";
import { CarouselHome } from "@/app/_components/Carousel";
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
  const nowPlayingResponse = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
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

  const nowPlayingData = await nowPlayingResponse.json();
  return (
    <div className="flex justify-center items-center flex-col">
      <ModeToggle />
      <CarouselHome data={nowPlayingData.results} />
    
      <h1>Upcoming</h1>
     
      <MovieCard data={upcomingData.results} />
      <h1>Popular</h1>
      <MovieCard data={popularData.results} />
      <h1>Top Rated</h1>
      <MovieCard data={topratedData.results} />
    </div>
  );
}
