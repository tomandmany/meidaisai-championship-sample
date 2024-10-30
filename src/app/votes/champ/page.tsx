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

const dateMap: { [key: string]: string } = {
  '2024-11-02': '2日',
  '2024-11-03': '3日',
  '2024-11-04': '4日',
};

const mapDateToDay = (dateStr: string) => dateMap[dateStr] || '全日';

const extractDayFromDate = (dateStr: string) =>
  dateStr.match(/^(\d+)日/)?.[1] + '日' || '全日';

interface PageProps {
  searchParams: { testDate?: string };
}

export default async function Page({ searchParams }: PageProps) {
  const { userId } = auth();
  const testDate = searchParams.testDate
    ? new Date(`2024-${searchParams.testDate}`)
    : undefined;
  const today = testDate || new Date();
  const todayStr = today.toISOString().split('T')[0];

  const votingStatus = getVotingStatus(today);
  const allVotes = await getAllVotes();

  if (!userId) return renderUnauthenticatedView(votingStatus, allVotes);

  const { ticketUsed } = await fetchUserTicketStatus(userId);
  const votesHistory = await getVotesHistory(userId);

  if (votingStatus.isBefore) return <MCBeforeVotingPeriod />;
  if (votingStatus.isAfter)
    return renderAfterVotingView({
      userId,
      votesHistory,
      allVotes,
      testDate,
    });

  const filteredPrograms = filterPrograms(todayStr, votesHistory);

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
      {votesHistory.length > 0 && (
        <TicketContext userId={userId!} ticketUsed={ticketUsed} />
      )}
    </>
  );
}

function renderUnauthenticatedView(votingStatus: any, allVotes: any) {
  if (votingStatus.isDuring) return <MCSignInGuidance />;
  if (votingStatus.isBefore) return <MCBeforeVotingPeriod />;
  if (votingStatus.isAfter)
    return (
      <MCAfterVotingPeriodWithOutUserID
        departments={departments}
        allVotes={allVotes}
      />
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
  allVotes,
  testDate,
}: {
  userId: string;
  votesHistory: any;
  allVotes: any;
  testDate?: Date;
}) {
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

function filterPrograms(todayStr: string, votesHistory: any) {
  const votedProgramIds = new Set(
    votesHistory.map((vote: any) => vote.program_id)
  );

  const todayMappedDay = mapDateToDay(todayStr);

  return programData.filter((program) => {
    const programDay = extractDayFromDate(program.date);
    return (
      (programDay === todayMappedDay || programDay === '全日') &&
      !votedProgramIds.has(program.id)
    );
  });
}
