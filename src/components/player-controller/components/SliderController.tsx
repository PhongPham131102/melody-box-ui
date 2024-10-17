/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useState, useEffect } from "react";
const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
};
export default function Slider({ time }: { time: number }) {
  const [value, setValue] = useState(0);
  const currentTime = Math.round((value / 100) * time);
  const [isDragging, setIsDragging] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  // Hàm khởi tạo thao tác kéo (khi nhấn giữ chuột vào nút)
  const handleMouseDown = () => {
    setIsDragging(true);
  };

  // Hàm xử lý sự kiện kéo chuột
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const slider = document.querySelector(".slider");
      if (slider) {
        const rect = slider.getBoundingClientRect();
        const newValue = Math.min(
          100,
          Math.max(0, ((e.clientX - rect.left) / rect.width) * 100)
        );
        setValue(newValue);
      }
      !showTooltip && setShowTooltip(true);
    }
  };

  // Hàm kết thúc thao tác kéo (khi thả chuột)
  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
    }
    setShowTooltip(false);
  };

  // Lắng nghe sự kiện chuột trên window để hỗ trợ kéo ngoài component
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    updateValueFromPosition(e.clientX);
  };

  const updateValueFromPosition = (clientX: number) => {
    const slider = document.querySelector(".slider");
    if (slider) {
      const rect = slider.getBoundingClientRect();
      const newValue = Math.min(
        100,
        Math.max(0, ((clientX - rect.left) / rect.width) * 100)
      );
      setValue(newValue);
    }
  };

  return (
    <div className=" h-1.5 w-full flex items-center gap-2">
      <div className="text-white text-xs font-medium">
        {formatTime(currentTime)}
      </div>
      <div className="slider h-1.5 w-full flex items-center gap-2">
        <div
          className="group w-full bg-[#595460] rounded h-1 hover:h-1.5 cursor-pointer relative"
          onMouseDown={handleTrackClick}
        >
          <div
            className="top-0 left-0 h-full bg-[#FFFFFF] absolute rounded"
            style={{ width: `${value}%` }}
          >
            <div className="w-full h-full relative">
              <div
                className="h-3 w-3 rounded-full bg-[#FFFFFF] right-0 translate-x-1/2 -translate-y-1/2 top-1/2 absolute group-hover:!block hidden"
                onMouseDown={handleMouseDown}
              />

              <div
                className={`${
                  showTooltip ? "block" : "hidden"
                } absolute bg-secondary-text text-white text-xs py-1 px-2 rounded  translate-x-1/2 -translate-y-[120%] -top-[100%]  right-0`}
              >
                {/* ở đây không phải % mà là thời gian của thanh slider so với tổng thời gian */}
                {formatTime(currentTime)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-white text-xs font-medium">{formatTime(time)}</div>
    </div>
  );
}
