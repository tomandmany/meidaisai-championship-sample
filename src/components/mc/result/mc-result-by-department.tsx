// @/components/mc/result/mc-result-by-department.tsx

import { ScrollArea } from "@/components/ui/scroll-area";

type MCResultByDepartmentProps = {
  department: string;
  votes: [string, number][];
};

export default function MCResultByDepartment({ department, votes }: MCResultByDepartmentProps) {
  return (
    <div className="bg-white shadow-md rounded-lg px-8 py-10 flex flex-col items-center w-full min-w-fit sm:w-1/2 lg:w-1/3">
      <h2 className="text-2xl font-semibold mb-4">{department}</h2>
      <ul className="space-y-2 w-full">
        {votes.length > 0 ? (
          renderVotesWithSameRank(votes)
        ) : (
          <p className="text-muted-foreground">投票されていません。</p>
        )}
      </ul>
    </div>
  );
}

function renderVotesWithSameRank(votes: [string, number][]) {
  const sortedVotes = votes.sort((a, b) => b[1] - a[1]);
  const crownIcons = ['👑', '🥈', '🥉'];

  let currentRank = 1;
  let currentVoteCount = sortedVotes[0][1];

  if (votes.length > 5) {
    return (
      <ScrollArea className="h-[480px] border border-primary/50 rounded-md">
        {
          sortedVotes.map(([name, count], index) => {
            if (count < currentVoteCount) {
              currentRank = index + 1;
              currentVoteCount = count;
            }

            const icon = crownIcons[currentRank - 1] || '';

            return <VoteItem key={index} name={name} count={count} icon={icon} className='mb-2' />
          })
        }
      </ScrollArea>
    )
  }

  return sortedVotes.map(([name, count], index) => {
    if (count < currentVoteCount) {
      currentRank = index + 1;
      currentVoteCount = count;
    }

    const icon = crownIcons[currentRank - 1] || '';

    return <VoteItem key={index} name={name} count={count} icon={icon} />
  });
}

type VoteItemProps = {
  name: string;
  count: number;
  icon: string;
  className?: string;
};

function VoteItem({ name, count, icon, className }: VoteItemProps) {
  return (
    <li className={`flex justify-between items-center bg-gray-100 p-3 rounded-md gap-4 ${className}`}>
      <div className="flex items-center space-x-3">
        <span className="text-2xl">{icon}</span>
        <span>{name}</span>
      </div>
      <span className="text-blue-600 font-bold">{count}</span>
    </li>
  );
}
