import { useState, useEffect, useRef } from "react";

interface SliderProps {
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  charracterSufix?: string;
}

export default function SimpleSlider({
  initialValue = 0,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  charracterSufix = "%",
}: SliderProps) {
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  const [value, setValue] = useState(initialValue);
  const [isDragging, setIsDragging] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const updateValue = (newValue: number) => {
    const steppedValue = Math.round(newValue / step) * step;
    const clampedValue = Math.min(max, Math.max(min, steppedValue));
    setValue(clampedValue);
    if (onChange) onChange(clampedValue);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const slider = sliderRef.current;
      console.log("slider: ", slider);
      if (slider) {
        const rect = slider.getBoundingClientRect();
        const newValue =
          ((e.clientX - rect.left) / rect.width) * (max - min) + min;
        updateValue(newValue);
      }
      !showTooltip && setShowTooltip(true);
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
    }
    setShowTooltip(false);
  };

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
    const slider = sliderRef.current;
    if (slider) {
      const rect = slider.getBoundingClientRect();
      const newValue = ((clientX - rect.left) / rect.width) * (max - min) + min;
      updateValue(newValue);
    }
  };

  return (
    <div ref={sliderRef} className="h-1.5 w-full flex items-center gap-2">
      <div
        className="group w-full bg-[#595460] rounded h-1 hover:h-1.5 cursor-pointer relative"
        onMouseDown={handleTrackClick}
      >
        <div
          className="top-0 left-0 h-full bg-[#FFFFFF] absolute rounded"
          style={{ width: `${((value - min) / (max - min)) * 100}%` }}
        >
          <div className="w-full h-full relative">
            <div
              className="h-3 w-3 rounded-full bg-[#FFFFFF] right-0 translate-x-1/2 -translate-y-1/2 top-1/2 absolute group-hover:!block hidden"
              onMouseDown={handleMouseDown}
            />
            <div
              className={`${
                showTooltip ? "block" : "hidden"
              } absolute bg-secondary-text text-white text-xs py-1 px-2 rounded translate-x-1/2 -translate-y-[120%] -top-[100%] right-0`}
            >
              {value}
              {charracterSufix}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
