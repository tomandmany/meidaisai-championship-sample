'use client'

import { useState } from "react";
import Image from "next/image";
import MCToggleHistoryAndResultButton from "@/components/mc/mc-toggle-history-and-result-button";
import MCSignInButton from "@/components/mc/mc-sign-in-button";
import McResult from "@/components/mc/mc-result";
import { Card, CardContent } from "@/components/ui/card";

interface MCAfterVotingPeriodWithOutUserIDProps {
    departments: string[];
    allVotes: Vote[];
}

export default function MCAfterVotingPeriodWithOutUserID({ departments, allVotes }: MCAfterVotingPeriodWithOutUserIDProps) {
    const [showView, setShowView] = useState<'history' | 'result' | null>(null);
    const toggleView = (view: 'history' | 'result') =>
        setShowView((prev) => (prev === view ? null : view));

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
            {showView === 'result' && <McResult departments={departments} allVotes={allVotes} />}
            <MCToggleHistoryAndResultButton
                showView={showView}
                toggleView={toggleView}
                showHistory={false}
                showResult={true}
            />
        </div>
    );
}