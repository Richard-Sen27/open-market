import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import GlobalContext from "./GlobalContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Open Market",
  description: "Sell and Buy ML Models on Web3 with Open Market",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen flex dark")}>
        <GlobalContext>
          <div className="flex flex-1">
            <Navbar />
            <Separator orientation="vertical"/>
            <div className="p-4 w-full h-full">
              {children}
            </div>
          </div>
        </GlobalContext>
      </body>
    </html>
  );
}
