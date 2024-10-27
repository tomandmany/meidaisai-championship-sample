import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import MCLabel from "./mc-label";
import MCSignInButton from "./mc-sign-in-button";

export default function MCSignInGuidance() {
    return (
        <Card className="flex justify-center items-center w-full h-full sm:max-w-xl sm:h-fit sm:py-16 rounded-none sm:rounded-xl border-none sm:border">
            <CardContent className="space-y-4 p-4">
                <div className="space-y-2">
                    <MCLabel>投票日時</MCLabel>
                    <p>11月2日(土)11：00～11月4日(月・祝)17：00</p>
                </div>
                <div className="space-y-2">
                    <MCLabel>注意点</MCLabel>
                    <ul className="flex flex-col items-start pl-4 -indent-4 space-y-1">
                        <li>・LINEアカウントでのログインが必須です。</li>
                        <li>・実施されていない団体への投票はできません。</li>
                        <li>・LINEアカウントがない方は総合インフォメーションまで。</li>
                    </ul>
                </div>
                <Image
                    src={'/votes/information.svg'}
                    alt="キャンパスマップ"
                    width={200}
                    height={200}
                    className="mx-auto"
                />
                <MCSignInButton />
            </CardContent>
        </Card>
    )
}