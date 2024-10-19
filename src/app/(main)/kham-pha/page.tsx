"use client";

import PlayLists from "@/src/components/PlayLists";
import PlayList from "@/src/components/PlayLists";
import SongMedia from "@/src/components/SongMedia";
import Tab from "@/src/components/tabs";
import { useAppSelector } from "@/src/lib/hooks/redux.hook";
import { useEffect, useRef, useState } from "react";
import { FaCirclePlay } from "react-icons/fa6";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { IoRefreshSharp } from "react-icons/io5";
export default function DiscoveryPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const src = [
    "https://photo-zmp3.zmdcdn.me/banner/b/c/2/4/bc243109ca7ac2bac08ff0625e01c2f7.jpg",
    "https://photo-zmp3.zmdcdn.me/banner/3/f/d/a/3fda71df0ede35054dd78f852f1c92b0.jpg",
    "https://photo-zmp3.zmdcdn.me/banner/6/f/8/b/6f8be5496f083c601958c893bb1ac7e4.jpg",
  ];
  const [isFirstTime, setIsFirstTime] = useState(true);
  const slideItems = () => {
    if (containerRef.current) {
      const items = Array.from(containerRef.current.children) as HTMLElement[];

      if (items.length === 3) {
        items[0].style.transition = transition;
        items[1].style.transition = transition;
        items[2].style.transition = transition;
        if (isFirstTime) {
          items[0].style.left = "0%";
          items[0].style.opacity = "1";
          items[0].style.zIndex = "1";
          items[2].style.left = "66.667%";
          items[2].style.opacity = "1";
          items[2].style.zIndex = "1";
        } else {
          items[0].style.filter = "brightness(0.75)";
          items[0].style.left = "66.667%";
          items[0].style.opacity = "1";
          items[0].style.zIndex = "1";

          items[1].style.left = "0%";
          items[1].style.opacity = "1";
          items[1].style.zIndex = "2";

          items[2].style.left = "33.33%";
          items[2].style.opacity = "1";
          items[2].style.zIndex = "2";
        }

        isFirstTime
          ? (setTimeout(() => {
              containerRef.current?.insertBefore(items[0], items[1]);
              containerRef.current?.appendChild(items[2]);
            }, 500),
            setIsFirstTime(false))
          : setTimeout(() => {
              items[0].style.filter = "brightness(1.00)";
              containerRef.current?.appendChild(items[0]);
            }, 200);
      }
    }
  };
  useEffect(() => {
    if (isFirstTime) {
      slideItems();
    } else if (!isPaused) {
      const interval = setInterval(slideItems, 3000);
      return () => clearInterval(interval);
    }
  }, [isPaused, isFirstTime]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
  const transition =
    "left 0.5s cubic-bezier( 0.645, 0.045, 0.355, 1 ), opacity 0.5s cubic-bezier( 0.645, 0.045, 0.355, 1 )";
  const handleNext = () => {
    if (containerRef.current) {
      const items = Array.from(containerRef.current.children) as HTMLElement[];

      if (items.length === 3) {
        items[1].style.transition = transition;
        items[2].style.transition = transition;
        items[0].style.transition = transition;
        items[0].style.filter = "brightness(0.75)";
        items[0].style.left = "33.33%";
        items[0].style.left = "66.66%";
        items[0].style.opacity = "1";
        items[0].style.zIndex = "1";

        items[1].style.left = "16.6%";
        items[1].style.left = "0%";
        items[1].style.opacity = "1";
        items[1].style.zIndex = "2";

        items[2].style.left = "55%";
        items[2].style.left = "33.33%";
        items[2].style.opacity = "1";
        items[2].style.zIndex = "2";

        setTimeout(() => {
          items[0].style.filter = "brightness(1.00)";
          containerRef.current?.appendChild(items[0]);
        }, 200);
      }
    }
  };

  const handlePrevious = () => {
    if (containerRef.current) {
      const items = Array.from(containerRef.current.children) as HTMLElement[];
      if (items.length === 3) {
        items[0].style.transition = transition;
        items[1].style.transition = transition;
        items[2].style.transition = transition;
        items[0].style.left = "10.00%";
        items[0].style.left = "20.00%";
        items[0].style.left = "33.33%";
        items[0].style.opacity = "1";
        items[0].style.zIndex = "2";
        items[0].style.filter = "brightness(0.75)";
        items[1].style.left = "33.33%";
        items[1].style.left = "50%";
        items[1].style.left = "66.667%";
        items[1].style.opacity = "1";
        items[1].style.zIndex = "2";
        items[1].style.filter = "brightness(0.75)";
        items[2].style.left = "33.33%";
        items[2].style.left = "0%";
        items[2].style.opacity = "1";
        items[2].style.zIndex = "1";

        window.setTimeout(() => {
          items[0].style.filter = "brightness(1.00)";
          items[1].style.filter = "brightness(1.00)";
          containerRef.current?.appendChild(items[0]);
          containerRef.current?.appendChild(items[1]);
        }, 300);
      }
    }
  };
  const songs = [
    {
      title: "TÌNH ĐẦU QUÁ CHÉN",
      artists: 'ANH TRAI "SAY HI", Quang Hùng MasterD, Negav, Pháp Kiều, ERIK',
    },
    { title: "Bầu Trời Mới", artists: "Da LAB, Minh Tóc & Lam" },
    { title: "Trận Bộ Nhớ", artists: 'ANH TRAI "SAY HI", Dương Domic' },
    { title: "Bình Yên", artists: "Vũ., Binz" },
    {
      title:
        "Đi Giữa Trời Rực Rỡ (Original Soundtrack from “Đi Giữa Trời Rực Rỡ”)",
      artists: "Ngô Lan Hương, SK Pictures",
    },
    {
      title: "Sao Hạng A",
      artists: 'ANH TRAI "SAY HI", HIEUTHUHAI, Dương Domic, Song Luân, JSOL',
    },
    {
      title: "Kim Phút, Kim Giờ",
      artists:
        'Isaac, Negav, HIEUTHUHAI, HURRYKNG, Pháp Kiều, ANH TRAI "SAY HI"',
    },
    {
      title: "Ngáo Ngơ",
      artists: 'ANH TRAI "SAY HI", HIEUTHUHAI, ERIK, Anh Tú Atus, JSOL, Orange',
    },
    { title: "Đâu Phải Vợ Anh", artists: "RAP VIỆT, Dangrangto" },
    { title: "Trời Em Lại", artists: 'ANH TRAI "SAY HI", Quang Hùng MasterD' },
  ];
  const songsUs = [
    { title: "BIRDS OF A FEATHER", artists: "Billie Eilish" },
    { title: "Timeless", artists: "The Weeknd, Playboi Carti" },
    { title: "Die With A Smile", artists: "Lady Gaga, Bruno Mars" },
    { title: "Good Luck, Babe!", artists: "Chappell Roan" },
    { title: "Taste", artists: "Sabrina Carpenter" },
    { title: "I Love You, I'm Sorry", artists: "Gracie Abrams" },
    { title: "A Bar Song (Tipsy)", artists: "Shaboozey" },
    { title: "It's Ok I'M Ok", artists: "Tate McRae" },
    { title: "Sympathy Is A Knife", artists: "Charli XCX" },
    { title: "Hot To Go!", artists: "Chappell Roan" },
  ];
  const songsKorea = [
    { title: "Mantra", artists: "JENNIE" },
    { title: "Mantra (Explicit)", artists: "JENNIE" },
    { title: "Magnetic", artists: "ILLIT" },
    { title: "Rockstar", artists: "LISA" },
    { title: "MOONLIT FLOOR", artists: "LISA" },
    { title: "NEW WOMAN", artists: "LISA (BLACKPINK), Rosalía" },
    { title: "ABCD", artists: "NAYEON (TWICE)" },
    { title: "LIKE THAT", artists: "BABYMONSTER" },
    { title: "LOVE, MONEY, FAME", artists: "SEVENTEEN, DJ Khaled" },
    { title: "UP (KARINA Solo)", artists: "aespa" },
  ];
  const headerHeight = useAppSelector((state) => state.ui.headerHeight);
  return (
    <div
      style={{
        height:
          headerHeight === 0 ? "0" : `calc(100vh - ${headerHeight + 90}px)`,
      }}
      className="w-full relative overflow-hidden select-none flex p-3"
    >
      <div className="w-full   flex flex-col pr-1.5 custom-scroll">
        <div className="w-full">
          {" "}
          <div
            className="w-full  relative  h-52 group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {!isFirstTime && (
              <>
                <span
                  onClick={handlePrevious}
                  className="absolute transition-all duration-300 flex opacity-0 invisible group-hover:!opacity-100 group-hover:!visible !text-4xl cursor-pointer text-white w-14 h-14 rounded-full left-0 bg-[#ffffff26] z-50 top-1/2 translate-x-1/2 -translate-y-1/4 items-center justify-center"
                >
                  <GrFormPrevious />
                </span>
                <span
                  onClick={handleNext}
                  className="absolute transition-all duration-300 flex opacity-0 invisible group-hover:!opacity-100 group-hover:!visible !text-4xl cursor-pointer text-white w-14 h-14 rounded-full right-0 bg-[#ffffff26] z-50 top-1/2 -translate-x-1/2 -translate-y-1/4 items-center justify-center"
                >
                  <GrFormNext />
                </span>
              </>
            )}
            <div ref={containerRef} className="w-full absolute  h-full">
              {src.map((imageSrc, index) => (
                <div
                  key={index}
                  className="absolute  w-[calc(100%/3)] h-full cursor-pointer first:pr-2.5 last:pl-2.5"
                  style={{
                    left: "33.33%",
                    opacity: index === 1 ? "1" : "0.2",
                  }}
                >
                  <div
                    className="w-full h-full rounded-lg "
                    style={{
                      backgroundImage: `url(${imageSrc})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2 px-3 py-4">
          <div className="w-full flex justify-between items-center py-2">
            <span className="text-white font-bold text-lg">
              Gợi Ý Dành Riêng Cho Bạn
            </span>
            <button className="group text-white justify-center items-center text-xs bg-main-text hover:brightness-90 py-1 px-3 rounded-full flex gap-1 uppercase">
              <span className="group-hover:animate-spin360 transition-all duration-300 text-lg font-bold">
                <IoRefreshSharp />
              </span>
              Làm mới
            </button>
          </div>
          <div className="w-full grid grid-cols-3 gap-2.5">
            <SongMedia
              imageIcon="https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/7/b/e/3/7be33b2123aee6e0982a5fde3c986df6.jpg"
              title="Say Yes (Vietnamese Version) Say Yes (Vietnamese Version) Say Yes (Vietnamese Version)"
              artists={["Ogenus", "PiaLinh"]}
            />
            <SongMedia
              imageIcon="https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/7/b/e/3/7be33b2123aee6e0982a5fde3c986df6.jpg"
              title="Say Yes (Vietnamese Version) Say Yes (Vietnamese Version) Say Yes (Vietnamese Version)"
              artists={["Ogenus", "PiaLinh"]}
            />
            <SongMedia
              imageIcon="https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/7/b/e/3/7be33b2123aee6e0982a5fde3c986df6.jpg"
              title="Say Yes (Vietnamese Version) Say Yes (Vietnamese Version) Say Yes (Vietnamese Version)"
              artists={["Ogenus", "PiaLinh"]}
            />
            <SongMedia
              imageIcon="https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/7/b/e/3/7be33b2123aee6e0982a5fde3c986df6.jpg"
              title="Say Yes (Vietnamese Version) Say Yes (Vietnamese Version) Say Yes (Vietnamese Version)"
              artists={["Ogenus", "PiaLinh"]}
            />
            <SongMedia
              imageIcon="https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/7/b/e/3/7be33b2123aee6e0982a5fde3c986df6.jpg"
              title="Say Yes (Vietnamese Version) Say Yes (Vietnamese Version) Say Yes (Vietnamese Version)"
              artists={["Ogenus", "PiaLinh"]}
            />
            <SongMedia
              imageIcon="https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/7/b/e/3/7be33b2123aee6e0982a5fde3c986df6.jpg"
              title="Say Yes (Vietnamese Version) Say Yes (Vietnamese Version) Say Yes (Vietnamese Version)"
              artists={["Ogenus", "PiaLinh"]}
            />
            <SongMedia
              imageIcon="https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/7/b/e/3/7be33b2123aee6e0982a5fde3c986df6.jpg"
              title="Say Yes (Vietnamese Version) Say Yes (Vietnamese Version) Say Yes (Vietnamese Version)"
              artists={["Ogenus", "PiaLinh"]}
            />
            <SongMedia
              imageIcon="https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/7/b/e/3/7be33b2123aee6e0982a5fde3c986df6.jpg"
              title="Say Yes (Vietnamese Version) Say Yes (Vietnamese Version) Say Yes (Vietnamese Version)"
              artists={["Ogenus", "PiaLinh"]}
            />
            <SongMedia
              imageIcon="https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/7/b/e/3/7be33b2123aee6e0982a5fde3c986df6.jpg"
              title="Say Yes (Vietnamese Version) Say Yes (Vietnamese Version) Say Yes (Vietnamese Version)"
              artists={["Ogenus", "PiaLinh"]}
            />
          </div>
        </div>
        <PlayLists />
      </div>
      <div className=" group w-1/4 h-full pl-1.5">
        <div className="group w-full h-full flex flex-col gap-2 bg-header px-3 rounded-lg custom-scroll">
          <div className="text-white text-2xl pt-8 pb-2 font-bold flex gap-2 items-center">
            BXH Bài Hát
            <FaCirclePlay />
          </div>
          <Tab
            tabs={[
              {
                content: (
                  <div className="flex flex-col gap my-2 gap-4 group ">
                    {songs.map((song, index) => {
                      let rank = index + 1;
                      let textColor = "text-white";
                      let fontSize = "text-lg";
                      if (rank === 1) {
                        textColor = "text-red-500";
                      } else if (rank === 2) {
                        textColor = "text-teal-500";
                      } else if (rank === 3) {
                        textColor = "text-orange-500";
                      }

                      return (
                        <div
                          key={rank}
                          className="w-full flex gap-2 items-start"
                        >
                          {rank === 1 ? (
                            <div
                              style={{
                                backgroundImage: `url(https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/banner/2/7/b/d/27bdc67fef29c7928298c5759de08534.jpg)`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }}
                              className="p-12 relative"
                            >
                              <span className="w-8 h-8 bg-red-500 z-10 absolute bottom-0 left-0 flex justify-center items-center font-bold text-white text-lg">
                                {rank}
                              </span>
                            </div>
                          ) : (
                            <div
                              className={`text-center font-bold ${textColor} ${fontSize} min-w-8 min-h-8 flex items-center justify-center`}
                            >
                              {rank}
                            </div>
                          )}
                          <div className="flex flex-col">
                            <h3 className="text-white font-medium text-sm">
                              {song.title}
                            </h3>
                            <p className="text-[#acacac] text-xs">
                              {song.artists}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ),
                key: "vietnam",
                label: "Việt Nam",
              },
              {
                content: (
                  <div className="flex flex-col gap my-2 gap-4 group">
                    {songsUs.map((song, index) => {
                      let rank = index + 1;
                      let textColor = "text-white";
                      let fontSize = "text-lg";
                      if (rank === 1) {
                        textColor = "text-red-500";
                      } else if (rank === 2) {
                        textColor = "text-teal-500";
                      } else if (rank === 3) {
                        textColor = "text-orange-500";
                      }

                      return (
                        <div
                          key={rank}
                          className="w-full flex gap-2 items-start"
                        >
                          {rank === 1 ? (
                            <div
                              style={{
                                backgroundImage: `url(https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/banner/2/7/b/d/27bdc67fef29c7928298c5759de08534.jpg)`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }}
                              className="p-12 relative"
                            >
                              <span className="w-8 h-8 bg-red-500 z-10 absolute bottom-0 left-0 flex justify-center items-center font-bold text-white text-lg">
                                {rank}
                              </span>
                            </div>
                          ) : (
                            <div
                              className={`text-center font-bold ${textColor} ${fontSize} min-w-8 min-h-8 flex items-center justify-center`}
                            >
                              {rank}
                            </div>
                          )}
                          <div className="flex flex-col">
                            <h3 className="text-white font-medium text-sm">
                              {song.title}
                            </h3>
                            <p className="text-[#acacac] text-xs">
                              {song.artists}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ),
                key: "aumy",
                label: "Âu Mỹ",
              },
              {
                content: (
                  <div className="flex flex-col gap my-2 gap-4 group">
                    {songsKorea.map((song, index) => {
                      let rank = index + 1;
                      let textColor = "text-white";
                      let fontSize = "text-lg";
                      if (rank === 1) {
                        textColor = "text-red-500";
                      } else if (rank === 2) {
                        textColor = "text-teal-500";
                      } else if (rank === 3) {
                        textColor = "text-orange-500";
                      }

                      return (
                        <div
                          key={rank}
                          className="w-full flex gap-2 items-start"
                        >
                          {rank === 1 ? (
                            <div
                              style={{
                                backgroundImage: `url(https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/banner/2/7/b/d/27bdc67fef29c7928298c5759de08534.jpg)`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }}
                              className="p-12 relative"
                            >
                              <span className="w-8 h-8 bg-red-500 z-10 absolute bottom-0 left-0 flex justify-center items-center font-bold text-white text-lg">
                                {rank}
                              </span>
                            </div>
                          ) : (
                            <div
                              className={`text-center font-bold ${textColor} ${fontSize} min-w-8 min-h-8 flex items-center justify-center`}
                            >
                              {rank}
                            </div>
                          )}
                          <div className="flex flex-col">
                            <h3 className="text-white font-medium text-sm">
                              {song.title}
                            </h3>
                            <p className="text-[#acacac] text-xs">
                              {song.artists}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ),
                key: "hanquoc",
                label: "Hàn Quốc",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
