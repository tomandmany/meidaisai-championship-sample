// app/page.tsx
import { getTopVotesByCategory } from "@/data/getTopVotesByCategory";
import countVotes from "@/lib/countVotes";

export default async function Page() {
  const votes = await getTopVotesByCategory();

  // 各部門の上位3位を取得
  const topBoothVotes = countVotes(votes, 'booth');
  const topOutstageVotes = countVotes(votes, 'outstage');
  const topRoomVotes = countVotes(votes, 'room');

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Meidaisai Championship
        <br />
        上位3位までの得票数
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <CategorySection title="模擬店" votes={topBoothVotes} />
        <CategorySection title="屋外ステージ" votes={topOutstageVotes} />
        <CategorySection title="教室" votes={topRoomVotes} />
      </div>
    </div>
  );
}

// カテゴリーごとに表示するコンポーネント
type CategorySectionProps = {
  title: string;
  votes: [string, number][];
};

function CategorySection({ title, votes }: CategorySectionProps) {
  const getCrownIcon = (rank: number) => {
    if (rank === 1) return '👑'; // 1位の王冠
    if (rank === 2) return '🥈'; // 2位のアイコン
    if (rank === 3) return '🥉'; // 3位のアイコン
    return null; // それ以外の順位にはアイコンを表示しない
  };

  let currentRank = 1;
  let currentVoteCount = votes.length > 0 ? votes[0][1] : 0;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">{title}部門</h2>
      <ul className="space-y-2">
        {votes.length > 0 ? (
          votes.map(([name, count], index) => {
            // 票数が異なる場合は順位を更新
            if (count < currentVoteCount) {
              currentRank += 1;
              currentVoteCount = count;
            }

            return (
              <li key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getCrownIcon(currentRank)}</span> {/* 王冠アイコン */}
                  <span>{name}</span>
                </div>
                <span className="text-blue-600 font-bold">{count} 票</span>
              </li>
            );
          })
        ) : (
          <p className="text-gray-500">投票されていません。</p>
        )}
      </ul>
    </div>
  );
}