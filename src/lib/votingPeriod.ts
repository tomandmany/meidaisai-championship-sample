type VotingPeriodStatus = {
  isBefore: boolean;
  isAfter: boolean;
  isDuring: boolean;
};

// 関数の引数に startDate, endDate の上書き用オプションを追加
export const isVotingPeriod = (
  startDate: string = '11-02', // デフォルトの開始日
  endDate: string = '11-04', // デフォルトの終了日
  testDate?: Date // UIで日付を変更できるように
): VotingPeriodStatus => {
  const now = testDate || new Date(); // 現在時刻を取得、UIで選択された日付があればその値を使用
  const year: number = new Date().getFullYear() // デフォルトは今年

  const votingStart = new Date(`${year}-${startDate}T00:00:00+09:00`);
  const votingEnd = new Date(`${year}-${endDate}T23:59:59+09:00`);

  return {
    isBefore: now < votingStart,
    isAfter: now > votingEnd,
    isDuring: now >= votingStart && now <= votingEnd,
  };
};
