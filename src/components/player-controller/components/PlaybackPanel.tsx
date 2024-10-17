import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import VolumeController from "./VolumeController";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { LiaMicrophoneAltSolid } from "react-icons/lia";
import { SiYoutubemusic } from "react-icons/si";
import { BiSolidPlaylist } from "react-icons/bi";

export default function PlayBackPanel() {
  return (
    <div className="w-full h-full flex justify-end items-center p-3">
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <span className="p-2 hover:bg-[#ffffff1a] rounded-full cursor-pointer text-white hover:text-secondary-text text-lg">
              <SiYoutubemusic />
            </span>
          </TooltipTrigger>
          <TooltipContent className="bg-[#333] rounded text-xs text-white border-none !p-1.5 !m-0 !mb-2.5">
            xem MV trên youtube
            <div className="absolute top-[100%] -translate-y-[100%] left-1/2 -translate-x-1/2 z-[999] w-0 h-0 border-l-[7px] border-r-[7px] border-t-[10px] border-l-transparent border-r-transparent border-[#333333]"></div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <span className="p-2 hover:bg-[#ffffff1a] rounded-full cursor-pointer text-white hover:text-secondary-text text-lg">
              <LiaMicrophoneAltSolid />
            </span>
          </TooltipTrigger>
          <TooltipContent className="bg-[#333] rounded text-xs text-white border-none !p-1.5 !m-0 !mb-2.5">
            Xem lời bài hát
            <div className="absolute top-[100%] -translate-y-[100%] left-1/2 -translate-x-1/2 z-[999] w-0 h-0 border-l-[7px] border-r-[7px] border-t-[10px] border-l-transparent border-r-transparent border-[#333333]"></div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <VolumeController />
      <div className="bg-[#ffffff1a] h-[66.66%] w-[0.3px] mx-3"></div>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <span className="p-2 hover:bg-[#ffffff1a] rounded-full cursor-pointer text-secondary-text text-lg">
              <BiSolidPlaylist />
            </span>
          </TooltipTrigger>
          <TooltipContent
            align="end"
            className="bg-[#333] rounded text-xs text-white border-none !p-1.5 !m-0 !mb-2.5"
          >
            Danh sách phát
            <div className="absolute top-[100%] -translate-y-[100%] left-[85%] -translate-x-1/2 z-[999] w-0 h-0 border-l-[6px] border-r-[6px] border-t-[10px] border-l-transparent border-r-transparent border-[#333333]"></div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
