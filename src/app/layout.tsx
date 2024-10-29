// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner";
import { jaJP } from "@/localization/ja-JP";
import "./globals.css";
import Image from "next/image";
import CatchPhrase from "@/components/mc/mc-catch-phrase";
import SignOutButton from "@/components/mc/mc-sign-out-button";
import { auth } from "@clerk/nextjs/server";

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
  const { userId } = auth();

  return (
    <ClerkProvider localization={jaJP}>
      <html lang="ja">
        <body className={`bg-votes-champ relative h-[100svh] ${inter.className}`}>
          <header className="h-[50px] bg-[#e07594]" />
          <Toaster position="top-center" className="z-mc-toast" />
          <CatchPhrase />
          {/* <Image
            src={'/votes/top.svg'}
            alt="上の飾り"
            width={1920}
            height={1080}
            className="absolute top-0 z-mc-bg"
          /> */}
          <main className="h-[calc(100svh-50px)] flex justify-center items-center">
            {children}
          </main>
          {/* <Image
            src={'/votes/bottom.svg'}
            alt="下の飾り"
            width={1920}
            height={1080}
            className="absolute bottom-0 z-mc-bg"
          /> */}
          {/* <footer className="h-[987px] bg-[#e07594] mt-24" /> */}
          {userId && <SignOutButton />}
        </body>
      </html>
    </ClerkProvider>
  );
}