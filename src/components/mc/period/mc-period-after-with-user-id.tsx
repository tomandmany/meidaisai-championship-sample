// app/components/mc/period/mc-period-after-with-user-id.tsx

'use client';

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Crown, History as HistoryIcon } from "lucide-react";
import MCToggleHistoryButton from "@/components/mc/history/mc-history-toggle-button";
import MCHistory from "@/components/mc/history/mc-history";

interface MCAuthAfterVotingPeriodWithUserIDProps {
  user_id: string;
  days: string[];
  departments: string[];
  programs: Program[];
  votesHistory: Vote[];
  testDate?: Date;
}

export default function MCAuthAfterVotingPeriodWithUserID({
  user_id,
  days,
  departments,
  programs,
  votesHistory,
  testDate,
}: MCAuthAfterVotingPeriodWithUserIDProps) {
  const [showHistory, setShowHistory] = useState<boolean>(false);

  return (
    <>
      {showHistory && (
        <MCHistory
          days={days}
          user_id={user_id}
          departments={departments}
          programs={programs}
          votesHistory={votesHistory}
          testDate={testDate}
        />
      )}

      {!showHistory && (
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
              <div className="space-y-2">
                <h6 className="font-bold">投票日時</h6>
                <span>11月2日(土)11：00～11月4日(月・祝)17：00</span>
              </div>
              {/* <div className="mx-auto w-fit space-y-2 text-primary/80">
                <ViewOption Icon={HistoryIcon} label="投票履歴を見ることができます。" />
                <ViewOption Icon={Crown} label="投票結果を見ることができます。" />
              </div> */}
            </CardContent>
          </Card>
        </div>
      )}
      {/* <MCToggleHistoryButton
        showHistory={showHistory}
        setShowHistory={setShowHistory}
      /> */}
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
