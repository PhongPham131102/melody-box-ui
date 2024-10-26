"use client";

import { useAppSelector } from "@/src/lib/hooks/redux.hook";
import { useEffect, useState } from "react";
import { Stage, Layer, Line } from "react-konva";

export default function BxhChart() {
  const headerHeight = useAppSelector((state) => state.ui.headerHeight);
  const [canvasSize, setCanvasSize] = useState({ width: 2000, height: 600 });

  // useEffect(() => {
  //   const chartCanvas = document.getElementById(
  //     "chartCanvasContainer"
  //   ) as HTMLDivElement;
  //   if (chartCanvas) {
  //     const resizeObserver = new ResizeObserver(() => {
  //       setCanvasSize({
  //         width: chartCanvas.offsetWidth * 2,
  //         height: chartCanvas.offsetHeight * 2,
  //       });
  //     });

  //     resizeObserver.observe(chartCanvas);

  //     return () => {
  //       resizeObserver.disconnect();
  //     };
  //   }
  // }, []);

  const widthPointPerHorizontal = canvasSize.width / 13;
  const widthPointPerVertical = (canvasSize.height / 5 - 5) * 0.5;

  const lines = [];
  for (let index = 5; index > 0; index--) {
    let yPoint = index * widthPointPerVertical;
    yPoint += index % 2 === 0 ? 0.5 : 0;
    console.log(yPoint);
    lines.push(
      <Line
        key={index}
        points={[0, yPoint + 1, canvasSize.width * 0.5, yPoint + 1]}
        stroke="red"
        strokeWidth={0.5}
        dash={[5, 5]}
      />
    );
  }

  return (
    <div
      style={{
        height:
          headerHeight === 0 ? "0" : `calc(100vh - ${headerHeight + 90}px)`,
      }}
      className="relative overflow-hidden select-none flex p-3 w-full"
    >
      <Stage width={canvasSize.width} height={canvasSize.height}>
        <Layer>{lines}</Layer>
      </Stage>
    </div>
  );
}
