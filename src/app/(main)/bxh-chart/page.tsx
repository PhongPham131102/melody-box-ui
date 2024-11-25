"use client";
import ChartMusic from "@/src/components/chart-music";
import RankingMedia from "@/src/components/ranking-media";
import { useAppSelector } from "@/src/lib/hooks/redux.hook";

export default function BxhChart() {
  const headerHeight = useAppSelector((state) => state.ui.headerHeight);
  const sampleSongs = [
    {
      rank: 1,
      imageSrc:
        "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/4/a/8/f/4a8faff8092d966c32c99e27f8d77916.jpg",
      title: "Blinding Lights",
      artists: ["The Weeknd"],
      album: "After Hours",
      duration: "3:20",
    },
    {
      rank: 2,
      imageSrc:
        "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/4/a/8/f/4a8faff8092d966c32c99e27f8d77916.jpg",
      title: "Shape of You",
      artists: ["Ed Sheeran"],
      album: "Divide",
      duration: "4:24",
    },
    {
      rank: 3,
      imageSrc:
        "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/4/a/8/f/4a8faff8092d966c32c99e27f8d77916.jpg",
      title: "Levitating",
      artists: ["Dua Lipa"],
      album: "Future Nostalgia",
      duration: "3:35",
    },
    {
      rank: 4,
      imageSrc:
        "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/4/a/8/f/4a8faff8092d966c32c99e27f8d77916.jpg",
      title: "Stay",
      artists: ["The Kid LAROI", "Justin Bieber"],
      album: "F*ck Love 3",
      duration: "2:21",
    },
    {
      rank: 5,
      imageSrc:
        "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/4/a/8/f/4a8faff8092d966c32c99e27f8d77916.jpg",
      title: "Bad Guy",
      artists: ["Billie Eilish"],
      album: "When We All Fall Asleep, Where Do We Go?",
      duration: "3:14",
    },
    {
      rank: 6,
      imageSrc:
        "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/4/a/8/f/4a8faff8092d966c32c99e27f8d77916.jpg",
      title: "Save Your Tears",
      artists: ["The Weeknd"],
      album: "After Hours",
      duration: "3:36",
    },
    {
      rank: 7,
      imageSrc:
        "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/4/a/8/f/4a8faff8092d966c32c99e27f8d77916.jpg",
      title: "Señorita",
      artists: ["Shawn Mendes", "Camila Cabello"],
      album: "Señorita (Single)",
      duration: "3:11",
    },
    {
      rank: 8,
      imageSrc:
        "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/4/a/8/f/4a8faff8092d966c32c99e27f8d77916.jpg",
      title: "Drivers License",
      artists: ["Olivia Rodrigo"],
      album: "SOUR",
      duration: "4:02",
    },
    {
      rank: 9,
      imageSrc:
        "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/4/a/8/f/4a8faff8092d966c32c99e27f8d77916.jpg",
      title: "Industry Baby",
      artists: ["Lil Nas X", "Jack Harlow"],
      album: "MONTERO",
      duration: "3:32",
    },
    {
      rank: 10,
      imageSrc:
        "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/4/a/8/f/4a8faff8092d966c32c99e27f8d77916.jpg",
      title: "Watermelon Sugar",
      artists: ["Harry Styles"],
      album: "Fine Line",
      duration: "2:54",
    },
  ];

  return (
    <div
      style={{
        height:
          headerHeight === 0 ? "0" : `calc(100vh - ${headerHeight + 90}px)`,
      }}
      className="relative overflow-hidden select-none flex p-3 w-full bg-main"
    >
      <div className="grid grid-flow-col grid-cols-4 gap-3 w-full">
        <div className="flex flex-col gap-5 custom-scroll px-8 col-span-3 w-full ">
          <ChartMusic />
          <div className="w-full py-2 px-2 flex flex-col gap-1">
            {sampleSongs.map((song) => (
              <RankingMedia
                key={song.rank}
                rank={song.rank}
                imageSrc={song.imageSrc}
                title={song.title}
                artists={song.artists}
                album={song.album}
                duration={song.duration}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
