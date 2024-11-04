// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import MCCatchPhrase from "@/components/mc/other/mc-catch-phrase";
import Header from "@/components/mc/other/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meidaisai Championship",
  description: "Meidaisai Championshipのアプリです。",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <html lang="ja">
      <body className={`bg-mc-background relative h-[100svh] ${inter.className}`}>
        <Header />
        <Toaster position="top-center" className="z-mc-toast" />
        <MCCatchPhrase />
        <main className="h-[calc(100svh-50px)] flex justify-center items-center">
          {children}
        </main>
      </body>
    </html>
  );
}