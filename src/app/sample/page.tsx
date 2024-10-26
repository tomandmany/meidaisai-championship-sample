// app/page.tsx

import { auth } from "@clerk/nextjs/server";
import MultipleMCForm from "@/components/Multiple/multiple-mc-form";
import TicketContext from "@/components/Multiple/ticket-context";
import SignInButton from "@/components/Multiple/SignInButton";
import { getUserData } from "@/data/getUserData";
import { getVotesHistory } from "@/data/getVotesHistory";
import { getVotingStatus } from "@/lib/getVotingStatus";

export default async function Page({ searchParams }: { searchParams: { testDate?: string } }) {
  const { userId } = auth(); // Clerkのセッションを取得
  let ticketUsed = false;

  if (!userId) {
    return <SignInButton>ログインする</SignInButton>;
  }

  try {
    const { data }: { data: User | null } = await getUserData(userId);

    // data が存在し、ticket_used が true の場合に ticketUsed を更新
    ticketUsed = data?.ticket_used ?? false;
  } catch (error) {
    console.error("ユーザーデータの取得に失敗しました:", error);
    // 取得失敗時もticketUsedはfalseのまま進める
  }

  const testDate = searchParams.testDate ? new Date(`2024-${searchParams.testDate}`) : undefined;

  // // サーバーサイドで投票期間を判定
  const votingStatus = getVotingStatus(testDate);

  const votesHistory = await getVotesHistory(userId);

  const today = testDate || new Date();
  const todayStr = today.toISOString().split('T')[0]; // YYYY-MM-DD形式に変換

  // // 当日の投票があるかどうかを確認
  // const isExistingTodayVote = votesHistory.some(vote => {
  //   const voteDateStr = new Date(vote.created_at).toISOString().split('T')[0];
  //   return voteDateStr === todayStr;
  // });

  return (
    <>
      <MultipleMCForm user_id={userId} votesHistory={votesHistory} testDate={testDate} />
      <TicketContext userId={userId!} ticketUsed={ticketUsed} />
      {/* {isExistingTodayVote && (
        <TicketContext userId={userId!} ticketUsed={ticketUsed} />
      )} */}
    </>
  );
}
