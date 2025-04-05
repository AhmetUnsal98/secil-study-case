"use client";
import React, { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { MenuBarItem } from "./MenuBarItem";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { usePathname } from "next/navigation";

const Menu: React.FC = React.memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isEditPage = /\/edit\/\d+/.test(pathname);

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className={`absolute left-0 top-0 z-50 bg-white transition-[width] duration-300 ${
        isOpen ? "w-56" : "w-16"
      }`}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh", // Ensures the sidebar takes up the full height of the viewport
        position: "fixed", // Keeps the sidebar in place when scrolling
      }}
    >
      <div className="flex flex-col items-center py-4 space-y-4 space-x-4 flex-grow">
        <h1 className="font-extrabold text-5xl self-center text-gray-900">
          {isOpen ? "Logo." : "L."}
        </h1>
        <MenuBarItem
          icon={<DashboardIcon sx={{ color: isOpen ? "#33333" : "gray" }} />}
          text="Anasayfa"
          isOpen={isOpen}
        />
        <MenuBarItem
          icon={<CheckroomIcon sx={{ color: isOpen ? "#33333" : "gray" }} />}
          text="Ürünler"
          isOpen={isOpen}
        />
        <MenuBarItem
          icon={
            <ShoppingCartCheckoutIcon
              sx={{ color: isOpen ? "#33333" : "gray" }}
            />
          }
          text="Koleksiyonlar"
          isOpen={isOpen}
          active={pathname === "/collections" || isEditPage}
        />
      </div>
    </div>
  );
});

export default Menu;
