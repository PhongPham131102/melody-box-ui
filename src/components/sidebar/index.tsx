"use client";
import { useEffect } from "react";
import { BsMusicNoteList } from "react-icons/bs";
import SidebarItem from "./components/SidebarItem";
import { FaCompactDisc, FaRegStar } from "react-icons/fa";
import { GrLineChart } from "react-icons/gr";
import { TbCategory } from "react-icons/tb";
import { PiMusicNotesPlusBold } from "react-icons/pi";
import { AiFillYoutube } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks/redux.hook";
import { setHeaderHeight } from "@/src/store/slices/ui.slide";

export default function SideBar() {
  const dispatch = useAppDispatch();
  const headerHeight = useAppSelector((state) => state.ui.headerHeight);

  useEffect(() => {
    const headerElement = document.getElementById("sticky-header");
    const updateHeight = () => {
      if (headerElement) {
        dispatch(setHeaderHeight(headerElement.offsetHeight));
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [dispatch]);

  return (
    <div
      className={`overflow-hidden sticky bottom-0 transition-[width] duration-500  ${
        headerHeight === 0 ? "w-0" : "w-56"
      }  bg-header`}
      style={{
        height:
          headerHeight === 0 ? "0" : `calc(100vh - ${headerHeight + 90}px)`,
        top: `${headerHeight}px`,
        bottom: "90px",
        transitionTimingFunction: "cubic-bezier( 0.785, 0.135, 0.15, 0.86 )",
      }}
    >
      <div
        className={`w-full h-full flex-col gap-1 items-center transition-all duration-1000 ${
          headerHeight === 0 ? "opacity-0 invisible" : "opacity-100 visible"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier( 0.785, 0.135, 0.15, 0.86 )",
        }}
      >
        <SidebarItem
          icon={<BsMusicNoteList />}
          label="Thư viện"
          isActive={true}
          onClick={() => console.log("Sidebar item clicked")}
        />
        <SidebarItem
          icon={<FaCompactDisc />}
          label="Khám phá"
          isActive={false}
          onClick={() => console.log("Sidebar item clicked")}
        />
        <SidebarItem
          icon={<GrLineChart />}
          label="#Top 10 Zing Chart"
          isActive={false}
          onClick={() => console.log("Sidebar item clicked")}
        />
        <hr className="border-line w-[80%] my-4" />
        <SidebarItem
          icon={<PiMusicNotesPlusBold />}
          label="BXH Nhạc Mới"
          isActive={false}
          onClick={() => console.log("Sidebar item clicked")}
        />
        <SidebarItem
          icon={<TbCategory />}
          label="Chủ Đề Và Thể Loại"
          isActive={false}
          onClick={() => console.log("Sidebar item clicked")}
        />
        <SidebarItem
          icon={<FaRegStar />}
          label="Top 100"
          isActive={false}
          onClick={() => console.log("Sidebar item clicked")}
        />
        <SidebarItem
          icon={<AiFillYoutube />}
          label="Youtube Trending"
          isActive={false}
          onClick={() => console.log("Sidebar item clicked")}
        />
      </div>
    </div>
  );
}
