import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Genre } from "./Genre";
import { ThemeChanger } from "../../components/ui/ThemeChanger";

export function Header() {
  return (
    <div className="flex justify-between items-center  p-[20px] sticky top-0 bg-white z-50">
      <Image alt={"logo"} width={100} height={100} src={"/Logo.svg"} />
      <div className="flex gap-4">
        <Genre />
        <div className="relative">
          <img className="absolute top-[6px] left-[6px] w-[20px]" src="searchIcon.svg" alt="" />
          <Input className="w-[380px] pl-7" type="text" placeholder="Search..." />
        </div>
      </div>
      <ThemeChanger />
    </div>
  );
}
