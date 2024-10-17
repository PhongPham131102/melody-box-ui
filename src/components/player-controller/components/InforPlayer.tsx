import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import Image, { StaticImageData } from "next/image";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineFavoriteBorder } from "react-icons/md";

type InforPlayerProps = {
  imageIcon: string | StaticImageData;
  title: string;
  artists: string[];
};
const InforPlayer: React.FC<InforPlayerProps> = ({
  imageIcon,
  title,
  artists,
}) => {
  return (
    <div className="group gap-2 flex items-center transition-all duration-150 w-full ">
      <div className="!w-[52px] !h-[52px] relative rounded overflow-hidden">
        <Image
          src={imageIcon}
          fill
          alt="Album Cover"
          className="rounded object-cover"
        />
      </div>
      <div className="w-[calc(100%-70px)] flex flex-col gap-1 justify-start items-start relative">
        <p className="text-white text-sm font-medium transition-all duration-100 truncate max-w-[75%] w-full">
          {title}
        </p>
        <div className="flex gap-[2px]">
          {artists.map((artist, index) => (
            <p
              key={index}
              className="text-xs text-gray-400 hover:text-secondary-text transition-all duration-100 cursor-pointer hover:underline"
            >
              {artist}
              {index < artists.length - 1 && ","}
            </p>
          ))}
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-0  gap-2 flex">
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <span className="text-white hover:text-secondary-text p-2 hover:bg-[#ffffff1a] rounded-full cursor-pointer">
                  <MdOutlineFavoriteBorder />
                </span>
              </TooltipTrigger>
              <TooltipContent className="border-none bg-[#333333] !p-0 !m-0 rounded !mb-2 cursor-pointer ">
                <p className="text-xs text-white p-1.5">thêm vào thư viện</p>
                <div className="absolute top-[100%] -translate-y-[100%] left-1/2 -translate-x-1/2  z-[999] w-0 h-0 border-l-[7px] border-r-[7px] border-t-[10px] border-l-transparent border-r-transparent border-[#333333]"></div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <span className="text-white hover:text-secondary-text p-2 hover:bg-[#ffffff1a] rounded-full cursor-pointer">
                  <BsThreeDots />
                </span>
              </TooltipTrigger>
              <TooltipContent className="border-none bg-[#333333] !p-0 !m-0 rounded !mb-2 cursor-pointer">
                <p className="text-xs text-white p-1.5">khác</p>
                <div className="absolute top-[100%] -translate-y-[100%] left-1/2 -translate-x-1/2  z-[999] w-0 h-0 border-l-[7px] border-r-[7px] border-t-[10px] border-l-transparent border-r-transparent border-[#333333]"></div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};
export default InforPlayer;
