"use client";
import useThrottle from "@/src/lib/hooks/useThrottle.hook";
import { useEffect, useRef, useState } from "react";
import {
  Stage,
  Layer,
  Line,
  Text,
  Circle,
  Rect,
  Image as KonvaImage,
} from "react-konva";
import _playIcon from "@/public/icons/play.png";
import { FaPlayCircle } from "react-icons/fa";
// Define allowed color keys as a union type
type CircleColor = "#E35050" | "#27BD9C" | "#4A90E2";
export default function ChartMusic() {
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const chartRef = useRef<HTMLDivElement>(null);
  const updateCanvasSize = () => {
    if (chartRef.current) {
      console.log("chartRef.current: ", chartRef.current.offsetWidth);
      const width = chartRef.current.offsetWidth;
      const height = width / 3.96;

      setCanvasSize({ width, height });
    }
  };
  const [showCircles, setShowCircles] = useState<Record<CircleColor, boolean>>({
    "#E35050": false,
    "#27BD9C": false,
    "#4A90E2": false,
  });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false); // Trạng thái kiểm tra có hover hay không
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

  const hourPerPoint = 103;
  let currentTime = (Math.floor(new Date().getHours()) - 22 + 24) % 24; // Bắt đầu từ giờ sớm nhất trong chuỗi
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
    currentTime = (currentTime + 2) % 24; // Tăng 2 giờ và quay về 0 nếu quá 23
  }
  const xPerPoint = hourPerPoint / 2;

  function generateByXPoint(arrX: number[]) {
    const arrPoint: number[] = [];
    for (let index = 0; index < arrX.length; index++) {
      let XPoint: number = xPerPoint * index;
      XPoint += 22;

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
        color: "#E35050",
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
        color: "#27BD9C",
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
        color: "#4A90E2",
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
      "#E35050": false,
      "#27BD9C": false,
      "#4A90E2": false,
      [closestLine.color as CircleColor]: true,
    });
  };

  useEffect(() => {
    determineClosestLine();
  }, [mousePos]);

  const [circleRadii, setCircleRadii] = useState<Record<CircleColor, number>>({
    "#E35050": 0,
    "#27BD9C": 0,
    "#4A90E2": 0,
  });
  const maxRadius = 5; // Bán kính tối đa của hình tròn
  const [previousColor, setPreviousColor] = useState<CircleColor | null>(null);
  // Reset circle radii when `showCircles` changes
  useEffect(() => {
    const currentColor = (Object.keys(showCircles) as CircleColor[]).find(
      (color) => showCircles[color]
    );

    // Reset radius only if the color has changed
    if (currentColor && currentColor !== previousColor) {
      setCircleRadii((prevRadii) => ({
        ...prevRadii,
        [currentColor]: 0, // Reset bán kính về 0 khi chuyển màu mới
      }));
      setPreviousColor(currentColor);
    }
  }, [showCircles, previousColor]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCircleRadii((prevRadii) => {
        const newRadii = { ...prevRadii };

        (Object.entries(newRadii) as [CircleColor, number][]).forEach(
          ([color, radius]) => {
            if (showCircles[color] && radius < maxRadius) {
              newRadii[color] = radius + 0.5;
            }
          }
        );

        return newRadii;
      });
    }, 10);

    return () => clearInterval(interval);
  }, [showCircles]);
  const handleMouseMove = (e: any) => {
    const stage = e.target.getStage();
    const mousePos = stage.getPointerPosition();
    setMousePos(mousePos);
    setIsHovered(true);
    determineClosestLine();
  };
  const allDataPoints = [dataPoints1, dataPoints2, dataPoints3];
  // Cập nhật ngẫu nhiên `closestCirclePos` mỗi 3 giây khi không có hover
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      const randomLineIndex = Math.floor(Math.random() * allDataPoints.length);
      const randomDataPoints = allDataPoints[randomLineIndex];
      const randomPointIndex =
        Math.floor(Math.random() * (randomDataPoints.length / 2)) * 2;
      const x = randomDataPoints[randomPointIndex];
      const y = randomDataPoints[randomPointIndex + 1];

      setClosestCirclePos({ x, y });
      setClosestLineColor(
        randomLineIndex === 0
          ? "#E35050"
          : randomLineIndex === 1
          ? "#27BD9C"
          : "#4A90E2"
      );
      setShowCircles({
        "#E35050": randomLineIndex === 0,
        "#27BD9C": randomLineIndex === 1,
        "#4A90E2": randomLineIndex === 2,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const circles = (dataPoints: number[], colorKey: CircleColor) =>
    dataPoints.reduce((acc: JSX.Element[], point, i) => {
      if (i % 2 === 0) {
        const x = dataPoints[i];
        const y = dataPoints[i + 1];
        const isHoveredCircle =
          closestCirclePos?.x === x && closestCirclePos?.y === y;

        acc.push(
          <Circle
            key={`circle-${colorKey}-${i / 2}`}
            x={x + 1}
            y={y}
            radius={
              isHoveredCircle
                ? circleRadii[colorKey] + 2
                : circleRadii[colorKey]
            }
            fill="white"
            stroke={colorKey}
            strokeWidth={3}
            visible={showCircles[colorKey]}
          />
        );
      }
      return acc;
    }, []);

  const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const img = new window.Image();
      img.src =
        "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/banner/b/c/2/d/bc2da7af00b2f1c9029aedcac0b5002f.jpg";
      setImageObj(img);
    }
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);
  const throttledMouseMove = useThrottle(handleMouseMove, 50);
  return (
    <div
      ref={chartRef}
      id="chart-music"
      className=" flex flex-col gap-3 w-full"
    >
      <div className="w-full flex justify-start items-center ">
        <h3 className="text-[40px] leading-[48px] font-bold text-transparent bg-clip-text bg-[radial-gradient(50%_124.93%_at_95.86%_-10%,_#3efad9_0%,_rgba(255,255,255,0)_100%),_linear-gradient(91.56deg,_#ff9357_1.54%,_#9100ff_98.71%)]">
          #zingchart
        </h3>
        <span className="p-2 hover:bg-[#ffffff1a]  rounded-full cursor-pointer text-white hover:text-secondary-text text-4xl">
          <FaPlayCircle />
        </span>
      </div>
      <Stage
        width={canvasSize.width}
        height={canvasSize.height}
        onMouseMove={throttledMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
      >
        <Layer>
          {lines}

          {/* #E35050 Line */}
          <Line
            points={dataPoints1}
            stroke="#ff4444"
            strokeWidth={1.5}
            lineCap="round"
            lineJoin="round"
            tension={0.4}
          />

          {/* #27BD9C Line */}
          <Line
            points={dataPoints2}
            stroke="#27BD9C"
            strokeWidth={1.5}
            lineCap="round"
            lineJoin="round"
            tension={0.4}
          />

          {/* #4A90E2 Line */}
          <Line
            points={dataPoints3}
            stroke="#4A90E2"
            strokeWidth={1.5}
            lineCap="round"
            lineJoin="round"
            tension={0.4}
          />

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
          {circles(dataPoints1, "#E35050")}
          {circles(dataPoints2, "#27BD9C")}
          {circles(dataPoints3, "#4A90E2")}
          {closestCirclePos && (
            <>
              <Rect
                x={Math.max(
                  10,
                  Math.min(closestCirclePos.x - 100, canvasSize.width - 210) // ở đây lấy số nhỏ nhất của điểm hiện tại hình tròn trừ 100 tức 1 nữa của hình vuông để nó ở giữa mình vuông
                  // còn cái còn lại là lấy chiều rộng của khung canvas sau đó trừ 200 tức chiều rộng của hình vuông
                  // sau đó lấy giá trị nhỏ hơn vì nếu x và hình vuông không quá khung canvas thì sẽ nhỏ hơn giá trị của khung canvas trừ 200
                )} // max ở đây để phòng trường hợp khi x nhỏ hơn không thì lấy nó là x
                y={
                  closestCirclePos.y - 60 < 0
                    ? closestCirclePos.y + 15
                    : closestCirclePos.y - 60
                } // nếu như khung vuông lớn hơn trừ đi 65 (50 là chiều cao của khung vuông còn 15 là khoảng trổng làm mũi tên) nhỏ hơn 0
                //tức nó không đủ chiều cao để hiển thị ở trên thì để khung vuông hiển thị ở dưới điểm tròn còn ngược lại thì hiển thị ở trên điểm tròn
                width={200} // Chiều rộng của hình vuông
                height={45} // Chiều cao của hình vuông
                fill={closestLineColor || "transparent"}
                stroke={closestLineColor || "transparent"}
                strokeWidth={1}
                cornerRadius={5}
              />
              {/* Hình ảnh đại diện */}
              {imageObj && (
                <KonvaImage
                  image={imageObj}
                  x={
                    Math.max(
                      10,
                      Math.min(closestCirclePos.x - 100, canvasSize.width - 210)
                    ) + 5
                  }
                  y={
                    closestCirclePos.y - 60 < 0
                      ? closestCirclePos.y + 20
                      : closestCirclePos.y - 55
                  }
                  width={35}
                  height={35}
                  cornerRadius={3}
                  opacity={closestLineColor ? 100 : 0}
                />
              )}
              {/* Tiêu đề */}
              <Text
                text="Anh Đau Từ Lúc Em Đi"
                ellipsis={true}
                wrap={"none"}
                x={
                  Math.max(
                    10,
                    Math.min(closestCirclePos.x - 100, canvasSize.width - 210)
                  ) + 45
                }
                y={
                  closestCirclePos.y - 60 < 0
                    ? closestCirclePos.y + 25
                    : closestCirclePos.y - 53
                }
                fontSize={12}
                fontStyle="bold"
                fill={closestLineColor ? "white" : "transparent"}
                width={120}
              />
              {/* Tên tác giả */}
              <Text
                text="Trần Mạnh Cường"
                ellipsis={true}
                wrap={"none"}
                x={
                  Math.max(
                    10,
                    Math.min(closestCirclePos.x - 100, canvasSize.width - 210)
                  ) + 45
                }
                y={
                  closestCirclePos.y - 60 < 0
                    ? closestCirclePos.y + 37
                    : closestCirclePos.y - 40
                }
                fontSize={10}
                fill={closestLineColor ? "#d0d0d0" : "transparent"}
                width={120}
              />
              {/* Phần trăm */}
              <Text
                text="42%"
                ellipsis={true}
                wrap={"none"}
                x={
                  Math.max(
                    10,
                    Math.min(closestCirclePos.x - 100, canvasSize.width - 210)
                  ) + 170
                }
                y={
                  closestCirclePos.y - 60 < 0
                    ? closestCirclePos.y + 33
                    : closestCirclePos.y - 43
                }
                fontSize={12}
                fill={closestLineColor ? "white" : "transparent"}
                fontStyle="bold"
              />
            </>
          )}
          {closestCirclePos && (
            <Line
              points={
                closestCirclePos.y - 60 < 0
                  ? [
                      closestCirclePos.x + 5,
                      closestCirclePos.y + 15,
                      closestCirclePos.x,
                      closestCirclePos.y + 5,
                      closestCirclePos.x - 5,
                      closestCirclePos.y + 15,
                    ]
                  : [
                      closestCirclePos.x - 5,
                      closestCirclePos.y - 15,
                      closestCirclePos.x,
                      closestCirclePos.y - 5,
                      closestCirclePos.x + 5,
                      closestCirclePos.y - 15,
                    ]
              }
              fill={closestLineColor || "transparent"}
              closed={true}
              stroke={closestLineColor || "transparent"}
              strokeWidth={1}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
}
