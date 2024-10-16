"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import searchIcon from "@/public/icons/search.png";
import closeIcon from "@/public/icons/close.png";
import trendingUpIcon from "@/public/icons/trending-up.png";
import TrendingItem from "./components/TrendingItem";
import SongItem from "./components/SongItem";

export default function SearchBox() {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const clearInput = () => {
    setInputValue("");
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      ref={containerRef}
      className={`${
        isFocused &&
        "rounded-none bg-thirst rounded-tl-[20px] rounded-tr-[20px]"
      } w-[440px]  px-2 relative bg-[#ffffff1a] flex flex-col gap-1 rounded-full select-none`}
    >
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
        <div className="w-full pt-1 pb-4 px-2   absolute flex flex-col gap-2 left-0 right-0 top-full bg-thirst rounded-bl-[20px] rounded-br-[20px]">
          <div className="w-full flex flex-col gap-1">
            <div className="w-full py-1 px-2 flex items-center">
              <p className="text-sm font-bold text-white">Đề xuất cho bạn</p>
            </div>
            <TrendingItem
              icon={trendingUpIcon}
              label="Cơn mưa ngang qua"
              onClick={() => console.log("dfgf")}
            />
          </div>
          <hr className="border-line" />
          <div className="w-full flex flex-col gap-1">
            <div className="w-full py-1 px-2 flex items-center justify-between">
              <p className="text-sm font-bold text-white">Tìm kiếm gần đây</p>
              <p className="text-secondary-text uppercase text-xs cursor-pointer">
                Xóa
              </p>
            </div>

            <SongItem
              imageIcon="https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/7/b/e/3/7be33b2123aee6e0982a5fde3c986df6.jpg"
              title="Say Yes (Vietnamese Version) Say Yes (Vietnamese Version) Say Yes (Vietnamese Version)"
              artists={["Ogenus", "PiaLinh"]}
            />
          </div>
        </div>
      )}
    </div>
  );
}
