// app/page.tsx
import { auth } from "@clerk/nextjs/server";

import MCPeriodAfterWithOutUserID from "@/components/mc/period/mc-period-after-without-user-id";
import MCPeriodAfterWithUserID from "@/components/mc/period/mc-period-after-with-user-id";
import MCPeriodBefore from "@/components/mc/period/mc-period-before";
import MCSignInGuidance from "@/components/mc/auth/mc-auth-sign-in-guidance";
// import MCTicketTutorial from "@/components/mc/ticket/mc-ticket-tutorial";
import MCTicketContext from "@/components/mc/ticket/mc-ticket-context";
import MCForm from "@/components/mc/form/mc-form";

import getVotesHistory from "@/data/getVotesHistory";
import { getUserData } from "@/data/getUserData";
import { programData } from "@/data/programData";
import getTutorials from "@/data/getTutorials";
import { getVotingStatus } from "@/lib/getVotingStatus";
import { extractDayFromDate, mapDateToDay } from "@/lib/voteUtils";

const departments = ['模擬店部門', '屋外ステージ部門', '教室部門'];
const days = ['2024-11-02', '2024-11-03', '2024-11-04'];

interface PageProps {
  searchParams: { testDate?: string };
}

export default async function Page({ searchParams }: PageProps) {
  // const { userId } = auth();
  // const testDate = searchParams.testDate
  //   ? new Date(`2024-${searchParams.testDate}`)
  //   : undefined;
  
  // const today = testDate || new Date();
  // const todayStr = today.toISOString().split('T')[0];

  // const votingStatus = getVotingStatus(today);

  // if (!userId) return renderUnauthenticatedView(votingStatus);

  // const { ticketUsed } = await fetchUserTicketStatus(userId);
  // const votesHistory = await getVotesHistory(userId);

  // if (votingStatus.isBefore) return <MCPeriodBefore />;
  // if (votingStatus.isAfter)
  //   return renderAfterVotingView({
  //     userId,
  //     votesHistory,
  //     testDate,
  //   });

  // const filteredPrograms = filterPrograms(todayStr, votesHistory);

  // const isFinishedTicketTutorial = await getTutorials(userId, 'ticket');

  return (
    <>
      {/* {votesHistory.length > 0 && !(await getTutorials(userId, 'ticket')) && (
        <MCTicketTutorial user_id={userId} ticketUsed={ticketUsed} />
      )} */}
      <div>aaa</div>
      {/* <MCForm
        user_id={userId}
        votesHistory={votesHistory}
        testDate={testDate}
        departments={departments}
        days={days}
        allPrograms={programData}
        filteredPrograms={filteredPrograms}
      />
      {votesHistory.length > 0 && (
        <MCTicketContext userId={userId} ticketUsed={ticketUsed} isFinishedTicketTutorial={isFinishedTicketTutorial} votesHistory={votesHistory} />
      )} */}
    </>
  );
}

function renderUnauthenticatedView(votingStatus: {
  isBefore: boolean;
  isAfter: boolean;
  isDuring: boolean;
}) {
  if (votingStatus.isDuring) return <MCSignInGuidance />;
  if (votingStatus.isBefore) return <MCPeriodBefore />;
  if (votingStatus.isAfter)
    return (
      <MCPeriodAfterWithOutUserID />
    );
  return <div>投票期間を判定できないエラーが発生しました。</div>;
}

async function fetchUserTicketStatus(userId: string) {
  try {
    const { data } = await getUserData(userId);
    return { ticketUsed: data?.ticket_used ?? false };
  } catch (error) {
    console.error("ユーザーデータの取得に失敗しました:", error);
    return { ticketUsed: false };
  }
}

function renderAfterVotingView({
  userId,
  votesHistory,
  testDate,
}: {
  userId: string;
  votesHistory: any;
  testDate?: Date;
}) {
  return (
    <MCPeriodAfterWithUserID
      days={days}
      departments={departments}
      programs={programData}
      user_id={userId}
      votesHistory={votesHistory}
      testDate={testDate}
    />
  );
}

function filterPrograms(todayStr: string, votesHistory: Vote[]) {
  const todayMappedDay = mapDateToDay(todayStr);

  // 投票履歴からプログラムごとの投票日をマッピング
  const votedProgramMap = new Map<string, Set<string>>(); // { program_id: Set<day> }

  votesHistory.forEach((vote) => {
    const voteDate = new Date(vote.created_at).toISOString().split('T')[0]; // YYYY-MM-DD
    const voteDay = mapDateToDay(voteDate); // 日付を "2日", "3日" の形式に変換

    if (!votedProgramMap.has(vote.program_id)) {
      votedProgramMap.set(vote.program_id, new Set());
    }
    votedProgramMap.get(vote.program_id)!.add(voteDay);
  });

  return programData.filter((program) => {
    const programDays = program.date === '全日'
      ? days.map(mapDateToDay) // 全日なら全ての日程を含む
      : [extractDayFromDate(program.date)];

    // 今日のプログラムが未投票の場合のみ表示
    const isTodayRelevant = programDays.includes(todayMappedDay);
    const hasVotedToday = votedProgramMap.get(program.id)?.has(todayMappedDay) ?? false;

    return isTodayRelevant && !hasVotedToday;
  });
}
