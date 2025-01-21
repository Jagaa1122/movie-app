import { TOKEN } from "@/util/constants";
import Card from "@/app/_components/Card";
import Image from "next/image";

export default async function Home() {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  console.log("uuu", data);
  return (
    <div className="flex flex-wrap justify-center items-center w-[100vw] h-[100vh] ">
      <Card data={data.results} />;
    </div>
  );
}
