// app/page.tsx

import { auth } from "@clerk/nextjs/server";

import MCAfterVotingPeriodWithOutUserID from "@/components/mc/mc-after-voting-period-without-user-id";
import MCAfterVotingPeriodWithUserID from "@/components/mc/mc-after-voting-period-with-user-id";
import MCBeforeVotingPeriod from "@/components/mc/mc-before-voting-period";
import MCSignInGuidance from "@/components/mc/mc-sign-in-guidance";
import TicketContext from "@/components/mc/mc-ticket-context";
import MCForm from "@/components/mc/mc-form";

import { getVotesHistory } from "@/data/getVotesHistory";
import { getVotingStatus } from "@/lib/getVotingStatus";
import { getUserData } from "@/data/getUserData";
import { programData } from "@/data/programData";

const types = ['模擬店部門', '屋外ステージ部門', '教室部門'];
const days = ['2024-11-02', '2024-11-03', '2024-11-04'];
// const places = ["第一校舎", "メディア棟", "第二学生会館", "和泉ラーニングスクエア", "エントランスエリア", "メインステージ", "パフォーマンスエリア", "その他"];
// const genres = ["食べ物", "飲み物", "雑貨", "ゲーム", "音楽", "パフォーマンス"];

// 日付形式のマッピング関数
const mapDateToDay = (dateStr: string): string => {
  const dateMap: { [key: string]: string } = {
    '2024-11-02': '2日',
    '2024-11-03': '3日',
    '2024-11-04': '4日',
  };
  return dateMap[dateStr] || '全日';
};

export default async function Page({ searchParams }: { searchParams: { testDate?: string } }) {
  const { userId } = auth();

  const testDate = searchParams.testDate ? new Date(`2024-${searchParams.testDate}`) : undefined;
  const today = testDate || new Date();
  const todayStr = today.toISOString().split('T')[0];

  const votingStatus = getVotingStatus(today);

  if (!userId) {
    if (votingStatus.isDuring) {
      return (
        <MCSignInGuidance />
      );
    } else if (votingStatus.isBefore) { // 投票期間前
      return <MCBeforeVotingPeriod />;
    } else if (votingStatus.isAfter) {  // 投票期間後
      return <MCAfterVotingPeriodWithOutUserID />;
    } else {
      return <div>投票期間を判定できないエラーが発生しました。</div>
    }
  }

  let ticketUsed = false;
  try {
    const { data } = await getUserData(userId);
    ticketUsed = data?.ticket_used ?? false;
  } catch (error) {
    console.error("ユーザーデータの取得に失敗しました:", error);
  }

  const votesHistory = await getVotesHistory(userId);

  if (votingStatus.isBefore) {
    return <MCBeforeVotingPeriod />;
  }

  if (votingStatus.isAfter) {
    return <MCAfterVotingPeriodWithUserID days={days} types={types} programs={programData} user_id={userId} votesHistory={votesHistory} />;
  }

  const votedProgramIds = new Set(votesHistory.map(vote => vote.program_id));

  // 今日の日付に対応する「n日」形式を取得
  const todayMappedDay = mapDateToDay(todayStr);

  // プログラムをフィルタリング（投票済みを除外し、当日のものと「全日」のものを取得）
  const filteredPrograms = programData.filter(
    program =>
      (program.date === todayMappedDay || program.date === '全日') &&
      !votedProgramIds.has(program.id)
  );

  const isExistingTodayVote = votesHistory.some(vote => {
    const voteDateStr = new Date(vote.created_at).toISOString().split('T')[0];
    return voteDateStr === todayStr;
  });

  return (
    <>
      <MCForm
        user_id={userId}
        votesHistory={votesHistory}
        testDate={testDate}
        types={types}
        days={days}
        // places={places}
        // genres={genres}
        allPrograms={programData}
        filteredPrograms={filteredPrograms}
      />
      {isExistingTodayVote && <TicketContext userId={userId!} ticketUsed={ticketUsed} />}
    </>
  );
}
