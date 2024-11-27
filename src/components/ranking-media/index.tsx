import React from "react";
import Image from "next/image";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LiaMicrophoneAltSolid } from "react-icons/lia";

type RankingMediaProps = {
  rank: number;
  imageSrc: string;
  title: string;
  artists: string[];
  album: string;
  duration: string;
  playIcon?: string;
};

const RankingMedia: React.FC<RankingMediaProps> = ({
  rank,
  imageSrc,
  title,
  artists,
  album,
  duration,
  playIcon = "/icons/play.png",
}) => {
  // Determine stroke color based on rank
  const strokeColor =
    rank === 1
      ? "text-stroke-blue-500"
      : rank === 2
      ? "text-stroke-green-500"
      : rank === 3
      ? "text-stroke-red-500"
      : "text-stroke-gray-500";

  return (
    <div className="group w-full border-b-[0.3px] border-b-main-1 py-3 flex justify-start items-center gap-5 hover:bg-[#2F2739] px-2 rounded-sm">
      {/* Rank Number */}
      <h1
        className={`opacity-1000 text-[32px] font-black text-transparent leading-none text-stroke-1 ${strokeColor} tracking-widest font-sans w-20`}
      >
        {rank}
      </h1>

      {/* Song Information */}
      <div className="flex justify-center items-center gap-3 min-w-[35%]">
        <div className="h-[1.5px] w-4 bg-[#85808B]"></div>
        <div className="!w-[40px] !h-[40px] relative rounded overflow-hidden cursor-pointer shrink-0">
          <Image
            src={imageSrc}
            fill
            alt="Album Cover"
            className="rounded group-hover:brightness-75 object-cover"
          />
          <Image
            src={playIcon}
            alt="Play Icon"
            layout="fixed"
            width={12}
            height={12}
            className="hidden w-3 h-3 group-hover:absolute group-hover:!block z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 filter invert brightness-0 contrast-200 saturate-150"
          />
        </div>
        <div className="w-full flex flex-col gap-1 justify-start items-start relative cursor-pointer">
          <p className="text-white text-sm font-medium hover:text-secondary-text transition-all duration-100 truncate w-full">
            {title}
          </p>
          <div className="flex gap-[2px]">
            {artists.map((artist, index) => (
              <p
                key={index}
                className="text-xs text-[#ffffff80] hover:text-secondary-text transition-all duration-100 cursor-pointer hover:underline"
              >
                {artist}
                {index < artists.length - 1 && ","}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Album Information */}
      <div className="flex justify-center items-center w-full">
        <p className="text-xs text-[#ffffff80] hover:text-secondary-text font-medium transition-all duration-100 cursor-pointer hover:underline">
          {album}
        </p>
      </div>

      {/* Duration and Actions */}
      <div className="w-1/4 flex justify-end items-center gap-1">
        <p className="text-xs text-[#ffffff80] transition-all duration-100 cursor-pointer group-hover:!hidden">
          {duration}
        </p>
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <span className="p-2 hover:bg-[#ffffff1a] group-hover:!block hidden rounded-full cursor-pointer text-white hover:text-secondary-text text-lg">
                <LiaMicrophoneAltSolid />
              </span>
            </TooltipTrigger>
            <TooltipContent className="bg-[#333] rounded text-xs text-white border-none !p-1.5 !m-0 !mb-2.5">
              Phát cùng lời bài hát
              <div className="absolute top-[100%] -translate-y-[100%] left-1/2 -translate-x-1/2 z-[999] w-0 h-0 border-l-[7px] border-r-[7px] border-t-[10px] border-l-transparent border-r-transparent border-[#333333]"></div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <span className="text-white hover:text-secondary-text p-2 hover:bg-[#ffffff1a] group-hover:!block hidden rounded-full cursor-pointer">
                <MdOutlineFavoriteBorder />
              </span>
            </TooltipTrigger>
            <TooltipContent className="border-none bg-[#333333] !p-0 !m-0 rounded !mb-2 ">
              <p className="text-xs text-white p-1.5">thêm vào thư viện</p>
              <div className="absolute top-[100%] -translate-y-[100%] left-1/2 -translate-x-1/2 z-[999] w-0 h-0 border-l-[7px] border-r-[7px] border-t-[10px] border-l-transparent border-r-transparent border-[#333333]"></div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <span className="text-white hover:text-secondary-text p-2 hover:bg-[#ffffff1a] group-hover:!block hidden rounded-full cursor-pointer">
                <BsThreeDots />
              </span>
            </TooltipTrigger>
            <TooltipContent className="border-none bg-[#333333] !p-0 !m-0 rounded !mb-2 ">
              <p className="text-xs text-white p-1.5">khác</p>
              <div className="absolute top-[100%] -translate-y-[100%] left-1/2 -translate-x-1/2 z-[999] w-0 h-0 border-l-[7px] border-r-[7px] border-t-[10px] border-l-transparent border-r-transparent border-[#333333]"></div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default RankingMedia;
