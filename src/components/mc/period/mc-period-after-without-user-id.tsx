// app/components/mc/period/mc-period-after-without-user-id.tsx

import Image from "next/image";
import MCSignInButton from "@/components/mc/auth/mc-auth-sign-in-button";
import { Card, CardContent } from "@/components/ui/card";

export default function MCAfterVotingPeriodWithOutUserID() {
    return (
        <div className="flex flex-col items-center w-full gap-10">
            <Image
                src={'/votes/logo.svg'}
                alt="ロゴ"
                width={200}
                height={200}
                className="object-contain lg:hidden"
            />
            <Card className="flex justify-center items-center px-6 h-full sm:max-w-md sm:h-fit py-10 sm:p-10 rounded-2xl border-none sm:border">
                {/* <Card className="flex justify-center items-center w-full h-full sm:max-w-md sm:h-fit py-10 sm:p-10 rounded-none sm:rounded-xl border-none sm:border"> */}
                <CardContent className="p-0">
                    <h2 className="font-bold text-2xl leading-10 text-center mb-2">
                        投票期間は終了しました。
                    </h2>
                    <p className="mb-8 text-sm">ログインすると投票履歴を見ることができます。</p>
                    <MCSignInButton />
                </CardContent>
            </Card>
        </div>
    );
}