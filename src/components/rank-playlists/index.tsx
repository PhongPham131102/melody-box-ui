import Image from "next/image";
import playIcon from "@/public/icons/play.png";
type RankPlayListProps = {
  title: string;
  linkUrl?: string;
  textUrl?: string;
};
export default function RankPlayLists({
  linkUrl,
  textUrl,
  title,
}: RankPlayListProps) {
  return (
    <div className="w-full flex flex-col  gap-2 px-3 py-4">
      <div className="w-full flex justify-between items-center py-2">
        <span className="text-white font-bold text-lg">{title}</span>
        {linkUrl && (
          <button className="group text-white text-xs bg-main-text hover:brightness-90 py-1 px-3 rounded-full flex gap-1 uppercase">
            {textUrl}
          </button>
        )}
      </div>
      <div className="w-full grid grid-cols-3 gap-4">
        <div className="w-full p-3 bg-line rounded flex gap-3">
          <div className="hover-zoom group cursor-pointer w-32 aspect-square relative rounded overflow-hidden">
            <Image
              src={
                "https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/7/b/e/3/7be33b2123aee6e0982a5fde3c986df6.jpg"
              }
              fill
              alt="Album Cover"
              className="zoomable rounded group-hover:brightness-75 object-cover"
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
          <div className="flex h-full w-full flex-col justify-between">
            <div className="w-full flex flex-col justify-start items-start gap-1">
              <h4 className="text-white font-semibold text-base">
                Đừng kéo đôi chân em lại
              </h4>
              <p className="text-gray-400 text-sm font-medium">Hà Nhi</p>
            </div>
            <div className="w-full flex flex-row justify-between items-end gap-1">
              <h1 className="opacity-40 text-[40px] font-black text-transparent leading-none text-stroke-2 tracking-widest font-sans">
                #1
              </h1>
              <p className="text-white text-sm font-medium opacity-70">
                18.10.2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
