// ファイルパス: types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      user_id: string; // ユーザーIDを追加
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
