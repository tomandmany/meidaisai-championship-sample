'use client';

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Crown, History as HistoryIcon } from "lucide-react";
import MCToggleHistoryAndResultButton from "@/components/mc/mc-toggle-history-and-result-button";
import MCHistory from "@/components/mc/mc-history";
import McResult from "@/components/mc/mc-result";
import MCLabel from "@/components/mc/mc-label";

interface MCAfterVotingPeriodWithUserIDProps {
  user_id: string;
  days: string[];
  departments: string[];
  programs: Program[];
  votesHistory: Vote[];
  allVotes: Vote[];
  testDate?: Date;
}

export default function MCAfterVotingPeriodWithUserID({
  user_id,
  days,
  departments,
  programs,
  votesHistory,
  allVotes,
  testDate,
}: MCAfterVotingPeriodWithUserIDProps) {
  const [showView, setShowView] = useState<'history' | 'result' | null>(null);

  const toggleView = (view: 'history' | 'result') =>
    setShowView((prev) => (prev === view ? null : view));

  return (
    <>
      {showView === 'history' && (
        <MCHistory
          days={days}
          user_id={user_id}
          departments={departments}
          programs={programs}
          votesHistory={votesHistory}
          testDate={testDate}
        />
      )}

      {showView === 'result' && (
        <McResult departments={departments} allVotes={allVotes} />
      )}

      {!showView && (
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
              <h2 className="font-bold text-2xl leading-10 text-center mb-4">
                投票期間は終了しました。
              </h2>
              <div className="space-y-2 mb-8">
                {/* <MCLabel>投票日時</MCLabel> */}
                <h6 className="font-bold">投票日時</h6>
                <span>11月2日(土)11：00～11月4日(月・祝)17：00</span>
              </div>
              <div className="mx-auto w-fit space-y-2 text-primary/80">
                <ViewOption Icon={HistoryIcon} label="投票履歴を見ることができます。" />
                <ViewOption Icon={Crown} label="投票結果を見ることができます。" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      <MCToggleHistoryAndResultButton
        showView={showView}
        toggleView={toggleView}
        showHistory={true}
        showResult={true}
      />
    </>
  );
}

function ViewOption({ Icon, label }: { Icon: React.FC; label: string }) {
  return (
    <div className="flex items-center">
      <div className="p-2 pr-1">
        <Icon />
      </div>
      <span className="text-sm flex items-center gap-1">
        <ArrowRight className="text-primary/60 w-5" />
        {label}
      </span>
    </div>
  );
}
