export type VotingPeriodStatus = {
  isBefore: boolean;
  isAfter: boolean;
  isDuring: boolean;
};

// 開始日と終了日を一度だけパースする（キャッシュ）
const votingStart = new Date(process.env.NEXT_PUBLIC_VOTING_PERIOD_START!);
const votingEnd = new Date(process.env.NEXT_PUBLIC_VOTING_PERIOD_END!);

// 関数の引数に testDate の上書き用オプションを追加
export const isVotingPeriod = (testDate?: Date): VotingPeriodStatus => {
  const now = testDate || new Date(); // 現在時刻を取得、UIで選択された日付があればその値を使用

  return {
    isBefore: now < votingStart,
    isAfter: now > votingEnd,
    isDuring: now >= votingStart && now <= votingEnd,
  };
};
