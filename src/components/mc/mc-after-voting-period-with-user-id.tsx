// @/app/components/mc/mc-after-voting-period-with-user-id.tsx
'use client';

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import MCToggleHistoryButton from "@/components/mc/mc-toggle-history-button";
import MCHistory from "@/components/mc/mc-history";
import McResult from "@/components/mc/mc-result";
import MCLabel from "@/components/mc/mc-label";
import { ArrowRight, Crown, History } from "lucide-react";

interface MCAfterVotingPeriodWithUserIDProps {
    user_id: string;
    days: string[];
    departments: string[];
    programs: Program[];
    votesHistory: Vote[];
    allVotes: Vote[];
}

export default function MCAfterVotingPeriodWithUserID({
    votesHistory, programs, user_id, departments, days, allVotes,
}: MCAfterVotingPeriodWithUserIDProps) {
    const [showHistory, setShowHistory] = useState(false);
    const [showResult, setShowResult] = useState(false);

    return (
        <>
            {showHistory && (
                <MCHistory days={days} user_id={user_id} departments={departments} programs={programs} votesHistory={votesHistory} />
            )}
            {showResult && <McResult allVotes={allVotes} />}

            {!showHistory && !showResult && (
                <Card className="flex justify-center items-center w-full h-full sm:max-w-md sm:h-fit sm:p-10 rounded-none sm:rounded-xl border-none sm:border">
                    <CardContent className="p-0">
                        <h2 className="font-bold text-2xl leading-10 text-center mb-4">
                            投票期間は終了しました。
                        </h2>
                        <div className="space-y-2 mb-8">
                            <MCLabel>投票日時</MCLabel>
                            <p>11月2日(土)11：00～11月4日(月・祝)17：00</p>
                        </div>
                        <div className="mx-auto w-fit space-y-2 text-primary/80">
                            <div className="flex items-center">
                                <div className="p-2 pr-1">
                                    <History />
                                </div>
                                <span className="text-sm flex items-center gap-1">
                                    <ArrowRight className="text-primary/60 w-5" />
                                    投票履歴を見ることができます。
                                </span>
                            </div>
                            <div className="flex items-center">
                                <div className="p-2 pr-1">
                                    <Crown />
                                </div>
                                <span className="text-sm flex items-center gap-1">
                                    <ArrowRight className="text-primary/60 w-5" />
                                    投票結果を見ることができます。
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            <MCToggleHistoryButton
                showHistory={showHistory}
                showResult={showResult}
                setShowHistory={setShowHistory}
                setShowResult={setShowResult}
                isAfterVotingPeriod
            />
        </>
    );
}
