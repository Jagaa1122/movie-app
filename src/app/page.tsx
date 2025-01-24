import { Header } from "@/app/_components/Header";
import { CarouselHome } from "@/app/_components/Carousel";
import Upcoming from "./_components/Upcoming";
import Popular from "./_components/Popular";
import TopRated from "./_components/TopRated";
import { Footer } from "./_components/Footer";

export default async function Home() {
  return (
    <div className="flex justify-center items-center flex-col">
      <Header />
      <CarouselHome />
      <Upcoming />
      <Popular />
      <TopRated />
      <Footer />
    </div>
  );
}
