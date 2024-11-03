// @/app/votes/champ/result/page.tsx

import { getAllVotes } from "@/data/getAllVotes";
import MCResult from "@/components/mc/result/mc-result";
import { mapDateToDay } from "@/lib/voteUtils";

// const departments = ['模擬店部門', '屋外ステージ部門', '教室部門'];
const departments = ['模擬店部門', '教室部門'];

export default async function Page() {
  const allVotes = await getAllVotes();

  if (allVotes.length === 0) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <h2 className="text-2xl font-bold text-red-500">投票データが見つかりません</h2>
      </div>
    );
  }

  console.log(
    allVotes.
      filter(
        vote =>
          mapDateToDay(vote.created_at) === '全日'
          // &&
          
      )
  );
  // console.log(mapDateToDay(vote.created_at));

  return (
    <MCResult departments={departments} allVotes={allVotes} />
  );
}