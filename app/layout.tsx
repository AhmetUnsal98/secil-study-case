"use client";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          {" "}
          <SessionProvider>{children}</SessionProvider>
        </Provider>
      </body>
    </html>
  );
}
