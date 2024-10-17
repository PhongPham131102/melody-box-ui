import { useDispatch, useSelector } from "react-redux";
import { FaVolumeDown, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import SimpleSlider from "../../slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { RootState } from "@/src/store/store";
import { setVolume, toggleMute } from "@/src/store/slices/player.slide";

export default function VolumeController() {
  const dispatch = useDispatch();
  const volume = useSelector((state: RootState) => state.player.volume);
  const isMuted = useSelector((state: RootState) => state.player.isMuted);

  const handleVolumeChange = (value: number) => {
    dispatch(setVolume(value));
  };

  const handleToggleMute = () => {
    dispatch(toggleMute());
  };

  const renderVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return <FaVolumeMute />;
    } else if (volume < 50) {
      return <FaVolumeDown />;
    } else {
      return <FaVolumeUp />;
    }
  };

  return (
    <div className="w-28 flex items-center justify-center gap-1">
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <span
              className="p-2 hover:bg-[#ffffff1a] rounded-full cursor-pointer text-white hover:text-secondary-text text-base"
              onClick={handleToggleMute}
            >
              {renderVolumeIcon()}
            </span>
          </TooltipTrigger>
          <TooltipContent className="bg-[#333] rounded text-xs text-white border-none !p-1.5 !m-0 !mb-2.5">
            {isMuted ? `${volume}%` : "Tắt tiếng"}
            <div className="absolute top-[100%] -translate-y-[100%] left-1/2 -translate-x-1/2 z-[999] w-0 h-0 border-l-[7px] border-r-[7px] border-t-[10px] border-l-transparent border-r-transparent border-[#333333]"></div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <SimpleSlider
        initialValue={isMuted ? 0 : volume}
        min={0}
        max={100}
        step={1}
        onChange={handleVolumeChange}
        charracterSufix="%"
      />
    </div>
  );
}
