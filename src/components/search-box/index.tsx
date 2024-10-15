"use client";
import { useState } from "react";
import Image from "next/image";
import searchIcon from "@/public/icons/search.png";
import closeIcon from "@/public/icons/close.png";

export default function SearchBox() {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const clearInput = () => {
    setInputValue("");
  };

  return (
    <div className=" w-[440px] relative bg-[#ffffff1a] flex flex-col gap-1 rounded-full focus-within:rounded-none px-2 focus-within:bg-thirst focus-within:rounded-tl-[20px] focus-within:rounded-tr-[20px]">
      <div className="flex items-center relative w-full h-10">
        <button className="flex items-center text-sm rounded-full font-normal text-center cursor-pointer relative">
          <div className="transition-all duration-150 brightness-100 contrast-50 saturate-200 filter invert hover:brightness-0 hover:contrast-200 hover:saturate-150 w-6 h-6">
            <Image src={searchIcon} alt="search Icon" />
          </div>
        </button>

        <div className=" absolute top-0 left-[38px] right-[10px] bottom-0">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="m-0 inline-block w-[95%] text-sm text-white border-0 relative placeholder-white top-[2px] h-[34px] py-[5px] outline-none bg-transparent font-normal font-sans"
            placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
          />
        </div>

        {inputValue && (
          <div
            className="rounded-full p-2 bg-transparent absolute right-2 cursor-pointer hover:bg-thirst-text transition-all duration-300"
            onClick={clearInput}
          >
            <Image
              src={closeIcon}
              alt="close Icon"
              className="w-3.5 h-3.5 filter invert brightness-0 contrast-200 saturate-150"
            />
          </div>
        )}
      </div>
      {isFocused && (
        <div className="w-full  absolute flex h-48 left-0 right-0 top-full bg-thirst">
          <p className="text-white p-4">Search results go here...</p>
        </div>
      )}
    </div>
  );
}
