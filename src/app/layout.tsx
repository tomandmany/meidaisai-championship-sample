// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner";
import { jaJP } from "@/localization/ja-JP";
import "./globals.css";
import Image from "next/image";
import CatchPhrase from "@/components/CatchPhrase";

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
          <Toaster position="top-center" />
          <CatchPhrase />
          <Image
            src={'/votes/top.svg'}
            alt="上の飾り"
            width={1920}
            height={1080}
            className="absolute top-0 -z-10"
          />
          {children}
          <Image
            src={'/votes/bottom.svg'}
            alt="下の飾り"
            width={1920}
            height={1080}
            className="absolute bottom-0 -z-10"
          />
        </body>
      </html>
    </ClerkProvider>
  );
}