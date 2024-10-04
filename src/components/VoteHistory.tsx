import React from 'react';

type VoteHistoryProps = {
  votesHistory: Vote[];
  testDate?: {
    testStartDate: string;
    testEndDate: string;
    testNowDate?: Date;
  };
};

export default function VoteHistory({ votesHistory, testDate }: VoteHistoryProps) {
  // testDateが指定されていない場合、デフォルト値を設定
  const startDate = testDate ? new Date(`2024-${testDate.testStartDate}`) : new Date('2024-11-02');
  const endDate = testDate ? new Date(`2024-${testDate.testEndDate}`) : new Date('2024-11-04');

  // 時間を0にして日付だけ比較する
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">投票履歴</h2>
      {votesHistory.length === 0 ? (
        <p>投票履歴がありません。</p>
      ) : (
        <ul className="space-y-4">
          {votesHistory.map((vote) => {
            const voteDate = new Date(vote.created_at);
            voteDate.setHours(0, 0, 0, 0); // 時刻部分をリセットして日付のみ比較

            let dayLabel;

            // 日付に応じた表示を switch 文で行う
            switch (true) {
              case voteDate.getTime() === startDate.getTime():
                dayLabel = '1日目';
                break;
              case voteDate.getTime() === startDate.getTime() + 24 * 60 * 60 * 1000:
                dayLabel = '2日目';
                break;
              case voteDate.getTime() === startDate.getTime() + 2 * 24 * 60 * 60 * 1000:
                dayLabel = '3日目';
                break;
              default:
            }

            if (!dayLabel) {
              return <p>期間内に投票がありません。</p>;
            }

            return (
              <li key={vote.id} className="p-4 bg-white rounded-lg shadow-sm">
                <h2 className='text-2xl mb-2 font-bold'>{dayLabel}</h2>
                <p>模擬店: {vote.booth}</p>
                <p>屋外ステージ: {vote.outstage}</p>
                <p>教室: {vote.room}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
