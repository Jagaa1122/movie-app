import { Header } from "@/app/_components/Header";
import { TOKEN } from "@/util/constants";
import Image from "next/image";
import { Crew } from "./Crew"

export default async function MoviePage({
  params: { movieId },
}: {
  params: { movieId: MovieType };
}) {
  const getData = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await getData.json();
  return (
    <div>
      <Header />
      <div className="flex">
        <div>
        <Image className="w-[300px] h-[250px]"
        width={1000}
        height={1000}
        src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
        alt={data.original_title }
      />
        </div>
        <div>
          Trailer end bn 
        </div>
 
      </div>
      {/* <Crew /> */}
    </div>
  );
}
