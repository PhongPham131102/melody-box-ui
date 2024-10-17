/* eslint-disable react/no-children-prop */
import Header from "@/src/components/header";
import PlayerController from "@/src/components/player-controller";
import SideBar from "@/src/components/sidebar";
import StoreProvider from "../redux.provider";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-main w-full select-none min-h-[100vh]">
      <Header />

      <StoreProvider
        children={
          <>
            <div className="w-full flex">
              <SideBar />
              {children}
            </div>
            <PlayerController />
          </>
        }
      />
    </div>
  );
}
