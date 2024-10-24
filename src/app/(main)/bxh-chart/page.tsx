"use client";

import { useAppSelector } from "@/src/lib/hooks/redux.hook";
import { useEffect } from "react";

export default function BxhChart() {
  const headerHeight = useAppSelector((state) => state.ui.headerHeight);

  useEffect(() => {
    const chartCanvas = document.getElementById(
      "chartCanvas"
    ) as HTMLCanvasElement;
    if (chartCanvas) {
      const canvasWidth = chartCanvas.offsetWidth;
      const canvasHeight = chartCanvas.offsetHeight;
      const widthPointPerHorizontal = canvasWidth / 13;
      const widthPointPerVertical = canvasHeight / 5 - 5;

      const ctx = chartCanvas.getContext("2d");

      if (ctx) {
        for (let index = 5; index > 0; index--) {
          const xPoint = index * widthPointPerVertical;
          ctx.lineWidth = 0.8;

          ctx.beginPath();
          ctx.setLineDash([5, 5]);
          ctx.moveTo(0, xPoint + 1);
          ctx.strokeStyle = "red";
          ctx.lineTo(1180, xPoint + 1);
          ctx.stroke();
        }
        ctx.setLineDash([]);
      }
    }
  }, []);

  return (
    <div
      style={{
        height:
          headerHeight === 0 ? "0" : `calc(100vh - ${headerHeight + 90}px)`,
      }}
      className=" relative overflow-hidden select-none flex p-3 w-full"
    >
      <canvas
        id="chartCanvas"
        className="w-[1188px] h-[300px] "
        width="1188"
        height="300"
      ></canvas>
    </div>
  );
}
