import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BsThreeDots } from "react-icons/bs";
import { FaPlayCircle } from "react-icons/fa";
import { MdOutlineFavoriteBorder } from "react-icons/md";
export type PlayListProps = {
  imgUrl: string;
  title: string;
  linkUrl: string;
};
export default function PlayList({ imgUrl, linkUrl, title }: PlayListProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="group w-full aspect-square group relative rounded-md hover-zoom cursor-pointer">
        <div className="group-hover:opacity-100 opacity-0 w-full h-full absolute group-hover:bg-[#00000080] z-10 flex justify-center items-center gap-2">
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <span className="text-white  p-2 hover:bg-[#ffffff1a] rounded-full text-xl">
                  <MdOutlineFavoriteBorder />
                </span>
              </TooltipTrigger>
              <TooltipContent className="border-none bg-[#333333] !p-0 !m-0 rounded !mb-2 ">
                <p className="text-xs text-white p-1.5">thêm vào thư viện</p>
                <div className="absolute top-[100%] -translate-y-[100%] left-1/2 -translate-x-1/2  z-[999] w-0 h-0 border-l-[7px] border-r-[7px] border-t-[10px] border-l-transparent border-r-transparent border-[#333333]"></div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="text-white hover:scale-110 p-2 hover:bg-[#ffffff1a] rounded-full cursor-pointer">
            <FaPlayCircle size={36} />
          </span>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <span className="text-white  p-2 hover:bg-[#ffffff1a] rounded-full text-xl">
                  <BsThreeDots />
                </span>
              </TooltipTrigger>
              <TooltipContent className="border-none bg-[#333333] !p-0 !m-0 rounded !mb-2 ">
                <p className="text-xs text-white p-1.5">khác</p>
                <div className="absolute top-[100%] -translate-y-[100%] left-1/2 -translate-x-1/2  z-[999] w-0 h-0 border-l-[7px] border-r-[7px] border-t-[10px] border-l-transparent border-r-transparent border-[#333333]"></div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div
          className="zoomable absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${imgUrl})`,
          }}
        ></div>
      </div>
      <div className="w-full flex flex-row justify-start items-center py-2 text-[#78747F] text-sm font-semibold">
        {title}
      </div>
    </div>
  );
}
