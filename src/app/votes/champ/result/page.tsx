// @/app/votes/champ/result/page.tsx

import { getAllVotes, Vote } from "@/data/getAllVotes";

export default async function Page() {
  const allVotes: Vote[] = await getAllVotes();

  if (allVotes.length === 0) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
        <h2 className="text-2xl font-bold text-red-500">投票データが見つかりません</h2>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-50">
      <div className="font-bold text-2xl text-white p-6 sm:text-center bg-[#E07494] sticky left-0 top-0 z-mc-history-title">
        投票結果
      </div>
      <div className="flex flex-wrap gap-8 justify-center p-8">
        {allVotes.map((vote) => (
          <div
            key={vote.program_id}
            className="flex flex-col items-center gap-2 bg-white shadow-lg rounded-lg p-4 w-60"
          >
            <div className="font-bold text-xl">{vote.program_name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
