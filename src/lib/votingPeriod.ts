// lib/votingPeriod.ts
export const isVotingPeriod = () => {
    const now = new Date();
    const votingStart = new Date('2024-09-27T00:00:00+09:00'); // 投票開始日
    const votingEnd = new Date('2024-09-27T23:59:59+09:00'); // 投票終了日
  
    return {
      isBefore: now < votingStart,
      isAfter: now > votingEnd,
      isDuring: now >= votingStart && now <= votingEnd,
    };
  };
  