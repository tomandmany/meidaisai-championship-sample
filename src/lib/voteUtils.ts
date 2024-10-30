// @/lib/voteUtils.ts

export function mapDateToDay(dateStr: string): string {
  const dateMap: { [key: string]: string } = {
    '2024-11-02': '2日',
    '2024-11-03': '3日',
    '2024-11-04': '4日',
  };
  return dateMap[dateStr] || '全日';
}

export function extractDayFromDate(dateStr: string): string {
  if (dateStr === '全日') return '全日';
  const match = dateStr.match(/^(\d+)日/);
  return match ? `${match[1]}日` : '全日';
}

export function isAlreadyVoted(
  programId: string,
  day: string,
  votesHistory: { program_id: string; created_at: string }[]
): boolean {
  return votesHistory.some((vote) => {
    const voteDate = new Date(vote.created_at).toISOString().split('T')[0];
    const voteDay = mapDateToDay(voteDate);
    return vote.program_id === programId && voteDay === day;
  });
}
