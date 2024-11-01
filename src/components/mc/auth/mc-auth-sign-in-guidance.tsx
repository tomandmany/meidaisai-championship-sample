// app/components/mc/form/mc-auth-sign-in-guidance.tsx

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import MCLabel from "@/components/mc/other/mc-label";
import MCAuthSignInGuidance from "@/components/mc/auth/mc-auth-sign-in-guidance";

export default function MCSignInGuidance() {
    return (
        <Card className="flex justify-center items-center w-full h-full sm:max-w-xl sm:h-fit sm:p-10 rounded-none sm:rounded-xl border-none sm:border bg-[#fff2f1]">
            {/* <Card className="flex justify-center items-center w-full h-full sm:max-w-xl sm:h-fit sm:p-10 rounded-none sm:rounded-xl border-none sm:border bg-mc-background"> */}
            <CardContent className="text-sm sm:text-base px-6 sm:px-0 py-0 space-y-6">
                <div className="space-y-2">
                    <MCLabel>投票日時</MCLabel>
                    <p>11月2日(土)11：00～11月4日(月・祝)17：00</p>
                </div>
                <div className="space-y-2">
                    <MCLabel>注意点</MCLabel>
                    <ul className="flex flex-col items-start pl-4 -indent-4 space-y-1">
                        <li>・LINEアカウントのログインが必須となっております。</li>
                        {/* <li className="ml-4 text-muted-foreground">※アカウント情報は期間終了後削除いたします。</li> */}
                        <li>・当日に企画が実施されていない参加団体への投票はできません。</li>
                        <li>・LINEアカウントをお持ちでない場合や、企画へのお問い合わせは総合インフォメーションまでお越しください。</li>
                    </ul>
                </div>
                <Image
                    src={'/votes/information.svg'}
                    alt="キャンパスマップ"
                    width={150}
                    height={150}
                    className="mx-auto"
                />
                <MCAuthSignInGuidance />
            </CardContent>
        </Card>
    )
}