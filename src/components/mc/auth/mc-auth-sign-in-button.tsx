// app/components/mc/form/mc-auth-sign-in-button.tsx
'use client'

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function MCSignInButton() {
    return (
        <Button
            className="block px-4 rounded-md w-fit mx-auto text-white bg-[#E07594] hover:bg-[#c56681]"
            onClick={() => signIn('line', { callbackUrl: '/votes/champ' })}
        >
            ログインする
        </Button>
    )
}