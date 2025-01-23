import { TOKEN } from "@/util/constants";
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    
    DropdownMenuSeparator,
   
    DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
    import { Button } from "@/components/ui/button";

import { ChevronDown } from "lucide-react";



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
    {console.log(genresData)}
    return (
      <div>
          dfhghfghfghfhf
        <DropdownMenu>

          <DropdownMenuTrigger asChild>
            <Button variant={"outline"}>
              <ChevronDown />
              Genre
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Genres
              <p>See lists of movies by genre</p>
            </DropdownMenuLabel>
             <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {genresData.genres.map((data:GenreType) => {
                  return (
                    <DropdownMenuItem
                      key={data.id}
                      className="w-[239px] h-[470px] bg-secondary rounded-[6px] overflow-hidden"
                    >
                        <p className="flex gap-6 text-[12px]">
                          {data?.name}
                        </p>
                    </DropdownMenuItem>
                  );
                })}
          
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu> 
        </div>
    )
}