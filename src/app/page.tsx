import { TOKEN } from "@/util/constants";
import Card from "@/app/_components/Card";
import Image from "next/image";

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
    <div className="">
         <h1>Up Coming</h1>
         <Card data={upcomingData.results} />
       <h1>Popular</h1>
      <Card data={popularData.results} />
      <h1>Top Rated</h1>
      <Card data={topratedData.results} />
    </div>
  );
}
