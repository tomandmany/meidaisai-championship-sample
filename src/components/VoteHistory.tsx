'use client'

import { useState, useEffect } from "react";
import VoteHistoryButton from "./VoteHistoryButton";

interface VoteHistoryProps {
  votesHistory: Vote[];
  testDate?: Date;
};

export default function VoteHistory({ votesHistory, testDate }: VoteHistoryProps) {
  const [isOpen, setIsOpen] = useState(false);

  const votingStart = new Date(process.env.NEXT_PUBLIC_VOTING_PERIOD_START!);
  const votingEnd = new Date(process.env.NEXT_PUBLIC_VOTING_PERIOD_END!);

  // testDateが指定されていなければ今日の日付を使う
  const currentDate = testDate ? new Date(testDate) : new Date();
  currentDate.setHours(0, 0, 0, 0); // 時刻部分をリセットして日付のみ比較

  // 投票履歴が開かれたらスクロール禁止、閉じたらスクロールを再許可
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // クリーンアップ関数
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed left-0 top-0 w-screen h-screen p-20 bg-gray-100 overflow-auto">
          <h2 className="font-bold mb-4 flex flex-col items-end mx-auto w-fit">
            <span className="text-[#E07494] text-5xl">VotingRecord</span>
            <span className="text-[#64BDEB] text-2xl">投票履歴</span>
          </h2>
          {votesHistory.length === 0 ? (
            <p>投票履歴がありません。</p>
          ) : (
            <ul className="space-y-4">
              {votesHistory.map((vote) => {
                const voteDate = new Date(vote.created_at);
                voteDate.setHours(0, 0, 0, 0); // 日付だけを比較するためにリセット
                let dayLabel;
                let isToday = voteDate.getTime() === currentDate.getTime(); // 今日の投票かどうか判定
                if (isToday) {
                  dayLabel = '今日の投票'; // 今日の日付と一致する場合
                } else if (voteDate >= votingStart && voteDate <= votingEnd) {
                  // 投票期間内の日付に応じた表示
                  switch (voteDate.getDate()) {
                    case 2:
                      dayLabel = '1日目';
                      break;
                    case 3:
                      dayLabel = '2日目';
                      break;
                    case 4:
                      dayLabel = '3日目';
                      break;
                    default:
                      dayLabel = undefined;
                  }
                }
                if (!dayLabel) {
                  return <p key={vote.id}>期間内に投票がありません。</p>;
                }
                return (
                  <li key={vote.id} className={`p-4 rounded-lg shadow-sm ${isToday ? 'bg-yellow-100 border-2 border-yellow-500' : 'bg-white'}`}>
                    <h2 className={`text-2xl mb-2 font-bold ${isToday ? 'text-yellow-600' : ''}`}>{dayLabel}</h2>
                    <p>模擬店: {vote.booth}</p>
                    <p>屋外ステージ: {vote.outstage}</p>
                    <p>教室: {vote.room}</p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
      <VoteHistoryButton isOpen={isOpen} handleOpen={() => setIsOpen(!isOpen)} />
    </>
  );
}
