"use client";

import { useAppSelector } from "@/src/lib/hooks/redux.hook";
import Konva from "konva";
import { useEffect, useState } from "react";
import { Stage, Layer, Line, Text, Circle } from "react-konva";

// Define allowed color keys as a union type
type CircleColor = "red" | "yellow" | "blue";

export default function BxhChart() {
  const headerHeight = useAppSelector((state) => state.ui.headerHeight);
  const [canvasSize, setCanvasSize] = useState({ width: 1188, height: 300 });
  const [showCircles, setShowCircles] = useState<Record<CircleColor, boolean>>({
    red: false,
    yellow: false,
    blue: false,
  });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const widthPointPerHorizontal = canvasSize.width / 13;
  const widthPointPerVertical = canvasSize.height / 5 - 5;

  const lines = [];
  for (let index = 5; index > 0; index--) {
    let yPoint = index * widthPointPerVertical + 0.5;
    lines.push(
      <Line
        key={index}
        points={[0, yPoint + 1, canvasSize.width, yPoint + 1]}
        stroke="gray"
        strokeWidth={0.5}
        dash={[2, 5]}
      />
    );
  }

  const texts = [];
  let currentTime = Math.floor(new Date().getHours());
  const hourPerPoint = 103;
  for (let x = 0; x < 12; x++) {
    const timeString = `${currentTime.toString().padStart(2, "0")}:00`;
    texts.push(
      <Text
        key={`x-text-${x}`}
        x={x * hourPerPoint}
        y={canvasSize.height - 10}
        text={timeString}
        fontSize={12}
        width={40}
        align="center"
        fill="#959198"
      />
    );
    currentTime -= 2;
    if (currentTime < 0) {
      currentTime += 24;
    }
  }
  const xPerPoint = hourPerPoint / 2;
  console.log("xPerPoint: ", xPerPoint);
  function generateByXPoint(arrX: number[]) {
    const arrPoint: number[] = [];
    for (let index = 0; index < arrX.length; index++) {
      let XPoint: number = xPerPoint * index;
      XPoint += 22;
      console.log(XPoint);
      const element: number = arrX[index];
      arrPoint.push(XPoint, element);
    }
    return arrPoint;
  }
  const dataPoints1 = generateByXPoint([
    60, 80, 100, 120, 90, 110, 130, 140, 120, 100, 80, 70, 85, 95, 105, 115,
    135, 145, 130, 110, 90, 100, 120, 140,
  ]);

  const dataPoints2 = generateByXPoint([
    30, 35, 40, 38, 42, 45, 50, 55, 53, 50, 48, 46, 44, 47, 50, 53, 56, 54, 51,
    49, 52, 55, 58, 60,
  ]);

  const dataPoints3 = generateByXPoint([
    100, 120, 110, 130, 125, 105, 95, 85, 90, 100, 110, 120, 115, 105, 95, 85,
    80, 90, 110, 130, 140, 130, 120, 110,
  ]);

  // Helper function to calculate distance between two points
  const calculateDistance = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  };
  // Thêm trạng thái để lưu vị trí hình tròn gần chuột nhất
  const [closestCirclePos, setClosestCirclePos] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [closestLineColor, setClosestLineColor] = useState<string | null>(null);

  const determineClosestLine = () => {
    const distances = [
      {
        color: "red",
        dataPoints: dataPoints1,
        distance: Math.min(
          ...dataPoints1.map((_, i) =>
            i % 2 === 0
              ? calculateDistance(
                  dataPoints1[i],
                  dataPoints1[i + 1],
                  mousePos.x,
                  mousePos.y
                )
              : Infinity
          )
        ),
      },
      {
        color: "yellow",
        dataPoints: dataPoints2,
        distance: Math.min(
          ...dataPoints2.map((_, i) =>
            i % 2 === 0
              ? calculateDistance(
                  dataPoints2[i],
                  dataPoints2[i + 1],
                  mousePos.x,
                  mousePos.y
                )
              : Infinity
          )
        ),
      },
      {
        color: "blue",
        dataPoints: dataPoints3,
        distance: Math.min(
          ...dataPoints3.map((_, i) =>
            i % 2 === 0
              ? calculateDistance(
                  dataPoints3[i],
                  dataPoints3[i + 1],
                  mousePos.x,
                  mousePos.y
                )
              : Infinity
          )
        ),
      },
    ];

    const closestLine = distances.reduce((prev, curr) =>
      prev.distance < curr.distance ? prev : curr
    );

    // Xác định vị trí của hình tròn gần nhất trên đường gần nhất
    const closestCircle = closestLine.dataPoints.reduce<{
      x: number;
      y: number;
      distance: number;
    } | null>((prev, _, i) => {
      if (i % 2 !== 0) return prev;
      const x = closestLine.dataPoints[i];
      const y = closestLine.dataPoints[i + 1];
      const distance = calculateDistance(x, y, mousePos.x, mousePos.y);

      return prev === null || distance < prev.distance
        ? { x, y, distance }
        : prev;
    }, null);

    if (closestCircle) {
      setClosestCirclePos({ x: closestCircle.x, y: closestCircle.y });
      setClosestLineColor(closestLine.color); // Cập nhật màu cho đường thẳng đứng
    }

    setShowCircles({
      red: false,
      yellow: false,
      blue: false,
      [closestLine.color as CircleColor]: true,
    });
  };

  useEffect(() => {
    determineClosestLine();
  }, [mousePos]);

  const handleMouseMove = (e: any) => {
    const stage = e.target.getStage();
    const mousePos = stage.getPointerPosition();
    setMousePos({ x: mousePos.x, y: mousePos.y });
  };

  const circles = (dataPoints: number[], colorKey: CircleColor) =>
    dataPoints.reduce((acc: JSX.Element[], point, i) => {
      if (i % 2 === 0) {
        acc.push(
          <Circle
            key={`circle-${colorKey}-${i / 2}`}
            x={dataPoints[i] + 1}
            y={dataPoints[i + 1]}
            radius={5}
            fill="white"
            stroke={colorKey}
            strokeWidth={2}
            visible={showCircles[colorKey]}
          />
        );
      }
      return acc;
    }, []);

  return (
    <div
      style={{
        height:
          headerHeight === 0 ? "0" : `calc(100vh - ${headerHeight + 90}px)`,
      }}
      className="relative overflow-hidden select-none flex p-3 w-full bg-main"
    >
      <Stage
        width={canvasSize.width}
        height={canvasSize.height}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setClosestLineColor(null);
        }}
      >
        <Layer>
          {lines}

          {/* Red Line */}
          <Line
            points={dataPoints1}
            stroke="#ff4444"
            strokeWidth={1.5}
            lineCap="round"
            lineJoin="round"
            tension={0.5}
          />
          {circles(dataPoints1, "red")}

          {/* Yellow Line */}
          <Line
            points={dataPoints2}
            stroke="yellow"
            strokeWidth={1.5}
            lineCap="round"
            lineJoin="round"
            tension={0.2}
          />
          {circles(dataPoints2, "yellow")}

          {/* Blue Line */}
          <Line
            points={dataPoints3}
            stroke="blue"
            strokeWidth={1.5}
            lineCap="round"
            lineJoin="round"
            tension={0.2}
          />
          {circles(dataPoints3, "blue")}

          {texts}
          {closestCirclePos && closestLineColor && (
            <Line
              points={[
                closestCirclePos.x,
                0,
                closestCirclePos.x,
                canvasSize.height,
              ]}
              stroke={closestLineColor || "white"}
              strokeWidth={1}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
}
