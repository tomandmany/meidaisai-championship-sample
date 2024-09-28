import { SignedIn, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header>
      <SignedIn>
        <UserButton afterSignOutUrl="/sign-in" />
      </SignedIn>
    </header>
  )
}