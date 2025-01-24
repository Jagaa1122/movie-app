import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Genre } from "./Genre";
import { ThemeChanger } from "../../components/ui/ThemeChanger";

export function Header() {
  return (
    <div className="w-[1280px] h-9 flex justify-between items-center mt-6">
      <Image alt={"logo"} width={100} height={100} src={"/Logo.svg"} />
      <div className="flex gap-4">
        {/* <Button variant={"outline"}>
          <ChevronDown />
          Genre
        </Button> */}
        <Genre />
        <Input type="text" placeholder="Search" />
      </div>
      <ThemeChanger />
    </div>
  );
}
