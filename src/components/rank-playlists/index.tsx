"use client";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import RankItem from "../rank-item";
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
  const arrSongs = [
    {
      artist: "Kaylin Trần",
      date: "18.10.2024",
      img: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/d/9/a/f/d9af676be118849c492c049b25b78103.jpg",
      rank: "1",
      title: "Trăm ngàn lần sai",
    },
    {
      artist: "Kaylin Trần",
      date: "18.10.2024",
      img: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/d/9/a/f/d9af676be118849c492c049b25b78103.jpg",
      rank: "2",
      title: "Trăm ngàn lần sai",
    },
    {
      artist: "Kaylin Trần",
      date: "18.10.2024",
      img: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/d/9/a/f/d9af676be118849c492c049b25b78103.jpg",
      rank: "3",
      title: "Trăm ngàn lần sai",
    },
    {
      artist: "Kaylin Trần",
      date: "18.10.2024",
      img: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/d/9/a/f/d9af676be118849c492c049b25b78103.jpg",
      rank: "4",
      title: "Trăm ngàn lần sai",
    },
    {
      artist: "Kaylin Trần",
      date: "18.10.2024",
      img: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/d/9/a/f/d9af676be118849c492c049b25b78103.jpg",
      rank: "5",
      title: "Trăm ngàn lần sai",
    },
    {
      artist: "Kaylin Trần",
      date: "18.10.2024",
      img: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/d/9/a/f/d9af676be118849c492c049b25b78103.jpg",
      rank: "6",
      title: "Trăm ngàn lần sai",
    },
    {
      artist: "Kaylin Trần",
      date: "18.10.2024",
      img: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/d/9/a/f/d9af676be118849c492c049b25b78103.jpg",
      rank: "7",
      title: "Trăm ngàn lần sai",
    },
    {
      artist: "Kaylin Trần",
      date: "18.10.2024",
      img: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/d/9/a/f/d9af676be118849c492c049b25b78103.jpg",
      rank: "8",
      title: "Trăm ngàn lần sai",
    },
    {
      artist: "Kaylin Trần",
      date: "18.10.2024",
      img: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/d/9/a/f/d9af676be118849c492c049b25b78103.jpg",
      rank: "9",
      title: "Trăm ngàn lần sai",
    },
    {
      artist: "Kaylin Trần",
      date: "18.10.2024",
      img: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/d/9/a/f/d9af676be118849c492c049b25b78103.jpg",
      rank: "10",
      title: "Trăm ngàn lần sai",
    },
  ];
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
      <div className="w-full">
        <Carousel
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnFocusIn: true,
              stopOnMouseEnter: true,
              stopOnInteraction: true,
            }),
          ]}
          opts={{
            align: "start",
            startIndex: 0,
            duration: 10,
          }}
          className="w-full group/outer px-2"
        >
          <CarouselContent>
            {arrSongs.map((song, index) => (
              <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={index}>
                <RankItem
                  artist={song.artist}
                  date={song.date}
                  img={song.img}
                  rank={song.rank}
                  title={song.title}
                  key={index}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className="absolute translate-x-[100%] hidden group-hover/outer:flex"
            variant={"secondary"}
          />
          <CarouselNext
            className="absolute -translate-x-[100%] hidden group-hover/outer:flex"
            variant={"secondary"}
          />
        </Carousel>
      </div>
    </div>
  );
}
