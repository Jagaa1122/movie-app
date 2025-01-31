"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

import Image from "next/image";
import Link from "next/link";
import Fetchdata from "@/util/inputData";

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const searchHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLowerCase();
    setSearchValue(search);

    if (search === "") {
      setSearchResults([]);
      setIsPopupVisible(false);
      return;
    }

    const searchData = await Fetchdata(
      `/search/movie?query=${e.target.value.toLowerCase()}&language=en-US`
    );
    console.log(searchData);

    setSearchResults(searchData.results || []);
    setIsPopupVisible(true);
  };

  const clickHandler = () => {
    setSearchResults([]);
    setSearchValue("");
  };
  return (
    <div className="relative w-[381px]">
      <div className="absolute left-2.5 top-[10px] h-4 w-4 text-muted-foreground">
        <SearchIcon className="h-4 w-4" />
      </div>
      <Input
        id="search"
        type="search"
        placeholder="Search..."
        value={searchValue}
        onChange={searchHandler}
        className="w-full h-[38px] rounded-lg bg-background py-3 pl-8 focus:outline-hidden flex items-center pt-3"
      />

      {isPopupVisible && searchResults.length > 0 ? (
        <div
          ref={popupRef}
          className="w-[577px] flex p-3 flex-col items-start rounded-[8px] border-[1px] dark:border-[#27272a] dark:bg-[#09090B] bg-white  border-[#efefef] absolute z-50  mt-2 ml-[-145px]"
        >
          {searchResults?.slice(0, 5).map((d: MovieType, index: number) => (
            <Link href={`/${d?.id}`} key={index} onClick={() => clickHandler()}>
              <div className="flex items-start self-stretch p-2 gap-4 rounded-[8px] dark:hover:bg-gray-700 w-[550px] hover:bg-[#efefef]">
                <Image
                  src={`https://image.tmdb.org/t/p/original/${d?.poster_path}`}
                  width={67}
                  height={100}
                  alt=""
                  className="rounded-[6px] cursor-pointer"
                />
                <div className="flex flex-col items-start gap-4 w-[100%]">
                  <h2 className="font-bold text-[20px]">{d?.original_title}</h2>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M7.99992 1.33325L10.0599 5.50659L14.6666 6.17992L11.3333 9.42659L12.1199 14.0133L7.99992 11.8466L3.87992 14.0133L4.66658 9.42659L1.33325 6.17992L5.93992 5.50659L7.99992 1.33325Z"
                        fill="yellow"
                        stroke="blue"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-[14px] items-center">
                      <p className="font-semibold">
                        {d?.vote_average.toFixed(1)}
                      </p>
                      <p className="text-[12px] text-[#71717A]">/10</p>
                    </div>
                  </div>
                  <div className="flex justify-between w-[100%]">
                    <p>{d?.release_date}</p>
                    <div className="flex items-center gap-2 cursor-pointer pr-5">
                      <p className="hover:underline text-[14px]">See more</p>
                      <ArrowRight className="w-[16px]" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[550px] h-[1.5px] my-1 dark:bg-gray-700 bg-[#efefef]"></div>
            </Link>
          ))}
          <div>See all results for "{searchValue}"</div>
        </div>
      ) : searchValue.length > 1 && searchResults.length === 0 ? (
        <div className="absolute mt-4 z-10 bg-white p-8">
          <p>"Not Found"</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SearchInput;
