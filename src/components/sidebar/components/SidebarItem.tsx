import React from "react";

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  isActive = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`group w-full py-3 px-4 flex items-center justify-start gap-3 cursor-pointer 
        ${isActive && " bg-[#3A3344]  border-l-4 border-l-main-text"}
        transition-all duration-300`}
    >
      <span
        className={`  text-base  ${
          isActive ? "text-white" : "group-hover:text-white brightness-90 text-[#dadada]"
        }`}
      >
        {icon}
      </span>
      <p
        className={`  text-sm font-bold ${
          isActive ? "text-white" : "group-hover:text-white brightness-90 text-[#dadada]"
        }`}
      >
        {label}
      </p>
    </div>
  );
};

export default SidebarItem;
