// import ChartMusic from "@/src/components/chart-music";
import { useAppSelector } from "@/src/lib/hooks/redux.hook";

export default function BxhChart() {
  const headerHeight = useAppSelector((state) => state.ui.headerHeight);

  return (
    <div
      style={{
        height:
          headerHeight === 0 ? "0" : `calc(100vh - ${headerHeight + 90}px)`,
      }}
      className="relative overflow-hidden select-none flex p-3 w-full bg-main"
    >
      {/* <ChartMusic /> */}
    </div>
  );
}
