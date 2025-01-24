import { Header } from "@/app/_components/Header";
import { TOKEN } from "@/util/constants";
import Image from "next/image";

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
      <Image
        width={1000}
        height={1000}
        className="size-76"
        src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
        alt={data.original_title}
      />
      <p>jagfjdhfkhgsdfghdftrdftydfty</p>
    </div>
  );
}
