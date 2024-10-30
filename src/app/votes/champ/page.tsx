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
import { programData } from "@/data/legacy-programData";
import { getAllVotes } from "@/data/getAllVotes";

const departments = ['模擬店部門', '屋外ステージ部門', '教室部門'];
const days = ['2024-11-02', '2024-11-03', '2024-11-04'];

// 日付形式のマッピング関数
const mapDateToDay = (dateStr: string): string => {
  const dateMap: { [key: string]: string } = {
    '2024-11-02': '2日',
    '2024-11-03': '3日',
    '2024-11-04': '4日',
  };
  return dateMap[dateStr] || '全日';
};

// 日付文字列から「n日」の部分を抽出する関数
const extractDayFromDate = (dateStr: string): string => {
  const match = dateStr.match(/^(\d+)日/);
  return match ? `${match[1]}日` : '全日';
};

interface PageProps {
  searchParams: { testDate?: string };
}

export default async function Page({ searchParams }: PageProps) {
  const { userId } = auth();

  const testDate = searchParams.testDate ? new Date(`2024-${searchParams.testDate}`) : undefined;
  const today = testDate || new Date();
  const todayStr = today.toISOString().split('T')[0];

  const votingStatus = getVotingStatus(today);

  if (!userId) {
    if (votingStatus.isDuring) {
      return <MCSignInGuidance />;
    } else if (votingStatus.isBefore) {
      return <MCBeforeVotingPeriod />;
    } else if (votingStatus.isAfter) {
      return <MCAfterVotingPeriodWithOutUserID />;
    } else {
      return <div>投票期間を判定できないエラーが発生しました。</div>;
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
  const allVotes = await getAllVotes();

  if (votingStatus.isBefore) {
    return <MCBeforeVotingPeriod />;
  }

  if (votingStatus.isAfter) {
    return (
      <MCAfterVotingPeriodWithUserID
        days={days}
        departments={departments}
        programs={programData}
        user_id={userId}
        votesHistory={votesHistory}
        allVotes={allVotes}
        testDate={testDate}
      />
    );
  }

  const votedProgramIds = new Set(votesHistory.map(vote => vote.program_id));

  const todayMappedDay = mapDateToDay(todayStr);

  const filteredPrograms = programData.filter(program => {
    const programDay = extractDayFromDate(program.date);
    return (programDay === todayMappedDay || programDay === '全日') &&
           !votedProgramIds.has(program.id);
  });

  // 3日間全体の投票履歴を確認する
  const isExistingVoteInThreeDays = votesHistory.length > 0;

  return (
    <>
      <MCForm
        user_id={userId}
        votesHistory={votesHistory}
        testDate={testDate}
        departments={departments}
        days={days}
        allPrograms={programData}
        filteredPrograms={filteredPrograms}
      />
      {isExistingVoteInThreeDays && <TicketContext userId={userId!} ticketUsed={ticketUsed} />}
    </>
  );
}
