import Image from "next/image";
import { Genre } from "./Genre";
import { ThemeChanger } from "../../components/ui/ThemeChanger";
import SearchInput from "./Input";
import Link from "next/link";

export function Header() {
  return (
    <div className="flex justify-between items-center  p-[20px] sticky top-0 bg-inherit z-50">
      <Link href={`http://localhost:3000/`}>
        <Image alt={"logo"} width={100} height={100} src={"/Logo.svg"} />
      </Link>
      <div className="flex gap-4">
        <Genre />
        <div className="relative">
          <img
            className="absolute top-[6px] left-[6px] w-[20px]"
            src="searchIcon.svg"
            alt=""
          />
          <SearchInput />
        </div>
      </div>
      <ThemeChanger />
    </div>
  );
}
