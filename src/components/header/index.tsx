"use client";
import Image from "next/image";
import logoApp from "@/public/logo.png";
import registerIcon from "@/public/icons/register.png";
import SearchBox from "../search-box";
import React, { useEffect, useRef, useState } from "react";

export default function Header() {
  const [overlayStyle, setOverlayStyle] = useState({
    width: 0,
    left: 0,
    bgColor: "bg-main-text",
  });
  const loginRef = useRef<HTMLButtonElement>(null);
  const registerRef = useRef<HTMLButtonElement>(null);

  const handleHover = (button: "login" | "register") => {
    const buttonRef =
      button === "login" ? loginRef.current : registerRef.current;
    if (buttonRef) {
      const { width, left } = buttonRef.getBoundingClientRect();
      const bgColor = button === "login" ? "bg-main-text" : "bg-thirst-text";
      setOverlayStyle({ width, left, bgColor });
    }
  };

  const resetOverlay = () => {
    if (loginRef.current) {
      const { width, left } = loginRef.current.getBoundingClientRect();
      setOverlayStyle({ width, left, bgColor: "bg-main-text" });
    }
  };

  useEffect(() => {
    resetOverlay();
  }, []);
  return (
    <div className="w-full py-2 px-6 bg-header flex justify-between items-center  z-[999] sticky top-0">
      <div className="flex flex-row justify-center items-center gap-2">
        <Image
          src={logoApp}
          alt="Melody Box Logo"
          width={66}
          height={66}
          className="ml-5"
        />
      </div>

      <SearchBox />

      <div
        onMouseLeave={resetOverlay}
        className="relative flex items-center gap-1  rounded-full bg-secondary-1  transition-all duration-700"
      >
        <button
          ref={loginRef}
          onMouseEnter={() => handleHover("login")}
          className=" z-20 cursor-pointer transition-all duration-300 px-8 py-3 rounded-full text-sm text-white font-bold"
        >
          Đăng Nhập
        </button>

        <button
          ref={registerRef}
          onMouseEnter={() => handleHover("register")}
          className=" z-20 group flex items-center gap-1 px-8 py-3 cursor-pointer transition-all duration-500  text-white-1 text-sm font-bold"
        >
          <div className="transition-all duration-500 brightness-0 filter invert group-hover:brightness-100">
            <Image
              src={registerIcon}
              alt="Register Icon"
              width={14}
              height={14}
            />
          </div>
          <p className="transition-all duration-500 group-hover:text-white">
            Đăng Ký
          </p>
        </button>

        <div
          className={`${overlayStyle.bgColor} absolute top-1/2 -translate-y-1/2 rounded-full transition-all duration-300`}
          style={{
            width: overlayStyle.width,
            left:
              overlayStyle.left -
              (loginRef.current?.getBoundingClientRect().left || 0),
            height: "100%",
            transform: "translateY(-50%)",
            transitionTimingFunction: "cubic-bezier( 0.785, 0.135, 0.15, 0.86 )",
          }}
        ></div>
      </div>
    </div>
  );
}
