// app/page.tsx

import { auth } from "@clerk/nextjs/server";
import MultipleMCForm from "@/components/Multiple/multiple-mc-form";
import TicketContext from "@/components/Multiple/ticket-context";
import SignInButton from "@/components/Multiple/SignInButton";
import { getUserData } from "@/data/getUserData";
import { getVotesHistory } from "@/data/getVotesHistory";
import { getVotingStatus } from "@/lib/getVotingStatus";

const departments = ['模擬店部門', '屋外ステージ部門', '教室部門'];
const days = ['2024-11-02', '2024-11-03', '2024-11-04'];
const locations = ['A棟', 'B棟', 'C棟', '中庭', '体育館', '講堂'];
const genres = ['食べ物', 'ゲーム', 'パフォーマンス', '展示', '体験', '音楽'];

const projects: Project[] = [
  { id: '1', name: 'たい焼き屋', description: '美味しいたい焼きを販売します', department: '模擬店部門', day: '11-02', location: 'A棟', genre: '食べ物' },
  { id: '2', name: 'ダンスパフォーマンス', description: '迫力満点のダンスショー', department: '屋外ステージ部門', day: '11-02', location: '中庭', genre: 'パフォーマンス' },
  { id: '3', name: '科学実験教室', description: '楽しく学べる科学実験', department: '教室部門', day: '11-02', location: 'B棟', genre: '展示' },
  { id: '4', name: 'お好み焼きスタンド', description: '関西風お好み焼きを提供', department: '模擬店部門', day: '11-03', location: 'C棟', genre: '食べ物' },
  { id: '5', name: 'アカペラライブ', description: '学生によるアカペラコンサート', department: '屋外ステージ部門', day: '11-03', location: '講堂', genre: '音楽' },
  { id: '6', name: 'VR体験コーナー', description: '最新VR技術を体験できます', department: '教室部門', day: '11-03', location: 'A棟', genre: '体験' },
  { id: '7', name: 'クレープ屋さん', description: 'オリジナルクレープを作ろう', department: '模擬店部門', day: '11-04', location: '中庭', genre: '食べ物' },
  { id: '8', name: 'ロボットショー', description: '自作ロボットのデモンストレーション', department: '屋外ステージ部門', day: '11-04', location: '体育館', genre: 'パフォーマンス' },
  { id: '9', name: '古本市', description: '掘り出し物が見つかるかも', department: '教室部門', day: '11-04', location: 'B棟', genre: '展示' },
  { id: '10', name: 'スマッシュボール', description: 'ストレス発散ゲーム', department: '模擬店部門', day: '11-02', location: 'C棟', genre: 'ゲーム' },
  { id: '11', name: 'ジャズバンド演奏', description: 'スイングジャズの生演奏', department: '屋外ステージ部門', day: '11-02', location: '講堂', genre: '音楽' },
  { id: '12', name: '写真展', description: '学生が撮影した写真の展示', department: '教室部門', day: '11-02', location: 'A棟', genre: '展示' },
  { id: '13', name: 'たこ焼きスタンド', description: '大阪風たこ焼きを提供', department: '模擬店部門', day: '11-03', location: '中庭', genre: '食べ物' },
  { id: '14', name: 'マジックショー', description: '驚きの手品パフォーマンス', department: '屋外ステージ部門', day: '11-03', location: '体育館', genre: 'パフォーマンス' },
  { id: '15', name: '謎解きゲーム', description: '教室を使った謎解き脱出ゲーム', department: '教室部門', day: '11-03', location: 'C棟', genre: 'ゲーム' },
  { id: '16', name: '謎解きゲーム', description: '教室を使った謎解き脱出ゲーム', department: '教室部門', day: '11-04', location: 'C棟', genre: 'ゲーム' },
  { id: '17', name: '謎解きゲーム', description: '教室を使った謎解き脱出ゲーム', department: '教室部門', day: '11-02', location: 'C棟', genre: 'ゲーム' },
]

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
  // 投票済みのプロジェクトIDを取得
  const votedProjectIds = new Set(votesHistory.map(vote => vote.project_id));

  const today = testDate || new Date();
  const todayStr = today.toISOString().split('T')[0]; // YYYY-MM-DD形式に変換

  // // 当日の投票があるかどうかを確認
  // const isExistingTodayVote = votesHistory.some(vote => {
  //   const voteDateStr = new Date(vote.created_at).toISOString().split('T')[0];
  //   return voteDateStr === todayStr;
  // });

  return (
    <>
      <MultipleMCForm user_id={userId} votesHistory={votesHistory} testDate={testDate} departments={departments} days={days} locations={locations} genres={genres} projects={projects} votedProjectIds={votedProjectIds} />
      <TicketContext userId={userId!} ticketUsed={ticketUsed} />
      {/* {isExistingTodayVote && (
        <TicketContext userId={userId!} ticketUsed={ticketUsed} />
      )} */}
    </>
  );
}
