"use client";
/* eslint-disable react/no-children-prop */
import Header from "@/src/components/header";
import PlayerController from "@/src/components/player-controller";
import SideBar from "@/src/components/sidebar";
import StoreProvider from "../redux.provider";
import { useAppSelector } from "@/src/lib/hooks/redux.hook";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className=" select-none">
        <StoreProvider
          children={
            <>
              <Header />
              <div className="w-full flex sticky">
                <SideBar />
                {children}
              </div>
              <PlayerController />
            </>
          }
        />
      </div>
    </>
  );
}
