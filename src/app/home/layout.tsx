/* eslint-disable react/no-children-prop */
import Header from "@/src/components/header";
import PlayerController from "@/src/components/player-controller";
import SideBar from "@/src/components/sidebar";
import StoreProvider from "../redux.provider";

export default function HomeLayout() {
  return (
    <div className="bg-main w-full min-h-[100vh] select-none">
      <Header />
      <StoreProvider
        children={
          <>
            <SideBar />
            <PlayerController />
          </>
        }
      />
    </div>
  );
}
