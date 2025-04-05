import { ReactNode } from "react";
import Menu from "../components/Menu";
import TopBar from "../components/TopBar";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-row w-screen h-auto">
      <Menu />
      <div className="flex flex-col w-full h-auto ">
        <TopBar />
        {children}
      </div>
    </div>
  );
}
