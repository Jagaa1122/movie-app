import { TOKEN } from "@/util/constants";
import { MovieType } from "@/util/types";
import Image from "next/image";
import Link from "next/link";

export default async function Similar(props: {
  params: Promise<{ similar: string }>;
}) {
  const params = await props.params;
  const { similar } = params;

  const similarResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${similar}/similar?language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  const similarData = await similarResponse.json();
  return (
    <div>
      <div className="grid grid-cols-5 gap-[32px] max-w-[1440px]">
        {similarData.results?.slice(0, 20).map((d: MovieType) => {
          return (
            <Link
              href={`/${d.id}`}
              key={d.id}
              className="w-[239px] h-[470px] bg-secondary rounded-[6px] overflow-hidden"
            >
              <div className=" max-w-[239px] h-[340px] ">
                <Image
                  width={1000}
                  height={1000}
                  className="size-76"
                  src={`https://image.tmdb.org/t/p/w500${d.poster_path}`}
                  alt={d.original_title}
                />
              </div>
              <div className="p-4">
                <div className="text-[12px] mt-6 flex align-middle">
                  <Image src="/star.svg" alt="" width={1000} height={1000} />
                  <p>
                    <span className="text-[14px] font-bold">
                      {" "}
                      {d.vote_average.toFixed(1)}
                    </span>{" "}
                    /10
                  </p>
                </div>

                <h2 className="flex flex-col gap-6 text-[18px]">
                  {d.original_title}
                </h2>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
