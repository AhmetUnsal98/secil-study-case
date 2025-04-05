"use client";
import React from "react";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import TuneIcon from "@mui/icons-material/Tune";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
const TopBar: React.FC = React.memo(() => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };
  return (
    <div className="flex flex-row-reverse w-full h-16 bg-white items-center">
      <PowerSettingsNewIcon
        sx={{ color: "#33333", mr: 2, fontSize: "2rem", cursor: "pointer" }}
        onClick={handleSignOut}
      />

      <TuneIcon
        sx={{ color: "#5c5c5c", mr: 4, fontSize: "1.6rem", cursor: "pointer" }}
      />
      <div className="relative inline-block mr-4">
        <NotificationsNoneIcon
          sx={{ color: "#5c5c5c", fontSize: "1.6rem", cursor: "pointer" }}
        />
        <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
          3
        </span>
      </div>
      <span className="w-[1px] h-1/2 bg-gray-400 mr-4"></span>
    </div>
  );
});

export default TopBar;
