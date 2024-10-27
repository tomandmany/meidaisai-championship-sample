// @/app/votes/champ/result/page.tsx

import { getAllVotes } from "@/data/getAllVotes";
import McResult from "@/components/mc/mc-result";

export default async function Page() {
  const allVotes = await getAllVotes();

  if (allVotes.length === 0) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <h2 className="text-2xl font-bold text-red-500">投票データが見つかりません</h2>
      </div>
    );
  }

  return (
    <McResult allVotes={allVotes} />
  );
}