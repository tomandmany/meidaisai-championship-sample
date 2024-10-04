'use client';

import { useState, useEffect } from 'react';
import { isVotingPeriod } from '@/lib/votingPeriod';

export default function VotingPeriodControl() {
  const [now, setNow] = useState<Date | null>(new Date()); // 初期値として現在の日時
  const [votingStatus, setVotingStatus] = useState(() => isVotingPeriod(undefined, undefined, undefined, new Date()));

  useEffect(() => {
    // nowの値を動的に変更して投票期間を再判定
    const status = isVotingPeriod(undefined, undefined, undefined, now || new Date());
    setVotingStatus(status);
  }, [now]);

  // 日時フォーマット (datetime-localに適用するため)
  const formatDateTimeLocal = (date: Date) => {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)) // タイムゾーン補正
      .toISOString()
      .slice(0, 16); // 'YYYY-MM-DDTHH:mm' 形式
  };

  return (
    <div className='fixed top-10 right-10 border rounded-lg p-10 shadow-lg'>
      {/* 「今」の日時を変更するUI */}
      <label htmlFor="now" className="block text-lg font-medium text-gray-700">
        「今」の日時を変更:
      </label>
      <input
        type="datetime-local"
        id="now"
        className="mt-2 p-2 border rounded-lg"
        value={now ? formatDateTimeLocal(now) : ''}
        onChange={(e) => setNow(new Date(e.target.value))}
      />

      {/* 投票期間のステータス表示 */}
      <div className="mt-4 text-lg">
        <p>現在の投票ステータス:</p>
        <ul>
          <li>投票期間前: {votingStatus.isBefore ? 'Yes' : 'No'}</li>
          <li>投票期間中: {votingStatus.isDuring ? 'Yes' : 'No'}</li>
          <li>投票期間後: {votingStatus.isAfter ? 'Yes' : 'No'}</li>
        </ul>
      </div>
    </div>
  );
}
