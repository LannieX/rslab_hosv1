"use client";
import { Geist, Geist_Mono, Kanit } from "next/font/google";
import "./globals.css";
import Sidebar from "./componants/sidebar";
import { useEffect, useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import { MobileSizeProvider } from "./contexts/MobileSizeContext";
import { usePathname } from "next/navigation";
import { IconButton } from "@mui/material";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const kanit = Kanit({
  subsets: ["thai"],
  variable: "--font-kanit",
  weight: ["400", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/loginPage";
  const [mobileSize, setMobileSize] = useState<boolean>(false);
  const [showSideBar, setShowSideBar] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 999) {
        setMobileSize(true);
        setShowSideBar(false);
      } else {
        setMobileSize(false);
        setShowSideBar(true);
      }
    };

    if (typeof window !== "undefined") {
      handleResize(); // initial check
      window.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (mobileSize) {
      setShowSideBar(false);
    }
  }, [pathname, mobileSize]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${kanit.variable} font-kanit antialiased`}
      >
        <MobileSizeProvider mobileSize={mobileSize}>
          {mobileSize && !showSideBar && !isLoginPage && (
            <div className="absolute top-7.5 left-4 z-50">
              <IconButton onClick={() => setShowSideBar(true)}>
                <MenuIcon
                  color="#C3C3C3"
                  className="w-8 h-8 cursor-pointer"
                />
              </IconButton>
            </div>
          )}
          <div
            className={`flex h-screen overflow-hidden ${
              mobileSize ? "relative" : ""
            }`}
          >
            {!isLoginPage && (
              <div
                className={`fixed top-0 left-0 z-40 h-full w-64 bg-white border-r shadow-md transition-transform duration-300 ease-in-out
  ${mobileSize && !showSideBar ? "-translate-x-full" : "translate-x-0"}`}
              >
                {mobileSize && showSideBar && (
                  <div className="absolute top-4 right-4 z-0">
                    <IconButton onClick={() => setShowSideBar(false)}>
                      <XIcon
                        color="#d75e6d"
                        className="w-6 h-6 cursor-pointer"
                      />
                    </IconButton>
                  </div>
                )}
                <Sidebar />
              </div>
            )}
            <main
              className={`transition-all duration-300 ease-in-out ${
                isLoginPage
                  ? "w-full p-0"
                  : mobileSize
                  ? "w-full p-6"
                  : "ml-64 w-full p-6"
              } overflow-auto bg-gray-100`}
            >
              {children}
            </main>
          </div>
        </MobileSizeProvider>
      </body>
    </html>
  );
}
