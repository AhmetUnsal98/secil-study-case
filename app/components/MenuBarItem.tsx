import React from "react";
import { MenuBarItemProps } from "../types/menu-bar-item";

export const MenuBarItem: React.FC<MenuBarItemProps> = React.memo(
  ({ icon, text, isOpen, active = false }) => {
    return (
      <div
        className={`flex items-center px-4 py-2 m-2 transition-colors w-full cursor-pointer ${
          active ? "bg-gray-300" : "hover:bg-gray-300"
        }`}
      >
        {icon}
        <span
          className={`overflow-hidden transition-[max-width] duration-300 ${
            isOpen ? "max-w-full ml-4" : "max-w-0 ml-0"
          } ${active ? "font-semibold text-[#1c1c1c]" : "text-gray-700"}`}
        >
          {text}
        </span>
      </div>
    );
  }
);
