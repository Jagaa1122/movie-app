"use client";
import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ArrowDown, SunIcon, MoonIcon, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";

export function Header() {
  const { theme, setTheme } = useTheme();
  const changeThemeHandler = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <div className="w-[1280px] h-9 flex justify-between items-center mt-6">
      <Image alt={"logo"} width={100} height={100} src={"/Logo.svg"} />
      <div className="flex gap-4">
        <Button variant={"outline"}>
          <ChevronDown />
          Genre
        </Button>
        <Input type="text" placeholder="Search" />
      </div>
      <Button variant="outline" size="icon" onClick={changeThemeHandler}>
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}
