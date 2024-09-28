// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";
import { jaJP } from "../localization/ja-JP";
import Header from "../components/Header";
import { Toaster } from "@/components/ui/sonner";

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
        <body className={inter.className}>
          <Toaster position="top-center" />
          {/* <Header /> */}
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
