// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner";
import { jaJP } from "@/localization/ja-JP";
import "./globals.css";
import Image from "next/image";
import CatchPhrase from "@/components/CatchPhrase";
import SignOutButton from "@/components/Multiple/SignOutButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meidaisai Championship",
  description: "Meidaisai Championshipのアプリです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={jaJP}>
      <html lang="ja">
        <body className={`bg-votes-champ relative ${inter.className}`}>
          <header className="h-[50px] bg-[#e07594]" />
          <Toaster position="top-center" className="z-mc-toast" />
          <CatchPhrase />
          <Image
            src={'/votes/top.svg'}
            alt="上の飾り"
            width={1920}
            height={1080}
            className="absolute top-0 z-mc-bg"
          />
          {children}
          <Image
            src={'/votes/bottom.svg'}
            alt="下の飾り"
            width={1920}
            height={1080}
            className="absolute bottom-0 z-mc-bg"
          />
          {/* <footer className="h-[987px] bg-[#e07594] mt-24" /> */}
          <SignOutButton />
        </body>
      </html>
    </ClerkProvider>
  );
}