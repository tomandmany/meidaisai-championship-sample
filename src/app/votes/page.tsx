import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import MCForm from '../../components/MCForm';
import LotteryTicket from '../../components/LotteryTicket';
import { getVotes } from '@/data/getVotes';
import { getVotesHistory } from '@/data/getVotesHistory'; // 新しい関数をインポート

// Dateオブジェクトを日本時間に変換するヘルパー関数
function formatToJST(utcDateString: string) {
  const utcDate = new Date(utcDateString);
  return utcDate.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
}

export default async function Page() {
  const { userId } = auth();

  // ユーザーがログインしていない場合、ログインページにリダイレクト
  if (!userId) {
    redirect('/sign-in');
  }

  // ユーザーの投票データを取得
  const existingVote = await getVotes(userId);

  // 3日間の投票履歴を取得
  const votesHistory = await getVotesHistory(userId);

  // 既存データがあるかどうかを判定
  const hasExistingDataForToday = existingVote !== null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-wrap gap-10">
        <MCForm userId={userId} />
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">過去3日間の投票履歴</h2>
          {votesHistory.length === 0 ? (
            <p>投票履歴がありません。</p>
          ) : (
            <ul className="space-y-4">
              {votesHistory.map((vote) => (
                <li key={vote.id} className="p-4 bg-white rounded-lg shadow-sm">
                  <p>模擬店: {vote.booth}</p>
                  <p>屋外ステージ: {vote.outstage}</p>
                  <p>教室: {vote.room}</p>
                  <p>投票日時: {new Date(formatToJST(vote.created_at)).toLocaleString()}</p>
                  <p>更新日時: {new Date(formatToJST(vote.updated_at)).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <LotteryTicket hasExistingDataForToday={hasExistingDataForToday} />
    </main>
  );
}
