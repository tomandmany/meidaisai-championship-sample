// app/(your-path)/page.tsx

// use clientは不要

import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import MCForm from '../../../components/MCForm';
import LotteryTicket from '../../../components/LotteryTicket';
import { getVotes } from '@/data/getVotes';
import { getVotesHistory } from '@/data/getVotesHistory';
import SignOutButton from '@/components/SignOutButton';
import { isVotingPeriod } from '@/lib/votingPeriod';
import Link from 'next/link';
import VoteHistory from '@/components/VoteHistory';

export default async function Page({ searchParams }: { searchParams: { testStartDate?: string, testEndDate?: string, testNowDate?: string } }) {
  const { userId } = auth();

  const testDate = {
    testStartDate: searchParams.testStartDate || '11-02',
    testEndDate: searchParams.testEndDate || '11-04',
    testNowDate: searchParams.testNowDate ? new Date(`2024-${searchParams.testNowDate}`) : undefined
  }

  // サーバーサイドで投票期間を判定
  const votingStatus = isVotingPeriod(testDate.testStartDate, testDate.testEndDate, testDate.testNowDate);

  // ユーザーの投票データを取得
  const existingVote = await getVotes(userId!);

  // 3日間の投票履歴を取得
  const votesHistory = await getVotesHistory(userId!);

  // 既存データがあるかどうかを判定
  const hasExistingDataForToday = existingVote !== null;

  // 投票期間前
  if (votingStatus.isBefore) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="p-4 bg-gray-100 rounded-lg shadow-md text-center">
          <h1 className="text-3xl font-bold mb-4">投票期間前です。</h1>
          <p className="text-lg">11/2〜11/4の本祭期間中に投票できます。</p>
        </div>
      </main>
    );
  }

  // 投票期間中でログインしていない場合はログインページにリダイレクト
  if (votingStatus.isDuring && !userId) {
    redirect('/sign-in');
  }

  // 投票期間後
  if (votingStatus.isAfter) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-10">
        {userId ? (
          <>
            <div className="p-4 bg-gray-100 rounded-lg shadow-md text-center">
              <h1 className="text-3xl font-bold">投票期間は終了しました。</h1>
            </div>
            <VoteHistory votesHistory={votesHistory} testDate={testDate} />
            <SignOutButton />
          </>
        ) : (
          <>
            <div className="p-4 bg-gray-100 rounded-lg shadow-md text-center">
              <h1 className="text-3xl font-bold mb-4">投票期間は終了しました。</h1>
              <p className="text-lg">ログインして投票履歴を見ることができます。</p>
            </div>
            <Link href="/sign-in" className='p-4 rounded-lg bg-green-500 hover:bg-green-600 text-white'>ログインする</Link>
          </>
        )}
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-wrap gap-10">
        <MCForm userId={userId!} />
        <VoteHistory votesHistory={votesHistory} testDate={testDate} />
      </div>
      <LotteryTicket hasExistingDataForToday={hasExistingDataForToday} />
      <SignOutButton />
    </main>
  );
}
