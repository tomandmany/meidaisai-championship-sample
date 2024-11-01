// app/components/mc/period/mc-period-before.tsx

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function MCBeforeVotingPeriod() {
    return (
        <div className="flex flex-col items-center w-full gap-10">
            <Image
                src={'/votes/logo.svg'}
                alt="ロゴ"
                width={200}
                height={200}
                className="object-contain lg:hidden"
            />
            <Card className="flex justify-center items-center px-2 whitespace-nowrap sm:max-w-md sm:h-fit py-10 sm:p-10 rounded-2xl sm:rounded-xl border-none sm:border">
            {/* <Card className="flex justify-center items-center w-full sm:max-w-md sm:h-fit py-10 sm:p-10 rounded-none sm:rounded-xl border-none sm:border"> */}
                <CardContent className="space-y-4 p-4">
                    <h2 className="font-bold text-2xl leading-10 text-center">
                        投票期間前です。
                        <br />
                        しばらくお待ちください。
                    </h2>
                    <div className="space-y-2">
                        {/* <MCLabel>投票日時</MCLabel> */}
                        <h6 className="font-bold">投票日時</h6>
                        <span>11月2日(土)11：00～11月4日(月・祝)17：00</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}