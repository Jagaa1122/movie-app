import { TOKEN } from "@/util/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { ChevronDown, ChevronRight } from "lucide-react";

export async function Genre() {
  const genresResponse = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=en",
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  const genresData = await genresResponse.json();
  {
    console.log(genresData);
  }
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <ChevronDown />
            Genre
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            Genres
            <p>See lists of movies by genre</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="w-[600px] flex flex-wrap">
            {genresData.genres.map((data: GenreType) => {
              return (
                <DropdownMenuItem
                  key={data.id}
                  className="flex bg-secondary rounded-[6px] overflow-hidden"
                >
                  <p className="flex gap-6 text-[12px] border-[1px] border-neutral-500 rounded-lg cursor-pointer p-1">
                    {data?.name} <ChevronRight className="size-4" />
                  </p>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
