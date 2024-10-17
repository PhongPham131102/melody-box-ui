/* eslint-disable react/no-children-prop */
"use client";
import StoreProvider from "@/src/app/redux.provider";
import InforPlayer from "./components/InforPlayer";
import MainController from "./components/MainController";
import { useAppSelector } from "@/src/lib/hooks/redux.hook";

export default function PlayerController() {
  const headerHeight = useAppSelector((state) => state.ui.headerHeight);
  return (
    <div
      style={{
        transitionTimingFunction: "cubic-bezier( 0.785, 0.135, 0.15, 0.86 )",
      }}
      id="player-controller"
      className={`sticky bottom-0 ${
        headerHeight === 0 ? "h-0" : "h-[90px]"
      } bg-player-controler-main overflow-hidden transition-[height] duration-500`}
    >
      <div
        style={{
          transitionTimingFunction: "cubic-bezier( 0.785, 0.135, 0.15, 0.86 )",
        }}
        className={` transition-all duration-1000 ${
          headerHeight === 0 ? "opacity-0 invisible" : "opacity-100 visible"
        } w-full h-full relative flex flex-row justify-between items-center`}
      >
        <InforPlayer
          imageIcon="https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/7/b/e/3/7be33b2123aee6e0982a5fde3c986df6.jpg"
          title="Say Yes (Vietnamese Version) Say Yes (Vietnamese Version) Say Yes (Vietnamese Version)"
          artists={["Ogenus", "PiaLinh"]}
        />
        <StoreProvider children={<MainController />} />
        <div className="w-full h-10"></div>
      </div>
    </div>
  );
}
