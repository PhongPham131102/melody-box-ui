"use client";
import {
  toggleShuffle,
  togglePlayPause,
  setRepeatMode,
} from "@/src/store/slices/player.slide";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { PiRepeatBold, PiRepeatOnceBold } from "react-icons/pi";
import { TbArrowsShuffle } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks/redux.hook";
import Slider from "./SliderController";

export default function MainController() {
  const dispatch = useAppDispatch();
  const { shuffle, isPlaying, repeatMode } = useAppSelector(
    (state) => state.player
  );

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="flex gap-2 justify-center items-center">
        {/* Shuffle Button */}
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <span
                onClick={() => dispatch(toggleShuffle())}
                className={`p-2 hover:bg-[#ffffff1a] rounded-full cursor-pointer ${
                  shuffle ? "text-secondary-text" : "text-white"
                }`}
              >
                <TbArrowsShuffle size={20} />
              </span>
            </TooltipTrigger>
            <TooltipContent className="bg-[#333] rounded text-xs text-white  border-none !p-1.5 !m-0 !mb-2.5">
              {shuffle ? "Tắt phát ngẫu nhiên" : "Bật phát ngẫu nhiên"}
              <div className="absolute top-[100%] -translate-y-[100%] left-1/2 -translate-x-1/2  z-[999] w-0 h-0 border-l-[7px] border-r-[7px] border-t-[10px] border-l-transparent border-r-transparent border-[#333333]"></div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Previous Button */}
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <span className="text-white hover:text-secondary-text p-2 hover:bg-[#ffffff1a] rounded-full cursor-pointer">
                <MdSkipPrevious size={30} />
              </span>
            </TooltipTrigger>
            <TooltipContent className="bg-[#333] rounded text-xs text-white  border-none !p-1.5 !m-0 !mb-2.5">
              Bài trước
              <div className="absolute top-[100%] -translate-y-[100%] left-1/2 -translate-x-1/2  z-[999] w-0 h-0 border-l-[7px] border-r-[7px] border-t-[10px] border-l-transparent border-r-transparent border-[#333333]"></div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Play/Pause Button */}
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <span
                onClick={() => dispatch(togglePlayPause())}
                className="text-white hover:text-secondary-text p-2 hover:bg-[#ffffff1a] rounded-full cursor-pointer"
              >
                {isPlaying ? (
                  <FaPauseCircle size={36} />
                ) : (
                  <FaPlayCircle size={36} />
                )}
              </span>
            </TooltipTrigger>
            <TooltipContent className="bg-[#333] rounded text-xs text-white  border-none !p-1.5 !m-0 !mb-2.5">
              {isPlaying ? "Tạm dừng" : "Phát"}
              <div className="absolute top-[100%] -translate-y-[100%] left-1/2 -translate-x-1/2  z-[999] w-0 h-0 border-l-[7px] border-r-[7px] border-t-[10px] border-l-transparent border-r-transparent border-[#333333]"></div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Next Button */}
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <span className="text-white hover:text-secondary-text p-2 hover:bg-[#ffffff1a] rounded-full cursor-pointer">
                <MdSkipNext size={30} />
              </span>
            </TooltipTrigger>
            <TooltipContent className="bg-[#333] rounded text-xs text-white  border-none !p-1.5 !m-0 !mb-2.5">
              Bài tiếp theo
              <div className="absolute top-[100%] -translate-y-[100%] left-1/2 -translate-x-1/2  z-[999] w-0 h-0 border-l-[7px] border-r-[7px] border-t-[10px] border-l-transparent border-r-transparent border-[#333333]"></div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Repeat Button */}
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <span
                onClick={() => dispatch(setRepeatMode())}
                className={`  ${
                  repeatMode === "none" ? "text-white" : "text-secondary-text"
                } p-2 hover:bg-[#ffffff1a] rounded-full cursor-pointer`}
              >
                {repeatMode === "one" ? (
                  <PiRepeatOnceBold size={20} />
                ) : (
                  (repeatMode === "all" || repeatMode === "none") && (
                    <PiRepeatBold size={20} />
                  )
                )}
              </span>
            </TooltipTrigger>
            <TooltipContent className="bg-[#333] rounded text-xs text-white  border-none !p-1.5 !m-0 !mb-2.5">
              {repeatMode === "none"
                ? "Bật phát lại tất cả"
                : repeatMode === "one"
                ? "Tắt phát lại"
                : "Bật phát lại 1 lần"}
              <div className="absolute top-[100%] -translate-y-[100%] left-1/2 -translate-x-1/2  z-[999] w-0 h-0 border-l-[7px] border-r-[7px] border-t-[10px] border-l-transparent border-r-transparent border-[#333333]"></div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Slider time={248} />
    </div>
  );
}
