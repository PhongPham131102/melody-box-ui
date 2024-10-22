import Image from "next/image";
import playIcon from "@/public/icons/play.png";
type RankItemProp = {
  img: string;
  title: string;
  artist: string;
  rank: string;
  date: string;
};
export default function RankItem({
  artist,
  date,
  img,
  rank,
  title,
}: RankItemProp) {
  return (
    <div className="cursor-pointer group  w-full p-3 bg-line rounded flex gap-3">
      <div className="group-hover:hover-zoom group cursor-pointer w-32 aspect-square relative rounded overflow-hidden">
        <Image
          src={img}
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
      <div className="flex flex-col justify-between">
        <div className="w-full flex flex-col justify-start items-start gap-1">
          <h4 className="text-white font-semibold text-base">{title}</h4>
          <p className="text-gray-400 text-sm font-medium">{artist}</p>
        </div>
        <div className="w-full flex flex-row justify-between items-end gap-1">
          <h1 className="opacity-40 text-[40px] font-black text-transparent leading-none text-stroke-2 tracking-widest font-sans">
            #{rank}
          </h1>
          <p className="text-white text-sm font-medium opacity-70">{date}</p>
        </div>
      </div>
    </div>
  );
}
