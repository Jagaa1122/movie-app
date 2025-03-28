import { CarouselHome } from "@/app/_components/Carousel";
import Upcoming from "./_components/Upcoming";
import Popular from "./_components/Popular";
import TopRated from "./_components/TopRated";

export default async function Home() {
  return (
    <div className="flex justify-center items-center flex-col">
      <CarouselHome />
      <Upcoming />
      <Popular />
      <TopRated />
    </div>
  );
}
