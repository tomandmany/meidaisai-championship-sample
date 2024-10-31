import MCResultByDepartment from "./mc-result-by-department";

interface MCResultProps {
  allVotes: Vote[];
  departments: string[];
}

function filterVotesByDepartment(votes: { program_name: string; department: string | null }[]) {
  return votes.reduce((acc, { program_name, department }) => {
    const dept = department || "不明な部門"; // nullやundefinedの場合にデフォルト値を設定
    acc[dept] = acc[dept] || [];
    const existingVote = acc[dept].find(([name]) => name === program_name);

    if (existingVote) {
      existingVote[1] += 1; // 既存のプログラムへの票を加算
    } else {
      acc[dept].push([program_name, 1]); // 新しいプログラムを追加
    }

    return acc;
  }, {} as Record<string, [string, number][]>);
}

export default function McResult({ departments, allVotes }: MCResultProps) {
  if (allVotes.length === 0) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <h2 className="text-2xl font-bold text-red-500">投票データが見つかりません</h2>
      </div>
    );
  }

  const filteredVotesByDepartment = filterVotesByDepartment(allVotes);

  return (
    <div className="fixed inset-0 overflow-y-auto z-mc-history-and-result-modal bg-mc-background bg-white">
      {/* <div className="font-bold text-2xl text-white p-6 sm:text-center bg-[#EB9697] sticky top-0 z-mc-history-and-result-title">
        投票結果
      </div> */}
      <div className="font-bold pl-6 sm:pl-0 text-xl text-white h-[50px] flex items-center sm:justify-center bg-[#EB9697] sticky left-0 top-0 z-mc-history-and-result-title">
        投票結果
      </div>
      <div className="sm:min-h-[calc(100svh-50px)] flex flex-wrap justify-center gap-2 sm:gap-10 sm:py-16">
        {/* {Object.entries(filteredVotesByDepartment).map(([department, votes]) => (
          <MCResultByDepartment key={department} department={department || "不明な部門"} votes={votes} />
        ))} */}
        {departments.map((department) => (
          <MCResultByDepartment
            key={department}
            department={department}
            votes={filteredVotesByDepartment[department] || []}
          />
        ))}
      </div>
    </div>
  )
}