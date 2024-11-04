import { LoginButton } from "@/components/mc/auth/mc-auth-line-button";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <LoginButton />
    </main>
  )
}