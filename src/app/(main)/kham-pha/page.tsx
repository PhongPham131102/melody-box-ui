"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

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
    "left 0.5s cubic-bezier(0.77, 0, 0.175, 1), opacity 0.5s cubic-bezier(0.77, 0, 0.175, 1)";
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
  return (
    <div className="w-full relative overflow-hidden select-none">
      <div
        className="w-full  relative py-2 h-64 group"
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
        <div ref={containerRef} className="w-full absolute py-2 h-full">
          {src.map((imageSrc, index) => (
            <div
              key={index}
              className="absolute px-2 w-[calc(100%/3)] h-full cursor-pointer"
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
  );
}
