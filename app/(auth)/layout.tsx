import { ReactNode } from "react";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Secil Login",
};
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {children}
    </div>
  );
}
